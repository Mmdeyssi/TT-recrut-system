import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full h-[380px] flex flex-col justify-between max-w-sm">
      {/* Top Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={assets.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Tunisie Telecom</h1>
          <p className="text-sm text-gray-500">{job.location || "N/A"}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mb-3">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description || "No description provided."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis ">
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.contractType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} DNT
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4 mb-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          Show more..
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5e2b9e] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
