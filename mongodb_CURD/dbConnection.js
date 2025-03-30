const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Student_Database";

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");
    const db = client.db(dbName);
    return db; 
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); 
  }
}

module.exports = connectDB;
