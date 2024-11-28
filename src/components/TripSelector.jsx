import React from "react";
import { useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TripSelector = () => {
  const [selectedOption, setSelectedOption] = useState("Multi-city");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Round trip", "One way", "Multi-city"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="relative w-40">
      {/* Dropdown Button */}
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span>{selectedOption}</span>
          {isOpen ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                option === selectedOption ? "text-blue-500 font-semibold" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TripSelector;
