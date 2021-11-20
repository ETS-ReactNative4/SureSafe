const express = require("express");
const router = express.Router();
const verify = require("../utils/Verify.token");

const AdminControllers = require("../controllers/Admin.controllers");

router.post("/admin/create", AdminControllers.addAdmin);

router.patch("/admin/code/:adminID", AdminControllers.addCode);

module.exports = router;
