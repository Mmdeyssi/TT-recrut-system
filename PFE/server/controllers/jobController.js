
import { Application } from "../models/jobApplicants.js";
import { Job } from "../models/jobsModel.js";


// Controller to add a new job ✅ 
export const addJob = async (req, res) => {
  try {
    const { title, description, skillsRequired,salary, location, jobType, experience,position } = req.body;
    const employerId =  req.user.id;// Extract employer ID from authenticated user

    if (!title || !description || !skillsRequired || !salary || !location || !jobType || !experience || !position ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      description,
      skillsRequired: skillsRequired,
      salary: Number(salary),
      position:Number(position),
      location,
      experienceLevel: experience,
      jobType : jobType,
      created_by: employerId
  });   
 

    res.json({ success: true, message: "Job added successfully", job});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Controller to get all jobs ✅ 
export const getAllJobs = async (req, res) => {
  try {
      const keyword = req.query.keyword || "";
      const query = {
          $or: [
              { title: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
          ]
      };
      const jobs = await Job.find(query).sort({ createdAt: -1 });
      if (!jobs) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({
          jobs,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}
//to view the applicants for a specific job 
export const getJobById = async (req, res) => {
  try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path:"applications"
      });
      if (!job) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({ job, success: true });
  } catch (error) {
      console.log(error);
  }
}
export const getAdminJobs = async (req, res) => {
  try {
      const adminId = req.user.id;
      const jobs = await Job.find({ created_by: adminId }).sort({ createdAt: -1 });
      if (!jobs) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({
          jobs,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    
      

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// controllers/jobController.js

export const editJob = async (req, res) => {
  try {
    const {jobId} = req.params;
    const employerId = req.user.id; // ensure this is extracted from the authenticated token

    const {
      title,
      description,
      skillsRequired,
      salary,
      position,
      location,
      jobType,
      experienceLevel
    } = req.body;
    
    

    // Find the job to be edited
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if the user owns the job
    if (job.created_by.toString() !== employerId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update fields
    if(title) job.title = title;
    if(description) job.description = description;
    if(skillsRequired) job.skillsRequired = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired.split(",");
    if(salary) job.salary = salary;
    if(position) job.position = position;
    if(location) job.location = location;
    if(jobType) job.jobType = jobType;
    if(experienceLevel) job.experienceLevel = experienceLevel;

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Edit job error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Controller to delete a job ✅ 
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    

    // Ensure only the employer who posted the job can delete it
    if (job.created_by.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this job" });
    }
    

    // Delete the job
    await Job.findByIdAndDelete(jobId);
    try {
      await Application.deleteMany({ job: jobId });
    } catch (err) {
      console.error("Error deleting related applications:", err.message);
      // optional: log but don't fail the request
    }

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
