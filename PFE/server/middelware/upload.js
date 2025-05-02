/*multer → Middleware for handling file uploads in Express.
path → Helps manage file extensions and directory paths.*/ 
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";

/*destination → Defines where the uploaded files will be stored.
Saves CVs in the uploads/cvs/ directory.
If the folder doesn't exist, it must be created manually (mkdir uploads/cvs). */
/* filename → Renames the uploaded file to prevent duplicate names
Extracts the file’s original extension using path.extname(file.originalname)*/
/*The cb (callback) function in Multer is used to control 
what happens next in the file storage process*/ 




// ✅ Memory storage for profile images
const storageImage = multer.memoryStorage();

// ✅ File type filter for images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
const customStorage = {
  _handleFile(req, file, cb) {
    if (file.fieldname === "resume") {
      // Use diskStorage manually
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join("uploads/cvs", filename);
      const outStream = createWriteStream(filepath);

      file.stream.pipe(outStream);
      outStream.on("error", cb);
      outStream.on("finish", () => {
        cb(null, {
          path: filepath,
          filename,
        });
      });
    } else if (file.fieldname === "profilePhoto") {
      // Use memoryStorage manually
      const chunks = [];
      file.stream.on("data", (chunk) => chunks.push(chunk));
      file.stream.on("end", () => {
        cb(null, {
          buffer: Buffer.concat(chunks),
        });
      });
    } else {
      cb(new Error("Unexpected field"));
    }
  },
  _removeFile(req, file, cb) {
    cb(null);
  },
};

// ✅ Middleware for profile photo only (Cloudinary)
export const singleUpload = multer({
  storage: storageImage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Middleware for both resume and profile image in one request
export const upload = multer({
  storage: customStorage, // This will be overridden in controller logic or used only for images
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);



  // Middleware to extract text from PDF

  
  
  export const extractPdfText = async (req, res, next) => {
    if (!req.file) {
      return next(); // No file uploaded, skip extraction
    }
  
    try {
      const pdfPath = req.file.path;
      const dataBuffer = await fs.readFile(pdfPath);
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text || "";
  
      const cleanedText = text
        .replace(/\r\n|\n|\r/g, " ")  // Remove line breaks
        .replace(/\s+/g, " ")         // Collapse multiple spaces
        .replace(/[^\w\s.,:;!?@%&()-]/g, "") // Keep punctuation
        .trim()
        .toLowerCase();               // normalize to lowercase
  
      req.body.extractedText = cleanedText;
  
      next(); // Move on to the next handler
    } catch (error) {
      console.error("Error extracting PDF text:", error.message);
  
      // ✨ Optional: Clean up file if error happens
      if (req.file?.path) {
        try {
          await fs.unlink(req.file.path); // delete uploaded file if error
        } catch (cleanupError) {
          console.error("Error deleting file after failure:", cleanupError.message);
        }
      }
  
      return res.status(500).json({
        success: false,
        message: "Failed to extract text from resume PDF",
      });
    }
  };
  