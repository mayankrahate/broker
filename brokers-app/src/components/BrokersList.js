import React from "react";

const BrokersList = ({ brokers, startDate, endDate }) => {
  let filteredData = brokers;

  if (startDate && endDate) {
    filteredData = brokers.filter((broker) => {
      const filteredCompanies = broker.companies.filter((company) => {
        const commissions = company.commissions.filter((commission) => {
          const commissionDate = new Date(commission.month);
          return commissionDate >= startDate && commissionDate <= endDate;
        });
        return commissions.length > 0;
      });
      return filteredCompanies.length > 0;
    });
  }

  return (
    <div>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Broker Name</th>
              <th>Company Name</th>
              <th>Commission Received</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((broker) =>
              broker.companies.map((company) =>
                company.commissions.map((commission, index) => (
                  <tr key={`${broker.id}-${company.name}-${index}`}>
                    <td>{broker.name}</td>
                    <td>{company.name}</td>
                    <td>{commission.amount}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No brokers available within the selected date range.</p>
      )}
    </div>
  );
};


export default BrokersList;
