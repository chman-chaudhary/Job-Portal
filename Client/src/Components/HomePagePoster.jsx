import React, { useEffect, useState } from "react";
import { Button1, Button2 } from "./Button";
import { Link } from "react-router-dom";

export default function HomePagePoster() {
  const [signupBtnStyle, setSignupBtnStyle] = useState("block");

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === ""
    ) {
      setSignupBtnStyle("Block");
    } else {
      setSignupBtnStyle("hidden");
    }
  }, []);

  return (
    <div className="min-h-full min-w-full bg-black pt-[4.5rem] pb-24">
      <div className="mx-6 rounded-[40px] bg-[#353DFF] min-h-[90vh] pt-32 pb-8 flex justify-center">
        <div className="container mx-auto min-w-[1140px]">
          <h1 className="text-7xl custom-fonts text-center font-bold text-white leading-[1.1] mb-1 mt-2 mx-48">
            Accelerate Your Career
          </h1>
          <p className="text-center custom-fonts font-medium text-white my-4 leading-relaxed text-2xl">
            Fuel Your Passion for Innovation.
          </p>
          <div className="flex justify-center items-center space-x-5 mt-12 mb-5">
            <Link to="/signup" className={`${signupBtnStyle}`}>
              <Button1 text="SIGN UP" />
            </Link>
            <Button2 text="Explore Opportunities" />
          </div>
        </div>
      </div>
    </div>
  );
}
