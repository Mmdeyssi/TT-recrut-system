
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
      skillsRequired: skillsRequired.split(","),
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
      const adminId = req.id;
      const jobs = await Job.find({ created_by: adminId }).sortsort({ createdAt: -1 });
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
    // Retrieve only required fields: title, description, skillsRequired, employer's name and email, and createdAt
    const jobs = await Job.find()
      .select("title description skillsRequired createdAt")
      

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this job" });
    }
    

    // Delete the job
    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
