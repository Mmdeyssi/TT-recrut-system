import { Application } from "../models/jobApplicants.js";
import { Job } from "../models/jobsModel.js";
import {  STATUS_ACCEPTED_TEMPLATE,STATUS_REJECTED_TEMPLATE} from "../config/emailTemplates.js"
import { transporter } from "../config/nodemailer.js";
// Controller to apply for a job ✅ 
export const applyJob = async (req, res) => {
  try {
      const userId = req.user.id;
      const jobId = req.params.id;
      if (!jobId) {
          return res.status(400).json({
              message: "Job id is required.",
              success: false
          })
      };
      // check if the user has already applied for the job
      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

      if (existingApplication) {
          return res.json({
              message: "You have already applied for this jobs",
              success: false
          });
      }

      // check if the jobs exists
      const job = await Job.findById(jobId);
      if (!job) {
          return res.status(404).json({
              message: "Job not found",
              success: false
          })
      }
      // create a new application
      const newApplication = await Application.create({
          job:jobId,
          applicant:userId,
      });

      await Job.findByIdAndUpdate(jobId, {
        $push: { applications: newApplication._id }
      });
      return res.json({
          message:"Job applied successfully.",
          success:true
      })
  } catch (error) {
      console.log(error);
  }
};
export const getAppliedJobs = async (req,res) => {
  try {
      const userId = req.user.id;
      const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
          path:'job',
          options:{sort:{createdAt:-1}},
          select:"title , created_by , applications"
          
      });
      if(!application){
          return res.status(404).json({
              message:"No Applications",
              success:false
          })
      };
      return res.status(200).json({
          application,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
export const getApplicants = async (req,res) => {
  try {
      const {jobId} = req.params;
      const job = await Job.findById(jobId)
      .select("title created_by")
      .populate({
        
          path:'applications',
          options:{sort:{createdAt:-1}},
          populate:{
              path:'applicant',
              select: "fullName email phone profile"
              
             
          },
          
      });
      if(!job){
          return res.status(404).json({
              message:'Job not found.',
              success:false
          })
      };
      return res.status(200).json({
          job, 
          succees:true
      });
  } catch (error) {
      console.log(error);
  }
}
// controllers/applicationController.js
export const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const application = await Application.findById(id).populate("applicant");
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      application.status = status;
      await application.save();
  
      const { email, fullName } = application.applicant;
  
      
  
      const htmlTemplate =
        status === "accepted"
          ? STATUS_ACCEPTED_TEMPLATE.replace("{{name}}", fullName)
          : STATUS_REJECTED_TEMPLATE.replace("{{name}}", fullName);
  
          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject:
              status === "accepted"
                ? "🎉 You're In! Application Accepted"
                : "Application Status Update",
            html: htmlTemplate,
          };
      
          await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ success: true, message: "Status updated and email sent." });
    } catch (err) {
      console.error("Email/Status update failed:", err);
      return res.status(500).json({ success: false, message: "Something went wrong." });
    }
}
