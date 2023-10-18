import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import { TbLayoutDashboard, TbFileDescription } from 'react-icons/tb';
import { FaBasketShopping, FaCartFlatbed } from 'react-icons/fa6';
import BrandLogo from '../assets/images/logos/sle_logo.png';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div>
      <aside className={`left-sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="/" className="text-nowrap logo-img">
              <img src={BrandLogo} width="180" alt="" />
            </a>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              onClick={toggleSidebar} // Enable the onClick handler
            >
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="/" aria-expanded="false">
                  <span>
                    <TbLayoutDashboard />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="/" aria-expanded="false">
                  <span>
                    <TbFileDescription />
                  </span>
                  <span className="hide-menu">Forms</span>
                </a>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Products</span>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="/products" aria-expanded="false">
                  <span>
                    <FaBasketShopping />
                  </span>
                  <span className="hide-menu">Product Management</span>
                </a>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Orders</span>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="/orders" aria-expanded="false">
                  <span>
                    <FaCartFlatbed />
                  </span>
                  <span className="hide-menu">Order Management</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
