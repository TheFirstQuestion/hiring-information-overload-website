import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc, collection, getDoc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
// Contains sensitive information, so you have to create this file yourself
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let activityCounter = 0;

// Log activity to Firebase
export async function recordActivity(qualtricsUserId, cat, val, desc) {
  // This will be the ID of the activity in firebase -- a string, padded to 5 digits
  const id = activityCounter.toString().padStart(5, "0");
  activityCounter = activityCounter + 1;

  const now = new Date();

  // Firebase requires collection/document alternation, which is inconvenient...
  // so every activity will have a document called "x," which holds the fields
  setDoc(doc(db, "HIO", qualtricsUserId, id, "x"), {
    category: cat,
    description: desc,
    value: val,
    timestamp: now,
    timeEpoch: Number(format(now, "T")),
    timeReadable: format(now, "M-d-y h:mm:ssbbb"),
  });

  console.log(id + " " + cat + ": " + val + " -- " + desc);
}

export async function downloadAllData(logFn) {
  const rootRef = collection(db, "HIO");
  const userIDs = await getDocs(rootRef);

  let data = [];
  let users = userIDs.docs;
  for (let i = 0; i < users.length; i++) {
    // Call the passed function (to provide user updates on the status of the download)
    logFn(i, users.length);
    let tmp = await downloadOneData(users[i].id);
    data.push(tmp);
  }

  return data;
}

async function downloadOneData(qualtricsUserId) {
  let userData = [];
  let i = 0;

  while (true) {
    let activityID = i.toString().padStart(5, "0");
    const activity = await getDoc(
      doc(db, "HIO", qualtricsUserId, activityID, "x")
    );
    if (activity.exists()) {
      userData.push({ activityID, qualtricsUserId, ...activity.data() });
      i++;
    } else {
      return userData;
    }
  }
}
