import express, { Request, Response } from "express";
import { db } from "../../utils/database";
import bcrypt from "bcrypt";
import checkExitsEmail from "../../middlewares/validateUser";

const register = express.Router();

register.get("/", async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM project04.users;");
    console.log(users);
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

// register.post("/google", async (req: Request, res: Response) => {
//   try {
//     const { user_name, user_email, user_passwords, roles } = req.body;

//     // Sử dụng database để lấy về toàn bộ user
//     const email: any[] = await db.execute(
//       `SELECT * FROM project04.users where user_email = "${user_email}"`
//     );

//     console.log("email[0]", email[0]);

//     if (email[0].length === 0) {
//       const newUser = [user_name, user_email, user_passwords, roles];
//       const queryString =
//         "INSERT INTO Users(user_name, user_email, user_passwords, roles) VALUES (?, ?, ?, ?)";
//       await db.query(queryString, newUser);

//       return res.status(201).json({
//         status: 201,
//         message: "Thêm mới thành công",
//       });
//     } else {
//       const query = `SELECT * FROM users WHERE user_email = ?`;
//       const [rows] = await db.execute<any[]>(query, [user_email]);
//       const users = rows[0];

//       const isMatch = await bcrypt.compare(
//         user_passwords,
//         users.user_passwords
//       );

//       if (isMatch) {
//         return res.status(200).json({
//           status: 200,
//           message: "Đăng nhập thành công",
//           data: users,
//         });
//       } else {
//         return res.status(401).json({
//           status: 401,
//           message: "Mật khẩu không đúng",
//         });
//       }
//     }
//   } catch (error: unknown) {
//     console.log("Lỗi thêm mới!", error as Error);
//     return res.status(500).json({
//       status: "failed",
//       error: (error as Error).message,
//     });
//   }
// });

register.post("/", checkExitsEmail, async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, user_passwords, roles } = req.body;

    const hashedPassword = await bcrypt.hash(user_passwords, 10);

    const newUser = [user_name, user_email, hashedPassword, roles];

    const queryString =
      "INSERT INTO Users(user_name, user_email, user_passwords, roles) VALUES (?, ?, ?, ?)";

    await db.query(queryString, newUser);

    return res.status(201).json({
      status: 201,
      message: "Thêm mới thành công",
    });
  } catch (error: unknown) {
    return res.status(500).json({
      status: "failed",
      error: (error as Error).message,
    });
  }
});

export { register };
