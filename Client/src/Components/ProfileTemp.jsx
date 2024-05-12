import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default function ProfileTemp() {
    const params = useParams();

    const [isOwner, setIsOwner] = useState(false);
    const [userData, setUserData] = useState({
        _id: "",
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        country: "",
        region: "",
        city: "",
        about: "",
        img: "",
        heading: "",
        twitter: "",
        github: "",
        linkedIn: "",
        portfolio: "",
    });

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`http://localhost:3000/profile/${params.username}`, { withCredentials: true });
            const { profileInfo, appliedJobs, postedJobs, isOwner } = response.data;
            setIsOwner(isOwner);
            setAppliedJobs(appliedJobs);
            setUserData(profileInfo);
            if (postedJobs) {
                setPostedJobs(postedJobs);
            }
        }
        fetchData();
    }, [])

    return (
        <div className=" text-white custom-fonts">
            <div className='w-full mt-[92px] px-16'>
                <div className="flex justify-between">
                    <img className="h-56 w-56 rounded-full object-cover" src={(userData.img).trim() ? userData.img : "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Profile Picture" />
                    {isOwner && <Link to={`/update/${userData.username}`} className="hover:opacity-50 duration-200 ease-in px-8">
                        <i className="fa-solid fa-pen-to-square text-xl hover:-translate-y-1 duration-200 ease-in"></i>
                    </Link>}
                </div>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className=' mt-4 text-xl font-medium'><i>@{userData.username}</i></h3>
                        <div className=' mt-6'>
                            <h2 className='text-3xl font-medium'>{userData.firstname} {userData.lastname}</h2>
                            <h4 className='text-lg mt-2'>{userData.heading}</h4>
                            <p className='text-lg mt-3'>{userData.city}, {userData.region}, {userData.country}</p>
                        </div>
                    </div>
                    <div className='px-8'>
                        <ul className="flex gap-x-12 justify-end">
                            {userData.twitter && <li className="mb-4">
                                <a href={userData.twitter} target='_blank' className="hover:opacity-50 duration-200 ease-in">
                                    <i className="fa-brands fa-x-twitter text-4xl hover:-translate-y-1 duration-200 ease-in"></i>
                                </a>
                            </li>}
                            {userData.github && <li className="mb-4">
                                <a href={userData.github} target='_blank' className="hover:opacity-50 duration-200 ease-in">
                                    <i className="fa-brands fa-github text-4xl hover:-translate-y-1 duration-200 ease-in"></i>
                                </a>
                            </li>}
                            {userData.linkedIn && <li className="mb-4">
                                <a href={userData.linkedIn} target='_blank' className="hover:opacity-50 duration-200 ease-in">
                                    <i className="fa-solid fa-circle-user text-4xl hover:-translate-y-1 duration-200 ease-in"></i>
                                </a>
                            </li>}
                            {userData.portfolio && <li className="mb-4">
                                <a href={userData.portfolio} target='_blank' className="hover:opacity-50 duration-200 ease-in">
                                    <i className="fa-brands fa-user text-4xl hover:-translate-y-1 duration-200 ease-in"></i>
                                </a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='mx-8 my-12' />
            <div className='mx-16 mt-6 py-2 mb-6'>
                <h2 className='text-4xl font-medium mb-8'>About</h2>
                <pre className="text-xl custom-fonts leading-loose" style={{ whiteSpace: 'pre-wrap' }}>{userData.about.split("\n").map((line, i) => <div key={i}>{line}<br /></div>)}</pre>
            </div>
            {postedJobs.length != 0 ? <><hr className='mx-8 my-12' />
                <div className='mx-16 mt-6 py-2 mb-6'>
                    <h2 className='text-4xl font-medium mb-8'>Posted Jobs</h2>
                    <div className="text-white pb-7 mt-16">
                        <hr />
                        {postedJobs.map((job) => {
                            return (
                                <div key={job._id}>
                                    <Link to={`/job/${job._id}`}>
                                        <div className="flex hover:bg-[#05061A] py-8 px-6">
                                            <div className="custom-fonts container flex justify-between items-center">
                                                <span className='space-x-4'>
                                                    <span className="text-2xl font-bold leading-8">
                                                        {job.role}
                                                    </span>
                                                    <span className="text-[#9B9BA3]">
                                                        {job.companyName}
                                                    </span>
                                                </span>
                                                <span className="text-[#9B9BA3]">
                                                    <i className="fa-solid fa-location-dot text-white"></i>
                                                    &nbsp;&nbsp;
                                                    {job.location}
                                                </span>
                                            </div>
                                        </div>
                                        <hr />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div></> : <></>
            }
            {appliedJobs.length != 0 && isOwner ? <><hr className='mx-8 my-12' />
                <div className='mx-16 mt-6 py-2 mb-6'>
                    <h2 className='text-4xl font-medium mb-8'>Applied Jobs</h2>
                    <div className="text-white pb-7 mt-16">
                        <hr />
                        {appliedJobs.map((job) => {
                            return (
                                <div key={job._id}>
                                    <Link to={`/job/${job._id}`}>
                                        <div className="flex hover:bg-[#05061A] py-8 px-6">
                                            <div className="custom-fonts container flex justify-between items-center">
                                                <span className='space-x-4'>
                                                    <span className="text-2xl font-bold leading-8">
                                                        {job.role}
                                                    </span>
                                                    <span className="text-[#9B9BA3]">
                                                        {job.companyName}
                                                    </span>
                                                </span>
                                                <span className="text-[#9B9BA3]">
                                                    <i className="fa-solid fa-location-dot text-white"></i>
                                                    &nbsp;&nbsp;
                                                    {job.location}
                                                </span>
                                            </div>
                                        </div>
                                        <hr />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div></> : <></>
            }
        </div>
    )
}
