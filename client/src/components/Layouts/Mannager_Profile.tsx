import Nav_Profile from "../common/users/Nav_Profile";
import Navbar_Page from "../common/users/Navbar_Page";

const Mannager_Profile: React.FC = () => {
  return (
    <>
      <Navbar_Page />
      <Nav_Profile />
      <div>
        <h6>Quản lý CV</h6>
        <p>
          Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm
          việc
        </p>
      </div>
    </>
  );
};

export default Mannager_Profile;
