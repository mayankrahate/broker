export const fetchBrokers = async () => {
  try {
    const response = await fetch("https://api.example.com/brokers");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching brokers:", error);
    throw error;
  }
};
