const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", () => {
  let lastIndex = -1;

  after(() => {
    server.close();
  });

  describe("post /api/v1/people", () => {
    it("should not create a people entry without a name", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ age: 10 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
        });
    });
    it("should create a people entry with valid input", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ name: "John", age: 10 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .equal("A person record was added");
          res.body.should.have
            .property("people")
            .to.be.an("array")
            .that.deep.includes({ age: 10, name: "John" });

          done();
        });
    });
  });
  describe("GET /api/v1/people", () => {
    it("should return an array of person entries", (done) => {
      chai
        .request(app)
        .get("/api/v1/people")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.should.have.lengthOf(lastIndex + 1);

          done();
        });
    });
  });

  describe("GET /api/v1/people/:id", () => {
    it("should return the entry corresponding to the last person added", (done) => {
      chai
        .request(app)
        .get(`/api/v1/people/${lastIndex}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.deep.include({ name: "John", age: 10 });

          done();
        });
    });

    it("should return an error if the index is >= the length of the array", (done) => {
      const invalidIndex = lastIndex < 0 ? 0 : lastIndex + 1;

      chai
        .request(app)
        .get(`/api/v1/people/${invalidIndex}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.eql({ error: "Person entry not found" });

          done();
        });
    });
  });
});
