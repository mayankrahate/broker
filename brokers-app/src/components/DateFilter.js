import React, { useState } from "react";

const DateFilter = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateRangeChange = () => {
    // Validate the selected dates
    console.log("datefilter");
    if (startDate && endDate) {
      onDateRangeChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div>
      <h2>Date Filter</h2>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleDateRangeChange}>Apply</button>
    </div>
  );
};

export default DateFilter;
