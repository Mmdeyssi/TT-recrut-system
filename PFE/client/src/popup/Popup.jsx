import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Close Icon
import axios from "axios"; // API requests
import { toast } from "react-toastify"; // Notifications
import { AppContent } from "../context/AppContext";


const PopupButton = ({ role, userId }) => {
  const {backendUrl} = useContext(AppContent)
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    cv: null,
    message: "",
  });

  // Handle input changes
  /* setFormData({...formData, cv: e.target.files[0]}):
Creates a copy of the existing formData state.
Updates the cv field with the selected file. */
/* Square Brackets [e.target.name]:
Used to update any field dynamically without writing separate if conditions.*/
  const handleChange = (e) => {
    if (e.target.name === "cv") {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form (either Add Job or Apply for Job)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "employer") {
        // Add Job
        const { title, description, skillsRequired } = formData;
        if (!title || !description || !skillsRequired) {
          return toast.error("All fields are required!");
        }

        const {data} = await axios.post(backendUrl+'/api/jobs/add-job', {
          title,
          description,
          skillsRequired,
          employerId: userId,
        });

        if (data.success) {
          toast.success("Job posted successfully!");
          setIsOpen(false);
        } else {
          toast.error(data.message);
        }
      } else {
        // Apply for Job
        if (!formData.cv) {
          return toast.error("Please upload your CV!");
        }

        const formDataToSend = new FormData();
        formDataToSend.append("jobId", "JOB_ID_HERE"); // Replace dynamically
        formDataToSend.append("applicantId", userId);
        formDataToSend.append("cv", formData.cv);
        formDataToSend.append("message", formData.message);

        const {data} = await axios.post(backendUrl+'/api/applications/apply', formDataToSend);

        if (data.success) {
          toast.success("Application submitted successfully!");
          setIsOpen(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Button to Open Popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:scale-105 transition-all"
      >
        {role === "employer" ? "Add a Job" : "Apply for Job"}
      </button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[400px] relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                {role === "employer" ? "Add a Job" : "Apply for Job"}
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-4 text-left">
                {/* Employer - Add Job Form */}
                {role === "employer" ? (
                  <>
                    <label className="block text-gray-700 font-medium">Job Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <label className="block mt-2 text-gray-700 font-medium">Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    ></textarea>

                    <label className="block mt-2 text-gray-700 font-medium">Skills Required:</label>
                    <input
                      type="text"
                      name="skillsRequired"
                      value={formData.skillsRequired}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </>
                ) : (
                  // Job Seeker - Apply for Job Form
                  <>
                    <label className="block text-gray-700 font-medium">Upload Resume:</label>
                    <input
                      type="file"
                      name="cv"
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <label className="block mt-2 text-gray-700 font-medium">Message:</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write a short message to the recruiter..."
                      className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    ></textarea>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
                >
                  {role === "employer" ? "Post Job" : "Send Application"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopupButton;
