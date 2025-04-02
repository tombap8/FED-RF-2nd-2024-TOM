import React from 'react';
import ReactDOM from 'react-dom/client';
import UserList from './components/UserList';
// 사스(Sass)팩키지를 설치했다면 바로 사스사용가능
// 확장자를 여기서는 쓰고 사스파일 import에선 생략가능
import "./css/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <div>
      <h1>🚀 Supabase + React</h1>
      <UserList />
    </div>
);
