import { useEffect, useState } from "react";
import brokersData from "../brokerData.json";

const useBrokers = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brokers data from API or import it from a JSON file
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        const data = {
          id: 1,
          name: "John Doe",
          companies: [
            {
              name: "Company A",
              commissions: [
                { month: "2023-01", amount: 100 },
                { month: "2023-02", amount: 150 },
                { month: "2023-03", amount: 200 },
              ],
            },
            {
              name: "Company B",
              commissions: [
                { month: "2023-01", amount: 80 },
                { month: "2023-02", amount: 120 },
                { month: "2023-03", amount: 160 },
              ],
            },
          ],
        };


        // Ensure data is an array before mapping
        const parsedData = Array.isArray(data)
          ? data.map((broker) => ({
              ...broker,
              companies: broker.companies.map((company) => ({
                ...company,
                commissions: company.commissions.map((commission) => ({
                  ...commission,
                  month: new Date(commission.month),
                })),
              })),
            }))
          : [];

        setBrokers(parsedData);
      } catch (error) {
        console.error("Error fetching brokers:", error);
      }
    };

    fetchData();
  }, []);

  return brokers;
};

export default useBrokers;
