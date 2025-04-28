import { CheckCircle } from "lucide-react"; // or any icon library

const ResumeChoice = ({ useProfileResume, setUseProfileResume }) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <label className="block text-lg font-semibold mb-2">Resume Option</label>

      <div className="flex gap-6">
        {/* Use Profile Resume Card */}
        <div
          onClick={() => setUseProfileResume(true)}
          className={`relative flex-1 p-6 rounded-lg border cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md
            ${
              useProfileResume ? "border-blue-600 shadow-lg" : "border-gray-300"
            }
          `}
        >
          {useProfileResume && (
            <CheckCircle className="absolute top-4 right-4 text-blue-600 w-6 h-6" />
          )}
          <h4 className="text-xl font-bold mb-2">Use My Profile Resume</h4>
          <p className="text-gray-600 text-sm">
            Use your current resume saved in your profile to apply.
          </p>
        </div>

        {/* Upload New Resume Card */}
        <div
          onClick={() => setUseProfileResume(false)}
          className={`relative flex-1 p-6 rounded-lg border cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md
            ${
              !useProfileResume
                ? "border-blue-600 shadow-lg"
                : "border-gray-300"
            }
          `}
        >
          {!useProfileResume && (
            <CheckCircle className="absolute top-4 right-4 text-blue-600 w-6 h-6" />
          )}
          <h4 className="text-xl font-bold mb-2">Upload New Resume</h4>
          <p className="text-gray-600 text-sm">
            Upload a customized resume specifically for this job.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResumeChoice;
