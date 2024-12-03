import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black">
      <div className="bg-[#353DFF] rounded-tl-[40px] rounded-tr-[40px] pt-20 flex px-6 w-full justify-between">
        <div className="custom-fonts w-1/5 min-w-[200px] pr-6 mb-12 text-white">
          <a href="#" className="text-5xl">
            NovaHire
          </a>
          <div>
            <p className="text-[#AEB1FF] text-xs">
              &copy; 2024 All rights reserved.
            </p>
          </div>
        </div>
        <div className="flex space-x-0 lg:space-x-20 justify-end items-start">
          <div className="custom-fonts w-1/5 min-w-[200px] pr-6 mb-12 text-white">
            <h3 className="mb-5 font-bold leading-snug text-xl">Company</h3>
            <ul>
              <li className="mb-4">
                <a href="#" className="hover:opacity-50 duration-200 ease-in">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:opacity-50 duration-200 ease-in">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-fonts w-1/5 min-w-[200px] pr-6 mb-12 text-white">
            <h3 className="mb-5 font-bold leading-snug text-xl">Resources</h3>
            <ul>
              <li className="mb-4">
                <a href="#" className="hover:opacity-50 duration-200 ease-in">
                  Blog
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:opacity-50 duration-200 ease-in">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-fonts w-1/5 min-w-[200px] pr-6 mb-12 text-white">
            <h3 className="mb-5 font-bold leading-snug text-xl">Follow us</h3>
            <div>
              <ul className="flex gap-x-4">
                <li className="mb-4">
                  <a
                    href="https://twitter.com/chman_chaudhary"
                    target="_blank"
                    className="hover:opacity-50 duration-200 ease-in"
                  >
                    <i className="fa-brands fa-x-twitter text-2xl hover:-translate-y-1 duration-200 ease-in"></i>
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/chman-chaudhary"
                    target="_blank"
                    className="hover:opacity-50 duration-200 ease-in"
                  >
                    <i className="fa-brands fa-github text-2xl hover:-translate-y-1 duration-200 ease-in"></i>
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/chman-chaudhary"
                    target="_blank"
                    className="hover:opacity-50 duration-200 ease-in"
                  >
                    <i className="fa-brands fa-linkedin text-2xl hover:-translate-y-1 duration-200 ease-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bg-[#353DFF] p-6 flex items-center justify-between">
        <Link to="/signup">
          <button className="custom-fonts bg-[#F6F6F6] text-[#303030] py-5 px-6 min-h-16 min-w-60 rounded-full border-none learn-btn-shadow font-semibold">
            Join Community
          </button>
        </Link>
        <div>
          <ul className="flex gap-x-4">
            <li>
              <a
                href="#"
                className="text-opacity-50 text-white custom-fonts hover:text-opacity-100 duration-200 ease-in"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-opacity-50 text-white custom-fonts hover:text-opacity-100 duration-200 ease-in"
              >
                Phone
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
