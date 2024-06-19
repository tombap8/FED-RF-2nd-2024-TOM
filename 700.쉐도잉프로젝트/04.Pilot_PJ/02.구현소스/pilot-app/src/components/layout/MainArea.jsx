import React, { useState } from 'react';
import MainCont from '../pages/MainCont';

function MainArea(props) {
    // 상태관리 변수 셋팅 ///////
    // 1. 페이지변경 상태변수
    const [pgName, setPgName] = useState("main");

    // 코드 리턴구역 /////////////
    return (
        <>
            <MainCont />
        </>
    );
}

export default MainArea;