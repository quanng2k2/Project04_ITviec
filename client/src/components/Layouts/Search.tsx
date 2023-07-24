import Form from "react-bootstrap/Form";
import "./css/search.css";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward-subtle.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface CompanyData {
  company_id: number;
  logo: string;
  company_name: string;
  industry: string;
}

const Search: React.FC = () => {
  const dataUser = localStorage.getItem("flagUser");
  const userLocal = dataUser ? JSON.parse(dataUser) : null;

  // state search
  const [searchResult, setSearchResult] = useState<CompanyData[]>([]);
  const [showResult, setShowResult] = useState(true);
  const [searchShow, setSearchShow] = useState("");

  useEffect(() => {
    if (!searchShow.trim()) {
      setShowResult(false);
      return;
    }
    axios
      .get(
        `http://localhost:5500/api/v1/company/search/${encodeURIComponent(
          searchShow
        )}`
      )
      .then((res) => {
        setSearchResult(res.data.search);
        console.log("----------> data compa", searchResult);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchShow]);

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <>
      <div className="container-from">
        <h2 className="title-search">
          1,008 Việc Làm IT Cho Developer {userLocal?.user_name}
        </h2>
        <form action="" className="form-search">
          <div className="flex-form">
            <Form.Select
              aria-label="Default select example"
              style={{ maxWidth: 200 }}
            >
              <option>Others</option>
              <option value="1">Tất cả thành phố</option>
              <option value="2">Ho Chi Minh</option>
              <option value="3">Ha Noi</option>
              <option value="3">Da Nang</option>
            </Form.Select>

            <Tippy
              placement="bottom-start"
              visible={showResult && searchResult.length > 0}
              interactive
              // placement="bottom"
              // excludeSelf={true}
              render={(attrs) => (
                <div className="container-search" tabIndex={-1} {...attrs}>
                  {searchResult.map((company, index) => (
                    <div key={index} className="wrapper-search">
                      <NavLink
                        to={`/company-detail/${company.company_id}`}
                        className="now-list-restaurant-row"
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <div className="item-restaurant">
                          <div className="img-result">
                            <img src={company.logo} alt="..." />
                          </div>
                          <div>
                            <div className="name-res">
                              <span>
                                <b>Tên cty : </b>
                              </span>
                              {company.company_name}
                            </div>
                            <div className="address-res">
                              <span>
                                <b>CN_Job : </b>
                              </span>
                              {company.industry}
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <input
                className="input-form-search"
                type="text"
                placeholder="Nhập từ khóa theo công ty và kỹ năng ..."
                onChange={(e) => {
                  setSearchShow(e.target.value);
                  setShowResult(true);
                }}
              />
            </Tippy>
            <button className="button-form-search">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ marginRight: 8 }}
              ></i>{" "}
              Tìm Kiếm
            </button>
          </div>

          <div className="search-suggestions"></div>
          <div className="image-logo-header">
            <img
              src="http://localhost:5173/assets/images/logo-search.svg"
              alt="loading..."
            />
          </div>
        </form>

        <div className="flex-search-suggestions">
          <div className="text-search-suggestions">
            <h6>Gợi ý cho bạn : </h6>
          </div>
          <NavLink to="/" className="category-link active">
            <h6 className="title-category">ReactJS</h6>
          </NavLink>

          {/* Add activeClassName prop to the remaining NavLinks */}
          <NavLink to="/javascript" className="category-link active">
            <h6 className="title-category">JavaScript</h6>
          </NavLink>

          <NavLink to="/java" className="category-link active">
            <h6 className="title-category">Java</h6>
          </NavLink>

          <NavLink to="/dotnet" className="category-link active">
            <h6 className="title-category">.NET</h6>
          </NavLink>

          <NavLink to="/tester" className="category-link active">
            <h6 className="title-category">Tester</h6>
          </NavLink>

          <NavLink to="/php" className="category-link active">
            <h6 className="title-category">PHP</h6>
          </NavLink>

          <NavLink to="/nodejs" className="category-link active">
            <h6 className="title-category">NodeJS</h6>
          </NavLink>

          <NavLink to="/manager" className="category-link active">
            <h6 className="title-category">Manager</h6>
          </NavLink>
        </div>
      </div>
      <div className="foo-search">
        <div>
          <img
            className="img-foo"
            src="http://localhost:5173/assets/images/10yearIT.svg"
            alt=""
          />
        </div>
        <div>
          <h5>
            Kỷ Niệm 10 Năm ITviec :
            <span>HỨNG KHỞI NGHÀNH IT TẠI VIỆT NAM </span>
            <i className="fa-solid fa-right-to-bracket"></i>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Search;
