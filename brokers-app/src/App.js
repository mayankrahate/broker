import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import CommissionTable from "./CommissionTable";

const brokerData = {
  id: 1,
  name: "John Doe",
  companies: [
    {
      name: "Company A",
      commissions: [
        { month: "2023-01", amount: 100, status: "paid" },
        { month: "2023-02", amount: 150, status: "approved" },
        { month: "2023-03", amount: 200, status: "pending" },
      ],
    },
    {
      name: "Company B",
      commissions: [
        { month: "2023-01", amount: 101, status: "paid" },
        { month: "2023-02", amount: 151, status: "approved" },
        { month: "2023-03", amount: 201, status: "pending" },
      ],
    },
    {
      name: "Company C",
      commissions: [
        { month: "2023-01", amount: 101, status: "paid" },
        { month: "2023-02", amount: 151, status: "approved" },
        { month: "2023-03", amount: 201, status: "pending" },
      ],
    },
  ],
};

const App = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredCommissions = brokerData.companies.reduce(
    (filtered, company) => {
      const filteredCompany = {
        name: company.name,
        commissions: company.commissions.filter((commission) => {
          if (
            selectedStatus !== "all" &&
            commission.status !== selectedStatus
          ) {
            return false;
          }

          if (
            startDate &&
            commission.month < startDate.toISOString().slice(0, 7)
          ) {
            return false;
          }

          if (endDate && commission.month > endDate.toISOString().slice(0, 7)) {
            return false;
          }

          return true;
        }),
      };
      if (filteredCompany.commissions.length > 0) {
        filtered.push(filteredCompany);
      }
      return filtered;
    },
    []
  );

  const totalCommissionPaid = filteredCommissions.reduce((total, company) => {
    const companyTotal = company.commissions.reduce(
      (companyTotal, commission) => {
        if (commission.status === "paid") {
          companyTotal += commission.amount;
        }
        return companyTotal;
      },
      0
    );
    return total + companyTotal;
  }, 0);

  return (
    <div className="app">
      <header className="navbar">
        <span className="navbar-brand">Broker</span>
      </header>

      <div className="container">
        <div className="filters">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>

          <label htmlFor="startDate">Start Month:</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            placeholderText="Select Start Month"
          />

          <label htmlFor="endDate">End Month:</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            placeholderText="Select End Month"
          />
        </div>

        {filteredCommissions.length > 0 ? (
          <>
            <CommissionTable commissions={filteredCommissions} />

            <div className="total-commission">
              <p>Total Commission Paid: {totalCommissionPaid}</p>
            </div>
          </>
        ) : (
          <div className="no-data-message">
            No data available within the selected filters.
          </div>
        )}
      </div>

      <footer className="footer">
        <p className="footer-brand">Broker</p>
        <nav className="footer-nav">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
};

export default App;
