import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { AppContent } from "@/context/AppContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  setAllApplicants,
  updateApplicantStatus,
} from "@/redux/applicationSlice";
import { useParams } from "react-router-dom";
import RankingModal from "./RAnkingModal";
import { Button } from "@/components/ui/button";

const ViewApplications = () => {
  const dispatch = useDispatch();
  const shortlistingStatus = ["accepted", "rejected"];
  const { backendUrl } = useContext(AppContent);
  const { applicants, statusMap } = useSelector((state) => state.application);
  const { jobId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/application/applicants/${jobId}`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(data.job));
      } catch (err) {
        console.error("Failed to fetch applicants:", err.message);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const handleStatusChange = async (newStatus, id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/application/status/${id}/update`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(updateApplicantStatus({ id, status: newStatus }));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Navbar />
      <h2 className="text-3xl font-bold mb-8 text-center mt-20">
        Applicants ({applicants?.applications?.length})
      </h2>

      {applicants?.applications?.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applicants.applications.map((item) => {
                  const currentStatus = statusMap?.[item._id] || item.status;

                  return (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={item?.applicant?.profile?.profilePhoto}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">
                          {item?.applicant?.fullName}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item?.applicant?.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item?.applicant?.phone || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-blue-600 underline">
                        {item?.applicant?.profile?.resume ? (
                          <a
                            href={item.applicant.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.applicant.profile.resumeOriginalName ||
                              "View Resume"}
                          </a>
                        ) : (
                          <span className="text-gray-400">No resume</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          className={`text-xs font-medium ${
                            currentStatus === "accepted"
                              ? "bg-green-100 text-green-700"
                              : currentStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {currentStatus}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-32 p-2">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                key={index}
                                onClick={() =>
                                  handleStatusChange(status, item._id)
                                }
                                className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 rounded capitalize"
                              >
                                {status}
                              </div>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ✅ View Full Ranking Button OUTSIDE Table */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Top Matches 📊
            </Button>
          </div>

          {/* ✅ Ranking Modal */}
          <RankingModal
            open={modalOpen}
            setOpen={setModalOpen}
            applicants={
              applicants?.applications?.map((a) => ({
                _id: a.applicant._id,
                fullName: a.applicant.fullName,
                email: a.applicant.email,
                profilePhoto: a.applicant.profile?.profilePhoto,
                matchScore: a.matchScore || Math.floor(Math.random() * 40) + 60, // temp score
              })) || []
            }
          />
        </>
      )}
    </div>
  );
};

export default ViewApplications;
