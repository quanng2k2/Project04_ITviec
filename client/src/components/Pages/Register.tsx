import { useState } from "react";
import Navbar from "../common/users/Navbar_Page";
import "./css/register.css";
import Footer from "../common/users/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  user_email: string;
  user_name: string;
  user_passwords: string;
  roles: number;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = (): void => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!email || !userName || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin  !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("Email của bạn không đúng định dạng!!!", {
        autoClose: 1000,
      });
      return;
    }

    if (password.length < 5) {
      toast.error("Mật khẩu của bạn phải lớn hơn 5 ký tự  !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu của bạn không khớp !!!", {
        autoClose: 1000,
      });
      return;
    }

    const newUser: User = {
      user_email: email,
      user_name: userName,
      user_passwords: password,
      roles: 2,
    };

    await axios
      .post("http://localhost:5500/api/v1/register", newUser)
      .then((res) => {
        if (res.data.status === 201) {
          setUserName("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          setTimeout(() => {
            toast.success("Đăng ký thành công!", { autoClose: 1000 });
          }, 1000);
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container-login">
        <div className="item-from">
          <form onSubmit={handleSubmit}>
            <div className="hearder">
              <h3>Chào mừng đến với</h3>
              <img
                src="http://localhost:5173/assets/images/logo-itviec2.png"
                alt="loading..."
              />
              <br />
            </div>
            <h2>Đăng ký</h2>
            <button className="login-google">
              <span>
                <i className="fa-brands fa-google-plus-g"></i>
              </span>{" "}
              Đăng ký với Google
            </button>
            <br />

            <label htmlFor="">Họ tên *</label>
            <br />
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-email"
              type="text"
              placeholder="Name"
            />
            <br />

            <label htmlFor="">Email *</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input-email"
              type="text"
              placeholder="Email "
            />
            <br />
            <div className="login-pass">
              <label htmlFor="">Mật khẩu *</label>
              <a className="forgot-pass" href="">
                Quên mật khẩu ?
              </a>
            </div>
            <div className="icon-eye2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input-email"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu "
              />
              <span className="eye-icon" onClick={handleTogglePassword}>
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
            <label htmlFor="">Xác nhận mật khẩu *</label>
            <div className="icon-eye2">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="input-email"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
              />
              <span className="eye-icon" onClick={handleToggleConfirmPassword}>
                <i
                  className={`fa-solid ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
            <Button className="button-loginWeb" variant="danger" type="submit">
              Đăng ký với email
            </Button>
            <p className="foo-login">
              Không có tài khoản ?{" "}
              <span>
                <NavLink className="forgot-pass" to="/login">
                  Đăng nhập ngay!
                </NavLink>
              </span>
            </p>
          </form>
        </div>
        <div className="item-img">
          <img
            className="img-robby"
            src="http://localhost:5173/assets/images/robby-login.png"
            alt=""
          />
        </div>
      </div>
      <Footer />
      <ToastContainer className="toast-container-custom" />
    </div>
  );
};
export default Register;
