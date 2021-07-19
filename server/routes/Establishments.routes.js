const express = require("express");
const router = express.Router();

const EstablishmentsController = require("../controllers/Establishments.controller");

router.post("/establishment/add", EstablishmentsController.addEstablishment);

router.post("/establishment/addVisit", EstablishmentsController.addVisit);

router.get(
  "/establishment/getVisits/:userID",
  EstablishmentsController.getVisits
);

module.exports = router;
