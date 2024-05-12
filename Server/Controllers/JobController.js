const Job = require("../models/Job.js");
const Employer = require("../models/Employer.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student.js");

module.exports.jobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error while finding jobs" });
    console.log("Error while finding all jobs:", error);
  }
};

module.exports.postJob = async (req, res) => {
  try {
    let userId;
    if (req.cookies.token !== "undefined" && req.cookies.token) {
      const cookieData = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      userId = cookieData.id;
    }
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Please Login", success: false, isLogin: false });
    }
    const { username } = await User.findById(userId);
    const employer = await Employer.findOne({ username });
    let newJob = new Job({ ...req.body });
    newJob.employer = employer._id;
    const { _id } = await newJob.save();
    employer.postedJobs.push(_id);
    await employer.save();
    res.status(201).json({
      message: "Job posted successfully",
      success: true,
      id: _id,
      isLogin: true,
    });
  } catch (error) {
    console.error("Error in posting job:", error);
  }
};

module.exports.showJob = async (req, res) => {
  try {
    let userId,
      isApplicant = false,
      currUser,
      isOwner = false;
    if (req.cookies.token !== "undefined" && req.cookies.token) {
      const cookieData = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      userId = cookieData.id;
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (userId) {
      currUser = await User.findById(userId);
      const { _id } = await Employer.findOne({ username: currUser.username });
      if (job) {
        isApplicant = job.applicants.find(
          (id) => id.toString() === _id.toString()
        );
      }
    }
    isApplicant = Boolean(isApplicant);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
        isOwner,
        isApplicant,
      });
    }
    const applicants = await Employer.find({ _id: { $in: job.applicants } });
    const { username, firstname, lastname, img } = await Employer.findById(
      job.employer
    );
    if (currUser) {
      isOwner = currUser.username === username;
    } else {
      isOwner = false;
    }
    res.status(201).json({
      job,
      username,
      employerName: firstname + " " + lastname,
      img,
      isApplicant,
      applicants,
      isOwner,
    });
  } catch (error) {
    console.error("Error while showing job profile:", error);
  }
};

module.exports.applyJob = async (req, res) => {
  try {
    let userId;
    let { id } = req.params;
    if (req.cookies.token !== "undefined" && req.cookies.token) {
      const cookieData = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      userId = cookieData.id;
    }
    const job = await Job.findById(id);
    if (!job) {
      res.status(401).json({ message: "Job not found", success: false });
    }

    const { username } = await User.findById(userId);

    if (!username) {
      res.status(401).json({ message: "Please Login", success: false });
    }
    // let jobseeker = await Student.findOne({ username });
    // if (!jobseeker) {
    let jobseeker = await Employer.findOne({ username });
    // }
    job.applicants.push(jobseeker._id);
    jobseeker.appliedJobs.push(id);
    await job.save();
    await jobseeker.save();
    res
      .status(201)
      .json({ message: "Succefully Applied for the job", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error while appling for the job" });
  }
};
