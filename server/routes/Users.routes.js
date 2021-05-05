const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/Users.controller");

router.post("/users/create", UsersControllers.userCreate);

router.patch("/users/addinfo", UsersControllers.addInfo);

router.patch("/users/addnumber", UsersControllers.addNumber);

router.patch("/users/checkOTP", UsersControllers.checkOTP);

module.exports = router;
