import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// ROUTES
import { register } from "./routes/login_logout/register.routes";
import { login } from "./routes/login_logout/login.routes";
import { user_form } from "./routes/information_user/user.routes";
import { Applications } from "./routes/routes_companis/application.routes";
import { company } from "./routes/routes_companis/company.routes";
import { jobs } from "./routes/jobs_company/jobs.routes";
import { alljob } from "./routes/admin-company/all_jobs.routes";
import { cv_user } from "./routes/cv_user/data_cv_user.routes";
import { addCv } from "./routes/write_cv/postcv.routes";

const server: Express = express();

server.use(express.static("public"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// users route
server.use("/api/v1/register", register);
server.use("/api/v1/login", login);
server.use("/api/v1/users", user_form);
server.use("/api/v1/application", Applications);
server.use("/api/v1/company", company);
server.use("/api/v1/jobs", jobs);
server.use("/api/v1/admin-jobs", alljob);
server.use("/api/v1/cv-user", cv_user);
server.use("/api/vi/post_cv", addCv);

server.listen(5500, () => {
  console.log("This server is running on port http://localhost:5500");
});
