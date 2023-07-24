import express, { Request, Response } from "express";
import { db } from "../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = express.Router();

// get về tất cả user
login.get("/", async (req, res) => {
  try {
    // Sử dụng database để lấy về toàn bộ user
    const [users] = await db.execute("SELECT * FROM project04.users;");
    console.log(users);
    // Response về cho client
    res.json({
      message: "success",
      users,
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: (error as Error).message,
    });
  }
});

// API đăng nhập
login.post("/", async (req: Request, res: Response) => {
  try {
    const { email, passwords } = req.body;
    const query = "SELECT * FROM users WHERE user_email = ?";
    let users: any | null = null;

    const [rows] = await db.execute<any[]>(query, [email]);

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng !",
      });
    }

    users = rows[0];

    const isMatch = await bcrypt.compare(passwords, users.user_passwords);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng !",
      });
    }

    const token = jwt.sign({ id: users.userId }, "your_secret_key", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: 200,
      message: "Đăng nhập thành công",
      data: users,
      token,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

export { login };
