import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, User } from "lucide-react";

import logoBK from "../../assets/HCMUT_official_logo.png";
import tel from "../../assets/mainLogo.jpg";

// Style cũ của bạn
import "./styles.css";
// SCSS module cho header
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

// Kết hợp className module
const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State cho menu mobile
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Lấy thông tin user từ localStorage (nếu có)
  const userData = localStorage.getItem("userdata");
  const isLoggedIn = localStorage.getItem("login") === "success";

  // Mảng liên kết menu
  // Đã thêm Dashboard & Settings
  const navLinks = [
    { path: "/", label: "TRANG CHỦ" },
    { path: "/about", label: "VỀ SMARTGROW" },
    { path: "/dashboard", label: "DASHBOARD" }, // Thêm
    // { path: "/schedule", label: "LÊN LỊCH" },
    // { path: "/settings", label: "CÀI ĐẶT" }, // Thêm
    { path: "/device", label: "CÀI ĐẶT" },
    { path: "/fruitQuality", label: "Kiểm tra chất lượng trái" },
    { path: "/leafMango", label: "Phát hiện lá bệnh" },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className="main-nav navbar navbar-expand-lg"
        style={{
          background: "var(--primary_background)",
        }}
      >
        <div className="container-fluid">
          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            onClick={handleNavCollapse}
            aria-label="Toggle navigation"
          >
            <Menu color="white" />
          </button>

          {/* Logo - Centered on mobile */}
          <Link className={cx("navbar-brand mx-auto mx-lg-0")} to="/">
            <img
              className={cx("wrapper_logo")}
              src={tel}
              alt="logoBK"
              height="50"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          >
            <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="nav-item">
                  <Link
                    to={path}
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                  >
                    <span className="fw-bold fs-6">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          {/* <div className="d-flex gap-3 align-items-center">
            <div className="d-none d-lg-flex align-items-center text-white">
              <img src={tel} alt="BK-HCMUT" height="50" />
            </div>
          </div> */}
          <div>
            <div className="container d-flex justify-content-end py-1 gap-2">
              {/* Chọn ngôn ngữ */}
              <div className="d-flex gap-2 align-items-center">
                <button
                  className={cx("wrapper_language", "btn", "btn-link", "p-0")}
                >
                  VN
                </button>
                <span className={cx("wrapper_language")}>|</span>
                <button
                  className={cx("wrapper_language", "btn", "btn-link", "p-0")}
                >
                  EN
                </button>
              </div>
              {/* Đăng ký / Đăng nhập hoặc hiển thị user */}
              <div className="d-flex gap-3 align-items-center">
                <i className="bi bi-person-fill text-danger"></i>
                {!isLoggedIn ? (
                  <span className="text-danger">
                    <a
                      onClick={() => navigate("signup")}
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      ĐĂNG KÝ
                    </a>
                    /
                    <a
                      onClick={() => navigate("signin")}
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      ĐĂNG NHẬP
                    </a>
                  </span>
                ) : (
                  <div className="d-flex gap-3">
                    <Link to="/profile">
                      <User />
                    </Link>
                    <span className="text-danger">
                      <a
                        onClick={() => navigate("/profile")}
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        {localStorage.getItem("name") || "User"}
                      </a>
                      /
                      <a
                        onClick={() => {
                          localStorage.clear();
                          navigate("/");
                        }}
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        Đăng xuất
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
