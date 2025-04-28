import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React, { useContext, useEffect, useState } from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AppContent } from "@/context/AppContext";

import { toast } from "react-toastify";
import axios from "axios";

import { Loader2 } from "lucide-react";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { userData, backendUrl, setUserData } = useContext(AppContent);
  const [input, setInput] = useState({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    bio: userData?.profile?.bio || "",
    skills: userData?.profile?.skills?.map((skill) => skill) || "",
    file: userData?.profile?.resume || "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("resume", input.file); // Ensure "resume" matches `upload.single("resume")`
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        backendUrl + "/api/user/update/profile", // Correct API route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setUserData({
          name: data.user.fullName,
          mail: data.user.email,
          phone: data.user.phone,
          role: data.user.role,
          isVerified: data.user.isVerified,
          userId: data.user._id,
          profile: {
            ...data.user.profile,
          },
        });
      }
    } catch (error) {
      toast.error(error || "Update failed");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className=" mt-20 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center mb-4">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} className="space-y-4">
            {["fullName", "email", "phone", "bio", "skills"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <Label
                  htmlFor={field}
                  className="text-sm font-medium capitalize"
                >
                  {field}
                </Label>
                <Input
                  id={field}
                  name={field}
                  value={input[field]}
                  onChange={changeEventHandler}
                  type={field === "email" ? "email" : "text"}
                  className="p-2 border rounded-md"
                />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <Label htmlFor="file" className="text-sm font-medium">
                Resume
              </Label>
              <Input
                id="file"
                name="resume"
                type="file"
                onChange={fileChangeHandler}
                accept="application/pdf"
                className="p-2 border rounded-md"
              />
            </div>
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
                    Update
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
