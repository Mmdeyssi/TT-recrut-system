import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const EmailVerified = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp }
      );

      if (data.succes) {
        toast.success(data.message);
        setIsSuccess(true);
        getUserData();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#d0f0e9] to-[#f0fdfb] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        {isSuccess ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="text-green-500 w-12 h-12" />
            <h2 className="text-xl font-semibold text-green-700">
              Email Verified!
            </h2>
            <p className="text-sm text-gray-600">Redirecting to homepage...</p>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2D6A4F]">
              Email Verification
            </h1>
            <p className="text-sm text-gray-600">
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
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
