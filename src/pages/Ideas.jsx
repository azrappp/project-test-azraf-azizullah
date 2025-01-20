import React from "react";
import PostList from "./Ideas/PostList";
import { useState, useEffect } from "react";

const Ideas = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="relative h-[50vh] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-gradient-to-t from-black to-transparent"
          style={{
            backgroundImage: "url('/banner-ideas.webp')",
            transform: `translateY(${offsetY * 0.5}px)`,
            clipPath: "polygon(0 0, 100% 0%, 100% 40%, 0 100%)", // Sesuaikan nilai ini
          }}
        ></div>

        {/* Text Content */}
        <div
          className="relative flex flex-col justify-center items-center text-white h-full bg-blend-overlay"
          style={{
            transform: `translateY(${offsetY * 0.3}px)`,
          }}
        >
          <h1 className="text-4xl font-bold">Ideas</h1>
          <p className="text-lg mt-2">Where all our great things begin</p>
        </div>
      </div>

      <PostList />
    </>
  );
};

export default Ideas;
