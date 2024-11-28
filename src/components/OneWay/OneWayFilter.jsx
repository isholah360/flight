import React from "react";
import OnewayCitySearch from "./OnewayCitySearch";
import OnewayDatepicker from "./OnewayDatepicker";

const MultiCityFilters = () => {
  return (
    <div>
      <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
        <OnewayCitySearch />
        <OnewayDatepicker />
      </div>
    </div>
  );
};

export default MultiCityFilters;
