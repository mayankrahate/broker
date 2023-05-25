import React, { useState } from "react";
import Dashboard from "./Dashboard";
import data from "./data.json";
import questions from "./questions.json";
import "./App.css";

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [email, setEmail] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [questionSearchTerm, setQuestionSearchTerm] = useState("");

  const handleUserDataSearch = (mobileNumber, email) => {
    const filteredData = data.filter(
      (customer) => customer.mobile === mobileNumber && customer.email === email
    );

    if (filteredData.length > 0) {
      setSelectedCustomer(filteredData[0]);
      setIsSearchClicked(true);
    } else {
      setSelectedCustomer(null);
      setIsSearchClicked(false);
    }
  };

  const handleQuestionSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    const results = questions.filter(
      (question) =>
        question.question.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.answer.toLowerCase().includes(lowerCaseSearchTerm)
    );

  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
    setEmail("");
    setIsSearchClicked(false);
    setQuestionSearchTerm("");
  };

  return (
    <div className="app">
      <header className="header effect8">
        <div className="header-title">
          <h1 className="app-name">Pet Insurance Dashboard</h1>
        </div>
      </header>
      <div className="container">
        <Dashboard
          handleUserDataSearch={handleUserDataSearch}
          handleQuestionSearch={handleQuestionSearch}
          selectedCustomer={selectedCustomer}
          email={email}
          setEmail={setEmail}
          isSearchClicked={isSearchClicked}
          clearSelectedCustomer={clearSelectedCustomer}
          questionSearchTerm={questionSearchTerm}
          setQuestionSearchTerm={setQuestionSearchTerm}
        />
      </div>
    </div>
  );
};

export default App;
