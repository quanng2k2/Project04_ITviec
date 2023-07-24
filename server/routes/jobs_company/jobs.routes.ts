import express, { Request, Response, request } from "express";
import { db } from "../../utils/database";
const jobs = express.Router();

// api get jobs all
jobs.get("/", async (req, res) => {
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications và users
    const [jobs] = await db.query("SELECT * FROM project04.jobs ");
    // Response về cho client
    res.json({
      message: "success",
      jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// api get jobs theo id
jobs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications và users
    const [jobs] = await db.query(
      "SELECT jobs.*, companies.company_name, companies.company_description, companies.industry,  companies.compa_city, companies.logo FROM project04.jobs INNER JOIN project04.companies ON jobs.company_id = companies.company_id WHERE jobs.company_id = ?",
      [id]
    );
    // Response về cho client
    res.json({
      message: "success",
      jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// get về lấy company_Id
jobs.get("/companyID/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications và users
    const [dataCompaId] = await db.query(
      "select * from companies c join users u on u.user_id = c.user_id where c.user_id = ? ",
      [id]
    );
    // Response về cho client
    res.json({
      message: "success",
      dataCompaId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

export { jobs };
