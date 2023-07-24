import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/navbar.css";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const BasicExample: React.FC = () => {
  const navigate = useNavigate();

  const userLocal = localStorage.getItem("flagUser");
  const dataUser = userLocal ? JSON.parse(userLocal) : null;

  const handleLogOut = () => {
    localStorage.removeItem("flagUser");
    navigate("/");
  };

  return (
    <>
      <Navbar
        style={{
          background:
            "linear-gradient(to right, #000000 0%, #000000 30%, #750000 100%)",
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "99999999",
        }}
        expand="lg"
      >
        <Nav.Link as={Link} to="/">
          <img
            className="logo-page"
            src="http://localhost:5173/assets/images/logo-itviec.png"
            alt="loading..."
          />
        </Nav.Link>
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Tippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                  <div className="box with-arrow" tabIndex={-1} {...attrs}>
                    <Tippy
                      interactive
                      placement="right-start"
                      render={(attrs) => (
                        <div className="box3" tabIndex={-1} {...attrs}>
                          <ul>
                            <li>mySQL</li>
                            <li>java</li>
                            <li>PHP</li>
                            <li>JavaScript</li>
                            <li>Database</li>
                            <li>UI-UX</li>
                            <li>SQL</li>
                            <li>HTML5</li>
                            <li>Python</li>
                            <li>English</li>
                            <li>ReactJS</li>
                            <li>.Net</li>
                          </ul>
                        </div>
                      )}
                    >
                      <li className="item">Làm việc IT theo kỹ năng</li>
                    </Tippy>

                    <Tippy
                      interactive
                      placement="right-start"
                      render={(attrs) => (
                        <div className="box3" tabIndex={-1} {...attrs}>
                          <ul>
                            <li>Lập trình viên Java</li>
                            <li>Lập trình viên PHP</li>
                            <li>Lập trình viên JavaScript</li>
                            <li>Lập trình viên HTML5</li>
                            <li>Lập trình viên SQL</li>
                            <li>Lập trình viên Android</li>
                            <li>Quản trị cơ sở dữ liệu</li>
                            <li>Kỹ sư cầu nối</li>
                            <li>Lập trình viên NodeJS</li>
                            <li>Quản lý dự án</li>
                            <li>Lập trình viên C++</li>
                            <li>Tester</li>
                          </ul>
                        </div>
                      )}
                    >
                      <li className="item">Làm việc IT theo cấp bậc</li>
                    </Tippy>

                    <Tippy
                      interactive
                      placement="right-start"
                      render={(attrs) => (
                        <div className="box3" tabIndex={-1} {...attrs}>
                          <ul>
                            <li>Techcombank</li>
                            <li>FPT Software</li>
                            <li>Vietnam</li>
                            <li>Limited</li>
                            <li>Tyme</li>
                            <li>Ttrusting Social</li>
                            <li>HRS Group</li>
                            <li>NFQ Asia</li>
                            <li>Buymed</li>
                            <li>Floware</li>
                            <li>Mb Bank</li>
                            <li>DatVietVAC</li>
                          </ul>
                        </div>
                      )}
                    >
                      <li className="item">Làm việc IT theo công ty</li>
                    </Tippy>

                    <Tippy
                      interactive
                      placement="right-start"
                      render={(attrs) => (
                        <div className="box3" tabIndex={-1} {...attrs}>
                          <ul>
                            <li>Hồ Chí Minh</li>
                            <li>Hà Nội</li>
                            <li>Đà Nẵng</li>
                            <li>Cty nước ngoài ở VN</li>
                            <li>Khác</li>
                          </ul>
                        </div>
                      )}
                    >
                      <li className="item">Làm việc IT theo Tp</li>
                    </Tippy>
                  </div>
                )}
              >
                <Nav.Link href="#home">Việc Làm IT</Nav.Link>
              </Tippy>

              <Tippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                  <div className="box with-arrow" tabIndex={-1} {...attrs}>
                    <Tippy
                      interactive
                      placement="right-start"
                      render={(attrs) => (
                        <div className="box2" tabIndex={-1} {...attrs}>
                          <li className="item">Công Ty IT Tốt Nhất 2023</li>
                          <li className="item">Công Ty IT Tốt Nhất 2022</li>
                          <li className="item">Công Ty IT Tốt Nhất 2022</li>
                        </div>
                      )}
                    >
                      <li className="item">Công Ty IT Tốt Nhất </li>
                    </Tippy>

                    <li className="item">Review Công Ty</li>
                  </div>
                )}
              >
                <Nav.Link href="#link">Top Công ty IT</Nav.Link>
              </Tippy>

              <Tippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                  <div className="box with-arrow" tabIndex={-1} {...attrs}>
                    <li className="item">Báo cáo lương IT</li>
                    <li className="item">Sự Nghiệp IT</li>
                    <li className="item">Ứng Tuyển Và Thăng Tiến</li>
                    <li className="item">Chuyên Môn IT</li>
                  </div>
                )}
              >
                <Nav.Link href="#link">Blog</Nav.Link>
              </Tippy>

              <Nav.Link href="#link">Cuộc thi viết</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#link">Liên hệ tuyển dụng </Nav.Link>

              {userLocal ? (
                <div className="icon-name">
                  <i className="fa-regular fa-circle-user"></i>

                  <Tippy
                    interactive
                    placement="bottom-start"
                    render={(attrs) => (
                      <div className="box with-arrow" tabIndex={-1} {...attrs}>
                        <NavLink to="/home-profile" className="nav-link">
                          <li className="item">
                            <i className="fa-regular fa-user"></i>
                            <span> Hồ sơ & CV</span>
                          </li>
                        </NavLink>
                        <li className="item">
                          <i className="fa-solid fa-briefcase"></i>
                          <span> Công việc của tôi</span>
                        </li>
                        <li className="item">
                          <i className="fa-solid fa-gear"></i>
                          <span> Cài đặt</span>
                        </li>
                        <li className="item" onClick={handleLogOut}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <span> Đăng xuất</span>
                        </li>
                      </div>
                    )}
                  >
                    <Nav.Link href="#link">{dataUser.user_name}</Nav.Link>
                  </Tippy>
                </div>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Đăng Nhập
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Đăng Ký
                  </Nav.Link>
                </>
              )}

              <Nav.Link href="#link">EN | VI</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="line"></div>
    </>
  );
};

export default BasicExample;
