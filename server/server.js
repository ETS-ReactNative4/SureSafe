const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 8080;
const DBURI = process.env.dbURI;

const UserRoutes = require("./routes/Users.routes");
const TracingRoutes = require("./routes/Tracing.routes");
const EstablishmentsRoutes = require("./routes/Establishments.routes");
const ShareRoutes = require("./routes/Share.routes");
const AdminRoutes = require("./routes/Admin.routes");

// Middlewares
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json({ limit: "50mb" }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use("/suresafe/api", UserRoutes);
server.use("/suresafe/api", TracingRoutes);
server.use("/suresafe/api", EstablishmentsRoutes);
server.use("/suresafe/api", ShareRoutes);
server.use("/suresafe/api", AdminRoutes);

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose.Promise = global.Promise;

mongoose
  .connect(DBURI, dbOptions)
  .then((res) => {
    console.log("Connected to", res.connections[0].name);
    server.listen(PORT, async () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => console.log(err.message));
