import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function UserInfoForm() {
  const navigate = useNavigate();
  const reader = new FileReader();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      return navigate("/login");
    }
  }, []);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("img", data.img[0]);
    formData.append("heading", data.heading);
    formData.append("city", data.city);
    formData.append("region", data.region);
    formData.append("country", data.country);
    formData.append("about", data.about);
    formData.append("github", data.github);
    formData.append("linkedIn", data.linkedIn);
    formData.append("twitter", data.twitter);
    formData.append("portfolio", data.portfolio);
    try {
      let response = await axios.post(
        "http://localhost:3000/profile/new",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const { success, message, username } = response.data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate(`/profile/${username}`);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("Error in Registering:", error);
    }
  };

  const imageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      reader.onload = (e) => {
        const imageURL = e.target.result;
        const currImg = document.querySelector("img[name='currImg']");
        currImg.src = imageURL;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      )}
      <div className="pt-[92px] text-white mx-6 custom-fonts text-center">
        <h2 className="text-6xl font-bold">Launch Your Career</h2>
        <h3 className="text-xl mt-8">Explore Opportunities with MarsX</h3>
        <div className="px-40 text-left my-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="firstname" className="mx-6">
                  First name <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "First name is required",
                    },
                  })}
                  type="text"
                  placeholder="Jane"
                  id="firstname"
                  className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                />
                {errors.firstname && (
                  <div className="text-rose-600 text-lg -mt-3 mb-1 text-center">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="lastname" className="mx-6">
                  Last name
                </label>
                <br />
                <input
                  {...register("lastname")}
                  type="text"
                  placeholder="Smith"
                  id="lastname"
                  className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                />
                <br />
              </div>
            </div>

            <div>
              <label className="mx-6">Profile Picture</label>
              <div className="space-x-5 flex items-center mt-4 mb-8 px-3">
                <div className="shrink-0">
                  <img
                    className="h-32 w-32 object-cover rounded-full"
                    name="currImg"
                    src={
                      "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    }
                    alt="Current profile photo"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-300
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-[#353DFF]
                                    hover:file:bg-violet-100"
                    {...register("img")}
                    onChange={imageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="heading" className="mx-6">
                Heading
              </label>
              <br />
              <input
                {...register("heading")}
                id="heading"
                placeholder="About you in a line"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>

            <div>
              <label htmlFor="country" className="mx-6">
                Country <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                {...register("country", {
                  required: { value: true, message: "Country is required" },
                })}
                id="country"
                placeholder="India"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
              {errors.country && (
                <div className="text-rose-600 text-lg -mt-3 mb-1 text-center">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="city" className="mx-6">
                  City <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  {...register("city", {
                    required: { value: true, message: "City name is required" },
                  })}
                  type="text"
                  placeholder="Faridabad"
                  id="city"
                  className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                />
                {errors.city && (
                  <div className="text-rose-600 text-lg -mt-3 mb-1 text-center">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="region" className="mx-6">
                  State / Province <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  {...register("region", {
                    required: {
                      value: true,
                      message: "State / Province is required",
                    },
                  })}
                  type="text"
                  placeholder="Haryana"
                  id="region"
                  className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                />
                {errors.region && (
                  <div className="text-rose-600 text-lg -mt-3 mb-1 text-center">
                    {errors.username.message}
                  </div>
                )}
                <br />
              </div>
            </div>

            <div>
              <label htmlFor="about" className="mx-6">
                About
              </label>
              <br />
              <textarea
                {...register("about")}
                id="about"
                rows="5"
                placeholder="Enter text here"
                className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 text-lg rounded-[32px] w-5/5 mr-10 mt-2 mb-3 hover:scale-105 hover:border-white duration-300 ease-linear"
              ></textarea>
            </div>

            <div>
              <label htmlFor="portfolio" className="mx-6">
                Personal Website
              </label>
              <br />
              <input
                {...register("portfolio")}
                id="portfolio"
                placeholder="https://your-handle.com"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>

            <div>
              <label htmlFor="twitter" className="mx-6">
                Twitter
              </label>
              <br />
              <input
                {...register("twitter")}
                id="twitter"
                placeholder="https://twitter.com/your-handle"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>

            <div>
              <label htmlFor="linkedIn" className="mx-6">
                LinkedIn
              </label>
              <br />
              <input
                {...register("linkedIn")}
                id="linkedIn"
                placeholder="https://www.linkedin.com/in/your-handle"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>

            <div>
              <label htmlFor="github" className="mx-6">
                Github
              </label>
              <br />
              <input
                {...register("github")}
                id="github"
                placeholder="https://github.com/your-handle"
                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-[#F6F6F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-[#353DFF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
