import axios from 'axios'
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function UpdateUserInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const reader = new FileReader();
    const [cookies, removeCookie] = useCookies([]);

    const [userData, setUserData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        img: "",
        heading: "",
        city: "",
        region: "",
        country: "",
        about: "",
        github: "",
        twitter: "",
        linkedIn: "",
        portfolio: "",
    })

    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (cookies.token === "" || !cookies.token) {
            return navigate("/login");
        }
        const fetchData = async () => {
            const response = await axios.get(`https://recruitment-agency-be.onrender.com/profile/${params.username}`);
            setUserData(response.data.profileInfo);
            setImage(response.data.profileInfo.img);
        }
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('firstname', userData.firstname);
        formData.append('lastname', userData.lastname);
        formData.append('img', image);
        formData.append('heading', userData.heading);
        formData.append('city', userData.city);
        formData.append('region', userData.region);
        formData.append('country', userData.country);
        formData.append('about', userData.about);
        formData.append('github', userData.github);
        formData.append('twitter', userData.twitter);
        formData.append('linkedIn', userData.linkedIn);
        formData.append('portfolio', userData.portfolio);

        const validationErrors = validateForm(userData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log(validationErrors);
        try {
            let response = await axios.put(`job-portal-backend-phi.vercel.app/profile/${params.username}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }, withCredentials: true,
            },);
            const { isLogin, success, username } = response.data;
            if (isLogin && success) {
                navigate(`/profile/${username}`);
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log("Error while updating:", error);
        }
    }

    const handleChange = (event) => {
        setUserData((prev) => { return { ...prev, [event.target.name]: event.target.value } });
        setErrors({});
    }

    const imageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file && file.type.startsWith("image/")) {
            reader.onload = (e) => {
                const imageURL = e.target.result;
                const currImg = document.querySelector("img[name='currImg']");
                currImg.src = imageURL;
            }
            reader.readAsDataURL(file);
        }
    }

    const validateForm = (formData) => {
        const errors = {};

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        // Required field validation
        if (!formData.firstname) {
            errors.firstname = 'First name is required';
        }
        if (!formData.country) {
            errors.country = 'Country is required';
        }
        if (!formData.city) {
            errors.city = 'City is required';
        }
        if (!formData.region) {
            errors.region = 'State/Province is required';
        }

        // You can add more validation rules here for other fields

        return errors;
    };

    return (
        <div className='pt-[92px] text-white mx-6 custom-fonts text-center'>
            <h2 className="text-6xl font-bold">Update Your Information</h2>
            <h3 className="text-xl mt-8">
                Discover New Opportunities with MarsX
            </h3>
            <div className="px-40 text-left my-20">
                <form onSubmit={handleSubmit} noValidate className='group'>
                    <div>
                        <label htmlFor="email" className="mx-6">
                            Email
                            <br />
                            <input
                                id="email"
                                name='email'
                                placeholder="your@email.com"
                                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear  "
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="flex space-x-5">
                        <div className="w-full">
                            <label htmlFor="firstname" className="mx-6">
                                First name
                                <br />
                                <input
                                    type="text"
                                    name='firstname'
                                    placeholder='James'
                                    className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                                    value={userData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastname" className="mx-6">
                                Last name
                                <br />
                                <input
                                    type="text"
                                    name='lastname'
                                    placeholder='Smith'
                                    id="lastname"
                                    className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                                    value={userData.lastname}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                        </div>
                    </div>

                    <div>
                        <label className='mx-6'>Profile Picture</label>
                        <div className='space-x-5 flex items-center mt-4 mb-8 px-3'>
                            <div className="shrink-0">
                                <img className="h-32 w-32 object-cover rounded-full" name="currImg" src={(userData.img).trim() || userData.img ? userData.img : "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Current profile photo" />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" name='img' className="block w-full text-sm text-slate-300
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-[#353DFF]
                                    hover:file:bg-violet-100"
                                    onChange={imageChange}
                                    accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="heading" className="mx-6">
                            Heading
                            <br />
                            <input
                                id="heading"
                                name='heading'
                                placeholder="About you in a line"
                                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                                value={userData.heading}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="country" className="mx-6">
                            Country
                            <br />
                            <input
                                id="country"
                                name='country'
                                placeholder="India"
                                value={userData.country}
                                onChange={handleChange}
                                required
                                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                            />
                        </label>
                    </div>

                    <div className="flex space-x-5">
                        <div className="w-full">
                            <label htmlFor="city" className="mx-6">
                                City
                                <br />
                                <input
                                    type="text"
                                    name='city'
                                    placeholder='Faridabad'
                                    id="city"
                                    value={userData.city}
                                    required
                                    onChange={handleChange}
                                    className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="region" className="mx-6">
                                State / Province
                                <br />
                                <input
                                    type="text"
                                    name='region'
                                    placeholder='Haryana'
                                    id="region"
                                    value={userData.region}
                                    onChange={handleChange}
                                    required
                                    className="border-[1px] border-[#4C4C4C] bg-black p-5 h-20 text-lg rounded-full w-5/5 w-full mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                                />

                            </label>
                            <br />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="about" className="mx-6">
                            About
                            <br />
                            <textarea
                                id="about"
                                name='about'
                                rows="5"
                                placeholder="Enter text here"
                                value={userData.about}
                                onChange={handleChange}
                                className="border-[1px] w-full border-[#4C4C4C] bg-black p-5 text-lg rounded-[32px] w-5/5 mr-10 mt-2 mb-3 hover:scale-105 hover:border-white duration-300 ease-linear "
                            ></textarea>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="twitter" className="mx-6">
                            Twitter
                            <br />
                            <input
                                name='twitter'
                                id="twitter"
                                value={userData.twitter}
                                onChange={handleChange}
                                placeholder="https://twitter.com/your-handle"
                                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="linkedIn" className="mx-6">
                            LinkedIn
                            <br />
                            <input
                                name='linkedIn'
                                id="linkedIn"
                                value={userData.linkedIn}
                                onChange={handleChange}
                                placeholder="https://www.linkedin.com/in/your-handle"
                                className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="github" className="mx-6">
                            Github
                        </label>
                        <br />
                        <input
                            name="github"
                            id="github"
                            value={userData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/your-handle"
                            className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                        />
                    </div>

                    <div>
                        <label htmlFor="portfolio" className="mx-6">
                            Personal Website
                        </label>
                        <br />
                        <input
                            name='portfolio'
                            id="portfolio"
                            value={userData.portfolio}
                            onChange={handleChange}
                            placeholder="https://your-handle.com"
                            className="border-[1px] w-full border-[#4C4C4C] h-20 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear "
                        />
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 mb-4 text-red-500 flex justify-end">
                            {Object.values(errors).map((error) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link to={`/profile/${params.username}`}>
                            <button type="button" className="text-sm font-semibold leading-6 text-[#F6F6F6]">
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-[#353DFF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={Object.keys(errors).length > 0}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}