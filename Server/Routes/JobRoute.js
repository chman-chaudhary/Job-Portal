const router = require("express").Router();
const JobController = require("../Controllers/JobController.js");

router.get("/", JobController.jobs);
router.post("/new", JobController.postJob);

router.route("/:id").get(JobController.showJob).post(JobController.applyJob);

module.exports = router;
