import Nav_Profile from "../common/users/Nav_Profile";
import Navbar_Page from "../common/users/Navbar_Page";

const Criteria_Profile: React.FC = () => {
  return (
    <>
      <Navbar_Page />
      <Nav_Profile />
      <div>
        <h6>Công việc yêu thích</h6>
        <p>
          Chia sẻ loại công việc bạn mong muốn để được giới thiệu cơ hội việc
          làm phù hợp hơn trên trang của chúng tôi (không qua email)
        </p>
        <hr />
      </div>
    </>
  );
};
export default Criteria_Profile;
