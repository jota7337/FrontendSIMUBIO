import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Home from './pages/home';

const DashboardLayout = () => {
  return (
    <div>
      <section className="full-box cover dashboard-sideBar">
        <div className="full-box dashboard-sideBar-bg btn-menu-dashboard"></div>
        <div className="full-box dashboard-sideBar-ct">
          <div className="full-box text-uppercase text-center text-titles dashboard-sideBar-title">
            UNIVERSIDAD EL BOSQUE <i className="zmdi zmdi-close btn-menu-dashboard visible-xs"></i>
          </div>
          <div className="full-box dashboard-sideBar-UserInfo">
            <figure className="full-box">
              <img src="./assets/img/avatar.jpg" alt="UserIcon" />
              <figcaption className="text-center text-titles">Victor</figcaption>
            </figure>
            <ul className="full-box list-unstyled text-center">
              <li>
                <a href="#!">
                  <i className="zmdi zmdi-settings"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="btn-exit-system">
                  <i className="zmdi zmdi-power"></i>
                </a>
              </li>
            </ul>
          </div>
          <ul className="list-unstyled full-box dashboard-sideBar-Menu">
            <li>
              <a href="home.html">
                 Dashboard
              </a>
            </li>
            <li>
              <Link to="/Form" className="list-unstyled full-box dashboard-sideBar-Menu">
                 Administrador 
              </Link> 
            </li>
          </ul>
        </div>
      </section>

      <section className="full-box dashboard-contentPage">
        <nav className="full-box dashboard-Navbar">
          <ul className="full-box list-unstyled text-right">
            <li className="pull-left">
              <a href="#!" className="btn-menu-dashboard"><i className="zmdi zmdi-more-vert"></i></a>
            </li>
            <li>
              <a href="#!" className="btn-search">
                <i className="zmdi zmdi-search"></i>
              </a>
            </li>
          </ul>
        </nav>
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;