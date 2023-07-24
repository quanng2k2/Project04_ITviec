import "./css/employer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

interface CompanyData {
  company_id: number;
  logo: string;
  company_name: string;
  compa_city: string;
  company_description: string;
  compa_salary: string;
  industry: string;
}

const Employer: React.FC = () => {
  const [dataCompany, setDataCompany] = useState<CompanyData[]>([]);
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  console.log(id);

  const loadDataCompany = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/v1/company`);
      setDataCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDataCompany();
  }, []);

  const handleNavLinkClick = (company_id: number) => {
    // Xử lý khi click vào div NavLink
    console.log("Clicked on NavLink with ID:", company_id);
    // Thực hiện các thao tác hoặc chuyển hướng đến trang chi tiết công ty dựa trên companyId
  };

  return (
    <div className="container-employer">
      <h2 className="title-employer">Nhà Tuyển Dụng Hàng Đầu</h2>
      <div className="grip-employer">
        {dataCompany.map((companys) => (
          <NavLink
            key={companys.company_id}
            to={`/company-detail/${companys.company_id}`} // Thêm ID vào đường dẫn
            className="employer-item"
            onClick={() => handleNavLinkClick(companys.company_id)}
          >
            <div className="hiden-img">
              <img
                className="img-employer"
                src={companys.logo}
                alt="loading..."
              />
            </div>
            <div>
              <div className="text-body-employer">
                <h6>{companys.company_name}</h6>
                <h6 className="opacity-body-employer">{companys.compa_city}</h6>
              </div>
              <div className="flex-list-couser">
                {companys.industry.split(",").map((industry, index) => (
                  <h6 className="item-couser" key={index}>
                    {industry}
                  </h6>
                ))}
              </div>

              <h6 className="job-foo">1 Việc làm 🔔 </h6>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Employer;
