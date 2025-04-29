import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ChurchRegistrationForm from "./screens/registration";
import ChurchMembersList from "./screens/members";
import MemberDetails from "./screens/memberDetails";
import FollowUpDashboard from "./screens/followup";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
Amplify.configure(config);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<ChurchRegistrationForm />} />
      <Route path="/members" element={<ChurchMembersList />} />
      <Route path="/members/details/:id" element={<MemberDetails />} />
      <Route path="/followup" element={<FollowUpDashboard />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
