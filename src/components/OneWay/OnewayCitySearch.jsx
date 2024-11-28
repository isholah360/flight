import React, { useState } from "react";
import { IoMdAirplane, IoMdSwap } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

export const OnewayCitySearch = () => {
  const [cities, setCities] = useState([
    { city: "Brisbane", code: "BNE", country: "Australia" },
    { city: "Bali (Denpasar)", code: "DPS", country: "Indonesia" },
    { city: "Barcelona", code: "BCN", country: "Spain" },
    { city: "Bangkok Suvarnabhumi", code: "BKK", country: "Thailand" },
    { city: "Berlin Brandenburg", code: "BER", country: "Germany" },
    { city: "Budapest", code: "BUD", country: "Hungary" },
    { city: "Cairns", code: "CNS", country: "Australia" },
    { city: "Copenhagen", code: "CPH", country: "Denmark" },
    { city: "Cairo", code: "CAI", country: "Egypt" },
  ]);

  const [filteredCitiesFrom, setFilteredCitiesFrom] = useState([]);
  const [filteredCitiesTo, setFilteredCitiesTo] = useState([]);

  const [inputValueFrom, setInputValueFrom] = useState(null);
  const [inputValueTo, setInputValueTo] = useState(null);

  const handleInputChangeFrom = (e) => {
    const input = e.target.value;
    setInputValueFrom(input);
    const filtered = cities.filter((city) =>
      city.city.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredCitiesFrom(filtered);
  };

  const handleCitySelectFrom = (city) => {
    setInputValueFrom(city.city);
    setFilteredCitiesFrom([]);
  };

  const handleInputChangeTo = (e) => {
    const input = e.target.value;
    setInputValueTo(input);
    const filtered = cities.filter((city) =>
      city.city.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredCitiesTo(filtered);
  };

  const handleCitySelectTo = (city) => {
    setInputValueTo(city.city);
    setFilteredCitiesTo([]);
  };

  const handleSwipe = () => {
    const temp = inputValueFrom;
    setInputValueFrom(inputValueTo);
    setInputValueTo(temp);
  };

  return (
    <div className="flex relative items-center">
      <div className=" w-[55%]  flex items-center px-6 bg-white border p-2  rounded-md  ">
        <div className="flex flex-col gap-1 w-[80%]">
          <p className="text-xs text-gray-800 font-bold">From</p>
          <input
            placeholder="Country, City or Airport"
            className="text-xs border-none outline-none"
            value={inputValueFrom}
            onChange={handleInputChangeFrom}
          />

          {filteredCitiesFrom.length > 0 && (
            <ul className="absolute bg-white w-[300px] rounded-md mt-16 ">
              {filteredCitiesFrom.map((city) => (
                <li
                  key={city.code}
                  onClick={() => handleCitySelectFrom(city)}
                  className="m-4"
                >
                  <div className="flex flex-row items-center gap-3 ">
                    <div>
                      <IoMdAirplane />
                    </div>

                    <div>
                      <p className="font-bold text-sm">
                        {city.city} ({city.code})
                      </p>
                      <h1 className="text-xs"> {city.country}</h1>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-[55%]  flex items-center px-6 bg-white border p-2 rounded-md  ">
        <div className="flex flex-col gap-1 w-[80%]">
          <p className="text-xs text-gray-800 font-bold">To</p>
          <input
            placeholder="Country, City or Airport"
            className="text-xs border-none outline-none"
            value={inputValueTo}
            onChange={handleInputChangeTo}
          />
          {filteredCitiesTo.length > 0 && (
            <ul className="absolute bg-white w-[300px] rounded-md mt-16 ">
              {filteredCitiesTo.map((city) => (
                <li
                  key={city.code}
                  onClick={() => handleCitySelectTo(city)}
                  className="m-4"
                >
                  <div className="flex flex-row items-center gap-3 ">
                    <div>
                      <IoMdAirplane />
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        {" "}
                        {city.city} ({city.code})
                      </p>
                      <h1 className="text-xs"> {city.country}</h1>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {inputValueFrom && inputValueTo && (
        <div
          className="  hover:rotate-180 transition-transform duration-300 rounded-full bg-white p-2 absolute border-purple-900 border-2 left-[45%] cursor-pointer  "
          onClick={handleSwipe}
        >
          <IoMdSwap />
        </div>
      )}
    </div>
  );
};

export default OnewayCitySearch;
