import React, { useCallback, useEffect, useState } from 'react';
import StaticsChart from '../component/StaticsChart';

function StaticsPage() {

      const [sidebarOpen, setSidebarOpen] = useState(true);

   const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

    return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <a href="../projects/projects-index.html" className="logo">
            <span>
              <img src="../assets/images/logo-sm.png" alt="logo-small" className="logo-sm" />
            </span>
            <span>
              <img src="../assets/images/logo.png" alt="logo-large" className="logo-lg logo-light" />
              <img src="../assets/images/logo-dark.png" alt="logo-large" className="logo-lg" />
            </span>
          </a>
        </div>
        <nav className="navbar-custom">
          <ul className="list-unstyled topbar-nav mb-0">
            <li>
              <button className="nav-link button-menu-mobile waves-effect waves-light" onClick={handleSidebarToggle}>
                <i className="ti-menu nav-icon"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="main-wrapper"
        style={{
          display: 'flex',
          width: '100vw',
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        <div className="left-sidenav" style={{ display: sidebarOpen ? 'block' : 'none' }}>
          <ul className="metismenu left-sidenav-menu">
            {/* <li className="nav-item">
              <a href="/">
                <i className="ti-layers-alt"></i>
                <span>이미지 프리뷰</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li> */}
            <li className="nav-item">
              <a href="/">
                <i className="ti-layers-alt"></i>
                <span>이미지 검색</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/text">
                <i className="ti-layers-alt"></i>
                <span>하이브리드 검색</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/chart">
                <i className="ti-bar-chart"></i>
                <span>검색 통계</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="page-wrapper">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title-box">
                    <div className="chart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%' }}>
                      <div style={{ width: '100%' }}><StaticsChart /></div>
                      <div style={{ width: '100%' }}><StaticsChart /></div>
                    </div>
                  </div>
                </div>
              </div>
              <span>　　　</span>
            </div>
          </div>
        </div>
      </div>
    </>
    );

}

export default StaticsPage;