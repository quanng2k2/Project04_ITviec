import Navbar from "../common/users/Navbar_Page";
import Button from "react-bootstrap/Button";
import "./css/login.css";
import Footer from "../common/users/Footer";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Users {
  data: {
    roles: number;
  };
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailes, setEmailes] = useState("");
  const [passwordes, setPasswordes] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const newUsers = {
    email: emailes,
    passwords: passwordes,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailes || !passwordes) {
      toast.error("Email hoặc mật khẩu không được để trống !!!", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const res = await axios.post<Users>(
        "http://localhost:5500/api/v1/login",
        newUsers
      );
      localStorage.setItem("flagUser", JSON.stringify(res.data.data));

      // Lấy vai trò từ res.data.data và chuyển hướng tùy thuộc vào vai trò
      const role = res.data.data.roles;
      if (role === 0) {
        navigate("/admin-company");
        toast.success("Đăng nhập thành công ;) ", {
          autoClose: 1000,
        });
      } else if (role === 1) {
        navigate("/admin-company-job");
        toast.success("Đăng nhập thành công ;) ", {
          autoClose: 1000,
        });
      } else if (role === 2) {
        navigate("/");
        toast.success("Đăng nhập thành công ;) ", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 400
      ) {
        toast.error("Email hoặc mật khẩu không đúng !!!");
      } else {
        console.error(err);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-login">
        <div className="item-from">
          <form onSubmit={handleSubmit}>
            <div className="hearder">
              <h3>Chào mừng đến với </h3>
              <img
                src="http://localhost:5173/assets/images/logo-itviec2.png"
                alt="loading..."
              />
            </div>
            <button className="login-google">
              <span>
                <i className="fa-brands fa-google-plus-g"></i>
              </span>{" "}
              Đăng nhập bằng Google
            </button>
            <label htmlFor="">Email *</label>
            <br />
            <input
              value={emailes}
              onChange={(e) => setEmailes(e.target.value)}
              className="input-email"
              type="text"
              placeholder="Email "
            />
            <br />
            <div className="login-pass">
              <label htmlFor="">Mật Khẩu *</label>
              <a className="forgot-pass" href="">
                Quên mật khẩu ?
              </a>
            </div>
            <div className="icon-eye">
              <input
                value={passwordes}
                onChange={(e) => setPasswordes(e.target.value)}
                className="input-email2"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu "
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={handleTogglePassword}
              ></i>
            </div>

            <Button className="button-loginWeb" variant="danger" type="submit">
              Đăng nhập bằng Email
            </Button>

            <p className="foo-login">
              Không có tài khoản ?
              <span>
                <NavLink className="forgot-pass" to="/register">
                  Đăng ký ngay !
                </NavLink>
              </span>
            </p>
          </form>
        </div>
        <div className="item-note">
          <h4>
            Đăng nhập để có quyền truy cập ngay vào hàng ngàn đánh giá và thông
            tin về lương
          </h4>
          <p>
            <span className="icon-fb">✅</span> Xem mức lương để giúp bạn thương
            lượng lời đề nghị hoặc tăng lương
          </p>
          <p>
            <span className="icon-fb">✅</span> Tìm hiểu về phúc lợi, phỏng vấn,
            văn hóa công ty qua các bài đánh giá
          </p>
          <p>
            <span className="icon-fb">✅</span> Dễ dàng áp dụng chỉ với 1 cú
            nhấp chuột
          </p>
          <p>
            <span className="icon-fb">✅</span> Quản lý hồ sơ và quyền riêng tư
            của riêng bạn
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer className="toast-container-custom" />
    </div>
  );
};
export default Login;
