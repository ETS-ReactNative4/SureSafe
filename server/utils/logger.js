const log4js = require("log4js");
const dateNow = new Date();
date = dateNow + "";

log4js.configure({
  appenders: {
    ERROR: {
      type: "file",
      filename: `./logs/ERROR/${date.substr(0, 15)}-ERROR.log`,
    },
    INFO: {
      type: "file",
      filename: `./logs/INFO/${date.substr(0, 15)}-INFO.log`,
    },
    WARN: {
      type: "file",
      filename: `./logs/WARN/${date.substr(0, 15)}-WARN.log`,
    },
  },
  categories: {
    default: { appenders: ["ERROR", "INFO", "WARN"], level: "info" },
  },
});

const ERROR = log4js.getLogger("ERROR");
const INFO = log4js.getLogger("INFO");
const WARN = log4js.getLogger("WARN");

exports.ERROR = ERROR;
exports.INFO = INFO;
exports.WARN = WARN;
