import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Building } from "../../types";
import { Events } from "../../middleware/event-handler";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

export const databaseHandler = {
  login: () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  },
  logout: () => {
    const auth = getAuth();
    auth.signOut();
  },
  deleteBuilding: async (building: Building, events: Events) => {
    const dbInstance = getFirestore(getApp());
    await deleteDoc(doc(dbInstance, "buildings", building.uid));
    events.trigger({ type: "CLOSE_BUILDING" });
  },
  updateBuilding: async (building: Building) => {
    const dbInstance = getFirestore(getApp());
    await updateDoc(doc(dbInstance, "buildings", building.uid), {
      ...building,
    });
  },
};
