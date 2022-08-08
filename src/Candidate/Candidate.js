import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactMarkdown from "react-markdown";
import { recordActivity } from "../Firebase/firebase.js";
import "./react-tabs.css";

export default function Candidate(props) {
  //  Get stuff from URL
  const params = useParams();
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get("name");
  const infoLevel = parseInt(searchParams.get("load"));
  const qualtricsUserId = params.qualtricsUserId;

  // Will hold values for each page
  const [resumeValue, setResumeValue] = useState("");
  const [coverLetterValue, setCoverLetterValue] = useState("");
  const [interview1Value, setInterview1Value] = useState("");
  const [interview2Value, setInterview2Value] = useState("");
  const [skillsTestValue, setSkillsTestValue] = useState("");
  const [referenceCheckValue, setReferenceCheckValue] = useState("");
  let prevPercent = 0;

  // Runs on first render (similar to componentDidMount)
  useEffect(() => {
    // Log activity
    recordActivity(
      qualtricsUserId,
      "load",
      "page_rendered",
      "page has rendered"
    );
    // Print for debugging purposes
    console.log("Qualtrics ID: " + qualtricsUserId);

    // Low, moderate, and high
    fileToVar("resume", setResumeValue);

    // Moderate and high
    if (infoLevel >= 1) {
      fileToVar("cover_letter", setCoverLetterValue);
      fileToVar("interview1", setInterview1Value);
    }

    // High
    if (infoLevel >= 2) {
      fileToVar("skills_test", setSkillsTestValue);
      fileToVar("interview2", setInterview2Value);
      fileToVar("reference_check", setReferenceCheckValue);
    }

    // Scroll tracking
    setInterval(() => {
      const docRect = document
        .getElementsByClassName("App")[0]
        .getBoundingClientRect();

      const contentHeight = docRect.height;
      const viewHeight = window.innerHeight;
      const maxPosition = contentHeight - viewHeight;

      const scrollPosition = Math.abs(contentHeight - docRect.bottom);
      const scrollPercent = Math.round((scrollPosition / maxPosition) * 100);

      if (Math.abs(scrollPercent - prevPercent) > 5) {
        recordActivity(
          qualtricsUserId,
          "scroll",
          scrollPercent,
          "scrolled to " + scrollPercent + "%"
        );
        // eslint throws a warning because prevPercent gets reset every time the component re-renders. But this is the behavior that we want!
        // eslint-disable-next-line
        prevPercent = scrollPercent;
      }
    }, 1000);
  }, [props, infoLevel, qualtricsUserId]);

  function handleTabClick(tabNum) {
    recordActivity(
      qualtricsUserId,
      "click",
      tabNum,
      "clicked on tab " + tabNum
    );
  }

  return (
    <div className="candidate">
      <h1>Applicant: {candidateName}</h1>
      <hr />

      {infoLevel === 0 ? (
        <RenderContent content={resumeValue} />
      ) : (
        <Tabs onSelect={(index) => handleTabClick(index)}>
          <TabList>
            <Tab>Resume</Tab>
            <Tab>Cover Letter</Tab>
            <Tab>Initial Interview</Tab>

            {infoLevel >= 2 && (
              <>
                <Tab>Skills Test</Tab>
                <Tab>Follow-Up Interview</Tab>
                <Tab>Reference Check</Tab>
              </>
            )}
          </TabList>

          <TabPanel>
            <h2>Resume</h2>
            <RenderContent content={resumeValue} />
          </TabPanel>

          <TabPanel>
            <h2>Cover Letter</h2>
            <RenderContent content={coverLetterValue} />
          </TabPanel>
          <TabPanel>
            <h2>Initial Interview</h2>
            <RenderContent content={interview1Value} />
          </TabPanel>

          {infoLevel >= 2 && (
            <>
              <TabPanel>
                <h2>Skills Test</h2>
                <RenderContent content={skillsTestValue} />
              </TabPanel>
              <TabPanel>
                <h2>Follow-Up Interview</h2>
                <RenderContent content={interview2Value} />
              </TabPanel>
              <TabPanel>
                <h2>Reference Check</h2>
                <RenderContent content={referenceCheckValue} />
              </TabPanel>
            </>
          )}
        </Tabs>
      )}
    </div>
  );
}

/* ############################## Helper Components ############################# */

// Renders markdown, rewriting headers relative to the hierarchy of the page as a whole (for screenreader accessibility)
function RenderContent(props) {
  return (
    <ReactMarkdown
      components={{
        h1: "h3",
        h2: "h4",
        h3: "h5",
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}

/* ############################## Helper Functions ############################# */

// Get the file contents and set it in state
function fileToVar(fileName, setter) {
  fetch(require("../ApplicantData/" + fileName + ".md"))
    .then((response) => response.text())
    .then((data) => {
      setter(data);
    });
}
