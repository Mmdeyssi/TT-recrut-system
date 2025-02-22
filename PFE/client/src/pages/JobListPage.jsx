import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const JobListPage = () => {
  const { userData,backendUrl } = useContext(AppContent);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  const [isAddJobPopupOpen, setIsAddJobPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);
  const [newJob, setNewJob] = useState({ title: "", description: "", skillsRequired: "" });
// Runs when the component mounts → The empty dependency array [] ensures that this effect only runs once, when the component is first rendered 
//Calls fetchJobs immediately after defining it → This ensures that job data is fetched as soon as the component loads.

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const {data} = await axios.get(backendUrl + "/api/jobs/all-jobs");
        setJobs(data.jobs);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openApplyPopup = (job) => {
    setSelectedJob(job);
    setIsApplyPopupOpen(true);
  };

  const closeApplyPopup = () => {
    setIsApplyPopupOpen(false);
    setSelectedJob(null);
    setCoverLetter("");
    setCv(null);
  };

  const openAddJobPopup = () => {
    setIsAddJobPopupOpen(true);
  };

  const closeAddJobPopup = () => {
    setIsAddJobPopupOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];//This ensures the user uploads one file at a time.
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      setCv(file);
    } else {
      alert("Only PDF and DOCX files are allowed.");
      setCv(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) {
      toast.error("Please upload your CV before submitting.");
      return;
    }

    setLoading(true);
    

    const formData = new FormData();
    formData.append("jobId", selectedJob._id);
    formData.append("cv", cv);
    formData.append("coverLetter", coverLetter);

    try {
      const {data} = await axios.post(backendUrl + "/api/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async () => {
    try {
      await axios.post(backendUrl + "/api/jobs/add-job", newJob);
      toast.success("Job added successfully");
      window.location.reload();
      closeAddJobPopup();
    } catch (err) {
      toast.error("Failed to add job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(backendUrl+ `/api/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading jobs...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-20">
     
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Available Jobs</h1>
      {userData.role === "employer" && (
        <button
          onClick={openAddJobPopup}
          className="mb-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
        >
          + Add Job
        </button>
      )}
      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition relative">
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
            <div className="mt-2">
              <strong>Required Skills: </strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skillsRequired && job.skillsRequired.map((skill, index) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {userData.role === "jobSeeker" && (
             <button
             onClick={() => openApplyPopup(job)}
             className="absolute bottom-4 right-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg px-5 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform ease-in-out duration-300"
           >
             Apply Now
           </button>
           
            )}
          </div>
        ))}
      </div>
      {isApplyPopupOpen && selectedJob && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold">Apply for {selectedJob.title}</h2>
      <input type="file" accept=".pdf,.docx" className="mt-2 block w-full border p-2 rounded-lg" onChange={handleFileChange} />
      <textarea
        className="w-full mt-3 p-2 border rounded-lg"
        placeholder="Cover Letter"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
      />
      <div className="flex justify-between mt-4">
        <button onClick={closeApplyPopup} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
          Cancel
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit Application
        </button>
       

      </div>
    </div>
  </div>
)}

      {isAddJobPopupOpen && (
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
              <button onClick={closeAddJobPopup} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
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
