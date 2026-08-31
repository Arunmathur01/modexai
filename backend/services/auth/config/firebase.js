
// initialize firebase admin sdk in backend
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

export const app = admin.initializeApp({
  credential: cert(serviceAccount)
});


