// DC.com 검색페이지 컴포넌트 - SearchPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Searching from '../modules/Searching';

function SearchPage() {
    // 라우터 전달값 받기 객체 생성
    const { state } = useLocation();

    // 넘어온 키워드 받기
    const keyword = state.keyword;

    // 리턴 코드구역 ////////////////
    return (
        <>
            <h1 className='tit'>
                Search Result ({keyword})
            </h1>
            {/* 검색모듈 */}
            <Searching kword={keyword} />
        </>
    );
}

export default SearchPage;