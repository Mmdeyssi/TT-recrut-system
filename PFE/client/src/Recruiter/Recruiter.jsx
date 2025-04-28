import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";

import useGetAllAdminJobs from "@/hooks/useGetAdminJobs";
import Navbar from "@/components/Navbar";
import AddJobModal from "@/components/AddJob"; // ✅ import modal
import { deleteJob, setSingleJob } from "@/redux/JobSlice"; // ✅ import action
import { AppContent } from "@/context/AppContext";

import { Trash2, PencilLine, UsersRound, Plus } from "lucide-react";
import EditJobModal from "@/components/EditJob";
import { useNavigate } from "react-router-dom";

const RecruiterJobList = () => {
  const { allAdminJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // ✅ for edit modal
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  useGetAllAdminJobs();

  const handleDelete = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/jobs/delete/${jobId}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Job deleted successfully");
        dispatch(deleteJob(jobId));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    dispatch(setSingleJob(job)); // ✅ set selected job in redux
    setEditOpen(true); // ✅ open the modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Your Job Listings
          </h1>
          <Button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 bg-[#7209b7] hover:bg-[#5f32ad] text-white"
          >
            <Plus size={18} />
            Post New Job
          </Button>
        </div>
        {/* ✅ Modals */}
        <AddJobModal open={addOpen} setOpen={setAddOpen} />
        <EditJobModal open={editOpen} setOpen={setEditOpen} /> {/* ✅ added */}
        {allAdminJobs.length === 0 ? (
          <div className="text-gray-500 text-center mt-20">
            You haven’t posted any jobs yet.
          </div>
        ) : (
          <div className="space-y-6">
            {allAdminJobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 bg-white shadow-sm p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {job.location} • {job.contractType} • {job.salary} LPA
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/application/${job._id}`)}
                  >
                    <UsersRound size={16} />
                    View Applicants
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => handleEdit(job)} // ✅ click handler
                  >
                    <PencilLine size={16} />
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    onClick={() => handleDelete(job._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobList;
