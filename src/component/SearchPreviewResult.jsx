import React, { Component } from 'react';
import PropTypes from 'prop-types';

function SearchPreviewResult({previewResult={name:'이름'}}) {
    return(
        <>
            <div className="row">
                <div className="col-lg-3">
                  <div className="card e-co-product">
                    <a href="">
                      <img src="/assets/images/products/img-4.png" alt="" className="img-fluid" />
                    </a>
                    <div className="card-body product-info">
                        <a href="" className="product-title">{previewResult.name}</a>
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
        </>
    )
}

export default SearchPreviewResult;