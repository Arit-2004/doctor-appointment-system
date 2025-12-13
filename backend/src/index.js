import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { User } from "./models/user.model.js";
import mongoose from "mongoose";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");

    // ✅ Temporary snippet: drop and rebuild doctorId index
    try {
      // Wait until mongoose connection is ready
      if (!mongoose.connection.db) {
        await new Promise((resolve) => mongoose.connection.once("open", resolve));
      }

      const indexes = await User.collection.indexes();
      const doctorIdIndex = indexes.find((idx) => idx.name === "doctorId_1");

      if (doctorIdIndex) {
        await User.collection.dropIndex("doctorId_1");
        console.log("🗑️ Dropped old doctorId_1 index");
      }

      await User.syncIndexes();
      console.log("✅ Rebuilt indexes correctly (sparse + unique)");
    } catch (err) {
      console.error("⚠️ Index sync failed:", err.message);
    }

    // ✅ Start server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed:", error);
  });
