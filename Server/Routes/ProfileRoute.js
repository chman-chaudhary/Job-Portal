const router = require("express").Router();
const Profile = require("../Controllers/ProfileController.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });
const { authMiddleware } = require("../Middlewares/AuthMiddleware.js");

router.get("/", authMiddleware, Profile.myProfile);
router.post(
  "/new",
  authMiddleware,
  upload.single("img"),
  Profile.createProfile
);

router
  .route("/:username")
  .get(authMiddleware, Profile.showProfile)
  .put(authMiddleware, upload.single("img"), Profile.updateProfile);

module.exports = router;
