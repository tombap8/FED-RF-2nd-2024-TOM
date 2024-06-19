import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import TopArea from './components/layout/TopArea';
import MainArea from './components/layout/MainArea';
import FooterArea from './components/layout/FooterArea';



// 전체 공통 CSS
import "./css/index.scss";

function MainComponent(props) {
  // 상태관리 변수 셋팅 ///////
  // 1. 페이지변경 상태변수
  const [pgName, setPgName] = useState("main");


  // 코드 리턴구역 /////////////
  return (
    <>
      <TopArea />
      <MainArea page="main" />
      <FooterArea />
    </>
  );
}

// 출력하기 //////
const root = createRoot(document.querySelector("#root"))
root.render(<MainComponent />);
