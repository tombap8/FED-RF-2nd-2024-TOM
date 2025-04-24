import React from 'react';
import ReactDOM from 'react-dom/client';
// 사스(Sass)팩키지를 설치했다면 바로 사스사용가능
// 확장자를 여기서는 쓰고 사스파일 import에선 생략가능
import "./css/main.scss";
import UserFormList from './components/UserFormList';

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <div>
      <h1 style={{whiteSpace:"nowrap"}}>🚀 Firebase + React</h1>
      <UserFormList />
    </div>
);