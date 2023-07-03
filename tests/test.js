const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", () => {
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

    describe("get /api/v1/people", () => {
      it(`should return an array of person entries of length ${
        this.lastIndex + 1
      }`, (done) => {
        // your code goes here
        done();
      });
    });
    describe("get /apl/v1/people/:id", () => {
      it("should return the entry corresponding to the last person added.", (done) => {
        // your code goes here
        done();
      });
      it("should return an error if the index is >= the length of the array", (done) => {
        // your code goes here
        done();
      });
    });
  });
});
