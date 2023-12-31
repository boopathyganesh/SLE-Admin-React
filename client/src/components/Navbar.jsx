import React from 'react';
import { TbBellRinging, TbMenu2 } from "react-icons/tb";
import User from '../assets/images/profile/user-1.jpg';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <button className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" onClick={toggleSidebar}>
              <TbMenu2 />
            </button>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="/">
              <TbBellRinging />
              <div className="notification bg-primary rounded-circle"></div>
            </a>
          </li>
        </ul>
        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon-hover" href="" id="drop2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src={User} alt="" width="35" height="35" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div className="message-body">
                  <a href="" className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6"></i>
                    <p className="mb-0 fs-3">My Profile</p>
                  </a>
                  <a href="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
