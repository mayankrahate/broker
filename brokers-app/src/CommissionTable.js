import React, { useState } from "react";

const CommissionTable = ({ commissions }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle the sort direction if the same column is clicked again
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Sort the column in ascending order by default
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCommissions = commissions.slice().sort((a, b) => {
    if (sortColumn === "month") {
      // Sort by month column
      return sortDirection === "asc"
        ? a.month.localeCompare(b.month)
        : b.month.localeCompare(a.month);
    } else if (sortColumn === "amount") {
      // Sort by amount column
      return sortDirection === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else if (sortColumn === "status") {
      // Sort by status column
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else {
      // Default sorting
      return 0;
    }
  });

  return (
    <table className="commission-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("company")}>Company</th>
          <th onClick={() => handleSort("month")}>Month</th>
          <th onClick={() => handleSort("amount")}>Amount</th>
          <th onClick={() => handleSort("status")}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedCommissions.map((company) =>
          company.commissions.map((commission) => (
            <tr key={`${company.name}-${commission.month}`}>
              <td>{company.name}</td>
              <td>{commission.month}</td>
              <td>{commission.amount}</td>
              <td>{commission.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CommissionTable;
