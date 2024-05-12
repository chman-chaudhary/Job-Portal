import React from "react";
import { Button3 } from "./Button";

function HorizontalCard() {
  return (
    <>
      <div className="text-white h-screen bg-black custom-fonts pt-10 px-6">
        <div>
          <h2 className="text-6xl text-center font-bold leading-3">
            Our Partners
          </h2>
        </div>
        <div className="flex justify-between pt-8 my-20 gap-20 h-auto">
          <div className="revolution-img w-full h-auto bg-white text-black rounded-3xl max-h-full min-h-full"></div>
          <div className="w-fit">
            <h2 className="text-5xl font-semibold mt-10">
              Revolutionize Your SEO with Us
            </h2>
            <p className="mt-8 text-xl">
              MarsX is a game-changer in the SEO industry, offering innovative
              tools and strategies for startups, solo entrepreneurs, and
              hackers.
            </p>
            {/* <button className="btn-3 custom-fonts mt-10 font-bold mb-8 text-xl w-60 h-14">
              Start Revolution
            </button> */}
            <Button3 text="Start Revolution" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizontalCard;
