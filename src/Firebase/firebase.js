import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { format } from "date-fns";
// Contains sensitive information, so you have to create this file yourself
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let activityCounter = 0;

// Log activity to Firebase
export default async function recordActivity(qualtricsUserId, cat, val, desc) {
  // This will be the ID of the activity in firebase -- a string, padded to 5 digits
  const id = activityCounter.toString().padStart(5, "0");
  activityCounter = activityCounter + 1;

  const now = new Date();

  // Firebase must be stored alternating collection/document -- so add a random document called "Testing"
  setDoc(doc(db, "HIO", "Testing", qualtricsUserId, id), {
    category: cat,
    description: desc,
    value: val,
    timestamp: now,
    timeEpoch: Number(format(now, "T")),
    timeReadable: format(now, "M-d-y h:mm:ssbbb"),
  });

  console.log(id + " " + cat + ": " + val + " -- " + desc);
}
