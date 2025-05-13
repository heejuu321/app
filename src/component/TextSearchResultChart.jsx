import React, { useState } from 'react';


function TextSearchResultChart({ data }) {
    return (
  <div className="card">
    <div className="card-body">
      <div className="table-responsive">
        <table className="table mb-0">
          <thead className="thead-light">
            <tr>
              <th>id</th>
              <th>score</th>
              <th>filepath</th>
              <th>category</th>
              <th>name</th>
              <th>extension</th>
              <th>size</th>
              <th>tag</th>
            </tr>
          </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td>{item.id}</td>
                      <td>{item.score}</td>
                      <td>{item.payload?.filepath}</td>
                      <td>{item.payload?.category}</td>
                      <td>{item.payload?.name}</td>
                      <td>{item.payload?.extension}</td>
                      <td>{item.payload?.size}</td>
                      <td>{item.payload?.tag}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
        </table>
      </div>
    </div>
  </div>
    );
}

export default TextSearchResultChart;