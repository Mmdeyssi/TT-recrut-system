import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], required: true }, // Array of required skills
  // mongoose.Schema.Types.ObjectId is used to define a reference (relationship) between two collections.
  /*MongoDB automatically assigns a unique _id to every document.
Instead of storing all employer details inside each job, we only store their _id.
This creates a relationship between documents (like SQL foreign keys)*/
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Employer reference
  createdAt: { type: Date, default: Date.now },
});

export const JobModel = mongoose.model("Job", jobSchema);
