import Nav_Profile from "../common/users/Nav_Profile";
import Navbar_Page from "../common/users/Navbar_Page";
import Button from "react-bootstrap/Button";
import "./css/home_profile.css";
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { formatDate, formatDate1 } from "../../formatDatas/FormatData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

interface UserFormData {
  position: string;
  dateOfbirth: string;
  phoneNumber: string;
  address: string;
}

interface UserNowData {
  position: string;
  dateOfbirth: string;
  phoneNumber: string;
  address: string;
}

interface ApplicationUser {
  applications_gtbt: string;
  address: string;
  applications_work_experience: string;
  user_email: string;
  phoneNumber: number;
  dateOfbirth: string;
  applications_skill: string;
  applications_education: string;
  applications_diploma: string;
  applications_personal_project: string;
  // Các trường dữ liệu khác của ApplicationUser
}

const Home_Profile: React.FC = () => {
  //set modal xuất cv
  const [scrollableModal, setScrollableModal] = useState<boolean>(false);

  // back to top
  const [isVisible, setIsVisible] = useState(false);

  // Retrieve user data from local storage
  const dataUser = localStorage.getItem("flagUser");
  const userLocal = dataUser ? JSON.parse(dataUser) : null;

  // state get data application của userlogin
  const [applicationUser, setApplicationUser] = useState<ApplicationUser[]>([]);

  // set form CV user
  const [introduction, setIntroduction] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [certificates, setCertificates] = useState("");
  const [personalProjects, setPersonalProjects] = useState("");

  // Form data state
  const [formData, setFormData] = useState<UserFormData>({
    position: "",
    dateOfbirth: "",
    phoneNumber: "",
    address: "",
  });
  // dowload file pdf
  const id = userLocal?.user_id;
  const downloadFile = async () => {
    fetch(`http://localhost:5500/api/v1/application/api/download-file/${id}`) // Thay thế đường dẫn '/api/download-file' bằng đúng đường dẫn API tải file từ server
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.pdf"; // Tên file bạn muốn tải về
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  // User data state retrieved from API
  const [userNow, setUserNow] = useState<UserNowData | null>(null);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/users/${userLocal?.user_id}`
      );
      const userData = response.data;
      if (userData.users_form.length > 0) {
        const userNowData = userData.users_form[0];
        setUserNow(userNowData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch user data from API
    fetchUserData();

    // Fetch user data if user ID is available
    if (userLocal?.user_id) {
      fetchUserData();
    }
  }, [userLocal?.user_id!]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedData = {
      position: formData.position,
      dateOfbirth: formatDate1(formData.dateOfbirth),
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };

    try {
      await axios.put(
        `http://localhost:5500/api/v1/users/${userLocal?.user_id}`,
        updatedData
      );
      // Load lại data
      fetchUserData(); // Reset form fields
      setFormData({
        position: "",
        dateOfbirth: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  //#region Các sự kiện focus textarea
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputRefTwo = useRef<HTMLTextAreaElement>(null);
  const inputRefThree = useRef<HTMLTextAreaElement>(null);
  const inputRefFor = useRef<HTMLTextAreaElement>(null);
  const inputRefFive = useRef<HTMLTextAreaElement>(null);
  const inputRefSevent = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.marginBottom = "60px";
    }
  };

  const handleClickTwo = () => {
    if (inputRefTwo.current) {
      inputRefTwo.current.focus();
      inputRefTwo.current.style.marginBottom = "60px";
    }
  };

  const handleClickThree = () => {
    if (inputRefThree.current) {
      inputRefThree.current.focus();
      inputRefThree.current.style.marginBottom = "60px";
    }
  };

  const handleClickFor = () => {
    if (inputRefFor.current) {
      inputRefFor.current.focus();
      inputRefFor.current.style.marginBottom = "60px";
    }
  };

  const handleClickFive = () => {
    if (inputRefFive.current) {
      inputRefFive.current.focus();
      inputRefFive.current.style.marginBottom = "60px";
    }
  };

  const handleClickSevent = () => {
    if (inputRefSevent.current) {
      inputRefSevent.current.focus();
      inputRefSevent.current.style.marginBottom = "60px";
    }
  };
  //#endregion

  // Save api Cv vào SQL
  const handleSaveCv = async (event: React.FormEvent) => {
    event.preventDefault();

    // Kiểm tra các trường dữ liệu
    if (
      !introduction ||
      !workExperience ||
      !skills ||
      !education ||
      !certificates ||
      !personalProjects
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!introduction) {
      toast.error("Vui lòng điền thông tin giới thiệu bản thân !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!workExperience) {
      toast.error("Vui lòng điền kinh nghiệm làm việc !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!skills) {
      toast.error("Vui lòng điền kỹ năng !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!education) {
      toast.error("Vui lòng điền học vấn !!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!certificates) {
      toast.error("Vui lòng điền chứng chỉ!!!", {
        autoClose: 1000,
      });
      return;
    }

    if (!personalProjects) {
      toast.error("Vui lòng điền dự án bản thân !!!", {
        autoClose: 1000,
      });
      return;
    }

    const formDataCV = {
      user_id: userLocal?.user_id,
      applications_gtbt: introduction,
      applications_work_experience: workExperience,
      applications_skill: skills,
      applications_education: education,
      applications_diploma: certificates,
      applications_personal_project: personalProjects,
    };

    try {
      axios
        .post("http://localhost:5500/api/v1/application", formDataCV)
        .then((res) => console.log(res.data));

      // Đặt các trường dữ liệu về rỗng
      setIntroduction("");
      setWorkExperience("");
      setSkills("");
      setEducation("");
      setCertificates("");
      setPersonalProjects("");

      // Hiển thị thông báo thành công
      toast.success("Lưu thông tin cv thành công <3", { autoClose: 1000 });
    } catch (error) {
      console.error("Lỗi thêm Cv: ", error);
    }
  };

  // join get data cv
  useEffect(() => {
    const loadDataCv = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v1/application/${userLocal?.user_id}`
        );
        setApplicationUser(response.data.application);
        console.log(response);
      } catch (error) {
        console.log(error, "lỗi get data application !!!!");
      }
    };
    loadDataCv();
  }, []);

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

  return (
    <>
      <Navbar_Page />
      <Nav_Profile />
      <div className="container-home-profile">
        <div className="container-profile">
          <div className="container-sidebar">
            <h6>Nâng cấp hồ sơ lên mức "Rất tốt" để tải CV</h6>
            <h6 className="node">
              Lưu ý :
              <span className="node-red"> Phải điền đầy đủ thông tin !!!</span>
            </h6>
            <div className="icon-nav-profile">
              <i className="fa-brands fa-html5"></i>
              <i className="fa-brands fa-css3"></i>
              <i className="fa-brands fa-square-js"></i>
              <i className="fa-brands fa-node"></i>
              <i className="fa-brands fa-discord"></i>
            </div>
            <h6>Cách nâng cấp hồ sơ lên mức "Rất tốt"</h6>
            <div className="gtbn" onClick={handleClick}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Giới thiệu bản thân</span>
              <hr />
            </div>

            <div className="gtbn" onClick={handleClickTwo}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Kinh nghiệm làm việc</span>
              <hr />
            </div>

            <div className="gtbn" onClick={handleClickFor}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Học vấn</span>
              <hr />
            </div>

            <div className="gtbn" onClick={handleClickThree}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Kỹ năng</span>
              <hr />
            </div>

            <div className="gtbn" onClick={handleClickFive}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Chứng chỉ</span>
              <hr />
            </div>

            <div className="gtbn" onClick={handleClickSevent}>
              <i className="fa-solid fa-plus"></i>
              <span> Thêm Dự án cá nhân</span>
              <hr />
            </div>

            <Button
              variant="danger"
              onClick={() => setScrollableModal(!scrollableModal)}
            >
              Xem và tải CV
            </Button>
          </div>
          <div className="container-detail-hsCV">
            <div className="add-user">
              <i className="fa-solid fa-circle-user icon-user"></i>
              <div className="information-user">
                <div>
                  <p>
                    <span>
                      <i className="fa-solid fa-signature"></i>
                    </span>
                    Họ tên : {userLocal.user_name}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-user-tie"></i>
                    </span>
                    Chức vụ : {userNow?.position}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-calendar-days"></i>
                    </span>
                    Ngày sinh : {formatDate(userNow?.dateOfbirth!)}
                  </p>
                </div>
                <div>
                  <p>
                    <span>
                      <i className="fa-sharp fa-solid fa-phone-volume"></i>
                    </span>
                    SĐT : {userNow?.phoneNumber}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-location-dot"></i>
                    </span>
                    Địa chỉ : {userNow?.address}
                  </p>
                  <i className="fa-solid fa-envelope"></i>
                  <span>Email : {userLocal.user_email}</span>
                </div>
              </div>
            </div>
            <hr />
            <form className="data-cv" onSubmit={handleSubmit}>
              <input
                className="input-gtbn"
                type="text"
                value={formData.position}
                name="position"
                placeholder="Chức vụ *"
                onChange={handleChange}
              />

              <input
                className="input-gtbn"
                type="date"
                value={formData.dateOfbirth}
                name="dateOfbirth"
                placeholder="Ngày sinh"
                onChange={handleChange}
              />

              <input
                className="input-gtbn"
                type="number"
                value={formData.phoneNumber}
                name="phoneNumber"
                placeholder="SĐT *"
                onChange={handleChange}
              />

              <input
                className="input-gtbn"
                type="text"
                value={formData.address}
                name="address"
                placeholder="Địa chỉ nhà"
                onChange={handleChange}
              />

              <div className="button-foo">
                <Button variant="secondary">Quay lại</Button>
                <Button variant="danger" type="submit">
                  Lưu
                </Button>
              </div>
            </form>
            {/* back to top --------------------- */}
            <button
              className={`back-to-top-button ${isVisible ? "visible" : ""}`}
              onClick={scrollToTop}
              title="Back to Top"
            >
              <span className="icon-top">☝️</span>
            </button>
            {/* stop back-to-top ----------------------- */}
            <form className="detail-cvcn" onSubmit={handleSaveCv}>
              <div className="detail-appli-job">
                <h6>Giới thiệu bản thân</h6>
                <hr />
                <p>Gợi ý: Giới thiệu về bạn, điểm mạnh...</p>
                <textarea
                  ref={inputRef}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={introduction}
                  onChange={(event) => setIntroduction(event.target.value)}
                ></textarea>
              </div>
              <div className="detail-appli-job">
                <h6>Kinh nghiệm làm việc</h6>
                <hr />
                <p>
                  Gợi ý: Mô tả công việc cụ thể, những kết quả và thành tựu đạt
                  được có số liệu dẫn chứng
                </p>
                <textarea
                  ref={inputRefTwo}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={workExperience}
                  onChange={(event) => setWorkExperience(event.target.value)}
                ></textarea>
              </div>
              <div className="detail-appli-job">
                <h6>Học vấn </h6>
                <hr />
                <p>Gợi ý: Mô tả ngành học và kiến thức</p>
                <textarea
                  ref={inputRefFor}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={education}
                  onChange={(event) => setEducation(event.target.value)}
                ></textarea>
              </div>
              <div className="detail-appli-job">
                <h6>Kỹ năng</h6>
                <hr />
                <p>Gợi ý: Java , C# , Javascript...</p>
                <textarea
                  ref={inputRefThree}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                ></textarea>
              </div>
              <div className="detail-appli-job">
                <h6>Chứng chỉ</h6>
                <hr />
                <p>
                  Gợi ý: Cung cấp bằng chứng về chuyên môn và kỹ năng cụ thể của
                  bạn
                </p>
                <textarea
                  ref={inputRefFive}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={certificates}
                  onChange={(event) => setCertificates(event.target.value)}
                ></textarea>
              </div>
              <div className="detail-appli-job">
                <h6>Dự án cá nhận</h6>
                <hr />
                <p>
                  Gợi ý: Liệt kê một số dự án có liên quan để cho thấy bạn đã áp
                  dụng khả năng của mình như thế nào
                </p>
                <textarea
                  ref={inputRefSevent}
                  id="texarea-cv"
                  cols={90}
                  rows={5}
                  value={personalProjects}
                  onChange={(event) => setPersonalProjects(event.target.value)}
                ></textarea>
              </div>
              <div className="button-detail-foo">
                <Button variant="danger" type="submit">
                  Lưu CV
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <MDBModal
        show={scrollableModal}
        setShow={setScrollableModal}
        tabIndex="-1"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <div className="header-cv">
                  <h2>{userLocal.user_name}</h2>
                  <h6>{userNow?.position}</h6>
                </div>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModal(!scrollableModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container-dowCv">
                <div>
                  <h6>Tóm lược</h6>
                  <p>{applicationUser[0]?.applications_gtbt}</p>
                  <h6>Thông tin liên hệ</h6>
                  <p>
                    <span>
                      <i className="fa-solid fa-map-location-dot"></i>
                    </span>{" "}
                    : {applicationUser[0]?.address}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-envelope-circle-check"></i>
                    </span>{" "}
                    : {applicationUser[0]?.user_email}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-calendar-days"></i>
                    </span>{" "}
                    : {formatDate(applicationUser[0]?.dateOfbirth)}
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-square-phone"></i>
                    </span>{" "}
                    : {applicationUser[0]?.phoneNumber}
                  </p>
                  <h6>Kỹ năng</h6>
                  <p>
                    <span>
                      <i className="fa-brands fa-slack"></i>
                    </span>{" "}
                    : {applicationUser[0]?.applications_skill}
                  </p>
                </div>
                <div>
                  <h6>Học vấn </h6>
                  <p>{applicationUser[0]?.applications_education}</p>
                  <h6>Kinh nghiệm làm việc</h6>
                  <p>{applicationUser[0]?.applications_work_experience}</p>
                  <h6>Chứng chỉ </h6>
                  <p>{applicationUser[0]?.applications_diploma}</p>
                  <h6>Dự án cá nhân</h6>
                  <p>{applicationUser[0]?.applications_personal_project}</p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal(!setScrollableModal)}
              >
                Đóng
              </MDBBtn>
              <Button variant="success" onClick={downloadFile}>
                Tải xuống CV
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer className="toast-container-custom" />
    </>
  );
};

export default Home_Profile;
