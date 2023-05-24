import React from "react";

const BrokerItem = ({ broker, startDate, endDate }) => {
  const filteredCompanies = broker.companies.filter((company) => {
    // Assuming the commissions array is in the same order as the selected date range
    const commissions = company.commissions.slice(
      startDate.getMonth(),
      endDate.getMonth() + 1
    );
    return commissions.length > 0;
  });

  return (
    <div>
      <h3>{broker.name}</h3>
      {filteredCompanies.map((company) => (
        <div key={company.name}>
          <p>{company.name}</p>
          <p>
            Total Commission:{" "}
            {company.commissions
              .slice(startDate.getMonth(), endDate.getMonth() + 1)
              .reduce((acc, commission) => acc + commission, 0)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BrokerItem;
