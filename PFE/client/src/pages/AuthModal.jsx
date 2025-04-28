import React, { useState, useContext } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData, userData } =
    useContext(AppContent);
  //using useState hook // state = 'login' , setState = function to update(change) the state
  const [state, setState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [recruiterCode, setRecruiterCode] = useState("");
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRecruiterCode, setShowRecruiterCode] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("phone", phone);
      formData.append("role", role);
      formData.append("recruiterCode", recruiterCode);
      formData.append("profilePhoto", photo);
      if (state === "Sign Up") {
        setLoading(true);
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          formData
        );

        if (data.succes) {
          setIsLoggedin(true);
          getUserData();
          if (userData.role === "employer") {
            navigate("/admin-jobs");
          } else {
            navigate("/");
          }

          toast.success("Successfull Registration");
        } else {
          toast.error(data.message);
        }
      } else {
        setLoading(true);
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.succes) {
          setIsLoggedin(true);
          await getUserData();
          if (data.user?.role === "employer") {
            navigate("/admin-jobs");
          } else {
            navigate("/");
          }
          toast.success("Logged in Successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      alert("Only image files are allowed.");
      setPhoto(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col md:flex-row max-w-[1100px] w-full max-h-[100vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-0">
        {/* Left Side */}
        <div className="w-full md:w-[40%] bg-gradient-to-br from-[#d0f0e9] to-[#f0fdfb] p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#2D6A4F] mb-2">
            {state === "Login" ? "Welcome Back" : "Join OptiHire"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {state === "Login"
              ? "Log in to access your dashboard"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[60%] bg-white px-8 py-6 flex flex-col justify-center">
          <div className="mb-6 flex justify-center md:justify-start">
            <img src={assets.logo22} alt="Logo" className="h-20" />
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5 w-full">
            {state === "Sign Up" && (
              <>
                <div className="relative w-full">
                  <User
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="w-full h-12 text-sm pl-12 pr-4 rounded-full border border-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
                  />
                </div>
                <div className="relative w-full">
                  <Calendar
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full h-12 text-sm pl-12 pr-4 rounded-full border border-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
                  />
                </div>
                <div className="relative w-full">
                  <Phone
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full h-12 text-sm pl-12 pr-4 rounded-full border border-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="relative w-full">
              <Mail
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 text-sm pl-12 pr-4 rounded-full border border-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <Lock
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 text-sm pl-12 pr-10 rounded-full border border-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role + Recruiter */}
            {state === "Sign Up" && (
              <>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-12 text-sm px-4 rounded-full border border-gray-200 text-gray-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="jobSeeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>

                {role === "employer" && (
                  <div className="relative w-full">
                    <Briefcase
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showRecruiterCode ? "text" : "password"}
                      placeholder="Recruiter Code"
                      value={recruiterCode}
                      onChange={(e) => setRecruiterCode(e.target.value)}
                      required
                      className="w-full h-12 text-sm pl-12 pr-10 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRecruiterCode(!showRecruiterCode)}
                      className="absolute right-4 top-3 text-gray-500"
                    >
                      {showRecruiterCode ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full h-12 text-sm px-4 py-2 rounded-full border border-gray-200"
                />
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-[#2D6A4F] hover:bg-[#40916C] text-white rounded-full py-3 text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : state === "Login" ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Forgot password */}
          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-xs text-center text-gray-500 mt-4 underline cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          {/* Toggle Auth */}
          <div className="text-center text-sm text-gray-600 mt-4">
            {state === "Login" ? (
              <span>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-[#2D6A4F] font-semibold"
                  onClick={() => setState("Sign Up")}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#2D6A4F] font-semibold"
                  onClick={() => setState("Login")}
                >
                  Log In
                </button>
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
