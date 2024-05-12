const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  companyURL: {
    type: String,
  },
  companyName: {
    type: String,
    required: [true, "company name is required"],
  },
  email: {
    type: String,
    required: [true, "Contact Email is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "All",
      "Analysis",
      "Assistant",
      "Audio",
      "Coach",
      "Converter",
      "Design",
      "Education",
      "Fundraising",
      "Guide",
      "Hobby",
      "Humor",
      "Marketing",
      "Math",
      "Medical",
      "News",
      "Programming",
      "Recipe",
      "Research",
    ],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  country: {
    type: String,
    required: [true, "Country name is required"],
  },
  type: {
    type: [String],
    enum: ["Part-Time", "Full-Time", "Remote"],
    required: [true, "Job type is required"],
  },
  minSalary: Number,
  maxSalary: Number,
  aboutJob: {
    type: String,
    required: [true, "About Job is required"],
  },
  qualification: {
    type: String,
    required: [true, "Qualificatoin is required"],
  },
  applicants: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  employer: { type: Schema.Types.ObjectId, ref: "Employer" },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
