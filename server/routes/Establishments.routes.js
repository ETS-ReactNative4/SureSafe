const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./suresafe/");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}.png`);
  },
});
const upload = multer({ storage: storage });

const EstablishmentsController = require("../controllers/Establishments.controller");

router.post("/establishment/add", EstablishmentsController.addEstablishment);

router.post("/establishment/addVisit", EstablishmentsController.addVisit);

router.post(
  "/establishment/qrcode",
  upload.fields([{ name: "qrcode", maxCount: 1 }]),
  EstablishmentsController.addQrCode
);

router.get(
  "/establishment/getVisits/:userID",
  EstablishmentsController.getVisits
);

router.post(
  "/establishment/login",
  EstablishmentsController.EstablishmentslogIn
);

router.get(
  "/establishment/data/:userID",
  EstablishmentsController.getEstablishment
);

module.exports = router;
