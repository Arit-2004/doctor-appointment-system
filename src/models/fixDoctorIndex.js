import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./user.model.js";

dotenv.config({ path: "./.env" });

const fixDoctorIndex = async () => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // show current indexes
    const indexes = await User.collection.indexes();
    console.log("Existing Indexes:", indexes);

    // drop old doctorId index if exists
    const doctorIdIndex = indexes.find((i) => i.name === "doctorId_1");
    if (doctorIdIndex) {
      await User.collection.dropIndex("doctorId_1");
      console.log("🗑️ Dropped old doctorId_1 index");
    }

    // recreate all indexes defined in schema
    await User.syncIndexes();
    console.log("✅ Rebuilt indexes with sparse + unique");

  } catch (err) {
    console.error("⚠️ Error fixing index:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected. Done!");
  }
};

fixDoctorIndex();
