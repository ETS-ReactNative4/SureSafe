const express = require("express");
const router = express.Router();
const verify = require("../utils/Verify.token");

const AdminControllers = require("../controllers/Admin.controllers");

router.post("/admin/create", AdminControllers.addAdmin);

router.patch("/admin/code/:adminID", AdminControllers.addCode);

router.get("/admin/exposed", AdminControllers.getExposed);

router.get("/admin/infected", AdminControllers.getInfected);

router.get("/admin/potential", AdminControllers.getPotential);

router.get("/admin/dashboard", AdminControllers.dashboard);

router.get("/admin/report/exposed", AdminControllers.reportExposed);

router.get("/admin/report/infected", AdminControllers.reportInfected);

router.get("/admin/report/potential", AdminControllers.reportPotential);

module.exports = router;
