import React, { useEffect, useState } from "react";
import { Button1, Button2 } from "./Button";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function HomePagePoster() {

  const [cookies, removeCookie] = useCookies([]);

  const [signupBtnStyle, setSignupBtnStyle] = useState("block");

  useEffect(() => {
    if (!cookies.token || cookies.token === "") {
      setSignupBtnStyle("Block");
    } else {
      setSignupBtnStyle("hidden");
    }
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-black pt-[92px] pb-24">
      <div className="mx-6 rounded-[40px] bg-[#353DFF] min-h-screen pt-32 pb-8 flex justify-center">
        <div className="container mx-auto min-w-[1140px]">
          <h1 className="text-7xl custom-fonts text-center font-bold text-white leading-[1.1] mb-1 mt-2 mx-48">
            Build & Ship Fast with MarsX
          </h1>
          <p className="text-center custom-fonts font-medium text-white my-4 leading-relaxed text-2xl">
            Join the revolution of open-source business.
          </p>
          <div className="flex justify-center items-center space-x-5 mt-12 mb-5">
            {/* { && <Link to="/signup"><Button1 text={btnText} /></Link>} */}
            <Link to="/signup" className={`${signupBtnStyle}`}><Button1 text="SIGN UP" /></Link>
            <Button2 text="LEARN MORE" />
          </div>
        </div>
      </div>
    </div>
  );
}
