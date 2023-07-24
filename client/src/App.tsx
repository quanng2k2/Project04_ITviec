import { useEffect, useState } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Profile_User from "./components/common/users/Nav_Profile";
import Home_Profile from "./components/Layouts/Home_Profile";
import Mannager_Profile from "./components/Layouts/Mannager_Profile";
import Criteria_Profile from "./components/Layouts/Criteria_Profile";
import All_Work from "./components/Pages/All_Work";
import Admin_company from "./components/Admin/Admin_company";
import Detail_company from "./components/Pages/Detail_company";
import Admin_jobs from "./components/admin_company/Admin_jobs";
import { AuthProvider } from "./components/Admin/AuthContext";
import Information_user from "./components/Admin/Information_user";
import Admin_cv from "./components/admin_company/Admin_cv";

interface UserData {
  roles: number;
  selectedCompanyId: number;
}

const App: React.FC = () => {
  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = localStorage.getItem("flagUser");
    const userData = userLocal ? JSON.parse(userLocal) : null;
    setDataUser(userData);
  }, []);

  const handleLogout = (): void => {
    // Xóa dữ liệu trong local storage
    localStorage.removeItem("flagUser");
    // Cập nhật lại giá trị của dataUser
    setDataUser(null);
    navigate("/");
  };

  return (
    <div className="App">
      <AuthProvider handleLogout={handleLogout}>
        <Routes>
          {dataUser && dataUser.roles === 0 ? (
            <Route path="/" element={<Navigate to="/admin-company" />} />
          ) : dataUser && dataUser.roles === 1 ? (
            <Route path="/" element={<Navigate to="/admin-company-job" />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-user" element={<Profile_User />} />
          <Route path="/home-profile" element={<Home_Profile />} />
          <Route path="/manager-cv" element={<Mannager_Profile />} />
          <Route path="/working-criteria" element={<Criteria_Profile />} />
          <Route path="/all-work" element={<All_Work />} />
          <Route path="/company-detail/:id" element={<Detail_company />} />
          {/* routes admin */}
          <Route path="/admin-company" element={<Admin_company />} />
          <Route path="/admin-user" element={<Information_user />} />
          <Route path="/admin-company-job" element={<Admin_jobs />} />
          <Route path="/admin-cv" element={<Admin_cv />} />
          {/* stop routes admin */}
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
