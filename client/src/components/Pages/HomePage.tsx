import About from "../Layouts/About";
import Employer from "../Layouts/Employer";
import Navbar from "../common/users/Navbar_Page";
import Posts from "../Layouts/Posts";
import Search from "../Layouts/Search";
import Footer from "../common/users/Footer";
import "./css/home.css";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  // back to top
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="contair-homepage">
      <Navbar />
      {/* back to top --------------------- */}
      <button
        className={`back-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        title="Back to Top"
      >
        <span className="icon-top">☝️</span>
      </button>
      {/* stop back-to-top ----------------------- */}
      <Search />
      <About />
      <Employer />
      <Posts />
      <Footer />
    </div>
  );
};
export default HomePage;
