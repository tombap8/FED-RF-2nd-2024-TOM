/// 메인영역 컴포넌트 : MainArea.jsx /////

import { Outlet } from "react-router-dom";
// Outlet 컴포넌트는 리액트라우터에서 컴포넌트를
// 변경하여 출력하는 자리를 잡아주는 역할을 함!

export default function MainArea(){

    /// 리턴 코드구역 ////////
    return (
        <main className="cont">
            <Outlet />
        </main>
    );

} //////////// MainArea 컴포넌트 ///////////