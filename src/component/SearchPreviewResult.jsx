import React, { Component } from 'react';
import PropTypes from 'prop-types';

function SearchPreviewResult({previewResult={name:'이름'}}) {



const trimmed = previewResult.payload.filepath.replace('/home/manny/E-commerce-Product-Images/data/', '');
const imgPath = `/assets/images/E-commerce Product Images/data/${trimmed}`;


    return(
        <>
<div className="col-lg-3" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  <div className="card e-co-product" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={`/assets/images/E-commerce Product Images/data/${previewResult.payload.filepath.replace('/home/manny/E-commerce-Product-Images/data/', '')}`}
        alt=""
        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
      />
    </div>
    <div className="card-body product-info" style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href="" className="product-title">{previewResult.payload.name}</a>
    </div>
    <div className="card-body product-info" style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href="" className="product-title">{previewResult.score}</a>
    </div>
  </div>
</div>
        </>
    )
}

export default SearchPreviewResult;