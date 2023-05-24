import React, { useState } from "react";

const CommissionTable = ({ commissions }) => {
  return (
    <table className="commission-table">
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
        {commissions.map((company) =>
          company.commissions.map((commission, index) => (
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
          ))
        )}
      </tbody>
    </table>
  );
};


export default CommissionTable;
