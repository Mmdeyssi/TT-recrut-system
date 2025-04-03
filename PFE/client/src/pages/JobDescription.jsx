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
  const dispatch = useDispatch();
  const { id: jobId } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/application/apply-job/${jobId}`,
        null,
        { withCredentials: true }
      );

      if (data.success) {
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: userData?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error applying for job");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
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
                application.applicant?.toString() ===
                userData?.userId?.toString()
            );
            setIsApplied(applied);
          }
        }
      } catch (error) {
        console.log("Error fetching job:", error.message);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, userData?._id]);

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
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} DNT
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`w-full md:w-auto rounded-lg mt-4 md:mt-0 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
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
