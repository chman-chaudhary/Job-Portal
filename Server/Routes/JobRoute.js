const router = require("express").Router();
const JobController = require("../Controllers/JobController.js");
const { authMiddleware } = require("../Middlewares/AuthMiddleware.js");

router.get("/", JobController.jobs);
router.post("/new", authMiddleware, JobController.postJob);

router
  .route("/:id")
  .get(authMiddleware, JobController.showJob)
  .post(authMiddleware, JobController.applyJob);

module.exports = router;
