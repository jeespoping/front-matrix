import React from "react";
import logo from "../../assets/png/Matrix.png";
import { Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import avatar from "../../assets/png/avatar.png";
import "./SideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export default function SideBar() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="sidebar">
      <div className="logo-details">
        <Image src={logo} width="70%" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <i className="far fa-tachometer-slowest"></i>
            <span className="link_name">Dashboard</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <Link to="/" className="link_name">
                Dashboard
              </Link>
            </li>
          </ul>
        </li>
        {/* <li>
                    <NavLink exact to="/manual">
                        <i className="fal fa-book"></i>
                        <span className="link_name">Manual</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><NavLink exact to="/manual" className="link_name">Manual</NavLink></li>
                    </ul>
                </li> */}
        {/* <li>
                    <div className="iocn-link">
                        <a href="#">
                            <i className='bx bx-book-alt'></i>
                            <span className="link_name">Posts</span>
                        </a>
                        <i className="fad fa-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li><a className="link_name" href="#">Posts</a></li>
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">Login Form</a></li>
                        <li><a href="#">Card Design</a></li>
                    </ul>
                </li> */}

        <li>
          <div className="profile-details">
            <div className="profile-content">
              <Image src={avatar} />s
            </div>
            <div className="name-job">
              <div className="profile_name">{user.descripcion}</div>
              <div className="job">{user.codigo}</div>
            </div>
            <i onClick={handleLogout} className="fal fa-sign-out-alt"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}
