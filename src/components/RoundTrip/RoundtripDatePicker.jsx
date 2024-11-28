import React, { useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

const RoundtripDatePicker = () => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (startDate, endDate) => {
    setSelectedDates({ startDate, endDate });
  };

  return (
    <div className=" w-full">
      <RangeDatePicker
        startDate={selectedDates.startDate}
        endDate={selectedDates.endDate}
        onChange={handleDateChange}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date(2100, 0, 1)}
        dateFormat="D MMM YYYY"
        monthFormat="MMMM YYYY"
        startDatePlaceholder="Start Date"
        endDatePlaceholder="End Date"
        disabled={false}
        className="my-date-picker"
        startWeekDay="monday"
      />
    </div>
  );
};

export default RoundtripDatePicker;
