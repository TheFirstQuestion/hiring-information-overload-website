import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Candidate(props) {
  // Get stuff from the URL
  const params = useParams();
  const qualtricsUserId = params.qualtricsUserId;
  console.log("Qualtrics ID: " + qualtricsUserId);
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get("name");
  const infoLevel = searchParams.get("load");

  return (
    <>
      <h1>{candidateName}</h1>
      <p>{infoLevel}</p>
    </>
  );
}
