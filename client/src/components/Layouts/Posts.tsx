import "./css/post.css";

const Posts: React.FC = () => {
  return (
    <>
      <h2 className="title-post">Bài viết nổi bật</h2>
      <div className="container-post">
        <div>
          <a className="none-text" href="https://itviec.com/blog/ajax-la-gi/">
            <div className="item-one">
              <img
                className="img-item-one"
                src="http://localhost:5173/assets/img-post/Ajax.png"
                alt=""
              />
              <h5 className="title-post-home">
                1 AJAX là gì? Quy trình hoạt động và thực hành AJAX dễ hiểu cho
                Web Developer <br /> AJAX là gì? AJAX là một kỹ thuật phát triển
                web hiện đại giúp ứng dụng web ngày càng nhanh và mượt như các
                ứng...
              </h5>
              <h6 className="post-foo">Bắt đầu đọc 🔔 </h6>
            </div>
          </a>
        </div>

        <div className="grip-item-two">
          <a className="none-text" href="https://itviec.com/blog/jira-la-gi/">
            <div className="item-two">
              <img
                className="img-item-two"
                src="http://localhost:5173/assets/img-post/jira.jpg"
                alt=""
              />
              <h6 className="title-post-home">
                Jira là gì? Hướng dẫn sử dụng Jira Software chi tiết A – Z bằng
                hình ảnh
              </h6>
              <h6 className="post-foo2">Bắt đầu đọc 🔔 </h6>
            </div>
          </a>

          <a
            className="none-text"
            href="https://itviec.com/blog/quy-trinh-nghi-viec/"
          >
            <div className="item-two">
              <img
                className="img-item-two"
                src="http://localhost:5173/assets/img-post/quy-trinh.png"
                alt=""
              />
              <h6 className="title-post-home">
                Quy trình nghỉ việc đối với nhân viên IT – Những điều cần lưu ý
              </h6>
              <h6 className="post-foo2">Bắt đầu đọc 🔔 </h6>
            </div>
          </a>

          <a className="none-text" href="https://itviec.com/blog/ux-designer/">
            <div className="item-two">
              <img
                className="img-item-two"
                src="http://localhost:5173/assets/img-post/thumbnail.jpg"
                alt=""
              />

              <h6 className="title-post-home">
                UX Designer là làm gì? Kĩ năng, tư duy cần có để UX Designer
                thành công
              </h6>
              <h6 className="post-foo2">Bắt đầu đọc 🔔 </h6>
            </div>
          </a>

          <a className="none-text" href="https://itviec.com/blog/cms-la-gi/">
            <div className="item-two">
              <img
                className="img-item-two"
                src="http://localhost:5173/assets/img-post/cms-blog.jpg"
                alt=""
              />
              <h6 className="title-post-home">
                CMS là gì? Top 10 CMS phổ biến 2023
              </h6>
              <h6 className="post-foo2">Bắt đầu đọc 🔔 </h6>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Posts;
