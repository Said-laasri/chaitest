const express = require("express");
const app = express();
const server = require("http").createServer(app); // Create the server

app.use(express.static(__dirname + "/public"));
app.use(express.json());
const routes = require("./routes/routes.js");
const PORT = process.env.PORT || 3000;

app.use("/api/v1", routes); // Use the routes at the '/api' endpoint

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

server.listen(PORT, () => {
  // Use the server to listen for incoming requests
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
