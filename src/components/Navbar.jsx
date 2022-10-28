import React, { useRef } from "react";
import "../index.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const activeStyle = {
    color: "#bea4b7",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
    toast("Ви вийшли з системи");
  };

  return (
    <header className="navigation">
      {/* // If login => // */}

      {isAuth && (
        <div className="nav-login">
          <span className="logo">EManager</span>
          <nav className="navigation" ref={navRef}>
            <NavLink
              to={"/"}
              href="/"
              className="link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={showNavbar}
            >
              Головна
            </NavLink>

            <NavLink
              to={"/posts"}
              href="/"
              className="link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={showNavbar}
            >
              Записи
            </NavLink>

            <NavLink
              to={"new"}
              href="/"
              className="link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={showNavbar}
            >
              Додати запис
            </NavLink>

            <NavLink
              to={"/offers"}
              href="/"
              className="link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={showNavbar}
            >
              Прохання
            </NavLink>

            <button onClick={logoutHandler} className="btn-out">
              Вихід
            </button>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes size={23} />
            </button>
          </nav>
          <div className="nav-block-btn">
            <button onClick={logoutHandler} className="btn_enter">
              Вихід
            </button>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars size={23} />
            </button>
          </div>
        </div>
      )}

      {/* // If logout => // */}

      {!isAuth && (
        <div className="nav-logout">
          <span className="logo">EManager</span>
          <Link to={"/login"} className="link_enter">
            Вхід
          </Link>
        </div>
      )}
    </header>
  );
};
