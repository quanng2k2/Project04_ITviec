import Sider_bar from "../common/admin/Sider_bar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/infor_user.css";
import Button from "react-bootstrap/Button";

interface UserData {
  address: string;
  user_name: string;
  user_email: string;
  roles: number;
  phoneNumber: string;
}

const Information_user: React.FC = () => {
  const [dataUser, setDataUser] = useState<UserData[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/users");
        setDataUser(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flex: 1 }}>
      <Sider_bar />
      <div className="container-infor-user">
        <h3>Thông tin tất cả user</h3>
        <Table striped bordered hover variant="whire">
          <thead>
            <tr>
              <th>STT</th>
              <th>user_name</th>
              <th>user_email</th>
              <th>Quyền</th>
              <th>phoneNumber</th>
              <th>address</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>
                  {" "}
                  {user.roles === 0
                    ? "admin-ITviec"
                    : user.roles === 1
                    ? "admin-Company"
                    : user.roles === 2
                    ? "user"
                    : ""}
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>
                  <Button variant="danger">Cấp account</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Information_user;
