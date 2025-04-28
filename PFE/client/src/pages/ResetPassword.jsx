import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.succes ? toast.success(data.message) : toast.error(data.message);
      data.succes && setIsEmailSent(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      data.succes ? toast.success(data.message) : toast.error(data.message);
      data.succes && navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#d0f0e9] to-[#f0fdfb] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full">
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-[#2D6A4F]">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Enter your registered email address:
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 rounded-full border border-gray-300 shadow-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-[#2D6A4F] text-white hover:bg-[#40916C]"
            >
              Submit
            </Button>
          </form>
        )}

        {!isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitOtp} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-[#2D6A4F]">
              Enter OTP
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Enter the 6-digit code sent to your email:
            </p>
            <div onPaste={handlePaste} className="flex justify-between">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md shadow-sm"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-[#2D6A4F] text-white hover:bg-[#40916C]"
            >
              Submit
            </Button>
          </form>
        )}

        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-[#2D6A4F]">
              New Password
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Enter your new password below:
            </p>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pl-10 rounded-full border border-gray-300 shadow-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-[#2D6A4F] text-white hover:bg-[#40916C]"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
