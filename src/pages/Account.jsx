import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/e1509908-2ac3-485a-a7d4-26d5fab7f9de/PH-en-20220815-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="signup-bg"
          className="w-full h-[400px] object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]">
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
          </div>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
