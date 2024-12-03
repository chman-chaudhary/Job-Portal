import React from "react";
import { Button3 } from "./Button";

function HorizontalCard() {
  return (
    <>
      <div className="text-white h-screen bg-black custom-fonts pt-10 px-6">
        <div>
          <h2 className="text-6xl text-center font-bold leading-3">About Us</h2>
        </div>
        <div className="flex justify-between pt-8 my-20 gap-20 h-auto">
          <div className="revolution-img w-full h-auto bg-white text-black rounded-3xl max-h-full min-h-full"></div>
          <div className="w-fit">
            <h2 className="text-5xl font-semibold mt-10">
              Empowering the Future of Work
            </h2>
            <p className="mt-8 text-xl">
              NovaHire is more than just a job portal. We're a platform that
              empowers individuals to reach their full potential. By connecting
              top talent with leading companies, we're driving innovation and
              shaping the future of work.
            </p>
            <Button3 text="Start Revolution" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizontalCard;
