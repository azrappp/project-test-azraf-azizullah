import React from "react";

const Ideas = () => {
  return (
    <>
      <div className="h-72">
        {/* Banner image */}
        <img
          src="/banner.png"
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 z-20">
          <h1 className="text-6xl md:text-8xl font-bold">Ideas</h1>
          <p className="mt-4 text-xl md:text-2xl text-red-50">
            Where all our great things begin
          </p>
        </div>
      </div>
    </>
  );
};

export default Ideas;
