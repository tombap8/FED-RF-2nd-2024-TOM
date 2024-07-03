// 전체 레이아웃 컴포넌트 ///

import { useCallback, useEffect, useState } from "react";
import {FooterArea} from "./FooterArea";
import MainArea from "./MainArea";
import {TopArea} from "./TopArea";

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
  // console.log(loginMsg);

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

  // 3. 로그아웃 함수 /////////
  const logoutFn = () => {
    // 1. 로그인 상태값 null
    setLoginSts(null);
    // 2. 세션스 지우기 : minfo
    sessionStorage.removeItem("minfo");
    // 3. 로그인 메시지 초기화
    setLoginMsg(null);
    // 4. 메인 페이지로 돌아가기
    goPage("/");
  }; //////// logoutFn 함수 /////////

  
  // 화면 랜더링 구역 ////////
  useEffect(()=>{
    // -> 로그인 상태 체크 //////
    // 만약 세션스(minfo)의 값이 null이 아니면
    // 로그인 상태변수를 업데이트 한다!
    // -> null이 아니면 조건문이 true처리됨!
    if(sessionStorage.getItem("minfo")){
      // 세션스 변수할당
      let ss = sessionStorage.getItem("minfo");
      // 로그인 상태값
      setLoginSts(ss);
      // 로그인 메시지 업데이트 : 
      // -> 세션스의 unm(이름값)을 보내준다!
      makeMsg(JSON.parse(ss).unm);
    } ///// if ///////

  },[]);


  //// 코드 리턴구역 //////////////
  return (
    // Provider value속성으로 전역노출 변수를 설정함!
    <dCon.Provider
      value={{
        loginSts,
        setLoginSts,
        loginMsg,
        setLoginMsg,
        goPage,
        makeMsg,
        logoutFn,
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
