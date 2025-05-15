import React, { useCallback, useEffect, useState } from "react";
import StaticsChart from "../component/StaticsChart";
import axios from "axios";

function StaticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
  // 통계 데이터 state
  const [scoreData, setScoreData] = useState({ labels: [], values: [] });
  const [countData, setCountData] = useState({ labels: [], values: [] });
  const [monthData, setMonthData] = useState({ labels: [], values: [] });
  const [timeData, setTimeData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [scoreRes, countRes, monthRes, timeRes] = await Promise.all([
          axios.get("http://3.38.36.43:8082/stat/score"),
          axios.get("http://3.38.36.43:8082/stat/count"),
          axios.get("http://3.38.36.43:8082/stat/month"),
          axios.get("http://3.38.36.43:8082/stat/time"),
        ]);
        setScoreData({
          labels: scoreRes.data.target.target,
          values: scoreRes.data.target.values,
        });
        setCountData({
          labels: countRes.data.target.target,
          values: countRes.data.target.values,
        });
        setMonthData({
          labels: monthRes.data.target.target,
          values: monthRes.data.target.values,
        });
        setTimeData({
          labels: timeRes.data.target.target,
          values: timeRes.data.target.values,
        });
      } catch (err) {
        console.error("통계 API 호출 에러:", err);
      }
    };
    fetchAll();
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <a href="../projects/projects-index.html" className="logo">
            <span>
              <img
                src="../assets/images/remain-search-logo.png"
                alt="logo-small"
                className="logo-sm"
                style={{ width: "64px", height: "64px" }}
              />
            </span>
          </a>
        </div>
        <nav className="navbar-custom">
          <ul className="list-unstyled topbar-nav mb-0">
            <li>
              <button
                className="nav-link button-menu-mobile waves-effect waves-light"
                onClick={handleSidebarToggle}
              >
                <i className="ti-menu nav-icon"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="main-wrapper"
        style={{
          display: "flex",
          width: "100vw",
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <div
          className="left-sidenav"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
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
                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ flex: 1 }}>
                        <div
                          className="chart-grid"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "24px",
                            width: "100%",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <StaticsChart
                              chartName={"scoreData"}
                              labels={scoreData.labels}
                              values={scoreData.values}
                            />
                          </div>
                          <div style={{ width: "100%" }}>
                            <StaticsChart
                              chartName={"countData"}
                              labels={countData.labels}
                              values={countData.values}
                            />
                          </div>
                          <div style={{ width: "100%" }}>
                            <StaticsChart
                              chartName={"monthData"}
                              labels={monthData.labels}
                              values={monthData.values}
                            />
                          </div>
                          <div style={{ width: "100%" }}>
                            <StaticsChart
                              chartName={"timeData"}
                              labels={timeData.labels}
                              values={timeData.values}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          minWidth: "40px",
                          background: "transparent",
                        }}
                      >
                        {/* 오른쪽 공백용 빈 박스 */}
                      </div>
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
