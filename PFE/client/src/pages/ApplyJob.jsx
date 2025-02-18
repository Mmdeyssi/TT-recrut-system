import { useState } from "react";
import axios from "axios";

const ApplyJob = ({ jobId, jobTitle, jobDescription }) => {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
      alert("Please upload your CV before submitting.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("cv", cv);

    try {
      const response = await axios.post("http://localhost:4000/api/jobs/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Apply for {jobTitle}</h2>
      <p className="text-gray-600 mb-4">{jobDescription}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Upload CV (PDF/DOCX):</span>
          <input type="file" accept=".pdf,.docx" className="mt-2 block w-full border p-2 rounded-lg" onChange={handleFileChange} />
        </label>

        {cv && <p className="text-sm text-green-600">Selected file: {cv.name}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ApplyJob;
