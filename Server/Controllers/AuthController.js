const User = require("../models/User.js");
const { createSecretToken } = require("../init/SecretToken.js");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, username, createdAt } = req.body;
    const checkEmail = await User.findOne({ email });
    const checkUsername = await User.findOne({ username });
    if (checkEmail) {
      return res.json({ message: "Email already registered" });
    } else if (checkUsername) {
      return res.json({ message: "Username already taken" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error in registering User:", error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, token });
    next();
  } catch (error) {
    console.error(error);
  }
};
