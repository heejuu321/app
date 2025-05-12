import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Api from '../Api';
import SearchPreviewResult from '../component/SearchPreviewResult';
import { setPreviewList } from '../actions/previewActions';

function ImageSearchPage() {

    return (
        <div>
            이미지 검색 페이지
        </div>
    )

}

export default ImageSearchPage;