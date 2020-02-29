require("dotenv").config();

const express = require("express");
const cors = require("CORS");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.SERVER_PORT;
app.use("/upload", express.static("./upload"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./src/routers/index.js");

app.use("/api/v1/", router);
app.listen(port, () => {
  console.log(`\n App Listen Port ${port}`);
});
let allow = {
  origin: "*",
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  // preflightContinue: false,
  // optionsSuccessStatus: 200
};
app.use(cors(allow));

// var allowedOrigins = ["http://localhost:3000"];
// app.use(
//   cors({
//     origin: function(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "the cors policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   })
// );
