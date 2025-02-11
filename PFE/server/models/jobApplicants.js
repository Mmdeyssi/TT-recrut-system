import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true }, // Links to job
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to applicant
    cv: { type: String, required: true }, // Path to uploaded CV file
    appliedAt: { type: Date, default: Date.now },
  });
  
  export const JobApplicationModel = mongoose.model("JobApplication", jobApplicationSchema);
  