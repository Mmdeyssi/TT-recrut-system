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

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
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
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold">TT Recrut System</div>

        {/* Desktop Links */}
        {userData?.role === "jobSeeker" && (
          <>
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
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </>
        )}

        {userData?.role === "employer" && (
          <div className="hidden md:flex space-x-8 font-medium">
            <Link to="/admin-jobs" className="hover:underline">
              Manage Jobs
            </Link>
            <Link to="/jobs" className="hover:underline">
              Jobs
            </Link>
          </div>
        )}

        {/* Right section - buttons and avatar */}
        <div className="hidden md:flex items-center space-x-6">
          {userData ? (
            <>
              <button
                onClick={() =>
                  navigate(
                    userData.role === "employer" ? "/admin-jobs" : "/jobs"
                  )
                }
                className="px-6 py-2 text-white font-bold rounded-lg bg-yellow-400 shadow-md hover:bg-yellow-500"
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
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg shadow-md hover:shadow-[0_0_20px_5px_rgba(255,165,0,0.6)] flex items-center gap-2"
            >
              Login
              <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
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
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/jobs");
                setMenuOpen(false);
              }}
              className="px-4 py-2 text-white font-bold rounded-lg bg-yellow-400"
            >
              {userData.role === "employer" ? "Add a Job" : "Apply for Job"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
