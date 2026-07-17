import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database Connected");

  } catch (error) {

    console.error("❌ Database Connection Failed");
    console.error(error.message);

    process.exit(1);  //if database failed, server also stops(otherwise database runs on broken server)
  }
};

export default connectDB;