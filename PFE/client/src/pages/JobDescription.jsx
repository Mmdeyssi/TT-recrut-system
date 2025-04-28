import ApplyJobModal from "@/components/ApplyJobModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/AppContext";
import { setSingleJob } from "@/redux/JobSlice";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const JobDescription = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const { id: jobId } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();
  const fetchSingleJob = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/jobs/search-job/${jobId}`,
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setSingleJob(data.job));

        if (userData?.userId) {
          const applied = data.job.applications.some(
            (application) =>
              application.applicant?.toString() === userData?.userId?.toString()
          );
          setIsApplied(applied);
        }
      }
    } catch (error) {
      toast.error("Error fetching job:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    fetchSingleJob();
  }, [jobId, dispatch, userData?._id]);
  if (loading || !singleJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center animate-pulse text-gray-600">
        <svg
          className="w-12 h-12 text-indigo-500 mb-4 animate-spin"
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
        <p className="text-lg font-medium">Loading job description...</p>
        <p className="text-sm text-gray-400">Please wait a moment</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Back to Jobs */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.contractType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} DNT
            </Badge>
          </div>
        </div>

        {userData?.role === "jobSeeker" && (
          <Button
            onClick={() => setOpenModal(true)}
            disabled={isApplied}
            className={`w-full md:w-auto rounded-lg mt-4 md:mt-0 ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        )}
        <ApplyJobModal
          open={openModal}
          setOpen={setOpenModal}
          jobId={singleJob?._id}
          jobTitle={singleJob?.title}
          jobDescription={singleJob?.description}
          singleJob={singleJob}
          userData={userData}
          dispatch={dispatch} // 🔥 pass dispatch
        />
      </div>

      {/* Separator */}
      <div className="border-b-2 border-gray-300 text-xl font-semibold mt-10 mb-4"></div>

      {/* Job Details */}
      <div className="space-y-3 text-base text-gray-700">
        <p>
          <strong>Role:</strong> {singleJob?.title}
        </p>
        <p>
          <strong>Location:</strong> {singleJob?.location}
        </p>
        <p>
          <strong>Description:</strong> {singleJob?.description}
        </p>
        <p>
          <strong>Experience:</strong> {singleJob?.experienceLevel} yrs
        </p>
        <p>
          <strong>Salary:</strong> {singleJob?.salary} DNT
        </p>
        <p>
          <strong>Contract:</strong> {singleJob?.contractType}
        </p>

        {/* ✅ Skills Required */}
        <p>
          <strong>Skills Required:</strong>{" "}
          {singleJob?.skillsRequired?.length > 0
            ? singleJob.skillsRequired.join(", ")
            : "Not specified"}
        </p>

        <p>
          <strong>Total Applicants:</strong>{" "}
          {singleJob?.applications?.length || 0}
        </p>
        <p>
          <strong>Posted Date:</strong> {singleJob?.createdAt?.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
