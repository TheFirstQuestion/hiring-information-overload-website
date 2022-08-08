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
  activityCounter++;

  // Ensure the document exists, and update the activityCount so we know how many activities there are
  setDoc(doc(db, "HIO", qualtricsUserId), { activityCount: activityCounter });

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
  let promises = [];

  for (let i = 0; i < users.length; i++) {
    logFn(i, users.length);
    const activityData = await downloadOneData(users[i].id);
    // Add the new data to the existing data
    data = [...data, ...activityData];
  }

  await Promise.all(promises);
  return data;
}

async function downloadOneData(qualtricsUserId) {
  let userData = [];
  let promises = [];

  // Firebase doesn't let you get all subcollections of a document, so we've stored the number of records in a field
  const thisUser = await getDoc(doc(db, "HIO", qualtricsUserId));
  const activityCount = thisUser.data().activityCount;

  for (let i = 0; i < activityCount; i++) {
    let activityID = i.toString().padStart(5, "0");
    const prom = getDoc(doc(db, "HIO", qualtricsUserId, activityID, "x"));
    promises.push(prom);
    prom.then((activity) => {
      if (activity.exists()) {
        userData.push({ activityID, qualtricsUserId, ...activity.data() });
      } else {
        console.log("activity #" + i + " doesn't exist...");
      }
    });
  }

  await Promise.all(promises);
  return userData;
}

// Creates dummy data to test the download process
// n participants, each with m activities
export async function createDummyData(n, m) {
  for (let i = 0; i < n; i++) {
    activityCounter = 0;
    for (let j = 0; j < m; j++) {
      recordActivity(
        "Q-dummy-" + i,
        "dummy",
        "dummy-" + j,
        "dummy data " + i + "-" + j
      );
    }
  }
  console.log("Dummy data done!");
}
