import React from "react";
import { FaSearch } from "react-icons/fa";
import Map from "../assets/Map.webp";

import Joburg from "../assets/Joburg.jpeg";

import London from "../assets/London.jpg";

import Tokyo from "../assets/Tokyo.jpeg";
import Newyork from "../assets/Newyork.jpg";

const Explore = () => {
  const destinations = [
    {
      city: "Johannesburg",
      price: "NGN 2,961,348",
      dates: "Dec 13 — Dec 22",
      details: "2 stops · 54 hr 40 min",
      image: Joburg,
    },
    {
      city: "London",
      dates: "Nov 28 — Dec 4",
      image: London,
    },
    {
      city: "New York",
      dates: "Nov 22 — Nov 28",
      image: Newyork,
    },
    {
      city: "Tokyo",
      dates: "Nov 22 — Nov 28",
      image: Tokyo,
    },
  ];

  return (
    <div className="max-w-8xl py-16 mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="flex items-center space-x-2">
        <h1 className="text-lg text-gray-700">
          Find cheap flights from Ibadan to anywhere
        </h1>
        <FaSearch className="w-5 h-5 text-gray-400" />
      </div>

      {/* City Pills */}
      <div className="flex space-x-2">
        {["Johannesburg", "New York", "London", "Toyko"].map((city) => (
          <button
            key={city}
            className={`px-4 py-1 rounded-full text-sm ${
              city === "Ibadan"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Map Section */}
      <div className="relative h-64 bg-sky-100 rounded-xl overflow-hidden">
        <img src={Map} className="absolute inset-0 w-full h-full" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full text-blue-600 shadow-md hover:shadow-lg transition-shadow">
          Explore destinations
        </button>
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((dest) => (
          <div
            key={dest.city}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={dest.image}
              alt={dest.city}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium">{dest.city}</h3>
              {dest.price && (
                <div className="text-sm font-medium text-gray-900">
                  {dest.price}
                </div>
              )}
              <div className="text-sm text-gray-600">{dest.dates}</div>
              {dest.details && (
                <div className="text-sm text-gray-500">{dest.details}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
