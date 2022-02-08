const express = require("express");
const router = express.Router();

const Controller = require("../controllers/Sample.controllers");

router.post("/logs/add", Controller.addLogs);

module.exports = router;
