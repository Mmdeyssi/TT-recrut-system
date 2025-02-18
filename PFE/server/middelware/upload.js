/*multer → Middleware for handling file uploads in Express.
path → Helps manage file extensions and directory paths.*/ 
import multer from "multer";

/*destination → Defines where the uploaded files will be stored.
Saves CVs in the uploads/cvs/ directory.
If the folder doesn't exist, it must be created manually (mkdir uploads/cvs). */
/* filename → Renames the uploaded file to prevent duplicate names
Extracts the file’s original extension using path.extname(file.originalname)*/
/*The cb (callback) function in Multer is used to control 
what happens next in the file storage process*/ 


const storage = multer.diskStorage({
    destination :   (req, file, cb)=> {
      cb(null, "uploads/cvs/"); // Save CVs in the 'uploads/cvs/' directory
    },
      filename: (req, file, cb) => {
        // Extract file extension and rename file correctly
        const ext = file.mimetype.split("/")[1]; // Get file type (pdf, png, etc.)
        cb(null, `${Date.now()}-${file.originalname}.${ext}`);
      },
    });

/*mimetype is a property of the uploaded file in Multer that identifies the file type based on 
its MIME (Multipurpose Internet Mail Extensions) format. */
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["application/pdf", "text/csv"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and CSV are allowed."), false);
    }
  };
  export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });
  
  
  // Middleware to extract text from PDF
