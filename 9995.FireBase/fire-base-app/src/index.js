import React from 'react';
import ReactDOM from 'react-dom/client';

// 메인 페이지용 CSS
import './css/main.scss';
import UserFormList from './components/UserFormList';


// 루트요소 선택하기 ///
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

// 루트에 랜더링하기 ////
root.render(
  <>
    <h1>
      <b>리액트 + </b>
      <span>파이어베이스</span>
    </h1>
    {/* 사용자 정보 입력 및 리스트 컴포넌트 */}
    <UserFormList />
  </>
);