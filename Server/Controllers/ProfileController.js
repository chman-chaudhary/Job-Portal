// const Student = require("../models/Student.js");
const Employer = require("../models/Employer.js");
const User = require("../models/User.js");
const Job = require("../models/Job.js");

module.exports.myProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Please Login",
        success: false,
        isLogin: false,
      });
    }
    const { username } = await User.findById(userId);
    if (username) {
      return res.status(200).json({
        username,
        success: true,
        isLogin: true,
        message: "Succeefully fetch data",
      });
    }
    res.status(200).json({
      username,
      success: false,
      isLogin: false,
      message: "User not found",
    });
  } catch {
    res
      .status(200)
      .json({ message: "Internal Error", isLogin: false, success: false });
  }
};

module.exports.showProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "Please Login", success: false });
    }

    const user = await User.findById(userId);
    const isOwner = user.username === username;

    let response = await Employer.findOne({ username: username });
    if (!response) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const postedJobs = await Job.find({ _id: { $in: response.postedJobs } });
    const appliedJobs = await Job.find({
      _id: { $in: response.appliedJobs },
    });
    return res.json({
      profileInfo: response,
      postedJobs,
      appliedJobs,
      isOwner,
    });
  } catch (error) {
    console.log("Error while searching profile:", error);
  }
};

module.exports.createProfile = async (req, res) => {
  try {
    console.log(req.body);
    let url = 0;
    if (typeof req.file !== "undefined") {
      url = req.file.path;
    }
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Please Login",
        success: false,
        isLogin: false,
      });
    }
    const { username, email } = await User.findById(userId);
    let newProfile = new Employer({ ...req.body });
    newProfile.email = email;
    newProfile.username = username;
    if (url) {
      newProfile.img = url;
    }
    let registeredProfile = await newProfile.save();
    if (registeredProfile) {
      res.status(201).json({
        message: "New profile created successfully",
        success: true,
        username,
        login: false,
      });
    } else {
      res
        .status(500)
        .json({ message: "Error in Register Profile", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in Register Profile", success: false });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(200).json({
        message: "Please Login",
        success: false,
        isLogin: true,
      });
    }
    const currUser = await User.findById(userId);
    const { username } = req.params;
    if (username !== currUser.username) {
      return res.status(200).json({
        message: "You have not access to edit this profile",
        success: false,
        isLogin: true,
        isOwner: false,
      });
    }
    const response = await Employer.findOneAndUpdate(
      { username },
      { ...req.body }
    );
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      response.img = url;
    }
    await response.save();
    res.status(200).json({
      message: "Successfully Edited",
      success: true,
      username,
      isLogin: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Error", success: false, isLogin: false });
  }
};
