// import required modules

const express = require("express"); // web framework for Node.js
const { Pool } = require('pg'); // PostgreSQL client for Node.js
const bodyParser = require("body-parser"); // middleware to parse incoming request bodies
const passportConfig = require("./lib/passportConfig"); // configuration for Passport authentication library
const cors = require("cors"); // middleware to enable Cross-Origin Resource Sharing
const fs = require("fs"); // file system module for Node.js

// create an instance of the Express web framework
const app = express();

// create a PostgreSQL client pool with the specified connection details
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jobs",
    password: "sc20dm",
    port: 3360,
});

// create required directories if they do not exist
if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
    fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
    fs.mkdirSync("./public/profile");
}

// specify the port number for the server to listen on
const port = 3360;

// configure middleware to parse JSON request bodies
app.use(bodyParser.json());

// configure middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// enable Cross-Origin Resource Sharing
app.use(cors());

// configure middleware for Passport authentication library
app.use(passportConfig.initialize());

// define routing for various routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

// start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

// define a simple GET route for the root URL
app.get("/", (req, res) => {
    res.status(200).send("Engine Started, Ready to take off!");
})
