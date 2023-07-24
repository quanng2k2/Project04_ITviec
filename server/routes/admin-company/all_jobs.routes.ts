import express, { Request, Response, request } from "express";
import { db } from "../../utils/database";
const alljob = express.Router();

alljob.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // thực hiện lấy ra tất cả các jobs từ công ty, joint tbl_cty với users theo userId
    const [all_jobs] = await db.query(`SELECT j.*
        FROM project04.jobs as j
        JOIN project04.companies as c ON c.company_id = j.company_id
        JOIN project04.users as u ON u.user_id = c.user_id
        WHERE u.user_id = ${id};`);

    const [all_companies] = await db.query(`SELECT *
        FROM project04.companies as c
        JOIN project04.users as u ON u.user_id = c.user_id
        WHERE u.user_id = ${id};`);
    res.json({
      message: "thành công",
      all_jobs,
      all_companies,
    });
    console.log(all_jobs);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

alljob.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { descriptions, location, salary, required_skills, experience_level } =
    req.body;
  try {
    // Thực hiện kiểm tra xem công ty có tồn tại không
    const [company] = await db.query(
      `SELECT * FROM project04.companies WHERE company_id = ?`,
      [id]
    );

    // Thực hiện thêm công việc mới
    const newJob = {
      descriptions: descriptions,
      location: location,
      salary: salary,
      required_skills: required_skills,
      experience_level: experience_level,
      company_id: id,
    };

    await db.query("INSERT INTO project04.jobs SET ?", [newJob]);
    res.json({ message: "Thêm công việc thành công" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

alljob.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Kiểm tra xem công việc có tồn tại không
    const [job] = await db.query(
      `SELECT * FROM project04.jobs WHERE job_id = ?`,
      [id]
    );
    if (!job) {
      return res.status(404).json({ error: "Công việc không tồn tại" });
    }

    // Thực hiện xóa công việc
    await db.query("DELETE FROM project04.jobs WHERE job_id = ?", [id]);
    res.json({ message: "Xóa công việc thành công" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { alljob };
