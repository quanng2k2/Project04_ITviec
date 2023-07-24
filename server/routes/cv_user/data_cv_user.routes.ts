import express, { Request, Response, request } from "express";
import { db } from "../../utils/database";
const cv_user = express.Router();

cv_user.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications và users
    const [cv_user] = await db.query(
      "select u.user_id, u.user_email, u.phoneNumber, u.user_id, c.cv_file_path as link_cv from users u JOIN cv_users c ON c.user_id = u.user_id where company_id = ? ;",
      [id]
    );
    // Response về cho client
    res.json({
      message: "success",
      cv_user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

export { cv_user };
