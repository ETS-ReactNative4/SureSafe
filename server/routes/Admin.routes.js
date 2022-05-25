const express = require("express");
const router = express.Router();
const multer = require("multer");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 7);

const AdminControllers = require("../controllers/Admin.controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./suresafe/");
  },
  filename: function (req, file, cb) {
    cb(null, `${nanoid()}.png`);
  },
});

const upload = multer({ storage: storage });

router.post("/admin/create", AdminControllers.addAdmin);

router.patch("/admin/code/:adminID", AdminControllers.addCode);

router.get("/admin/exposed", AdminControllers.getExposed);

router.get("/admin/infected", AdminControllers.getInfected);

router.get("/admin/potential", AdminControllers.getPotential);

router.get("/admin/dashboard", AdminControllers.dashboard);

router.get("/admin/report/exposed", AdminControllers.reportExposed);

router.get("/admin/report/infected", AdminControllers.reportInfected);

router.get("/admin/report/potential", AdminControllers.reportPotential);

router.post(
  "/admin/report/pdf",
  upload.fields([{ name: "pdf", maxCount: 1 }]),
  AdminControllers.convertPdf
);

module.exports = router;
