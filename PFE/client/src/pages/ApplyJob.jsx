// ApplyJob.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ResumeChoice from "@/components/ResumeChoice";
import { AppContent } from "@/context/AppContext";

const ApplyJob = ({ jobId, jobTitle, jobDescription, onSuccess }) => {
  const { backendUrl } = useContext(AppContent);

  const [useProfileResume, setUseProfileResume] = useState(true);
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ Trigger success UI

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCv(file);
    } else {
      alert("Only PDF files are allowed.");
      setCv(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("useProfileResume", useProfileResume);
    if (!useProfileResume && cv) {
      formData.append("resume", cv); // Append file if new resume
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/application/apply-job/${jobId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setSuccess(true); // ✅ Show Thank You

        // Close modal after 2s
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Thank You Message
  if (success) {
    return (
      <div className="text-center py-10 transition-opacity duration-500 opacity-100">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Thank you for applying!
        </h2>
        <p className="text-gray-600">
          We’ve received your application for <strong>{jobTitle}</strong>.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          The recruiter will review your resume soon.
        </p>
      </div>
    );
  }

  // ✅ Main Form UI
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Resume option cards */}
      <ResumeChoice
        useProfileResume={useProfileResume}
        setUseProfileResume={setUseProfileResume}
      />

      {/* Upload input (conditionally shown) */}
      {!useProfileResume && (
        <div>
          <label className="block text-md font-medium mb-2">
            Upload New Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      )}

      {/* Submit Button with Spinner */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
};

export default ApplyJob;
