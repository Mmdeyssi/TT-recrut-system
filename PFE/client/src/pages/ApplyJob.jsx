// ApplyJob.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ResumeChoice from "@/components/ResumeChoice";
import { AppContent } from "@/context/AppContext";

const ApplyJob = ({ jobId, jobTitle, jobDescription, onSuccess }) => {
  const [useProfileResume, setUseProfileResume] = useState(true);
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContent);

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
      formData.append("cv", cv); // Append uploaded resume
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
        if (onSuccess) {
          onSuccess();
        } // ✅ Call parent success handler (close modal, mark applied)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Resume choice */}
      <ResumeChoice
        useProfileResume={useProfileResume}
        setUseProfileResume={setUseProfileResume}
      />

      {/* Upload new file input */}
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

      {/* Submit button */}
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
