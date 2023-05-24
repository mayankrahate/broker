import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faFileExport } from "@fortawesome/free-solid-svg-icons";

const brokerData = {
  id: 1,
  name: "John Doe",
  companies: Array.from({ length: 65 }, (_, index) => ({
    name: ["TCS", "IBM", "Apple"][index % 3],
    commissions: Array.from({ length: 1 }, (_, commissionIndex) => {
      const coverageTypes = ["Life", "Dental", "Disability"];
      const coverageType =
        coverageTypes[Math.floor(Math.random() * coverageTypes.length)];
      const premiumAmount = Math.floor(Math.random() * 10000 + 500);
      const commissionPercentage = Math.floor(Math.random() * 5 + 1);
      const commissionAmount = (premiumAmount * commissionPercentage) / 100;

      const currentDate = new Date();
      const billDate = new Date();
      billDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 180));

      return {
        customer: ["TCS", "IBM", "Apple"][index % 3],
        customerNumber: ["35435", "56654", "46456"][index % 3],
        billDate: billDate.toISOString().split("T")[0],
        coverageType,
        premiumAmount,
        splitPercentage: 100,
        commissionPercentage,
        commissionAmount,
        status: ["Paid", "Pending"][Math.floor(Math.random() * 2)],
      };
    }),
  })),
};

const ITEMS_PER_PAGE = 10;

function formatCurrency(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const CommissionTable = ({ commissions }) => {
  return (
    <table className="commission-table box effect8">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Customer Number</th>
          <th>Bill Date</th>
          <th>Coverage Type</th>
          <th>Premium Amount</th>
          <th>Split %</th>
          <th>Commission %</th>
          <th>Commission Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {commissions.map((commission, index) => (
          <tr key={index}>
            <td>{commission.customer}</td>
            <td>{commission.customerNumber}</td>
            <td>{commission.billDate}</td>
            <td>{commission.coverageType}</td>
            <td>${commission.premiumAmount.toFixed(2)}</td>
            <td>{commission.splitPercentage}%</td>
            <td>{commission.commissionPercentage}%</td>
            <td>${commission.commissionAmount.toFixed(2)}</td>
            <td>{commission.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCoverageType, setSelectedCoverageType] = useState("");
  const [billStartDate, setBillStartDate] = useState(null);
  const [billEndDate, setBillEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRange, setSelectedRange] = useState("last-1-month");

  const handleCustomerNameChange = (e) => {
    setSelectedCustomerName(e.target.value);
    setCurrentPage(1);
  };

  const handleCoverageTypeChange = (e) => {
    setSelectedCoverageType(e.target.value);
    setCurrentPage(1);
  };

  const handleBillStartDateChange = (date) => {
    setBillStartDate(date);
    setCurrentPage(1);
  };

  const handleBillEndDateChange = (date) => {
    setBillEndDate(date);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

const handleRangeChange = (event) => {
  const value = event.target.value;
  setSelectedRange(value);
  setCurrentPage(1);

  if (value === "custom-range") {
    setBillStartDate(null);
    setBillEndDate(null);
  } else {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 30);
    setBillStartDate(startDate);
    setBillEndDate(currentDate);
  }
};

    

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCustomerName, selectedCoverageType, selectedStatus]);

  useEffect(() => {
    setBillStartDate(null);
    setBillEndDate(null);
    setCurrentPage(1);
  }, [selectedRange]);

  const filterCommissions = () => {
    const filteredCommissions = brokerData.companies.flatMap((company) =>
      company.commissions.filter((commission) => {
        const isCustomerMatch =
          selectedCustomerName === "" ||
          commission.customer
            .toLowerCase()
            .includes(selectedCustomerName.toLowerCase());

        const isCoverageTypeMatch =
          selectedCoverageType === "" ||
          commission.coverageType
            .toLowerCase()
            .includes(selectedCoverageType.toLowerCase());

        const isBillStartDateMatch =
          billStartDate === null ||
          new Date(commission.billDate) >= billStartDate;

        const isBillEndDateMatch =
          billEndDate === null || new Date(commission.billDate) <= billEndDate;

        const isStatusMatch =
          selectedStatus === "" ||
          commission.status.toLowerCase() === selectedStatus.toLowerCase();

        const currentDate = new Date();
        const dateRange =
          selectedRange === "last-1-month"
            ? 1
            : selectedRange === "last-3-months"
            ? 3
            : 0;
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - dateRange);

        const isWithinDateRange =
          selectedRange === "custom-range"
            ? true
            : new Date(commission.billDate) >= startDate &&
              new Date(commission.billDate) <= currentDate;


        return (
          isCustomerMatch &&
          isCoverageTypeMatch &&
          isBillStartDateMatch &&
          isBillEndDateMatch &&
          isStatusMatch &&
          isWithinDateRange
        );
      })
    );

    return filteredCommissions;
  };

  const filteredCommissions = filterCommissions();

  const totalPages = Math.ceil(filteredCommissions.length / ITEMS_PER_PAGE);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const commissionSlice = filteredCommissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPremiums = commissionSlice.reduce((total, commission) => {
    return total + commission.premiumAmount;
  }, 0);

  const totalCommissions = commissionSlice.reduce((total, commission) => {
    return total + commission.commissionAmount;
  }, 0);

  return (
    <div className="app">
      <header className="header effect8">
        
        <div className="header-title">
          <h1 className="app-name">Broker Commission Dashboard</h1>
        </div>
      </header>
      <div className="container">
        <div className="filters">
          <p>Filter By :</p>
          <input
            className="effect7 left5"
            type="text"
            placeholder="Customer Name"
            value={selectedCustomerName}
            onChange={handleCustomerNameChange}
          />

          <input
            type="text"
            className="effect7"
            placeholder="Coverage Type"
            value={selectedCoverageType}
            onChange={handleCoverageTypeChange}
          />

          <select
            className="effect7"
            id="date-range"
            value={selectedRange}
            onChange={handleRangeChange}
          >
            <option value="last-1-month">Last 1 Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="custom-range">Custom Range</option>
          </select>

          {selectedRange === "custom-range" && (
            <div id="custom-date-range">
              <DatePicker
                selected={billStartDate}
                onChange={handleBillStartDateChange}
                selectsStart
                startDate={billStartDate}
                endDate={billEndDate}
                placeholderText="Start Date"
                className="date-input effect7"
              />
              <DatePicker
                selected={billEndDate}
                onChange={handleBillEndDateChange}
                selectsEnd
                startDate={billStartDate}
                endDate={billEndDate}
                placeholderText="End Date"
                className="date-input effect7"
              />
            </div>
          )}

          <select
            className="effect7"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <CommissionTable commissions={commissionSlice} />

        <div className="totals">
          <div className="export">
            <p>Export</p>
            <button className="left5">
              <FontAwesomeIcon icon={faFileExport} />
            </button>
          </div>
          <div className="total">
            <p>
              <strong>Total Premiums:</strong> {formatCurrency(totalPremiums)}
            </p>
            <p>
              <strong>Total Commissions:</strong>{" "}
              {formatCurrency(totalCommissions)}
            </p>
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handleClickPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
