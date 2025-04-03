import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React, { useState, useEffect, useContext } from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppContent } from "@/context/AppContext"; // adjust path if needed
import { setAllAdminJobs } from "@/redux/JobSlice";
const EditJobModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);
  const { backendUrl } = useContext(AppContent); // assuming backendUrl is here
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    skillsRequired: "",
  });

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        location: singleJob.location || "",
        salary: singleJob.salary || "",
        jobType: singleJob.jobType || "",
        experienceLevel: singleJob.experienceLevel || "",
        position: singleJob.position || "",
        skillsRequired: singleJob.skillsRequired?.join(", ") || "",
      });
    }
  }, [singleJob]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...input,
      skillsRequired: input.skillsRequired
        .split(",")
        .map((skill) => skill.trim()),
    };

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/jobs/edit-job/${singleJob._id}`,
        payload,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Job updated!");
        const updated = await axios.get(`${backendUrl}/api/jobs/admin-jobs`, {
          withCredentials: true,
        });
        dispatch(setAllAdminJobs(updated.data.jobs || []));
        setOpen(false);
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className="mt-20 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center mb-4">
              Edit Job
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              "title",
              "description",
              "location",
              "salary",
              "jobType",
              "experienceLevel",
              "position",
              "skillsRequired",
            ].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <Label htmlFor={field} className="capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </Label>
                <Input
                  id={field}
                  name={field}
                  value={input[field]}
                  onChange={handleChange}
                  type="text"
                  className="p-2 border rounded-md"
                />
              </div>
            ))}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-4">
              {loading ? (
                <Button disabled className="w-full sm:w-auto">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
