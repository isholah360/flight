import React, { useState, useEffect } from "react";
import { IoMdAirplane, IoMdSwap, IoMdCalendar } from "react-icons/io";

const FlightBookingForm = () => {
  const [tripType, setTripType] = useState("one-way");
  const [passengerType, setPassengerType] = useState("adult");
  const [cabinClass, setCabinClass] = useState("economy");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
 


console.log(cabinClass, departureDate, returnDate, tripType)


  const [flightData, setFlightData] = useState(null); 
  const [dflightData, setDflightData] = useState(null); 
  const [origin, setOrigin] = useState(''); // To hold user input for origin
  const [destination, setDestination] = useState(''); // To hold user input for destination
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Debounce delay time (in milliseconds)
  const debounceDelay = 10000; // 500ms delay after the last input

  // State to store the timeout id for debouncing
  const [originTimeout, setOriginTimeout] = useState(null);
  const [destinationTimeout, setDestinationTimeout] = useState(null);

  // Function to fetch data for origin
  const fetchOriginData = async () => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${origin}&locale=en-US`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '1eb268303dmsh28b6688d695fdeep1f2f49jsn2c0a576c148b',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch origin data');
      }
      const data = await response.json();
      setDflightData(data.data[0]); // Store the origin data in state
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to fetch data for destination
  const fetchDestinationData = async () => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${destination}&locale=en-US`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '1eb268303dmsh28b6688d695fdeep1f2f49jsn2c0a576c148b',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch destination data');
      }
      const data = await response.json();
      setFlightData(data.data[0]); // Store the destination data in state
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Debounce function for origin input
  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);

    // Clear previous timeout if there was one
    if (originTimeout) {
      clearTimeout(originTimeout);
    }

    // Set a new timeout to trigger the search after the specified delay
    const timeoutId = setTimeout(() => {
      if (value) {
        fetchOriginData(); // Fetch data after the user stops typing
      }
    }, debounceDelay);

    setOriginTimeout(timeoutId); // Store the timeout ID
  };

  // Debounce function for destination input
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // Clear previous timeout if there was one
    if (destinationTimeout) {
      clearTimeout(destinationTimeout);
    }

    
    const timeoutId = setTimeout(() => {
      if (value) {
        fetchDestinationData(); 
      }
    }, debounceDelay);

    setDestinationTimeout(timeoutId); // Store the timeout ID
  };


  if (loading) {
    return <div>Loading...</div>;
  }

 
  if (error) {
    return <div>Error: {error}</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!dflightData || !flightData || !departureDate) {
      setError("Both origin and destination must be valid.");
      setLoading(false);
      return;
    }

    // Prepare the API request URL
    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${dflightData.skyId}&destinationSkyId=${flightData.skyId}&originEntityId=${dflightData.entityId}&destinationEntityId=${flightData.entityId}&date=${departureDate}&cabinClass=${cabinClass}&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US${
      tripType === "round-trip" ? `&returnDate=${returnDate}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "your-rapidapi-key",
          "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch flight data");
      const data = await response.json();
     
      console.log(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6">
        {/* Trip Type Selection */}
        <div className="mb-6">
          <label htmlFor="tripType" className="text-xs text-gray-800 font-bold block mb-2">
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
              onChange={handleOriginChange} // Use debounced change handler
              className="w-full text-sm py-2 border-none outline-none"
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
              onChange={handleDestinationChange} // Use debounced change handler
              className="w-full text-sm py-2 border-none outline-none"
            />
          </div>
        </div>

        {/* Cabin Class */}
        <div className="mb-6">
          <label htmlFor="cabinClass" className="text-xs text-gray-800 font-bold block mb-2">
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
          <label htmlFor="departureDate" className="text-xs text-gray-800 font-bold block mb-2">
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
            <label htmlFor="returnDate" className="text-xs text-gray-800 font-bold block mb-2">
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
  );
};

export default FlightBookingForm;
