import { JobModel } from "../models/jobsModel.js";
import { JobApplicationModel } from "../models/jobApplicants.js";

// Controller to add a new job
export const addJob = async (req, res) => {
  try {
    const { title, description, skillsRequired } = req.body;
    const employerId =  req.body.userId;// Extract employer ID from authenticated user

    if (!title || !description || !skillsRequired) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const newJob = new JobModel({ title, description, skillsRequired, employerId });
    await newJob.save();

    res.json({ success: true, message: "Job added successfully", job: newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Controller to get all jobs
export const getAllJobs = async (req, res) => {
  try {
    // Retrieve only required fields: title, description, skillsRequired, employer's name and email, and createdAt
    const jobs = await JobModel.find()
      .select("title description skillsRequired createdAt")
      .populate("employerId", "fullName email");

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Controller to apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const applicantId =  req.body.userId; // Extract applicant ID from authenticated user

    if (!req.file) {
      return res.status(400).json({ success: false, message: "CV file is required" });
    }
      // Store extracted text from PDF
    const extractedText = req.body.extractedText || ""

    const newApplication = new JobApplicationModel({
      jobId,
      applicantId,
      cv: req.file.path,
      extractedText // Store file path
    });

    await newApplication.save();
    /*application: newApplication in res.json returns the full application details,
     confirming the submission and allowing the frontend or AI model to process the data later.*/ 

    res.status(201).json({ success: true, message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get all applications for a specific job
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await JobApplicationModel.find({ jobId }).populate("applicantId", "fullName email");
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get all jobs an applicant has applied for
export const getUserApplications = async (req, res) => {
  try {
    const applicantId = req.body.id;
    const appliedJobs = await JobApplicationModel.find({ applicantId }).populate("jobId", "title description skillsRequired");
    res.status(200).json({ success: true, appliedJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Controller to delete a job
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the job exists
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Ensure only the employer who posted the job can delete it
    if (job.employerId.toString() !== req.body.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this job" });
    }
    

    // Delete the job
    await JobModel.findByIdAndDelete(jobId);

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
