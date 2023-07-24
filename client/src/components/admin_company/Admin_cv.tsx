import { useState, useEffect } from "react";
import Sider_bar from "../common/admin/Sider_bar";
import Table from "react-bootstrap/Table";
import axios from "axios";

interface cv_User {
  user_email: string;
  phoneNumber: number;
  link_cv: string;
}

interface compaId {
  company_id: number;
}

const Admin_cv: React.FC = () => {
  const userLocal = localStorage.getItem("flagUser");
  const dataUser = userLocal ? JSON.parse(userLocal) : null;

  // state get data CVs teo company_id
  const [dataCv, setDataCv] = useState<cv_User[]>([]);

  // state lấy id company
  const [dataJobsMyCompany, setDataJobsMyCompany] = useState<compaId[]>([]);
  // console.log(dataJobsMyCompany[0]?.company_id);

  // get api để lấy company_id
  const loadCompaId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/jobs/companyID/${dataUser.user_id}`
      );
      const companyID = response?.data?.dataCompaId[0]?.company_id;
      setDataJobsMyCompany(response?.data?.dataCompaId);

      const responseCV = await axios.get(
        `http://localhost:5500/api/v1/cv-user/${companyID}`
      );
      setDataCv(responseCV?.data?.cv_user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("dataCv", dataCv);

  useEffect(() => {
    loadCompaId();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flex: 1 }}>
      <Sider_bar />
      <div className="container-admin-companys">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Email ứng tuyển</th>
              <th>Số điện thoại</th>
              <th>Link CV</th>
            </tr>
          </thead>
          <tbody>
            {dataCv.map((cv, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cv.user_email}</td>
                <td>{cv.phoneNumber}</td>
                <td>{cv.link_cv}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin_cv;
