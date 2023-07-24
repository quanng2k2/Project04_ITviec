import Search from "../Layouts/Search";
import Navbar_Page from "../common/users/Navbar_Page";
import "./css/all_work.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

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

const All_Work: React.FC = () => {
  // state to hold the selected CV file
  const [selectedCV, setSelectedCV] = useState<File | null>(null);

  // state boostrap
  const [show, setShow] = useState(false);

  // state Thêm một trạng thái mới để lưu trữ id của công ty được chọn
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  console.log("ID company_id -------> ", selectedCompanyId);

  //state data company
  const [dataCompany, setDataCompany] = useState<JobData[]>([]);

  // state data jobs
  const [dataJobs, setDataJobs] = useState<JobData[]>([]);

  // back to top
  const [isVisible, setIsVisible] = useState(false);

  const userLocal = localStorage.getItem("flagUser");
  const dataUser = userLocal ? JSON.parse(userLocal) : null;

  // check login và ứng tuyển
  const checkloginAdd = () => {
    if (dataUser === null) {
      toast.error("Bạn phải đăng nhập !!!", {
        autoClose: 1000,
      });
    } else {
      handleModalOpen(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleModalOpen = (value: boolean) => {
    setShow(value);
  };

  useEffect(() => {
    // Mặc định render công ty đầu tiên khi vào component
    if (dataCompany.length > 0) {
      const firstCompanyId = dataCompany[0].company_id;
      handleJobClick(firstCompanyId);
    }
  }, [dataCompany]);

  // back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // get data company
  const loadDataCompany = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/v1/company");
      setDataCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDataCompany();
  }, []);

  // khi click render ra job của công ty đó
  const handleJobClick = async (company_id: number) => {
    setSelectedCompanyId(company_id);
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/jobs/${company_id}`
      );
      setDataJobs(response.data.jobs);
      // console.log("Data_Jobs---------->", response.data.jobs[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // handle file change when the user selects a CV file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCV(event.target.files[0]);
    }
  };

  // post cv cho công ty theo user_id
  const handlePostCV = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedCV) {
      toast.error("Vui lòng chọn CV trước khi gửi.", {
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", selectedCV);
    formData.append("user_id", dataUser.user_id.toString());
    formData.append("company_id", selectedCompanyId!.toString());

    try {
      const response = await axios.post(
        "http://localhost:5500/api/vi/post_cv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle successful response (optional)
      toast.success("Gửi cv thành công <3 ", {
        autoClose: 1000,
      });

      // Reset the states after successful submission
      setSelectedCV(null);
      // setSelectedCompanyId(null);
    } catch (error) {
      // Handle error (optional)
      toast.error("Gửi cv không thành công !!!", {
        autoClose: 1000,
      });
    }
    // Close the modal after submission
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
    <div>
      <Navbar_Page />
      <Search />

      {/* back to top --------------------- */}
      <button
        className={`back-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        title="Back to Top"
      >
        <span className="icon-top">☝️</span>
      </button>
      {/* stop back-to-top ----------------------- */}

      <h2 className="title-all-work">
        Rất nhiều việc làm IT tại Việt Nam hấp dẫn chờ đón bạn 🆘🆘🆘
      </h2>
      <div className="container-details">
        <div className="container-tem1">
          {dataCompany.map((company: JobData) => (
            <div
              className={`container-all-work ${
                selectedCompanyId === company.company_id ? "selected" : ""
              }`}
              // className="container-all-work"
              key={company.company_id}
              onClick={() => handleJobClick(company.company_id)}
            >
              <div className="job">
                <h6>{company.company_name}</h6>
                <div className="img-nameCopany">
                  <img
                    className="img-logo-company"
                    src={company.logo}
                    alt="loading..."
                  />
                  <div>
                    <h6>IT viec group developing... </h6>
                  </div>
                </div>
              </div>
              <div className="location-work">
                <i className="fa-solid fa-chalkboard-user"></i>
                <span> Linh Hoạt</span>
              </div>
              <div className="location-company">
                <i className="fa-solid fa-location-dot"></i>{" "}
                <span>{company.compa_city}</span>
              </div>

              <div className="list-technology">
                {company.industry.split(",").map((industry, index) => (
                  <p className="title-technology" key={index}>
                    {industry}
                  </p>
                ))}
              </div>

              <div>
                <h5 className="po-hot">HOT</h5>
              </div>
            </div>
          ))}
        </div>

        {/* start detail job */}
        {selectedCompanyId && dataJobs.length > 0 && (
          <div className="container-item2">
            <div className="img-detail">
              <div className="heard-job">
                <img
                  className="img-logo-company"
                  src={dataJobs[0].logo}
                  alt="loading..."
                />
                <div>
                  <h6>{dataJobs[0].company_name}</h6>
                  <h6>IT viec group developing... </h6>
                  <p className="salary-job">
                    <span>
                      <i className="fa-solid fa-money-check-dollar"></i>
                    </span>
                    {" : "}
                    Mức lương từ : {formatCurrency(Number(dataJobs[0].salary))}
                  </p>
                </div>
              </div>
              <div className="button-love">
                <Button
                  className="btn-appli"
                  variant="danger"
                  onClick={checkloginAdd}
                >
                  Ứng tuyển
                </Button>
                <i className="fa-regular fa-heart"></i>
              </div>
              <hr />
            </div>
            <div className="detail-jobs">
              <div className="icon-location">
                <i className="fa-solid fa-location-dot"></i>
                <h6>{dataJobs[0].location}</h6>
              </div>
              <div className="icon-location">
                <i className="fa-solid fa-chalkboard-user"></i>
                <h6>Linh hoạt (Tại văn phòng hoặc làm từ xa)</h6>
              </div>
              <div className="job-requirements">
                <div>
                  <h6>Kỹ năng : </h6>
                </div>
                <div className="list-technology">
                  {dataJobs[0].required_skills
                    .split(",")
                    .map((required_skills, index) => (
                      <p className="title-technology" key={index}>
                        {required_skills}
                      </p>
                    ))}
                </div>
              </div>
              <h5>3 Lý do để gia nhập công ty</h5>
              <ul>
                <li>Có thể làm việc từ xa</li>
                <li>Khu vực cafe cực chill!</li>
                <li>Lớp tiếng Nhật + Anh free</li>
              </ul>
              <hr />
              <h5>Mô tả công việc</h5>
              <p>{dataJobs[0].descriptions}</p>
              <h5>Yêu cầu công việc</h5>
              <p>{dataJobs[0].experience_level}</p>
            </div>
          </div>
        )}

        {/* stop job  */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {dataJobs.length > 0 && (
            <Modal.Title>Công ty {dataJobs[0].company_name}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePostCV}>
            <p>Nhập CV của tôi ....</p>
            <input
              type="file"
              onChange={handleFileChange}
              name="cvFile"
              multiple
            />
            <br />
            <br />
            <Button variant="primary" type="submit">
              Gửi CV
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="toast-container-custom" />
    </div>
  );
};

export default All_Work;
