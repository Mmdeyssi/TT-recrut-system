import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const RankingModal = ({ open, setOpen, applicants }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            🏆 Full Applicant Ranking
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-96 pr-4">
          <ul className="space-y-4">
            {applicants.map((applicant, index) => (
              <li
                key={applicant._id}
                className={`p-4 rounded-lg shadow-md border flex items-center justify-between transition ${
                  index < 3
                    ? "bg-gradient-to-r from-yellow-100 to-white"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={applicant.profilePhoto}
                    alt={applicant.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{applicant.fullName}</h4>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-indigo-600">
                    {applicant.matchScore}%
                  </span>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <DialogClose asChild>
          <Button className="w-full mt-6 bg-indigo-600 text-white hover:bg-indigo-700">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default RankingModal;
