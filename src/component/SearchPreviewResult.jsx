import React, { Component } from 'react';
import PropTypes from 'prop-types';

function SearchPreviewResult({previewResult={name:'이름'}}) {



const trimmed = previewResult.payload.filepath.replace('/home/manny/E-commerce-Product-Images/data/', '');
const imgPath = `/assets/images/E-commerce Product Images/data/${trimmed}`;


    return(
        <>
               <div className="col-lg-3">
                    <div className="card e-co-product">
                        <div className="card-body product-info">
    <a
      href=""
      className="product-title"
      style={{
        display: 'block',
        minHeight: '40px', // 한 줄 또는 두 줄 높이로 고정 (원하는 값으로 조정)
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal', // 여러 줄 허용
        wordBreak: 'break-all'
      }}
    >    </a>
                      <img   
  src={`/assets/images/E-commerce Product Images/data/${previewResult.payload.filepath.replace('/home/manny/E-commerce-Product-Images/data/', '')}`}
                       alt="" className="img-fluid" />
                      {/* <img   src="/assets/images/E-commerce Product Images/data/Apparel/Boys/Images/images_with_product_ids/10054.jpg" alt="" className="img-fluid" /> */}
                    <div className="card-body product-info">
                        <a href="" className="product-title">{previewResult.payload.name}</a>
                    </div>
                    <div className="card-body product-info">
                        <a href="" className="product-title">{previewResult.score}</a>
                    </div>
                  </div>
                </div>
                </div>
        </>
    )
}

export default SearchPreviewResult;