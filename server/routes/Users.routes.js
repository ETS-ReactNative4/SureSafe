const express = require("express");
const router = express.Router();
const verify = require("../utils/Verify.token");

const UsersControllers = require("../controllers/Users.controller");

router.post("/users/create", UsersControllers.userCreate);

router.patch("/users/addinfo", UsersControllers.addInfo);

router.patch("/users/addnumber", UsersControllers.addNumber);

router.patch("/users/checkOTP", UsersControllers.checkOTP);

router.post("/users/login", UsersControllers.logIn);

router.get("/users/user/:userID", verify, UsersControllers.getUser);

module.exports = router;
