import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import TopArea from './components/layout/TopArea';
import MainArea from './components/layout/MainArea';
import FooterArea from './components/layout/FooterArea';

// 전체 공통 CSS
import "./css/index.scss";

function MainComponent(props) {
  return (
    <>
      <TopArea />
      <MainArea />
      <FooterArea />
    </>
  );
}

// 출력하기 //////
const root = createRoot(document.querySelector("#root"))
root.render(<MainComponent />);
