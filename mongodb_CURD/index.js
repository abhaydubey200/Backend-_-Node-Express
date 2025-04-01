const express = require("express");
const connectDB = require("./dbConnection");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

let db;

connectDB()
  .then((database) => {
    db = database;
    console.log("✅ Connected to Database");

    app.get("/", (req, res) => {
      res.send("🏠 Home Page...");
    });

    // Read Students
    app.get("/student-read", async (req, res) => {
      try {
        const students = await db.collection("students").find({}).toArray();

        if (students.length === 0) {
          return res.status(404).json({ message: "No students found" });
        }

        res.status(200).json(students);
      } catch (error) {
        console.error("❌ Error fetching students:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Insert Student
    app.post("/student-insert", async (req, res) => {
      try {
        const { sName, sEmail } = req.body;

        if (!sName || !sEmail) {
          return res.status(400).json({ message: "❌ Name and Email are required" });
        }

        // Check if email already exists
        const existingStudent = await db.collection("students").findOne({ sEmail: sEmail });
        if (existingStudent) {
          return res.status(400).json({ message: "❌ Email already exists" });
        }

        const studentData = { sName, sEmail, createdAt: new Date() };
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

    // Delete Student
    app.delete("/student-delete/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "❌ Invalid ID format" });
        }

        const result = await db.collection("students").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "❌ Student not found" });
        }

        res.json({ status: 1, message: "✅ Student deleted successfully" });
      } catch (error) {
        console.error("❌ Error deleting student:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Update Student
    app.put("/student-update/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { sName, sEmail } = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "❌ Invalid ID format" });
        }

        if (!sName && !sEmail) {
          return res.status(400).json({ message: "❌ At least one field is required for update" });
        }

        // Check if the student exists
        const student = await db.collection("students").findOne({ _id: new ObjectId(id) });
        if (!student) {
          return res.status(404).json({ message: "❌ Student not found" });
        }

        // Prepare the update object
        const updateFields = {};
        if (sName) updateFields.sName = sName;
        if (sEmail) updateFields.sEmail = sEmail;

        const result = await db
          .collection("students")
          .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

        if (result.modifiedCount === 0) {
          return res.status(400).json({ message: "❌ No changes made" });
        }

        res.json({ status: 1, message: "✅ Student updated successfully" });
      } catch (error) {
        console.error("❌ Error updating student:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    
     



// HEAD request - Check if student exists without fetching data
app.head("/student-exists/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).end(); // No body, just a status code
    }

    const student = await db.collection("students").findOne({ _id: new ObjectId(id) });

    if (!student) {
      return res.status(404).end();
    }

    res.status(200).end(); // Only headers, no body
  } catch (error) {
    console.error("❌ Error checking student existence:", error);
    res.status(500).end();
  }
});

// PATCH request - Partially update student details
app.patch("/student-update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sName, sEmail } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "❌ Invalid ID format" });
    }

    if (!sName && !sEmail) {
      return res.status(400).json({ message: "❌ At least one field is required for update" });
    }

    const updateFields = {};
    if (sName) updateFields.sName = sName;
    if (sEmail) updateFields.sEmail = sEmail;

    const result = await db
      .collection("students")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "❌ No changes made" });
    }

    res.json({ status: 1, message: "✅ Student updated successfully" });
  } catch (error) {
    console.error("❌ Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// OPTIONS request - Get allowed HTTP methods for /students
app.options("/students", (req, res) => {
  res.set("Allow", "GET, POST, PATCH, DELETE, OPTIONS");
  res.status(200).json({ status: 1, message: "✅ Allowed methods listed successfully" });
});







    app.listen(3000, () => {
      console.log("🚀 Server started on http://localhost:3000/");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
