import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import questions from "./questions.json";

const Dashboard = ({
  handleUserDataSearch,
  handleQuestionSearch,
  selectedCustomer,
  email,
  setEmail,
  isSearchClicked,
  clearSelectedCustomer,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [questionSearchValue, setQuestionSearchValue] = useState("");
  const [questionSearchResults, setQuestionSearchResults] = useState([]);
 const resultsRef = useRef(null);
  const handleUserDataSearchClick = () => {
    handleUserDataSearch(searchValue, email);
  };

  const performQuestionSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    const results = questions.filter(
      (question) =>
        question.question.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.answer.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setQuestionSearchResults(results);
  };

  const handleBackClick = () => {
    clearSelectedCustomer();
    setEmail("");
    setSearchValue("");
    setQuestionSearchValue("");
    setQuestionSearchResults([]);
  };

  const handleQuestionSearchChange = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm!=="") {
      setQuestionSearchValue(searchTerm);
      performQuestionSearch(searchTerm);
    }
    else{
        setQuestionSearchValue("");
         setQuestionSearchResults([]);
    }
  };
useEffect(() => {
  if (questionSearchResults.length > 0) {
    window.scrollTo({
      top: resultsRef.current.offsetTop,
      behavior: "smooth",
    });
  }
}, [questionSearchResults]);
  return (
    <div className="dashboard">
      {!selectedCustomer && (
        <div className="search-box">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter Mobile Number"
            className="search-input effect7"
          />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email ID"
            className="email-input effect7"
          />
          <button
            onClick={handleUserDataSearchClick}
            className="search-button effect7"
          >
            Search User
          </button>
        </div>
      )}

      {isSearchClicked && selectedCustomer && (
        <div>
          <div className="title">
            <div className="back-icon" onClick={handleBackClick}>
              <FiArrowLeft />
            </div>
            <div className="margin35">
              <h2 className="margin0">Customer Details</h2>
            </div>
          </div>
          <div className="customer-info">
            <div className="info-box effect7">
              <h2>Coverage</h2>
              <p>Total Coverage: {selectedCustomer.totalCoverage}</p>
              <p>Deductible: {selectedCustomer.deductible}</p>
              <p>Claimed Amount: {selectedCustomer.claimedAmount}</p>
              <p>No of Pets Covered: {selectedCustomer.numberOfPets}</p>
            </div>
            <div className="info-box effect7">
              <h2>Basic Info</h2>
              <p>Name: {selectedCustomer.name}</p>
              <p>Address: {selectedCustomer.address}</p>
              <p>Age: {selectedCustomer.age}</p>
              <p>Mobile: {selectedCustomer.mobile}</p>
            </div>
            <div className="info-box effect7">
              <h2>Last Claim</h2>
              {selectedCustomer.lastClaim && (
                <React.Fragment>
                  <p>Pet Name: {selectedCustomer.lastClaim.petName}</p>
                  <p>Claim Amount: {selectedCustomer.lastClaim.claimAmount}</p>
                  <p>
                    Approved Amount: {selectedCustomer.lastClaim.approvedAmount}
                  </p>
                  <p>Claim Date: {selectedCustomer.lastClaim.claimDate}</p>
                </React.Fragment>
              )}
            </div>

            {selectedCustomer.pets && selectedCustomer.pets.length > 0 && (
              <React.Fragment>
                {selectedCustomer.pets.map((pet) => (
                  <div className="info-box effect7" key={pet.id}>
                    <h2>Pet Name: {pet.name}</h2>
                    <p>Age: {pet.age}</p>
                    <p>Race: {pet.type}</p>
                    <p>Vaccine Status: {pet.vaccineStatus}</p>
                  </div>
                ))}
              </React.Fragment>
            )}
            {isSearchClicked && selectedCustomer && (
              <div className="info-box effect7">
                <h2>Activity</h2>
                {selectedCustomer.lastCall && (
                  <React.Fragment>
                    <p>Last Call Date: {selectedCustomer.lastCall.date}</p>
                    <p>Last Call Reason: {selectedCustomer.lastCall.reason}</p>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
          <div className="search-box">
            <input
              type="text"
              value={questionSearchValue}
              onChange={handleQuestionSearchChange}
              placeholder="Search Knowledge Base"
              className="search-input effect7"
            />
          </div>
        </div>
      )}

      {isSearchClicked && !selectedCustomer && (
        <div>
          <p>User not found. Please check the mobile number and email.</p>
        </div>
      )}

      {questionSearchResults.length > 0 && (
        <div ref={resultsRef}>
          <h2>Results:</h2>
          {questionSearchResults.map((result) => (
            <div key={result.id}>
              <h3>{result.question}</h3>
              <p>{result.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
