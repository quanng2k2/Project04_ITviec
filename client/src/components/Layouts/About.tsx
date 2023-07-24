import { Nav } from "react-bootstrap";
import "./css/about.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About: React.FC = () => {
  const navigate = useNavigate();

  // check ko đăng nhập ko cho
  const checkLogin = localStorage.getItem("flagUser");
  const dataUser = checkLogin ? JSON.parse(checkLogin) : null;
  console.log(checkLogin);

  const checkLoginApp = () => {
    if (dataUser === null) {
      toast.error("Bạn phải đăng nhập !!!", {
        autoClose: 1000,
      });
    } else {
      navigate("/home-profile");
    }
  };

  return (
    <>
      <div className="text-about">
        <h2>Công cụ tốt nhất cho hành trang ứng tuyển của bạn</h2>
        <p>
          Khẳng định bản thân qua hồ sơ "chất" với công cụ và kiến thức bổ ích
          từ ITviec.
        </p>
      </div>
      <div className="container-card ">
        <Card
          style={{
            width: "32%",
            height: "450px",
            border: "none",
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Card.Img
            className="image-card"
            variant="top"
            src="http://localhost:5173/assets/images/job.svg"
          />
          <Card.Body id="cart-body">
            <Card.Title>Tìm kiếm việc làm</Card.Title>
            <Card.Text>
              Danh sách việc làm IT "chất" liên tục cập nhật các lựa chọn mới
              nhất theo thị trường và xu hướng tìm kiếm.
            </Card.Text>

            <Nav.Link as={Link} to="/all-work">
              <Button
                className="button-card-border"
                variant="danger"
                style={{
                  width: "170px",
                  backgroundColor: "#FFFFFF",
                  color: "#ed1b2f",
                }}
              >
                Khám phá
              </Button>
            </Nav.Link>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "32%",
            height: "450px",
            border: "none",
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Card.Img
            className="image-card"
            variant="top"
            src="http://localhost:5173/assets/images/user.svg"
          />
          <Card.Body id="cart-body">
            <Card.Title>Hồ sơ cá nhân</Card.Title>
            <Card.Text>
              Kiến tạo hồ sơ với bố cục chuẩn mực, chuyên nghiệp dành riêng cho
              ngành IT, được nhiều nhà tuyển dụng đề xuất.
            </Card.Text>

            <Button
              onClick={checkLoginApp}
              className="button-card"
              variant="danger"
              style={{ width: "170px", backgroundColor: "#ED1B2F" }}
            >
              Khám phá
            </Button>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "32%",
            height: "450px",
            border: "none",
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Card.Img
            className="image-card"
            variant="top"
            src="http://localhost:5173/assets/images/blog.svg"
          />
          <Card.Body id="cart-body">
            <Card.Title>Blog về IT</Card.Title>
            <Card.Text>
              Đừng bỏ lỡ cơ hội cập nhật thông tin lương thưởng, chế độ làm
              việc, nghề nghiệp và kiến thức ngành IT.
            </Card.Text>
            <Button
              className="button-card-border"
              variant="danger"
              style={{
                width: "170px",
                backgroundColor: "#FFFFFF",
                color: "#ed1b2f",
              }}
            >
              Khám phá
            </Button>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer className="toast-container-custom" />
    </>
  );
};

export default About;
