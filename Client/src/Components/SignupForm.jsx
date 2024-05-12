import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie";

function SignupForm() {
    const navigate = useNavigate();
    let [responseMessage, setResponseMessage] = useState("");
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {
        if (cookies.token !== "" && cookies.token) {
            return navigate("/");
        }
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let response = await axios.post("http://localhost:3000/signup", data, { withCredentials: true });
            if (response.data.success) {
                navigate("/new");
            } else {
                setResponseMessage(response.data.message);
            }
        } catch (error) {
            console.log("Error in Registering Student:", error);
        }
    };

    return (
        <>
            {isSubmitting && <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
            </div>}
            <div className='pt-20 text-white mx-6 custom-fonts text-center'>
                <h2 className="text-5xl font-bold">Signup</h2>
                <h4 className='text-lg text-red-600 mt-2'>{responseMessage}</h4>
                <div className="px-40 text-left my-8">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center' >
                        <div>
                            <label htmlFor="username" className="mx-6">
                                Username (Unchangeable)
                            </label>
                            <br />
                            <input
                                {...register("username", { required: { value: true, message: "Username is required" }, minLength: { value: 4, message: "username should contain atleast 4 characters." }, maxLength: { value: 18, message: "username should contain atmost 18 characters." } })}
                                id="username"
                                placeholder="janemith"
                                className="border-[1px] w-full border-[#4C4C4C] h-16 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-3 hover:scale-105 hover:border-white duration-300 ease-linear"
                            />
                            {errors.username && <div className='text-rose-600 text-lg -mt-3 mb-1 text-center'>{errors.username.message}</div>}
                        </div>

                        <div>
                            <label htmlFor="email" className="mx-6">
                                Email
                            </label>
                            <br />
                            <input
                                {...register("email", { required: { value: true, message: "Email is required" } })}
                                id="email"
                                placeholder="your@email.com"
                                className="border-[1px] w-full border-[#4C4C4C] h-16 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                            />
                            {errors.email && <div className='text-rose-600 text-lg -mt-3 mb-1 text-center'>{errors.email.message}</div>}
                        </div>

                        <div>
                            <label htmlFor="heading" className="mx-6">
                                Password
                            </label>
                            <br />
                            <input
                                {...register("password", { required: { value: true, message: "Password is required" }, minLength: { value: 4, message: "Password should contain atleast 4 characters." }, maxLength: { value: 18, message: "Password should contain atmost 18 characters." } })}
                                id="password"
                                type='Password'
                                placeholder="Password"
                                className="border-[1px] w-full border-[#4C4C4C] h-16 bg-black p-5 text-lg rounded-full w-5/5 mr-10 mt-2 mb-4 hover:scale-105 hover:border-white duration-300 ease-linear"
                            />
                            {errors.password && <div className='text-rose-600 text-lg -mt-3 mb-1 text-center'>{errors.password.message}</div>}
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-x-6">
                            <button
                                className="custom-fonts bg-[#F6F6F6] text-[#303030] py-5 px-6 min-h-16 min-w-60 rounded-full border-none learn-btn-shadow font-semibold"
                                disabled={isSubmitting}
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupForm
