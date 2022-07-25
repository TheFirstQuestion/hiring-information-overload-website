import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// import firebase from "./firebase";
import Candidate from "./Candidate/Candidate";
// import Admin from "./Admin/Admin";
import "./GlobalStyles.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/candidate/:qualtricsUserId" element={<Candidate />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
}
