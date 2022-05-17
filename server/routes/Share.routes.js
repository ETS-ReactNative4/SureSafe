const express = require("express");
const router = express.Router();

const ShareControllers = require("../controllers/Share.controllers");

router.post("/share/logs/exposed/:userID", ShareControllers.shareLogsExposed);

router.post("/share/logs/infected/:userID", ShareControllers.shareLogsInfected);

router.post("/share/visits/:estabID", ShareControllers.shareVisits);

router.get("/cases/updates/:userID", ShareControllers.getCases);

// router.delete("/tracing/remove", TracingControllers.removeTracing);

// router.get("/tracing/update/:_id", TracingControllers.updateTracing);

// router.get("/tracing/get/:userID", TracingControllers.getTracing);

module.exports = router;
