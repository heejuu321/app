import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../Api';
import SearchPreviewResult from '../component/SearchPreviewResult';
import { setPreviewList } from '../actions/previewActions';
import CategoryFilter from '../component/CategoryFilter';
import axios from 'axios';
import FileUploadBox from '../component/FileUploadBox';

function ImageSearchPage() {
  const dispatch = useDispatch();
  const previewResult = useSelector(state => state.previewItem);
  const [sortType, setSortType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [file, setFile] = useState(null);

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

  useEffect(() => {
    console.log('previewResult changed:', previewResult);
  }, [previewResult]);

  const previewSearch = useCallback((e) => {
    e.preventDefault();
    dispatch(setPreviewList([{ name: 't-Shirts' }, { name: 'pants' }]));
  }, [dispatch, previewResult]);

  const reset = useCallback(() => {
  setFile(null); // 파일 상태 초기화
  dispatch(setPreviewList([])); // 검색 결과도 초기화
  }, [dispatch]);

    useEffect(() => {
    // Dropify 초기화
    if (window.$ && window.$.fn.dropify) {
      window.$('.dropify').dropify();
    }
  }, []);

    // 파일 업로드 및 검색 함수
const handleSearch = async (e) => {
  e.preventDefault();
  if (!file) {
    alert('파일을 첨부해 주세요!');
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('collection_name', 'commerce');
  formData.append('category', '');
  formData.append('limit', '7');
  formData.append('metadata', '1');

  try {
    const response = await axios.post(
      'http://3.38.36.43:8082/search/image', 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    dispatch(setPreviewList(response.data.target));
    console.log(previewResult);
    console.log('API 통신 성공:', response.data);
  } catch (error) {
    console.error('API 통신 실패:', error);
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
                    <div className="float-right">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="javascript:void(0);">Crovex</a></li>
                        <li className="breadcrumb-item"><a href="javascript:void(0);">UI Kit</a></li>
                        <li className="breadcrumb-item active">File Uploads</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xl-6">
      <div className="card">
        <div className="card-body">
          <h4 className="mt-0 header-title">File Upload 1</h4>
          <p className="text-muted mb-3">Your so fresh input file — Default version</p>
          <FileUploadBox onFileChange={setFile} file={file}/>
        </div>
      </div>
                <button type="submit" className="btn btn-gradient-primary" onClick={handleSearch} > 검색</button>
            <div style={{ width: '16px', display: 'inline-block' }}></div>
                <button type="button" className="btn btn-gradient-danger" onClick={reset}>지우기</button>
            </div>
              </div>
              <span>　　　</span>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <CategoryFilter onSortChange={setSortType} />
                  </div>
                </div>
              </div>
              <div className="row">
                {getSortedResults().map((item, idx) => (
                  <SearchPreviewResult key={item.id || idx} previewResult={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageSearchPage;