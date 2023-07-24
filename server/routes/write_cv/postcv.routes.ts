import express, { Request, Response, request } from "express";
import { db } from "../../utils/database";
import multer from "multer";

const addCv = express.Router();

// Thiết lập cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/images`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Thiết lập middleware multer
const upload = multer({ storage });

addCv.post("/", upload.single("cvFile"), async (req, res) => {
  try {
    const { user_id, company_id } = req.body;

    // lấy đường dẫn của file đã tải lên
    const cvFilePath = req.file
      ? `http:localhost:5500/images/${req.file.filename}`
      : "";

    // thực hiện insert cv mới vào database
    const result: any = await db.query(
      `INSERT INTO cv_users (user_id, company_id, cv_file_path) VALUES (?, ?, ?)`,
      [user_id, company_id, cvFilePath]
    );

    // Respond with success message
    return res.json({ message: "CV uploaded successfully!" });
  } catch (error) {
    console.error("Error while uploading CV:", error);
    return res.status(500).json({ error: "Failed to upload CV." });
  }
});

export { addCv };
