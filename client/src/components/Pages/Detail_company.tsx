import Footer from "../common/users/Footer";
import Navbar_Page from "../common/users/Navbar_Page";
import "./css/details_company.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CompanyData {
  company_id: number;
  logo: string;
  company_name: string;
  compa_city: string;
  company_description: string;
  industry: string;
}

interface JobData {
  job_id: number;
  descriptions: string;
  location: string;
  salary: string;
  required_skills: string;
  experience_level: string;
  company_id: number;
  logo: string;
  company_name: string;
  compa_city: string;
  company_description: string;
  compa_salary: string;
  industry: string;
}

const Detail_company: React.FC = () => {
  // state theo dõi company
  const [isFollowed, setIsFollowed] = useState(() => {
    const storedValue = localStorage.getItem("isFollowed");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [isFirstClick, setIsFirstClick] = useState(true);

  // state modal boostrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // stop state modal boostrap

  const { id } = useParams<{ id: string }>(); // Get ID from URL

  const [companyDetail, setCompanyDetail] = useState<CompanyData | null>(null);
  const [jobsDetail, setJobsDetail] = useState<JobData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const companyResponse = await axios.get<CompanyData, any>(
          `http://localhost:5500/api/v1/company/${id}`
        );
        setCompanyDetail(companyResponse.data.companyID[0]);
        // console.log("data-company----> ", companyResponse.data.companyID[0]);

        // Fetch jobs data
        const jobsResponse = await axios.get<JobData[], any>(
          `http://localhost:5500/api/v1/jobs/${id}`
        );

        setJobsDetail([...jobsResponse.data.jobs]);
        // console.log("data-company----> ", jobsResponse.data.jobs[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("isFollowed", JSON.stringify(isFollowed));
  }, [isFollowed]);

  if (!companyDetail) {
    return <div>Loading...</div>;
  }

  // button follow
  const handleFollow = () => {
    setIsFirstClick(false);
    toast.success("Đã theo dõi công ty này <3", { autoClose: 1000 });
    setIsFollowed(true);
    handleClose();
  };

  // btn unfollow
  const handleUnfollow = () => {
    setIsFirstClick(false);
    toast.error("Đã hủy theo dõi công ty này !!!", { autoClose: 1000 });
    setIsFollowed(false);
    handleClose();
  };

  // Hàm format tiền tệ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <div>
        <Navbar_Page />
        <div className="container-allData-company">
          {/* start information company */}
          <div className="header-company">
            <div className="img-information-compa">
              <img
                src={companyDetail.logo}
                alt="loading..."
                className="img-header"
              />
              <div>
                <h1 className="title-compa">{companyDetail.company_name}</h1>
                <div className="location-job">
                  <h6>
                    <span>
                      <i className="fa-solid fa-location-dot"></i> {"Địa chỉ :"}
                    </span>
                    {companyDetail.compa_city}
                  </h6>

                  <h6>
                    <span>
                      <i className="fa-solid fa-briefcase"></i> {"Jobs :"}
                    </span>
                    {jobsDetail.length} jobs đang tuyển{" "}
                    <span>
                      <i className="fa-brands fa-hotjar"></i>{" "}
                    </span>
                  </h6>
                </div>
                <div className="button-cmt-follow">
                  <Button className="button-cmt" variant="outline-danger">
                    Viết đánh giá
                  </Button>
                  <Button variant="outline-light" onClick={handleShow}>
                    {isFollowed ? "Đang theo dõi ✔️" : "Theo dõi"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* stop information company */}

          {/* start jobs  */}
          <div className="container-gt-cmt">
            <div className="general-information">
              <h2>Thông tin chung</h2>
              <hr />
              <div className="detail-shared">
                <h6>Quốc gia : Viet Nam</h6>
                <h6>Thời gian làm việc : Thứ 2 - Thứ 6</h6>
                <h6>Mô hình công ty : Sản phẩm</h6>
                <h6>Làm việc ngoài giờ : không có OT</h6>
              </div>
              <hr />
              <h3>Giới thiệu về công ty</h3>
              <p>{companyDetail.company_description}</p>
              <hr />
              <h3>Mô tả công việc</h3>
              {jobsDetail[0] ? (
                <p>{jobsDetail[0].descriptions}</p>
              ) : (
                <div>Chưa có bài viết nào tuyển dụng...</div>
              )}

              <hr />
              <div className="div-block-job">
                <h3>Yêu cầu và kinh nghiệm</h3>
                {jobsDetail[0] ? (
                  <p>{jobsDetail[0].experience_level}</p>
                ) : (
                  <div>Chưa có bài viết nào tuyển dụng...</div>
                )}
              </div>
            </div>
            {/* start map-jobs */}
            <div className="container-job">
              <h1>Tất cả các job việc làm </h1>
              {jobsDetail.map((job, index) => (
                <div className="container-all-work" key={index}>
                  <div className="job">
                    <h6>Lead Software Engineer</h6>
                    <div className="img-nameCopany">
                      <img
                        className="img-logo-company"
                        src={job.logo}
                        alt="loading..."
                      />
                      <div>
                        <h6>IT viec group developing...</h6>
                      </div>
                    </div>
                  </div>
                  <p>{formatCurrency(Number(job.salary))}</p>
                  <div className="location-work">
                    <i className="fa-solid fa-chalkboard-user"></i>
                    <span> Linh Hoạt</span>
                  </div>
                  <div className="location-company">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{jobsDetail[0].compa_city}</span>
                  </div>
                  <div className="list-technology">
                    <h6>Kỹ năng :</h6>
                    {job.required_skills
                      .split(",")
                      .map((required_skills, index) => (
                        <p className="title-technology" key={index}>
                          {required_skills}
                        </p>
                      ))}
                  </div>
                  <div>
                    <h5 className="po-hot">HOT</h5>
                  </div>
                  <h5>3 Lý do để gia nhập công ty</h5>
                  <ul>
                    <li>✔️ Có thể làm việc từ xa</li>
                    <li>✔️ Khu vực cafe cực chill!</li>
                    <li>✔️ Lớp tiếng Nhật + Anh free</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* stop jobs  */}
        </div>
      </div>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Theo dõi công ty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Đăng ký nhận email thông báo việc làm mới nhất của công ty{" "}
          {companyDetail.company_name}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Nhập email của bạn :
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button
            variant={isFollowed ? "outline-danger" : "outline-success"}
            onClick={isFollowed ? handleUnfollow : handleFollow}
          >
            {isFollowed ? "Hủy theo dõi" : "Theo dõi"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="toast-container-custom" />
    </>
  );
};
export default Detail_company;
