import express, { Request, Response, request } from "express";
import { db } from "../../utils/database";
import multer from "multer";

interface CompanyData {
  company_id: number;
  logo: string;
  company_name: string;
  compa_city: string;
  company_description: string;
  compa_salary: string;
  industry: string;
}

const company = express.Router();

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

// api search theo industry and company-name
company.get("/search/:q", async (req: Request, res: Response) => {
  const searchTerm = req.params.q;
  try {
    const dataSearch = await db.execute(
      `SELECT company_id , logo , industry , compa_city ,company_name FROM Companies WHERE company_name LIKE '%${searchTerm}%' OR industry LIKE '%${searchTerm}%'`
    );
    const [search] = dataSearch;
    res.json({
      status: "success",
      search,
    });
  } catch (error) {
    res.json(error);
  }
});

// Api lấy 3 dữ liệu công ty
company.get("/", async (req, res) => {
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng company
    const [company] = await db.query(
      "SELECT * FROM project04.companies limit 3"
    );
    // Response về cho client
    res.json({
      message: "success",
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// Api lấy hết tất cả dữ liệu công ty
company.get("/all", async (req, res) => {
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng company
    const [company] = await db.query("SELECT * FROM project04.companies");
    // Response về cho client
    res.json({
      message: "success",
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// api get về theo id
company.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện get data company theo id
    const [companyID] = await db.query(
      "SELECT * FROM project04.companies WHERE company_id = ?",
      [id]
    );
    // Response về cho client
    res.json({
      message: "success",
      companyID,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// API post công ty mới với tải lên một ảnh
company.post(
  "/",
  upload.single("logo"),
  async (req: Request, res: Response) => {
    try {
      const {
        company_name,
        company_description,
        industry,
        compa_city,
        user_id,
      } = req.body;

      // Lấy đường dẫn của file đã tải lên
      const logoPath = req.file
        ? `http://localhost:5500/images/${req.file.filename}`
        : "";

      // Thực hiện INSERT công ty mới vào database
      const result: any = await db.query(
        `INSERT INTO Companies (company_name, company_description, industry, compa_city, logo, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          company_name,
          company_description,
          industry,
          compa_city,
          logoPath,
          user_id,
        ]
      );

      // Lấy ID của công ty đã được thêm mới
      const insertedCompanyId = result.insertId;

      res.json({
        message: "Thêm thành công",
        company_id: insertedCompanyId,
      });
    } catch (error) {
      console.error("err---------", error);
      return res.status(500).json({ error: "Đã xảy ra lỗi" });
    }
  }
);

// API xóa công ty theo ID
company.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result: any = await db.query(
      "DELETE FROM project04.companies WHERE company_id = ?",
      [id]
    );
    res.status(201).json({ message: "Xóa công ty thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

export { company };
