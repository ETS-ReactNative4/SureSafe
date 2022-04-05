const express = require("express");
const router = express.Router();
const verify = require("../utils/Verify.token");
const multer = require("multer");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 7);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./suresafe/");
  },
  filename: function (req, file, cb) {
    cb(null, `${nanoid()}.png`);
  },
});
const upload = multer({ storage: storage });

const UsersControllers = require("../controllers/Users.controller");

router.post(
  "/users/create",
  upload.fields([
    { name: "validId", maxCount: 1 },
    { name: "picture", maxCount: 1 },
  ]),
  UsersControllers.userCreate
);

router.post(
  "/users/qrcode",
  upload.fields([{ name: "qrcode", maxCount: 1 }]),
  UsersControllers.addQrCode
);

router.post("/users/status", UsersControllers.updateStatus);

router.patch("/users/addinfo", UsersControllers.addInfo);

router.patch("/users/addnumber", UsersControllers.addNumber);

router.patch("/users/checkOTP", UsersControllers.checkOTP);

router.post("/users/login", UsersControllers.logIn);

router.get("/users/user/:userID", verify, UsersControllers.getUser);

router.get("/users/profile/:userID", verify, UsersControllers.getProfile);

router.post("/users/role", verify, UsersControllers.changeRole);

router.get(
  "/users/notifications/:userID",
  verify,
  UsersControllers.getNotifications
);

router.get("/users/status/:userID", verify, UsersControllers.getStatus);

router.get("/users/newusers", UsersControllers.getNewUsers);

module.exports = router;
