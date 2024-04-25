const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers");
const { tokenMiddleware } = require("../middlewares/tokens.middlewares");
const forgatePassword = require("../controllers/user_forgat.controllers")

router.get("/", tokenMiddleware, userController.getAllUsers);
router.post("/create", userController.createUser);
router.post("/login", userController.logIn);
router.get("/me", tokenMiddleware, userController.Me);
router.delete("/:_id", tokenMiddleware, userController.deleteUserById);
router.put("/:_id", tokenMiddleware, userController.putUserData);
router.get("/:_id", tokenMiddleware, userController.onGetUserById);

router.post('/forgetPassword', forgatePassword.forgetPassword)
// router.post('/resetpassword', forgatePassword.sendRestPasswordMail)

module.exports = router;
