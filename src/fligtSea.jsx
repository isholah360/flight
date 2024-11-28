import React, { useState } from "react";
import { IoMdSwap } from "react-icons/io";
import FlightInfo from "./FlightInfo";

const mdata = {
  airports: [
    {
      city: "Abuja",
      airports: [{ id: "ABV", entityId: "128668198", name: "Abuja" }],
    },
    {
      city: "Lagos",
      airports: [{ id: "LOS", entityId: "95673335", name: "Lagos" }],
    },
  ],
  carriers: [
    {
      id: -31079,
      alternateId: "A_",
      logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/A_.png",
      name: "Air Peace",
    },
    {
      id: -30686,
      alternateId: "85",
      logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/85.png",
      name: "United Nigeria Airlines",
    },
  ],
  duration: { min: 65, max: 80, multiCityMin: 65, multiCityMax: 80 },
  stopPrices: {
    direct: { formattedPrice: "$39", stopPrice: "None" },
  },
};

console.log();

const FlightSearchForms = () => {
  const [tripType, setTripType] = useState("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [dflightData, setDflightData] = useState(null);
  const [flightDetails, setFlightDetails] = useState([]);

  const debounceDelay = 1000;

  const [originTimeout, setOriginTimeout] = useState(null);
  const [destinationTimeout, setDestinationTimeout] = useState(null);

  const fetchOriginData = async () => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${origin}&locale=en-US`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1eb268303dmsh28b6688d695fdeep1f2f49jsn2c0a576c148b",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch origin data");
      }
      const data = await response.json();
      setDflightData(data.data[0]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchDestinationData = async () => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${destination}&locale=en-US`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1eb268303dmsh28b6688d695fdeep1f2f49jsn2c0a576c148b",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch destination data");
      }
      const data = await response.json();
      setFlightData(data.data[0]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);

    if (originTimeout) {
      clearTimeout(originTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (value) {
        fetchOriginData();
      }
    }, debounceDelay);

    setOriginTimeout(timeoutId);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    if (destinationTimeout) {
      clearTimeout(destinationTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (value) {
        fetchDestinationData();
      }
    }, debounceDelay);

    setDestinationTimeout(timeoutId);
  };

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  console.log(dflightData, flightData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!dflightData || !flightData || !departureDate) {
      setError("Both origin and destination must be valid.");
      setLoading(false);
      return;
    }

    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${
      dflightData.skyId
    }&destinationSkyId=${flightData.skyId}&originEntityId=${
      dflightData.entityId
    }&destinationEntityId=${
      flightData.entityId
    }&date=${departureDate}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US${
      tripType === "round-trip" ? `&returnDate=${returnDate}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1eb268303dmsh28b6688d695fdeep1f2f49jsn2c0a576c148b",
          "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch flight data");
      const data = await response.json();
      setFlightDetails(data.data.filterStats);
      console.log(data.data.filterStats);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  console.log(flightDetails);
  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          {/* Trip Type Selection */}
          <div className="mb-6">
            <label
              htmlFor="tripType"
              className="text-xs text-gray-800 font-bold block mb-2"
            >
              Trip Type
            </label>
            <select
              id="tripType"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="one-way">One-way</option>
              <option value="round-trip">Round-trip</option>
              <option value="multi-city">Multi-city</option>
            </select>
          </div>

          {/* Origin and Destination */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="From (City, Country or Airport)"
                value={origin}
                onChange={handleOriginChange}
                className="w-1/2 text-sm py-2 border-none outline-none"
              />
            </div>
            <button
              onClick={handleSwap}
              className="absolute left-1/2 -translate-x-1/2 z-10 p-2 bg-white border-2 border-blue-600 rounded-full hover:rotate-180 transition-transform duration-300"
            >
              <IoMdSwap size={20} className="text-blue-600" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="To (City, Country or Airport)"
                value={destination}
                onChange={handleDestinationChange}
                className="w-1/2 text-sm py-2 px-4 ml-2 border-none outline-none"
              />
            </div>
          </div>

          {/* Cabin Class */}
          <div className="mb-6">
            <label
              htmlFor="cabinClass"
              className="text-xs text-gray-800 font-bold block mb-2"
            >
              Cabin Class
            </label>
            <select
              id="cabinClass"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Departure Date */}
          <div className="mb-6">
            <label
              htmlFor="departureDate"
              className="text-xs text-gray-800 font-bold block mb-2"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full py-2 px-4 text-sm border border-gray-300 rounded-md"
            />
          </div>

          {/* Return Date (for round-trip) */}
          {tripType === "round-trip" && (
            <div className="mb-6">
              <label
                htmlFor="returnDate"
                className="text-xs text-gray-800 font-bold block mb-2"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full py-2 px-4 text-sm border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "Search Flights"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600 text-center">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md my-5">
        {flightDetails != "" ? (
          <div>
            <div className="flightdet w-[100%] flex items-center gap-4">
              <div>
                {flightDetails.carriers.map((care, index) =>
                  index === 0 ? <div key={index}>
                      <div key={index}>
                            <div className="flex">
                              <div className="h-6 w-6 mr-2">
                                <img src={`${care.logoUrl}`} alt="" />
                              </div>
                              <div>{care.name}</div>
                            </div>
                          </div>
                  </div> : ""
                )}
              </div>
              <div style={{ display: "flex" }} className="ml-10 gap-8">
                <div className="origin">
                  {flightDetails.airports.map((cityData, cityIndex) =>
                    cityIndex === 0 ? (
                      <div key={cityIndex} className="airport-container">
                        <h3>{cityData.city}</h3>
                        {cityData.airports.map((airport) => (
                          <div
                            key={airport.id}
                            className="airport-card"
                            style={{ display: "flex" }}
                          >
                            <div className="airport-id">{airport.id}</div>-
                            <div className="airport-name">{airport.name}</div>
                          </div>
                        ))}
                      </div>
                    ) : null
                  )}
                </div>

                <div className="destination">
                  {flightDetails.airports.map((cityData, cityIndex) =>
                    cityIndex === 1 ? (
                      <div key={cityIndex} className="airport-container">
                        <h3>{cityData.city}</h3>
                        {cityData.airports.map((airport) => (
                          <div
                            key={airport.id}
                            className="airport-card"
                            style={{ display: "flex" }}
                          >
                            <div className="airport-id"> {airport.id}</div>-
                            <div className="airport-name">{airport.name}</div>
                          </div>
                        ))}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
              <div className="durations ml-10">
                Duration:
                <div className="dur flex gap-2 ml-2">
                  <div>min: {flightDetails.duration.min}min</div>
                  <div>max: {flightDetails.duration.max}min</div>
                </div>
              </div>

              <div className="cost ml-10">
                <div>Price:</div>
                <div className="ml-4">
                  {flightDetails.stopPrices.direct.formattedPrice}
                </div>
              </div>
            </div>
            <div>
              {flightDetails.carriers.map((care, index) =>
                index === 1 ? (
                  <div className="flightdet w-[100%] flex items-center gap-4 my-5">
                    <div>
                      {flightDetails.carriers.map((care, index) =>
                        index === 1 ? <div key={index}>
                           <div className="flex">
                              <div className="h-6 w-6 mr-2">
                                <img src={`${care.logoUrl}`} alt="" />
                              </div>
                              <div>{care.name}</div>
                            </div>
                        </div> : ""
                      )}
                    </div>
                    <div style={{ display: "flex" }} className="ml-10 gap-8">
                      <div className="origin">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 0 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">{airport.id}</div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>

                      <div className="destination">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 1 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">
                                    {" "}
                                    {airport.id}
                                  </div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                    <div className="durations ml-10">
                      Duration:
                      <div className="dur flex gap-2 ml-2">
                        <div>min: {flightDetails.duration.min}min</div>
                        <div>max: {flightDetails.duration.max}min</div>
                      </div>
                    </div>

                    <div className="cost ml-10">
                      <div>Price:</div>
                      <div className="ml-4">
                        {flightDetails.stopPrices.direct.formattedPrice}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            <div>
              {flightDetails.carriers.map((care, index) =>
                index === 3 ? (
                  <div className="flightdet w-[100%] flex items-center gap-4 my-5">
                    <div>
                      {flightDetails.carriers.map((care, index) =>
                        index === 3 ? (
                          <div key={index}>
                             <div className="flex">
                              <div className="h-6 w-6 mr-2">
                                <img src={`${care.logoUrl}`} alt="" />
                              </div>
                              <div>{care.name}</div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                    <div style={{ display: "flex" }} className="ml-10 gap-8">
                      <div className="origin">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 0 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">{airport.id}</div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>

                      <div className="destination">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 1 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">
                                    {" "}
                                    {airport.id}
                                  </div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                    <div className="durations ml-10">
                      Duration:
                      <div className="dur flex gap-2 ml-2">
                        <div>min: {flightDetails.duration.min}min</div>
                        <div>max: {flightDetails.duration.max}min</div>
                      </div>
                    </div>

                    <div className="cost ml-10">
                      <div>Price:</div>
                      <div className="ml-4">
                        {flightDetails.stopPrices.direct.formattedPrice}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            <div>
              {flightDetails.carriers.map((care, index) =>
                index === 2 ? (
                  <div className="flightdet w-[100%] flex items-center gap-4 my-5">
                    <div>
                      {flightDetails.carriers.map((care, index) =>
                        index === 2 ? (
                          <div key={index}>
                             <div className="flex">
                              <div className="h-6 w-6 mr-2">
                                <img src={`${care.logoUrl}`} alt="" />
                              </div>
                              <div>{care.name}</div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                    <div style={{ display: "flex" }} className="ml-10 gap-8">
                      <div className="origin">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 0 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">{airport.id}</div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>

                      <div className="destination">
                        {flightDetails.airports.map((cityData, cityIndex) =>
                          cityIndex === 1 ? (
                            <div key={cityIndex} className="airport-container">
                              <h3>{cityData.city}</h3>
                              {cityData.airports.map((airport) => (
                                <div
                                  key={airport.id}
                                  className="airport-card"
                                  style={{ display: "flex" }}
                                >
                                  <div className="airport-id">
                                    {" "}
                                    {airport.id}
                                  </div>
                                  -
                                  <div className="airport-name">
                                    {airport.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                    <div className="durations ml-10">
                      Duration:
                      <div className="dur flex gap-2 ml-2">
                        <div>min: {flightDetails.duration.min}min</div>
                        <div>max: {flightDetails.duration.max}min</div>
                      </div>
                    </div>

                    <div className="cost ml-10">
                      <div>Price:</div>
                      <div className="ml-4">
                        {flightDetails.stopPrices.direct.formattedPrice}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default FlightSearchForms;
