import "dotenv/config";
import { cert, initializeApp } from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

export const app = initializeApp({
  credential: cert(serviceAccount),
});
