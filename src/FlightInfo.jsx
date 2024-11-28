import React from 'react';
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
const FlightInfo = ({ flightDetails, carrierIndex }) => {

  console.log(flightDetails)
  return (
    <div>
      {/* Carrier info */}
      {flightDetails?.carriers?.[carrierIndex] && (
        <div className="flightdet w-[100%] flex items-center gap-4 my-5">
          {/* Carrier name for index 2 */}
          <div>
            {flightDetails.carriers[carrierIndex]?.name && (
              <div>{flightDetails.carriers[carrierIndex].name}</div>
            )}
            {console.log(flightDetails)}
          </div>

          {/* Origin and Destination */}
          <div className="ml-10 gap-8" style={{ display: "flex" }}>
            {/* Origin */}
            <div className="origin">
              {flightDetails?.airports?.[0] && (
                <div className="airport-container">
                  <h3>{flightDetails.airports[0]?.city}</h3>
                  {flightDetails.airports[0]?.airports.map((airport) => (
                    <div key={airport.id} className="airport-card" style={{ display: "flex" }}>
                      <div className="airport-id">{airport.id}</div>-
                      <div className="airport-name">{airport.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="destination">
              {flightDetails?.airports?.[1] && (
                <div className="airport-container">
                  <h3>{flightDetails.airports[1]?.city}</h3>
                  {flightDetails.airports[1]?.airports.map((airport) => (
                    <div key={airport.id} className="airport-card" style={{ display: "flex" }}>
                      <div className="airport-id">{airport.id}</div>-
                      <div className="airport-name">{airport.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="durations ml-10">
            <div>Duration:</div>
            <div className="dur flex gap-2 ml-2">
              <div>min: {flightDetails?.duration?.min}min</div>
              <div>max: {flightDetails?.duration?.max}min</div>
            </div>
          </div>

          {/* Price */}
          <div className="cost ml-10">
            <div>Price:</div>
            <div className="ml-4">
              {flightDetails?.stopPrices?.direct?.formattedPrice}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightInfo;
