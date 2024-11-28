import React from "react";
import RoundtripCitySearch from "./RoundtripCitySearch";
import RoundtripDatePicker from "./RoundtripDatePicker";

const MultiCityFilters = () => {
  return (
    <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
      <RoundtripCitySearch />
      <RoundtripDatePicker />
    </div>
  );
};

export default MultiCityFilters;
