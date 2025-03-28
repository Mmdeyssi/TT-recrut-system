import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import { AppContent } from "@/context/AppContext";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import AppliedJobTable from "@/components/AppliedJobTable";
import UpdateProfile from "@/components/UpdateProfile";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "@/components/footer";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const { userData } = useContext(AppContent);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="mt-40 max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <AvatarImage src={userData?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="mt-2 text-gray-600 text-sm sm:text-base italic break-words max-w-xs">
                {userData?.profile?.bio}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="self-end sm:self-auto"
            variant="outline"
          >
            <Pen size={18} className="mr-2" />
            Edit
          </Button>
        </div>

        <div className="border-b border-gray-300 w-full my-6 shadow-sm"></div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>{userData?.mail}</span>
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon size={18} />
            <span>{userData?.phone}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-semibold text-base sm:text-lg mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {userData?.profile?.skills?.length > 0 ? (
              userData.profile.skills.map((skill, idx) => (
                <Badge key={idx}>{skill}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <Label className="text-md font-bold block mb-1">Resume</Label>
          {isResume ? (
            <a
              href={userData?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
            >
              {userData?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
