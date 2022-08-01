import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { downloadAllData } from "../Firebase/firebase";
import "./Admin.css";
// Contains sensitive information, so you have to create this file yourself
import { adminPassword } from "../config.js";

export default function Admin(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [downloadState, setDownloadState] = useState("");
  const [doneGettingData, setDoneGettingData] = useState(false);
  const [data, setData] = useState(null);

  async function downloadData() {
    setDownloadState("Downloading...");
    downloadAllData(updateStatus).then((d) => {
      setData(d[0]);
      setDownloadState("Done!");
      setDoneGettingData(true);
    });
  }

  function updateStatus(i, n) {
    setDownloadState("Downloading #" + (i + 1) + " of " + n + "...");
  }

  // For logging in
  function handlePasswordChange(event) {
    setShowErrorMessage(false);
    setPasswordAttempt(event.target.value);
  }

  // For logging in
  function handlePasswordSubmit(event) {
    event.preventDefault();

    if (passwordAttempt === adminPassword) {
      setIsLoggedIn(true);
    } else {
      setShowErrorMessage(true);
    }
  }

  // Timestamps the filename, for convenience
  function filenameString() {
    const d = new Date();
    return (
      " -- " +
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      d.getDate().toString().padStart(2, "0") +
      " " +
      d.getHours().toString().padStart(2, "0") +
      ":" +
      d.getMinutes().toString().padStart(2, "0")
    );
  }

  return (
    <div className="wholePage">
      <h1>Hi Claire!!!!!</h1>
      {isLoggedIn ? (
        <div className="loggedIn">
          <button onClick={downloadData}>Download Data</button>
          <div className="downloadLinks">
            <span className="listItem">{downloadState}</span>

            <br />

            {doneGettingData && (
              <CSVLink
                data={data}
                filename={"HIO" + filenameString() + ".csv"}
                className="listItem"
              >
                Download Data
              </CSVLink>
            )}
          </div>
        </div>
      ) : (
        <div className="loggedOut">
          <form onSubmit={handlePasswordSubmit}>
            <input
              onChange={handlePasswordChange}
              value={passwordAttempt}
              type="password"
            />
            <button type="submit">Submit</button>
          </form>
          {showErrorMessage && <span id="red">Nope.</span>}
        </div>
      )}
    </div>
  );
}
