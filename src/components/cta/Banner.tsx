import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div
      className="block max-w-7xl mx-auto bg-blue-dark md:flex justify-center items-center  p-8 md:p-20 rounded-xl my-8"
      style={{
        backgroundImage: "url('/background1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white", // Set text color to white for contrast
      }}
    >
      <div className="flex-grow">
        <p className="w-1/1 text-2xl text-center md:text-left md:text-4xl text-blue-dark font-Organo">
          What are you waiting for? Choose your team now!
        </p>
      </div>
      <div className="ml-0 md:ml-4 mx-auto mt-4 w-44 md:w-w-56 md:m-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href="/show-posts"
            className="font-dm-sans font-bold bg-blue-dark text-white px-2 py-6 rounded-md border-[#060047] border hover:text-pink-light hover:shadow-lg hover:shadow-blue-dark"
          >
            Choose your team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
