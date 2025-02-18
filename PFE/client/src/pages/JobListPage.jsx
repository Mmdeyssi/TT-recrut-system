import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import Navbar from "../components/Navbar";

const JobListPage = () => {
    const {userData} =useContext(AppContent);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);
  const [newJob, setNewJob] = useState({ title: "", description: "", skillsRequired: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/jobs/all-jobs"); // Update with your backend URL
        setJobs(response.data.jobs);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openPopup = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
    setCoverLetter("");
    setCv(null);
  };

  const handleApply = async () => {
    if (!cv) {
      alert("Please upload your CV");
      return;
    }
    const formData = new FormData();
    formData.append("jobId", selectedJob._id);
    formData.append("coverLetter", coverLetter);
    formData.append("cv", cv);

    try {
      await axios.post("http://localhost:4000/api/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully");
      closePopup();
    } catch (err) {
      alert("Failed to apply");
    }
  };

  const handleAddJob = async () => {
    try {
      await axios.post("http://localhost:4000/api/jobs/add-job", newJob, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Job added successfully");
      window.location.reload();
      setIsPopupOpen(false);
    } catch (err) {
      alert("Failed to add job");
    }
  };
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Job deleted successfully");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // Remove job from the list
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading jobs...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-20">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Available Jobs</h1>
      {userData.role === "employer" && (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
        >
          + Add Job
        </button>
      )}
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobs.map((job) => (
    <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition relative">
      {/* ✅ Move delete button inside each job */}
      {userData.role === "employer" && (
        <button
          onClick={() => handleDeleteJob(job._id)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-700 transition"
        >
          ✕
        </button>
      )}
      <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-gray-600 mt-2">{job.description}</p>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">Required Skills:</p>
        <ul className="flex flex-wrap gap-2 mt-1">
          {job.skillsRequired.map((skill, i) => (
            <li key={i} className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>


      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold">Add a New Job</h2>
            <input
              type="text"
              className="w-full mt-3 p-2 border rounded-lg"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <textarea
              className="w-full mt-3 p-2 border rounded-lg"
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <input
              type="text"
              className="w-full mt-3 p-2 border rounded-lg"
              placeholder="Required Skills (comma separated)"
              value={newJob.skillsRequired}
              onChange={(e) => setNewJob({ ...newJob, skillsRequired: e.target.value.split(",") })}
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsPopupOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleAddJob} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Submit Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
