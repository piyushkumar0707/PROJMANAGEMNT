import dotenv from "dotenv";
dotenv.config();
import connectDB from "../src/db/index.js";
import { User } from "../src/models/user.models.js";

const run = async () => {
  await connectDB();
  await User.deleteMany({});
  console.log("All users deleted.");
  process.exit(0);
};

run();
