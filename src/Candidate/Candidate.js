import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactMarkdown from "react-markdown";
import "./react-tabs.css";

export default function Candidate(props) {
  //  Get stuff from URL
  const params = useParams();
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get("name");
  const infoLevel = parseInt(searchParams.get("load"));
  const qualtricsUserId = params.qualtricsUserId;

  const [resumeValue, setResumeValue] = useState("");
  const [coverLetterValue, setCoverLetterValue] = useState("");
  const [interview1Value, setInterview1Value] = useState("");

  // Fetch the file contents and set it in state
  function fileToVar(fileName, setter) {
    fetch(require("../ApplicantData/" + fileName + ".md"))
      .then((response) => response.text())
      .then((data) => {
        setter(data);
      });
  }

  useEffect(() => {
    console.log("Qualtrics ID: " + qualtricsUserId);

    // Read in the values for each tab
    fileToVar("resume", setResumeValue);
    if (infoLevel >= 1) {
      fileToVar("cover_letter", setCoverLetterValue);
      fileToVar("interview1", setInterview1Value);
    }
    if (infoLevel >= 2) {
      fileToVar("cover_letter", setCoverLetterValue);
      fileToVar("interview1", setInterview1Value);
    }
  }, [props]);

  return (
    <div className="candidate">
      <h1>Applicant: {candidateName}</h1>
      <hr />

      <Tabs>
        <TabList>
          <Tab>Resume</Tab>
          <Tab>Cover Letter</Tab>
          <Tab>Initial Interview</Tab>
          <Tab>Skills Test</Tab>
          <Tab>Follow-Up Interview</Tab>
          <Tab>Reference Check</Tab>
        </TabList>

        <TabPanel>
          <h2>Resume</h2>
          <ReactMarkdown>{resumeValue}</ReactMarkdown>
        </TabPanel>
        <TabPanel>
          <h2>Cover Letter</h2>
          <ReactMarkdown>{coverLetterValue}</ReactMarkdown>
        </TabPanel>
        <TabPanel>
          <h2>Initial Interview</h2>
          <ReactMarkdown>{interview1Value}</ReactMarkdown>
        </TabPanel>
        <TabPanel>
          <h2>Skills Test</h2>
        </TabPanel>
        <TabPanel>
          <h2>Follow-Up Interview</h2>
        </TabPanel>
        <TabPanel>
          <h2>Reference Check</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
}
