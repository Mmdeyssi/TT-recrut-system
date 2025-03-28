/*multer → Middleware for handling file uploads in Express.
path → Helps manage file extensions and directory paths.*/ 
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs/promises";


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
       // const ext = file.mimetype.split("/")[1]; // Get file type (pdf, png, etc.)
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

/*mimetype is a property of the uploaded file in Multer that identifies the file type based on 
its MIME (Multipurpose Internet Mail Extensions) format. */
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["application/pdf"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF Files are allowed."), false);
    }
  };
  export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });

  const storageImage = multer.memoryStorage();
  export const singleUpload = multer({storageImage});
  // Middleware to extract text from PDF

  
  
  export const extractPdfText = async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
  
    try {
      const pdfPath = req.file.path; // Get the uploaded file path
  
      // Read the PDF file
      const dataBuffer = await fs.readFile(pdfPath);
      const pdfData = await pdfParse(dataBuffer);
  
      // Store extracted text in request object
      req.body.extractedText = pdfData.text.trim();
  
      next(); // Pass control to next middleware
    } catch (error) {
      console.error("PDF Extraction Error:", error);
      return res.status(500).json({ success: false, message: "Failed to extract text from PDF" });
    }
  };
