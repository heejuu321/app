import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../Api';
import SearchPreviewResult from '../component/SearchPreviewResult';
import { setPreviewList } from '../actions/previewActions';
import CategoryFilter from '../component/CategoryFilter';
import axios from 'axios';
import FileUploadBox from '../component/FileUploadBox';


function TextSearchPage() {
  const dispatch = useDispatch();
  const previewResult = useSelector(state => state.previewItem);

  const [sortType, setSortType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState('');

useEffect(() => {
  console.log('sortType:', sortType);
}, [sortType]);



const getSortedResults = () => {
  if (!Array.isArray(previewResult)) return [];
  if (sortType === 'name-asc') {
    return [...previewResult].sort((a, b) => {
      const nameA = a.payload?.name || '';
      const nameB = b.payload?.name || '';
      return nameA.localeCompare(nameB, 'en');
    });
  }  //score
    if (sortType === 'score-asc') {
        console.log('score-asc');
    return [...previewResult].sort((a, b) => {
    const scoreA = a.score ?? a.payload?.score ?? 0;
    const scoreB = b.score ?? b.payload?.score ?? 0;
    return scoreB - scoreA;
    });
  }
    if (sortType === 'score-desc') {
    return [...previewResult].sort((a, b) => {
    const scoreA = a.score ?? a.payload?.score ?? 0;
    const scoreB = b.score ?? b.payload?.score ?? 0;
    return scoreA - scoreB;
    });
  }
      if (sortType === '*') {
  // Fisher-Yates 셔플 알고리즘 (권장)
  const shuffled = [...previewResult];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
  }
  return previewResult;
};

//   const getSortedResults = () => {
//     if (!Array.isArray(previewResult)) return [];
//     if (sortType === 'name-asc') {
//       return [...previewResult].sort((a, b) => a.name.localeCompare(b.name, 'eng'));
//     }
//     return previewResult;
//   };

  const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('검색어를 입력하세요!');
      return;
    }
    try {
      const response = await axios.post('http://3.38.36.43:8082/search/text', {
        text: query
      });
      // response.data 활용
      console.log('검색 성공:', response.data);
    } catch (error) {
      console.error('검색 실패:', error);
    }
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

      <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">New Project</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body" style={{ textAlign: 'left' }}>
                  <h4 className="mt-0 header-title">검색어를 입력하세요.</h4>
                  <p className="text-muted mb-3">
                    검색어 예시: 빨간 신발 / 노란 옷 / 캐릭터 디자인 / 운동할 때 편한 신발 / 격식있는
                  </p>
                  <div className="row">
                    <div className="col-lg-6">
                      <form onSubmit={handleSearch}>
                        <div className="d-flex align-items-center">
                          <input
                            type="text" className="form-control" placeholder="검색어를 입력하세요" style={{ maxWidth: '400px' }} value={query} onChange={e => setQuery(e.target.value)}
                          />
                          <button className="btn btn-primary ml-2" type="submit">검색</button>
                          <button className="btn btn-danger ml-2" type="button">초기화</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-5 ml-auto align-self-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="card e-co-product">
                <a href="">
                  <img src="../assets/images/products/img-1.png" alt="" className="img-fluid" />
                </a>
                <div className="card-body product-info">
                  <a href="" className="product-title">Unique Shoe (White)</a>
                  <button className="btn btn-dark btn-sm waves-effect waves-light wishlist" data-toggle="tooltip" data-placement="top" title="Wishlist">
                    <i className="mdi mdi-heart"></i>
                  </button>
                  <button className="btn btn-dark btn-sm waves-effect waves-light quickview" data-toggle="tooltip" data-placement="top" title="Quickview">
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card e-co-product">
                <a href="">
                  <img src="../assets/images/products/img-3.png" alt="" className="img-fluid" />
                </a>
                <div className="card-body product-info">
                  <a href="" className="product-title">Headphone F2019</a>
                  <button className="btn btn-dark btn-sm waves-effect waves-light wishlist" data-toggle="tooltip" data-placement="top" title="Wishlist">
                    <i className="mdi mdi-heart"></i>
                  </button>
                  <button className="btn btn-dark btn-sm waves-effect waves-light quickview" data-toggle="tooltip" data-placement="top" title="Quickview">
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card e-co-product">
                <a href="">
                  <img src="../assets/images/products/img-4.png" alt="" className="img-fluid" />
                </a>
                <div className="card-body product-info">
                  <a href="" className="product-title">Lavie Purse CN120</a>
                  <button className="btn btn-dark btn-sm waves-effect waves-light wishlist" data-toggle="tooltip" data-placement="top" title="Wishlist">
                    <i className="mdi mdi-heart"></i>
                  </button>
                  <button className="btn btn-dark btn-sm waves-effect waves-light quickview" data-toggle="tooltip" data-placement="top" title="Quickview">
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card e-co-product">
                <a href="">
                  <img src="../assets/images/products/img-5.png" alt="" className="img-fluid" />
                </a>
                <div className="card-body product-info">
                  <a href="" className="product-title">Nike Shoes Leather Pasted 20</a>
                  <button className="btn btn-dark btn-sm waves-effect waves-light wishlist" data-toggle="tooltip" data-placement="top" title="Wishlist">
                    <i className="mdi mdi-heart"></i>
                  </button>
                  <button className="btn btn-dark btn-sm waves-effect waves-light quickview" data-toggle="tooltip" data-placement="top" title="Quickview">
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}

export default TextSearchPage;