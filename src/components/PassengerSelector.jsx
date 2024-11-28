import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";

function PassengerSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState({
    adults: 3,
    children: 2,
    infantsInSeat: 1,
    infantsOnLap: 2,
  });

  const increment = (key) => {
    setCounts({ ...counts, [key]: counts[key] + 1 });
  };

  const decrement = (key) => {
    if (counts[key] > 0) {
      setCounts({ ...counts, [key]: counts[key] - 1 });
    }
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        className="flex items-center gap-2 border px-4 py-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUser className="text-gray-600" />
        <span>{Object.values(counts).reduce((a, b) => a + b, 0)}</span>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="p-4 space-y-4">
            {/* Adults */}
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-800">Adults</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("adults")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  -
                </button>
                <span>{counts.adults}</span>
                <button
                  onClick={() => increment("adults")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Children</p>
                <p className="text-gray-400 text-sm">Aged 2-11</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("children")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  -
                </button>
                <span>{counts.children}</span>
                <button
                  onClick={() => increment("children")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants (In Seat) */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Infants</p>
                <p className="text-gray-400 text-sm">In seat</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("infantsInSeat")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  -
                </button>
                <span>{counts.infantsInSeat}</span>
                <button
                  onClick={() => increment("infantsInSeat")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants (On Lap) */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Infants</p>
                <p className="text-gray-400 text-sm">On lap</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("infantsOnLap")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  -
                </button>
                <span>{counts.infantsOnLap}</span>
                <button
                  onClick={() => increment("infantsOnLap")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blue-500 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between border-t p-4">
            <button className="text-blue-500">Cancel</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerSelector;
