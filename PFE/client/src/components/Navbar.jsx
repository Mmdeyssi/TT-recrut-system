import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { LogOut, Mail, User2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AuthModal from "@/pages/AuthModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.succes) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.succes) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <nav
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl px-6 py-4 z-50 rounded-xl bg-white/30 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold">TT Recrut System</div>

        {userData.role === "employer" ? (
          <div className="hidden md:flex space-x-8 font-medium">
            <Link to="/admin-jobs" className="hover:underline">
              Manage Jobs
            </Link>
            <Link to="/jobs" className="hover:underline">
              Jobs
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex space-x-8 font-medium">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/jobs" className="hover:underline">
              Jobs
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {userData ? (
            <>
              <button
                onClick={() =>
                  navigate(
                    userData.role === "employer" ? "/admin-jobs" : "/jobs"
                  )
                }
                className="px-6 py-2 text-white font-bold rounded-lg bg-green-400 shadow-md hover:bg-green-500"
              >
                {userData.role === "employer" ? "Add a Job" : "Apply for Job"}
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={userData.profile?.profilePhoto}
                      alt="@profile"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className="flex gap-2 items-start">
                      <Avatar>
                        <AvatarImage
                          src={userData.profile?.profilePhoto}
                          alt="@profile"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{userData.name}</h4>
                        {userData.role === "jobSeeker" && (
                          <p className="text-sm text-muted-foreground max-w-[200px] truncate">
                            {userData?.profile?.bio || "No bio available"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col my-2 text-gray-600">
                      {userData.role === "jobSeeker" && (
                        <div className="flex items-center gap-2">
                          <User2 />
                          <Button variant="link">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      )}
                      {!userData.isVerified && (
                        <div className="flex items-center gap-2 mt-2">
                          <Mail />
                          <Button onClick={sendVerificationOtp} variant="link">
                            Verify Email
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <LogOut />
                        <Button onClick={logout} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-[0_0_20px_5px_rgba(45,106,79,0.4)]
 flex items-center gap-2"
            >
              Login
              <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3" />
            </button>
          )}
          <AuthModal open={authOpen} setOpen={setAuthOpen} />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col text-lg font-medium">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          {!userData ? (
            <button
              onClick={() => {
                setAuthOpen(true);
                setMenuOpen(false);
              }}
              className="bg-green-600 text-black px-4 py-2 rounded-lg"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/jobs");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 text-white font-bold rounded-lg bg-yellow-400"
              >
                {userData.role === "employer" ? "Add a Job" : "Apply for Job"}
              </button>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={userData.profile?.profilePhoto}
                      alt="@profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{userData.name}</h4>
                    {userData.role === "jobSeeker" && (
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {userData?.profile?.bio || "No bio available"}
                      </p>
                    )}
                  </div>
                </div>

                {userData.role === "jobSeeker" && (
                  <Button
                    variant="link"
                    className="w-fit text-left px-0"
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                  >
                    View Profile
                  </Button>
                )}

                {!userData.isVerified && (
                  <Button
                    variant="link"
                    className="w-fit text-left px-0"
                    onClick={() => {
                      sendVerificationOtp();
                      setMenuOpen(false);
                    }}
                  >
                    Verify Email
                  </Button>
                )}

                <Button
                  variant="link"
                  className="w-fit text-left px-0 text-red-600"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
