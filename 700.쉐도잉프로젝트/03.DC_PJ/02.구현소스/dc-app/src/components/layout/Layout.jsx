// 전체 레이아웃 컴포넌트 ///

import { useState } from "react";
import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import TopArea from "./TopArea";

// 컨텍스트 API 불러오기
import { dCon } from "../modules/dCon";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  // [ 상태관리 변수 ] //////////////
  // 1. 로그인 상태관리변수
  const [loginSts, setLoginSts] = useState(sessionStorage.getItem("minfo"));
  // -> 초기값으로 세션스토리지 "minfo"를 할당함

  // 2. 로그인 환영 메시지 상태변수
  const [loginMsg, setLoginMsg] = useState(null);
  console.log(loginMsg);

  // [ 공통 함수 ] ///
  // 1. 라우팅 이동함수
  const goPage = useNavigate();
  
  // 2. 로그인 환영메시지 생성함수
  const makeMsg = (name) => {
    // 유저아이콘
    let usrIcon = ["🙍‍♂️","🧏‍♀️","🦸‍♂","👨‍🎤","🦸‍♀"];
    // 랜덤수 : 0~4사이의 수
    let rdm = Math.floor(Math.random()*5);
    // 로그인 메시지 상태변수 업데이트
    setLoginMsg(`Welcome ${name} ${usrIcon[rdm]}`);
  }; /////// makeMsg 함수 /////////

  //// 코드 리턴구역 //////////////
  return (
    // Provider value속성으로 전역노출 변수를 설정함!
    <dCon.Provider
      value={{
        loginSts,
        setLoginSts,
        setLoginMsg,
        goPage,
        makeMsg,
      }}
    >
      {/* 1.상단영역 */}
      <TopArea />
      {/* 2.메인영역 */}
      <MainArea />
      {/* 3.하단영역 */}
      <FooterArea />
    </dCon.Provider>
  );
} /////////// Layout /////////////////////
