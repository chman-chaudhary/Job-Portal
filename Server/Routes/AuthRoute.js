const { Signup, Login, Logout } = require("../Controllers/AuthController.js");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware.js");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;
