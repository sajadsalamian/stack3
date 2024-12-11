import React from "react";

export default function CommonTop({ image, title = "", description = "" }) {
    return (
        <div className="h-[500px] relative">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/70 to-black/50 flex justify-center items-center">
                <div>
                    <h1 className="text-white text-center">{title}</h1>
                    <p className="text-white text-center">{description}</p>
                </div>
            </div>
        </div>
    );
}
