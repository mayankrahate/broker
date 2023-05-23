import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

// Use createRoot instead of ReactDOM.render
ReactDOM.createRoot(rootElement).render(<App />);
