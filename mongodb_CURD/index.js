const express = require("express");
const connectDB = require("./dbConnection");

const app = express();
app.use(express.json());

let db;

connectDB().then((database) => {
  db = database;

  
  app.get("/", (req, res) => {
    res.send("Home Page...");
  });

  // Read Students from DB
  app.get("/student-read", async (req, res) => {
    try {
      const students = await db.collection("students").find({}).toArray();
      res.status(200).json(students);
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Insert Student into DB
  app.post("/student-insert", async (req, res) => {
    try {
      const { sName, sEmail } = req.body;

      // Validation: Ensure both fields are provided
      if (!sName || !sEmail) {
        return res.status(400).json({ message: "Name and Email are required" });
      }

      const studentData = { sName, sEmail };
      console.log("📌 Received Data:", studentData);

      const result = await db.collection("students").insertOne(studentData);

      res.status(201).json({
        message: "✅ Student inserted successfully",
        id: result.insertedId,
      });
    } catch (error) {
      console.error("❌ Error inserting student:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Start Server
  app.listen(3000, () => {
    console.log("🚀 Server started on http://localhost:3000/");
  });
});
