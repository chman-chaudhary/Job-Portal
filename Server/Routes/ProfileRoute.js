const router = require("express").Router();
const Profile = require("../Controllers/ProfileController.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

router.get("/", Profile.myProfile);
router.post("/new", upload.single("img"), Profile.createProfile);

router
  .route("/:username")
  .get(Profile.showProfile)
  .put(upload.single("img"), Profile.updateProfile);

module.exports = router;
