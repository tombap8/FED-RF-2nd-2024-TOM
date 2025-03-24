/// 레이아웃 컴포넌트 : Layout.jsx /////

import { useCallback, useEffect, useState } from "react";
// 컨텍스트 API 로 전역변수구역 설정하기! ////
import { dCon } from "../modules/dCon";

import { TopArea } from "./TopArea";
import { FooterArea } from "./FooterArea";
import MainArea from "./MainArea";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  // [ 전역 상태관리 변수 설정하기 ] ////
  // [1] 로그인 상태관리변수 : 
  // 초기값 - 로컬스가 있으면 파싱할당!
  const [loginSts, setLoginSts] = useState(
    sessionStorage.getItem("minfo")
      ? JSON.parse(sessionStorage.getItem("minfo"))
      : null
  );
  // -> 초기값으로 세션스토리지 'minfo'를 할당함!
  console.log(loginSts);

  // [2] 로그인 환영 메시지 상태변수 : 
  // 초기값 - 로그인 상태변수에 따라할당 ////
  const [loginMsg, setLoginMsg] = useState(null);

  // [ 공통함수 ] /////////////////
  // [1] 라우터 이동함수 ////
  // useNavigate()를 사용한 라우터 이동함수가
  // 변수에 할당될때 주소가 리랜더링시 변경된다!
  // 따라서 이것을 사용하는 메모이제이션에서
  // 메모 처리되도록 이것도 useCallback()처리함!
  const goNav = useNavigate();
  // 다른 콜백처리 함수에서 이동함수를 호출함!
  const goPage = useCallback((pm1, pm2) => {
    // pm1 - 라우터주소, pm2 - state전달객체
    // pm2가 없으면 전달하지 않으면됨!(null값)
    goNav(pm1, pm2);
  }, []);

  // [2] 로그인 환영 메시지 생성함수 ///
  function makeMsg(name){
    // 유저아이콘
    let usrIcon = ["🙍‍♂️", "🧏‍♀️", "🦸‍♂", "👨‍🎤", "🦸‍♀"];
    // 랜덤수 : 0~4사이의 수
    let rdm = Math.floor(Math.random() * 5);
    // 로그인 메시지 상태변수 업데이트
    setLoginMsg(`Welcome ${name} ${usrIcon[rdm]}`);
  } ///////// makeMsg /////////////

  // [3] 로그아웃 함수 /////////////
  // 상단영역 메모이제이션 처리를 위해
  // 보내주는 함수의 주소가 바뀌지 않도록
  // useCallback()을 사용한 메모이제이션 처리함!
  const logoutFn = useCallback(() => {
    // (1) 로그인 상태값 null
    setLoginSts(null);
    // (2) 세션스 지우기 : minfo
    sessionStorage.removeItem("minfo");
    // (3) 로그인 메시지 초기화
    setLoginMsg(null);
    // (4) 메인 페이지로 돌아가기
    goPage("/");
  }, []); ////////// logoutFn //////////


  // [ DOM 랜더링 실행구역 : 처음한번만 ] /////
  useEffect(()=>{
    // 처음에 로그인 상태라면 환영메시지 업데이트 하기
    if(loginSts){
      makeMsg(loginSts.unm);
    } /// if ///
  },[]); /////// useEffect : 처음한번만 //////

  /// 리턴 코드구역 /////////////////////////
  return (
    // 컨텍스트API Provider 에서
    // value속성에 등록하면 전역사용가능해짐!
    <dCon.Provider
      value={{
        loginSts, // 로그인상태 getter
        setLoginSts, // 로그인상태 setter
        loginMsg, // 로그인메시지 getter
        makeMsg, // 로그인메시지 생성함수
        goPage, // 라우터 이동함수
        logoutFn, // 로그아웃 함수
      }}
    >
      {/* 1. 상단영역 :  
        메모이제이션을 위해 직접값전달! */}
      <TopArea
        // (1) 로그인 메시지 getter
        loginMsg={loginMsg}
        // (2) 로그인 상태 getter
        loginSts={loginSts}
        // (3) 로그아웃 함수
        logoutFn={logoutFn}
        // (4) 라우터 이동함수
        goPage={goPage}
      />
      {/* 2. 메인영역 */}
      <MainArea />
      {/* 3. 하단영역 */}
      <FooterArea />
    </dCon.Provider>
  );
} //////////// Layout 컴포넌트 ///////////
