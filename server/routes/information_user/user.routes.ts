import express, { Request, Response } from "express";
import { db } from "../../utils/database";
const user_form = express.Router();

interface UpdateUserForm {
  position: string;
  dateOfbirth: string;
  phoneNumber: string;
  address: string;
}

user_form.get("/", async (req, res) => {
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

// api get user_form theo id
user_form.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // sử dụng db để lấy về user_form theo id
    const [users_form] = await db.execute(
      `select * from users where user_id = ${id}`
    );
    // Response về cho client
    res.json({
      message: "success",
      users_form,
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: (error as Error).message,
    });
  }
});

// api update from user theo id
user_form.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { position, dateOfbirth, phoneNumber, address } = req.body;
  try {
    const sql = `UPDATE users SET
      position = IFNULL(?, position),
      dateOfBirth = IFNULL(?, dateOfbirth),
      phoneNumber = IFNULL(?, phoneNumber),
      address = IFNULL(?, address)
      WHERE user_id = ?`;
    const [user_form] = await db.execute(sql, [
      position,
      dateOfbirth,
      phoneNumber,
      address,
      id,
    ]);
    // response về cho client
    res.json({
      message: "success",
      user_form,
    });
  } catch (error) {
    console.log(error, "lỗi cập nhật !!!");
    res.status(500).json({ message: "Error updating user" });
  }
});

export { user_form };
