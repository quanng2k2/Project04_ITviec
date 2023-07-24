import { Nav } from "react-bootstrap";
import Navbar_Page from "./Navbar_Page";
import "./css/profile.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav_Profile: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar_Page />
      <div className="container-profile">
        <div className="nav-profile">
          <Nav>
            <NavLink
              to="/home-profile"
              className={`nav-link ${
                location.pathname === "/home-profile" ? "active2" : ""
              }`}
            >
              Hồ sơ
            </NavLink>
            <NavLink
              to="/manager-cv"
              className={`nav-link ${
                location.pathname === "/manager-cv" ? "active2" : ""
              }`}
            >
              Quản lý CV
            </NavLink>
            <NavLink
              to="/working-criteria"
              className={`nav-link ${
                location.pathname === "/working-criteria" ? "active2" : ""
              }`}
            >
              Tiêu chí tìm việc
            </NavLink>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Nav_Profile;
