import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database!");
  } catch (err) {
    console.error(`Some error occurred while connecting to database: ${err}`);
    process.exit(1); // Exit process on DB connection failure
  }
};
