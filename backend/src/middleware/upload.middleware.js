import multer from "multer";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]; // Allowed MIME types for uploaded files(MIME=Multipurpose Internet Mail Extensions)

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

const storage = multer.memoryStorage(); // Store files in memory (not on disk)

// here cb stands for callback, it is a function that is called after the file is processed. It takes two arguments: an error (if any) and a boolean indicating whether to accept the file or not.
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."),
      false,
    ); // Reject the file
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

// This function creates a middleware for handling single file uploads. It takes the field name as an argument and returns a middleware function that processes the file upload. If there is an error during the upload (such as an invalid file type or exceeding the file size limit), it sends a JSON response with an appropriate error message and status code.
// const uploadSingleImage = (fieldName) => {
//   const middleware = upload.single(fieldName);

//   return (req, res, next) => {
//     middleware(req, res, (err) => {
//       if (!err) {
//         return next();
//       }

//       const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
//       const message =
//         err.code === "LIMIT_FILE_SIZE"
//           ? "Image too large. Maximum size is 5 MB."
//           : err.message || "Invalid file upload.";
//       return res.status(status).json({ error: message });
//     });
//   };
// };
const uploadSingleImage = (fieldName) => {
  const middleware = upload.single(fieldName);

  return (req, res, next) => {
    middleware(req, res, (err) => {
      if (!err) {
        return next();
      }

      const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;

      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image too large. Maximum size is 5 MB."
          : err.message || "Invalid file upload.";

      return res.status(status).json({ error: message });
    });
  };
};

export { uploadSingleImage };
