const express = require("express");
const router = express.Router();

const TracingControllers = require("../controllers/Tracing.controller");

router.post("/tracing/add", TracingControllers.addTracing);

router.delete("/tracing/remove", TracingControllers.removeTracing);

router.get("/tracing/update/:_id", TracingControllers.updateTracing);

router.get("/tracing/get/:userID", TracingControllers.getTracing);

module.exports = router;
