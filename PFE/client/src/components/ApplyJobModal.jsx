// ApplyJobModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ApplyJob from "@/pages/ApplyJob";
import { setSingleJob } from "@/redux/JobSlice";
// Your form component

const ApplyJobModal = ({
  open,
  setOpen,
  jobId,
  jobTitle,
  jobDescription,
  singleJob,
  userData,
  dispatch,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>
        <ApplyJob
          jobId={jobId}
          jobTitle={jobTitle}
          jobDescription={jobDescription}
          onSuccess={() => {
            const updatedSingleJob = {
              ...singleJob,
              applications: [
                ...singleJob.applications,
                { applicant: userData?.userId },
              ],
            };
            dispatch(setSingleJob(updatedSingleJob)); // ✅ Manually update Redux
            setOpen(false); // ✅ Close Modal
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
