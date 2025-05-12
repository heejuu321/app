import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Api from '../Api';
import SearchPreviewResult from '../component/SearchPreviewResult';
import { setPreviewList } from '../actions/previewActions';

function ImagePreviewPage() {
    const dispatch = useDispatch(); // 함수 내부 최상단에 위치
    const previewResult = useSelector(state => state.previewItem);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
      setSidebarOpen(prev => !prev);
    };

//  const previewSearch = useCallback((e) => {
//      e.preventDefault();//새로고침 하지 않겠다
//     Api.get('/preview/search')
//       .then(response => {
//         dispatch(setPreviewList(response.data));
//       })
//       .catch(error => {
//         console.error('API 호출 에러:', error);
//       });
//   }, [dispatch]); 

   useEffect(() => {
     console.log('previewResult changed:', previewResult);
   }, [previewResult]);

    const previewSearch = useCallback((e) => {
      e.preventDefault();//새로고침 하지 않겠다
      dispatch(setPreviewList([{name : '이름!'}]));
  }, [dispatch, previewResult]);

      const reset = useCallback((e)=>{
          dispatch(setPreviewList([]));
      },[]);
  
  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-left">
          <a href="../projects/projects-index.html" className="logo">
            <span>
              <img src="/assets/images/logo-sm.png" alt="logo-small" className="logo-sm" />
            </span>
            <span>
              <img src="/assets/images/logo.png" alt="logo-large" className="logo-lg logo-light" />
              <img src="/assets/images/logo-dark.png" alt="logo-large" className="logo-lg" />
            </span>
          </a>
        </div>
        <nav className="navbar-custom">
          <ul className="list-unstyled topbar-nav mb-0">
            <li>
              <button className="nav-link button-menu-mobile waves-effect waves-light"  onClick={handleSidebarToggle}>
                <i className="ti-menu nav-icon"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Layout: Left Sidenav + Page Content side by side */}
      <div
        className="main-wrapper"
        style={{
          display: 'flex',
          width: '100vw',
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        {/* Left Sidenav */}
        <div
          className="left-sidenav"
          style={{
            display: sidebarOpen ? 'block' : 'none', // 토글에 따라 보이기/숨기기
          }}
        >
          <ul className="metismenu left-sidenav-menu">
            <li className="nav-item">
              <a href="../pages/pages-imagePreview.html">
                <i className="ti-layers-alt"></i>
                <span>이미지 프리뷰</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="../pages/pages-imageSearch.html">
                <i className="ti-layers-alt"></i>
                <span>이미지 검색</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="../pages/pages-hybridSearch.html">
                <i className="ti-layers-alt"></i>
                <span>하이브리드 검색</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="../pages/pages-statiacs.html">
                <i className="ti-bar-chart"></i>
                <span>검색 통계</span>
                <span className="menu-arrow">
                  <i className="mdi mdi-chevron-right"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Page Content */}
        <div className="page-wrapper">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Products</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="jumbotron mb-0 bg-light">
                        <h1 className="display-4">안녕하세요</h1>
                        <p className="lead">의류 및 신발 카테고리 에 속하는 3000여개의 이미지 입니다.</p>
                        <button type="submit" className="btn btn-gradient-primary" onClick={previewSearch}>검색</button>
                        <div style={{ width: '16px', display: 'inline-block' }}></div>
                        <button type="button" className="btn btn-gradient-danger" onClick={reset}>지우기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <SearchPreviewResult previewResult = {previewResult}/> */}
{Array.isArray(previewResult) && previewResult.map((item, idx) => (
  <SearchPreviewResult key={item.id || idx} previewResult={item} />
))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagePreviewPage;