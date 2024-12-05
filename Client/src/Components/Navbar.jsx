import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState("Get Started");

  useEffect(() => {
    if (
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      setBtnText("Get Started");
    } else {
      setBtnText("Logout");
    }
  }, []);

  const handleClick = async () => {
    if (
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      console.log("Navigating");
      navigate("/login");
      setBtnText("Get Started");
    } else {
      localStorage.removeItem("token");
      setBtnText("Get Started");
    }
  };

  const profile = async () => {
    if (
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      navigate("/login");
      setBtnText("Get Started");
    } else {
      try {
        let response = await axios.get(`http://localhost:3000/profile/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const { success, isLogin, username } = response.data;
        if ((isLogin, success)) {
          navigate(`/profile/${username}`);
        }
      } catch (error) {
        console.log("Network Error");
      }
    }
  };

  return (
    <div>
      <nav className="navbar-fonts bg-[rgba(0,0,0,0.1)] w-screen z-50 m-0 fixed top-0 h-[68px] backdrop-blur-md">
        <div className="navbar-fonts flex justify-between items-center py-2 px-3">
          <Link to="/">
            <div className="text-[#353DFF] font-custom text-3xl font-semibold px-4">
              NovaHire
            </div>
          </Link>
          <div>
            <ul className="list-none">
              <li className="inline-block align-middle mr-4">
                <Link
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline
                  navbar-links"
                  to="/jobs"
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Jobs
                  </span>
                </Link>
              </li>
              <li className="inline-block align-middle mr-4">
                <a
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline navbar-links"
                  href="#"
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Saved
                  </span>
                </a>
              </li>
              <li className="inline-block align-middle mr-4">
                <a
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative border-2 font-bold text-center cursor-pointer no-underline navbar-links"
                  href="#"
                  onClick={profile}
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Profile
                  </span>
                </a>
              </li>
              <li className="inline-block align-middle mr-4">
                <div className="block">
                  <ul className="flex flex-row-reverse mx-[7px]">
                    <li className="flex flex-row-reverse -mx-[7px]">
                      <Link
                        onClick={handleClick}
                        className="rounded-full min-w-28 min-h-9 px-6 py-3 bg-[#F6F6F6] text-[#303030] overflow-hidden inline-block relative learn-btn-shadow"
                      >
                        <span className="text-[14px] align-middle font-bold bg-[#F6F6F6]">
                          {btnText}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
