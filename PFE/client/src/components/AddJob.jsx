import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppContent } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addAdminJob, setAllJobs } from "@/redux/JobSlice";

const AddJobModal = ({ open, setOpen }) => {
  const { backendUrl } = useContext(AppContent);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    salary: "",

    location: "",
    contractType: "",
    experience: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      skillsRequired,
      salary,

      location,
      contractType,
      experience,
    } = formData;

    if (
      !title ||
      !description ||
      !skillsRequired ||
      !salary ||
      !location ||
      !contractType ||
      !experience
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/jobs/add-job`,
        {
          ...formData,
          skillsRequired: skillsRequired.split(","),
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Job added successfully!");
        setOpen(false);

        setFormData({
          title: "",
          description: "",
          skillsRequired: "",
          salary: "",

          location: "",
          contractType: "",
          experience: "",
        });
        dispatch(addAdminJob(data.job));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full bg-white rounded-xl shadow-xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            Post New Job
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          {[
            { name: "title", type: "text", label: "Job Title" },
            {
              name: "description",
              type: "textarea",
              label: "Description",
            },
            {
              name: "skillsRequired",
              type: "text",
              label: "Skills (comma separated)",
            },
            { name: "salary", type: "number", label: "Salary (in DNT)" },

            { name: "location", type: "text", label: "Location" },
            { name: "contractType", type: "text", label: "Contract Type" },
            {
              name: "experience",
              type: "number",
              label: "Experience (in years)",
            },
          ].map(({ name, type, label }) => (
            <div key={name} className="flex flex-col gap-1">
              <Label htmlFor={name}>{label}</Label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={changeHandler}
                  rows={3}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              ) : (
                <Input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={changeHandler}
                  required
                />
              )}
            </div>
          ))}

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-4">
            {loading ? (
              <Button disabled className="w-full sm:w-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Post Job
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
      </DialogContent>
    </Dialog>
  );
};
export default AddJobModal;
