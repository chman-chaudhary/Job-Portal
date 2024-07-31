import React, { useEffect, useState } from "react";
import { Button1, Button2 } from "./Button";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function JobTemp() {
    const params = useParams();
    const navigate = useNavigate();

    const [cookies, removeCookie] = useCookies([]);
    const [applyBtnTxt, setApplyBtnTxt] = useState("APPLY");
    const [isOwner, setIsOwner] = useState(false);
    const [applicants, setApplicants] = useState([]);

    const [job, setJob] = useState({
        _id: "",
        companyURL: "",
        companyName: "",
        role: "",
        type: [],
        loaction: "",
        country: "",
        minSalary: 0,
        maxSalary: 0,
        aboutJob: "",
        qualification: "",
    });

    const [employerUsername, setEmployerUsername] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [employerImg, setEmployerImg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`job-portal-backend-phi.vercel.app/job/${params.id}`, { withCredentials: true });
            const { img, username, employerName, isApplicant, isOwner, applicants } = response.data;
            if (isApplicant) {
                setApplyBtnTxt("APPLIED");
            }
            setIsOwner(isOwner);
            setApplicants(applicants);
            setEmployerImg(img);
            setEmployerName(employerName);
            setEmployerUsername(username);
            setJob(response.data.job);
        }
        fetchData();
    }, [])

    const applyJob = () => {
        const sendApplyRqst = async () => {
            let response = await axios.post(`job-portal-backend-phi.vercel.app/job/${job._id}`, {}, { withCredentials: true });
            if (response.data.success) {
                setApplyBtnTxt("APPLIED");
            }
        }
        if (cookies.token && cookies.token !== "undefined") {
            sendApplyRqst();
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="bg-black text-white custom-fonts pt-[92px]">
            <div className="bg-[#353DFF] rounded-[40px] pt-20 pb-20 m-6">
                <div className="container mx-auto min-w-[1140px]">
                    <a href={`${job.companyURL}`} target="_blank"><h2 className="text-center text-2xl">{job.companyName}</h2></a>
                    <h1 className="text-6xl custom-fonts text-center font-bold text-white leading-[1.1] mb-1 mt-2 mx-48">
                        {job.role}
                    </h1>
                    <div className="flex justify-evenly mt-7 items-center">
                        <div className="bg-[rgba(200,200,200,0.2)] text-white px-4 py-2 w-fit rounded-full text-sm">
                            <i className="fa-solid fa-globe"></i>&nbsp;{job.type.map((jobType, i) => <span key={i}>{jobType}, </span>)} {job.country}
                        </div>
                        <div className="bg-[rgba(200,200,200,0.2)] text-white px-4 py-2 w-fit rounded-full text-sm">
                            <i className="fa-regular fa-money-bill-1"></i>
                            &nbsp;&#8377;&nbsp;{job.minSalary} - &#8377;&nbsp;{job.maxSalary}&nbsp;Yearly
                        </div>
                    </div>
                    <div className="flex justify-center items-center space-x-5 mt-12 mb-2">
                        {isOwner ? <Button2 text="EDIT" /> : <>
                            <div onClick={applyJob}><Button1 text={applyBtnTxt} /></div>
                            <Button2 text="SAVE" />
                        </>}
                    </div>
                </div>
            </div>

            <div className="px-10 py-8 ">
                <div className="about mx-6 px-20 pb-2">
                    <h2 className="font-medium text-xl my-3">Posted By:</h2>
                </div>
                <Link to={`/profile/${employerUsername}`}>
                    <div className="mx-6 px-20 flex items-center hover:bg-[#05061A] py-3">
                        <img className="h-28 w-28 rounded-full object-cover" src={(employerImg).trim() ? employerImg : "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Profile Picture" />
                        <h2 className="font-medium text-4xl ml-16">{employerName}</h2>
                    </div>
                </Link>
                <hr />
            </div>

            <div className="px-10 py-8">
                <div className="about mx-6 px-20 pb-8">
                    <h2 className="font-medium text-4xl my-6">Job Description</h2>
                    <pre className="text-[19px] custom-fonts leading-loose" style={{ whiteSpace: 'pre-wrap' }}>{job.aboutJob.split("\n").map((line, i) => <div key={i}>{line}<br /></div>)}</pre>
                </div>
                <hr />
            </div>
            <div className="px-10">
                <div className="about mx-6 px-20">
                    <h2 className="font-medium text-4xl my-8">Qualifications</h2>
                    <pre className="text-[19px] custom-fonts leading-loose" style={{ whiteSpace: 'pre-wrap' }}>{job.qualification.split("\n").map((line, i) => <div key={i}>{line}<br /></div>)}</pre>
                </div>
                <div className="px-20">
                    <button className="px-[75px] py-3 border border-white rounded-lg bg-[#F6F6F6] text-black hover:bg-black hover:text-white font-medium my-8" onClick={applyJob}>
                        {applyBtnTxt}
                    </button>
                    <span className="ml-5">We bring 🍀 to our team</span>
                </div>
            </div>
            {isOwner && <div className="px-10 py-8 ">
                <hr />
                <div className="about mx-6 px-20 pb-2">
                    <h2 className="font-medium text-xl my-3">Applicants:</h2>
                </div>
                {applicants.map((applicant, i) => {
                    return (<Link key={i} to={`/profile/${applicant.username}`}>
                        <div className="mx-6 px-20 flex items-center hover:bg-[#05061A] py-3">
                            <img className="h-28 w-28 rounded-full object-cover" src={(applicant.img).trim() ? applicant.img : "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"} alt="Profile Picture" />
                            <h2 className="font-medium text-4xl ml-16">{applicant.firstname + " " + applicant.lastname}</h2>
                        </div>
                        <hr />
                    </Link>)
                })}
            </div>}
        </div>
    );
}
