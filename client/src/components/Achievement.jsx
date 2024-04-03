import React from "react";
import "../App.css";
import achievementone from "../assets/achievementone.svg";
import achievementtwo from "../assets/achievementtwo.svg";
import achievementthree from "../assets/achievementthree.svg";

const Achievement = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="text-center mt-5">
          <h1 className="heading-signup text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
            Our Achievements
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-7">
          <div className="flex flex-col items-left mx-3 md:mx-0 lg:mx-2 xl:mx-2 2xl:mx-2">
            <img
              src={achievementone}
              alt="Charlie"
              className="w-auto h-auto md:w-full lg:w-auto rounded-lg"
            />
            <div className="mt-5 text-left">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Charlie</h3>
              <p className="text-base font-normal text-[#6e6e6e]">
                an old street dog with chronic health problems, regained health
                and love thanks to our support, now pampered by a devoted foster
                family for the rest of his days, illustrating our commitment to
                vulnerable animals.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-left mx-3 md:mx-0 lg:mx-2 xl:mx-2 2xl:mx-2">
            <img
              src={achievementtwo}
              alt="Félix"
              className="w-auto h-auto md:w-full lg:w-auto rounded-lg"
            />
            <div className="mt-5 text-left">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Félix</h3>
              <p className="text-base font-normal text-[#6e6e6e]">
                Felix, an abandoned and malnourished kitten, has regained
                vitality and happiness thanks to attentive veterinary care, and
                has found a loving home where he can now fully thrive.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-left mx-3 md:mx-0 lg:mx-2 xl:mx-2 2xl:mx-2">
            <img
              src={achievementthree}
              alt="Bella"
              className="w-auto h-auto md:w-full lg:w-auto rounded-lg"
            />
            <div className="mt-5 text-left">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Bella</h3>
              <p className="text-base font-normal text-[#6e6e6e]">
                Bella, a shy and fearful dog, has been transformed thanks to our
                dedicated team and a careful rehabilitation program, now ready
                to find her forever family with renewed enthusiasm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievement;
