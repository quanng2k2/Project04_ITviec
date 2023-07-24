import "./css/footer.css";

const Footer: React.FC = () => {
  return (
    <>
      <div className="container-footer">
        <div>
          <img
            src="http://localhost:5173/assets/images/logo-itviec.png"
            alt="loading..."
          />
          <h6>Ít nhưng mà chất</h6>
          <div className="icon-footer">
            <img
              className="img-icon-foo"
              src="http://localhost:5173/assets/img-footer/facebook.png"
              alt=""
            />
            <img
              className="img-icon-foo"
              src="http://localhost:5173/assets/img-footer/insta.png"
              alt=""
            />
            <img
              className="img-icon-foo"
              src="http://localhost:5173/assets/img-footer/twitter.png"
              alt=""
            />
          </div>
        </div>

        <div className="text-footer">
          <h6 id="bold-text-foo">Về ITviec</h6>
          <h6>Trang chủ</h6>
          <h6>Về ITviec.com</h6>
          <h6>Dịch vụ gợi ý ứng viên</h6>
          <h6>Liên Hệ</h6>
          <h6>Việc Làm IT</h6>
          <h6>Câu hỏi thường gặp</h6>
        </div>

        <div className="text-footer">
          <h6 id="bold-text-foo">Chương trình</h6>
          <h6>Chuyện IT</h6>
          <h6>Cuộc thi viết</h6>
        </div>

        <div className="text-footer">
          <h6 id="bold-text-foo">Điều khoản chung</h6>
          <h6>Quy định bảo mật</h6>
          <h6>Quy chế hoạt động</h6>
          <h6>Giải quyết khiếu nại</h6>s<h6>Thoả thuận sử dụng</h6>
          <h6>Thông cáo báo chí</h6>
        </div>

        <div className="text-footer">
          <h6 id="bold-text-foo">Liên hệ để đăng tin tuyển dụng tại:</h6>
          <h6>Hồ Chí Minh: (+84) 871237431</h6>
          <h6>Hà Nội: (+84) 7498347</h6>
          <h6>Email: Giaquan@itviec.com</h6>
        </div>
      </div>
    </>
  );
};
export default Footer;
