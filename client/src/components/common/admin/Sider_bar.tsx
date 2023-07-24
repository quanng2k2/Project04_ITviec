import { NavLink } from "react-router-dom";
import "./css/sider_bar.css";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../Admin/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

interface companyData {
  logo: string;
  company_name: string;
  user_id: number;
}

const Sider_bar: React.FC = () => {
  // state get api của company and jobs
  const [allDataCompany, setAllDataCompany] = useState<companyData[]>([]);

  const { handleLogout } = useAuth();

  // Retrieve user data from local storage
  const dataUser = localStorage.getItem("flagUser");
  const userLocal = dataUser ? JSON.parse(dataUser) : null;

  const loaDataCompany = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/admin-jobs/${userLocal.user_id}`
      );
      setAllDataCompany([...response.data.all_companies]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loaDataCompany();
  }, []);

  return (
    <div>
      <div className="wrapper">
        {/* Top menu */}
        <div className="sidebar">
          {/* Profile image & text */}
          <div className="profile">
            {userLocal.roles === 0 ? (
              <>
                <img src="/assets/admin/avt-admin.jpg" alt="profile_picture" />
                <h3>Nguyễn Gia Quân</h3>
                <p>
                  JS_230213
                  <span>👋</span>
                </p>
              </>
            ) : (
              <>
                {allDataCompany.length > 0 && (
                  <>
                    <img src={allDataCompany[0].logo} alt="profile_picture" />
                    <h3>{allDataCompany[0].company_name}</h3>
                  </>
                )}
                <p>
                  JS_230213
                  <span>👋</span>
                </p>
              </>
            )}
          </div>

          {/* Menu items */}
          <>
            <ul>
              {userLocal.roles === 0 ? (
                <>
                  <li>
                    <NavLink to="/admin-company">Admin công ty</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin-user">Thông tin người dùng</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/admin-company-job">Admin Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin-cv">Thông tin CV</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/income-admin">Doanh thu</NavLink>
              </li>
              <li>
                <NavLink to="/admin-setting">Cài đặt</NavLink>
              </li>
            </ul>
            <Button
              className="button-logout"
              variant="outline-light"
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </>
        </div>
      </div>
    </div>
  );
};
export default Sider_bar;
