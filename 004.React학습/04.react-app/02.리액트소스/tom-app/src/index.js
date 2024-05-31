import React from 'react';
import ReactDOM from 'react-dom/client';
// 사스(Sass)팩키지를 설치했다면 바로 사스사용가능
// 확장자를 여기서는 쓰고 사스파일 import에선 생략가능
import "./css/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <>
   <h1><b>선재업고</b><span>튀어</span></h1>
  </>
);
