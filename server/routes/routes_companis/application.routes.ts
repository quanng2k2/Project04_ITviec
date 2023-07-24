import express, { Request, Response } from "express";
import { db } from "../../utils/database";
import fs from "fs";
import { RowDataPacket } from "mysql2";
const PDFDocument = require("pdfkit");

const Applications = express.Router();

// API GET: Lấy tất cả đơn xin việc
Applications.get("/", async (req: Request, res: Response) => {
  console.log("lay het");

  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications
    const [application] = await db.query(
      "SELECT * FROM project04.applications"
    );
    // Response về cho client
    res.json({
      message: "success",
      application,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

Applications.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện SELECT tất cả dữ liệu từ bảng Applications và users
    const [application] = await db.query(
      "SELECT Users.*, Applications.*FROM Users INNER JOIN Applications ON Users.user_id = Applications.user_id  WHERE Users.user_id = ?",
      [id]
    );
    // Response về cho client
    res.json({
      message: "success",
      application,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

Applications.post("/", async (req, res) => {
  try {
    const {
      user_id,
      applications_gtbt,
      applications_work_experience,
      applications_education,
      applications_skill,
      applications_diploma,
      applications_personal_project,
    } = req.body;

    // Tạo câu truy vấn để thêm mới Application
    const query = `INSERT INTO Applications (user_id, applications_gtbt, applications_work_experience, applications_education, applications_skill, applications_diploma, applications_personal_project) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // Thực hiện truy vấn sử dụng db.query
    const result: any = await db.query(query, [
      user_id,
      applications_gtbt,
      applications_work_experience,
      applications_education,
      applications_skill,
      applications_diploma,
      applications_personal_project,
    ]);
    res.status(201).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi thêm mới:", error);
    res.status(500).json({ error: "Lỗi thêm mới !!!" });
  }
});

// Route để tạo và tải file PDF
Applications.get("/api/download-file/:id", async (req, res) => {
  console.log("lay 1");
  const { id } = req.params;
  try {
    // Truy vấn cơ sở dữ liệu để lấy dữ liệu cho file PDF
    const query =
      "SELECT Applications.application_id, Applications.applications_gtbt, Applications.applications_work_experience, Applications.applications_education, Applications.applications_skill, Applications.applications_diploma, Applications.applications_personal_project, Users.user_id, Users.user_name, Users.position, Users.user_email, Users.roles, Users.address, Users.phoneNumber, Users.dateOfbirth FROM Applications INNER JOIN Users ON Applications.user_id = Users.user_id WHERE Applications.user_id = ?";
    const [rows] = await db.execute(query, [id]);
    console.log(rows);

    // Chuyển đổi kiểu dữ liệu của rows sang dạng RowDataPacket[]
    const rowDataPackets: RowDataPacket[] = rows as RowDataPacket[];

    // Tạo file PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("file.pdf"));
    doc.font(
      `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
    );
    doc.fontSize(13);
    doc.fillColor("black");

    rowDataPackets.forEach((row) => {
      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Họ và Tên: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.user_name);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Vị trí ứng tuyển: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.position);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Giới thiệu bản thân: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_gtbt);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Địa chỉ sinh sống: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.address);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Email: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.user_email);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Ngày tháng năm sinh: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.dateOfbirth);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("SĐT: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.phoneNumber);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Kỹ năng: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_skill);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Học vấn: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_education);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Kinh nghiệm làm việc: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_work_experience);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Chứng chỉ: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_diploma);

      doc.moveDown(2); // Khoảng cách dòng 2 đơn vị

      doc
        .fillColor("red")
        .font(`${__dirname}/../../public/fonts/Montserrat/Montserrat-Bold.ttf`)
        .text("Dự án cá nhân: ", { continued: true })
        .fillColor("black")
        .font(
          `${__dirname}/../../public/fonts/Montserrat/Montserrat-Regular.ttf`
        )
        .text(row.applications_personal_project);

      doc.moveDown();
    });
    console.log(rowDataPackets);

    // Tạo stream và ghi file PDF
    const filePath = "./file.pdf";
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    doc.end();

    writeStream.on("finish", () => {
      // Gửi file PDF về client
      res.download(filePath, "file.pdf", (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
        // Xóa file PDF sau khi đã gửi về client
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { Applications };
