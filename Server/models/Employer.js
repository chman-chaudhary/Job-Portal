const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
  },
  firstname: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastname: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Your country is required"],
  },
  region: {
    type: String,
    required: [true, "Your region/state is required"],
  },
  city: {
    type: String,
    required: [true, "Your city is required"],
  },
  about: {
    type: String,
  },
  heading: {
    type: String,
  },
  github: String,
  linkedIn: String,
  twitter: String,
  portfolio: String,
  img: {
    type: String,
    default:
      "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png",
    set: (v) =>
      v === "" || v === "undefined"
        ? "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
        : v,
  },
  appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  postedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
