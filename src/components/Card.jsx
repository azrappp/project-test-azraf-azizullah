import React from "react";

const Card = ({ imageUrl, formattedDate, title, excerpt, onError }) => {
  return (
    <div className="card bg-white rounded-sm shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={onError}
      />
      <div className="flex flex-col justify-between px-4 py-5 h-40">
        <p className="text-sm text-gray-400">{formattedDate}</p>
        <h3 className="text-lg font-semibold line-clamp-3">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{excerpt}</p>
      </div>
    </div>
  );
};

export default Card;
