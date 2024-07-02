// 전체 레이아웃 컴포넌트 ///

import { useState } from "react";
import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import TopArea from "./TopArea";

// 컨텍스트 API 불러오기
import { dCon } from "../modules/dCon";

export default function Layout(){
    // 상태관리 변수 //////////////
    // 1. 로그인 상태관리변수 
    const [loginSts, setLoginSts] = 
    useState(sessionStorage.getItem("minfo"));
    // -> 초기값으로 세션스토리지 "minfo"를 할당함

    // 2. 로그인 환영 메시지 상태변수
    const [loginMsg, setLoginMsg] = useState(null);
    

    //// 코드 리턴구역 //////////////
    return(
        // Provider value속성으로 전역노출 변수를 설정함!
        <dCon.Provider value={{loginSts,setLoginSts,setLoginMsg}}>
           {/* 1.상단영역 */}
           <TopArea />
           {/* 2.메인영역 */}
           <MainArea />
           {/* 3.하단영역 */}
           <FooterArea />
        </dCon.Provider>
    );

} /////////// Layout /////////////////////