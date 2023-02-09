// entry point of the React application.
// imports reportWebVitals which can be used to measure performance in the app

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./report_webvitals";

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById("root")
);

reportWebVitals();
