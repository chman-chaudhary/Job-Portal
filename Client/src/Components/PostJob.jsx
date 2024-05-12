import React, { useEffect, useState } from "react";
import { Button3 } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

export default function PostJob() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    companyURL: "",
    companyName: "",
    role: "",
    category: "",
    location: "",
    country: "",
    minSalary: "",
    maxSalary: "",
    aboutJob: "",
    qualification: "",
    type: [],
  })

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const selectedTypes = [...formData.type];
      const index = selectedTypes.indexOf(value);
      if (index !== -1) {
        selectedTypes.splice(index, 1);
      } else {
        selectedTypes.push(value);
      }
      setFormData({ ...formData, type: selectedTypes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({});
  }

  const validateForm = (formData) => {
    const errors = {};

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.companyName) {
      errors.companyName = 'Compay name is required';
    }
    if (!formData.role) {
      errors.role = 'Job Role is required';
    }
    if (!formData.location) {
      errors.location = 'Location is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.category) {
      errors.category = 'Job Category is required';
    }
    if (!formData.aboutJob) {
      errors.aboutJob = 'Job Description is required';
    }
    if (!formData.qualification) {
      errors.qualification = 'Qualification is required';
    }
    if (!formData.type) {
      errors.type = 'Job Type is required';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cookies.token || cookies.token === "undefined") {
      return navigate("/login");
    } else {
      const jobData = { ...formData };

      try {
        let response = await axios.post("https://recruitment-agency-api.vercel.app/job/new", jobData, { withCredentials: true });
        const { message, success, id, isLogin } = response.data;
        if (success && isLogin) {
          handleSuccess(message);
          navigate(`/job/${id}`)
        } else {
          handleError(message);
          navigate("/login");
        }
        setFormData({
          email: "",
          companyURL: "",
          companyName: "",
          role: "",
          category: "",
          location: "",
          country: "",
          minSalary: "",
          maxSalary: "",
          aboutJob: "",
          qualification: "",
          type: [],
        });
      } catch (error) {
        console.log("Form Submission Error:", error);
      }
    }
  }

  return (
    <div className="bg-black my-16 mx-6 text-white custom-fonts text-center">
      <h2 className="text-6xl font-bold">Join MarsX Revolution</h2>
      <h3 className="text-xl mt-8">
        Submit your startup and get exposure to thousands of users
      </h3>
      <div className="px-40 text-left my-20">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-5">
            <div className="w-full">
              <label htmlFor="email" className="mx-6">
                Your Email Address <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="email"
                placeholder="your@email.com"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>
            <div className="w-full">
              <label htmlFor="url" className="mx-6">
                Your Company/Startup URL
              </label>
              <br />
              <input
                type="text"
                id="url"
                name="companyURL"
                value={formData.companyURL}
                onChange={handleChange}
                placeholder="https://chat.openai.com/g/g"
                className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
              <br />
            </div>
          </div>
          <div>
            <label htmlFor="companyName" className="mx-6">
              Company Name <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name Ltd."
              className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            />
          </div>
          <br />
          <div>
            <label htmlFor="role" className="mx-6">
              Role <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Software Developer"
              className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            />
          </div>
          <br />
          <div>
            <label htmlFor="category" className="mx-6">
              Company Category <span className="text-red-600">*</span>
            </label>
            <br />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            >
              <option value="All">All</option>
              <option value="Analysis">Analysis</option>
              <option value="Assistant">Assistant</option>
              <option value="Audio">Audio</option>
              <option value="Coach">Coach</option>
              <option value="Converter">Converter</option>
              <option value="Design">Design</option>
              <option value="Education">Education</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Guide">Guide</option>
              <option value="Hobby">Hobby</option>
              <option value="Humor">Humor</option>
              <option value="Marketing">Marketing</option>
              <option value="Math">Math</option>
              <option value="Medical">Medical</option>
              <option value="News">News</option>
              <option value="Programming">Programming</option>
              <option value="Recipe">Recipe</option>
              <option value="Research">Research</option>
            </select>
          </div>
          <br />
          <div>
            <h3 className="mx-6">Job Type <span className="text-red-600">*</span></h3>
            <br />
            <div className="flex justify-around">
              <label className="check-box flex items-center space-x-3">
                <div>
                  <input type="checkbox" name="type" value="Full-Time" onChange={handleChange} />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="check-box-path"
                    ></path>
                  </svg>
                </div>
                <h3>Full time</h3>
              </label>
              <label className="check-box flex items-center space-x-3">
                <div>
                  <input type="checkbox" name="type" value="Part-Time" onChange={handleChange} />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="check-box-path"
                    ></path>
                  </svg>
                </div>
                <h3>Part time</h3>
              </label>
              <label className="check-box flex items-center space-x-3">
                <div>
                  <input type="checkbox" name="type" value="Remote" onChange={handleChange} />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="check-box-path"
                    ></path>
                  </svg>
                </div>
                <h3>Remote</h3>
              </label>
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="location" className="mx-6">
              Job Location <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Rohtak, Haryana"
              className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            />
          </div>
          <br />
          <div>
            <label htmlFor="country" className="mx-6">
              Country <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="India"
              className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            />
          </div>
          <br />
          <h3 className="mx-6">Salary Range (in &#8377;)</h3>
          <div className="flex space-x-5">
            <div className="w-full">
              <input
                type="number"
                placeholder="Minimum Salary"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="Maximum Salary"
                className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
              <br />
            </div>
          </div>
          <div>
            <label htmlFor="aboutJob" className="mx-6">
              Job Description <span className="text-red-600">*</span>
            </label>
            <br />
            <textarea
              name="aboutJob"
              id="aboutJob"
              rows="5"
              value={formData.aboutJob}
              onChange={handleChange}
              placeholder="Enter text here"
              className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 text-lg rounded-[32px] w-5/5 mr-10 mt-2 mb-3 hover:scale-105 hover:border-white duration-300 ease-linear"
            ></textarea>
          </div>
          <br />
          <div>
            <label htmlFor="qualification" className="mx-6">
              Job Qualification <span className="text-red-600">*</span>
            </label>
            <br />
            <textarea
              name="qualification"
              id="qualification"
              rows="5"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter text here"
              className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 text-lg rounded-[32px] w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
            ></textarea>
          </div>
          <br />
          <div className="w-full flex justify-center">
            <Button3 text="Join MarsX" type="submit" />
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
