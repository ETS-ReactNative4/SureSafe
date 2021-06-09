const express = require("express");
const router = express.Router();

const EstablishmentsController = require("../controllers/Establishments.controller");

router.post("/establishment/add", EstablishmentsController.addEstablishment);

module.exports = router;
