const express = require("express");
const router = express.Router();

const TracingControllers = require("../controllers/Tracing.controller");

router.post("/tracing/send", TracingControllers.sendGeo);

module.exports = router;
