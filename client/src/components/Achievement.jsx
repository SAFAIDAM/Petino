import React from "react";
import "../App.css";
import achievementone from "../assets/achievementone.svg";
import achievementtwo from "../assets/achievementtwo.svg";
import achievementthree from "../assets/achievementthree.svg";
import ArrowPutton from "./ArrowPutton";

const Achievement = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-[-80px] ml-24">
      <ArrowPutton />
      </div>
      
      <div className="mt-5 text-center">
        <h1 className="font-semibold text-black heading-signup md:text-3xl">
          Our Achievements
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-7">
        <div className="flex flex-col items-center mx-3 md:items-left lg:items-center xl:items-center 2xl:items-center">
          <img
            src={achievementone}
            alt="Charlie"
            className="w-full rounded-lg md:w-auto lg:w-auto"
          />
          <div className="mt-5 text-left">
            <h3 className="text-xl font-semibold text-[#6e6e6e]">Charlie</h3>
            <p className="text-base font-normal text-[#6e6e6e] md:w-[380px]">
              an old street dog with chronic health problems, regained health
              and love thanks to our support, now pampered by a devoted foster
              family for the rest of his days, illustrating our commitment to
              vulnerable animals.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mx-3 md:items-left lg:items-center xl:items-center 2xl:items-center">
          <img
            src={achievementtwo}
            alt="Félix"
            className="w-full rounded-lg md:w-auto lg:w-auto"
          />
          <div className="mt-5 text-left">
            <h3 className="text-xl font-semibold text-[#6e6e6e]">Félix</h3>
            <p className="text-base font-normal text-[#6e6e6e] md:w-[380px]">
              Felix, an abandoned and malnourished kitten, has regained vitality
              and happiness thanks to attentive veterinary care, and has found a
              loving home where he can now fully thrive.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mx-3 md:items-left lg:items-center xl:items-center 2xl:items-center">
          <img
            src={achievementthree}
            alt="Bella"
            className="w-full rounded-lg md:w-auto lg:w-auto"
          />
          <div className="mt-5 text-left">
            <h3 className="text-xl font-semibold text-[#6e6e6e]">Bella</h3>
            <p className="text-base font-normal text-[#6e6e6e] md:w-[380px]">
              Bella, a shy and fearful dog, has been transformed thanks to our
              dedicated team and a careful rehabilitation program, now ready to
              find her forever family with renewed enthusiasm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
