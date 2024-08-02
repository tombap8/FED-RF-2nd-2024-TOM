import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  HashRouter,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Character from "./components/pages/Character";
import Movies from "./components/pages/Movies";
import Series from "./components/pages/Series";
import Video from "./components/pages/Video";
import Games from "./components/pages/Games";
import News from "./components/pages/News";
import Main from "./components/pages/Main";
import Comics from "./components/pages/Comics";
import Board from "./components/pages/Board";

// 전체 공통 CSS 불러오기
import "../src/css/index.scss";
import CatDetail from "./components/pages/CatDetail";
import SearchPage from "./components/pages/SearchPage";
import Member from "./components/pages/Member";
import Login from "./components/pages/Login";

/********************************************* 
    [ 리액트 라우터 ]
    -> 컴포넌트를 연결하여 특정 이벤트에 모듈을
    변경해주는 중계역할을 함
    1. <BrowserRouter> - 라우터 Root
    2. <Routes> - 개별 라우터를 묶어주는 역할
    3. <Route> - 개별 라우터
        (속성)
            (1) path : 경로를 지정함
                    (Link의 to속성 경로와 일치함!)
            (2) element : 연결할 컴포넌트 지정

        (하위 라우트 만들기)
            <Route path="/">
                <Route />
                <Route />
                <Route />
            </Route>
    4. 라우터를 구성하는 컴포넌트는 자체적으로
    내보내기 셋팅을 해야한다!
    -> export default 라우터 컴포넌트

    [ 리액트 라우터 흐름 ]
    1. index.js 에 라우터 중앙 셋팅
    2. Layout.jsx 레이아웃 컴포넌트를 루트로 선택
    3. 상단영역 GNB에 <Link to> 셋팅
    4. 메인영역에 <Outlet /> 셋팅
    5. 라우터 연결흐름:
      (1) Route 의 path 정보셋팅
      (2) Link to 정보 클릭시 1번정보와 대조
      (3) 1번정보 일치시 element에 등록된 컴포넌트로딩
      (4) Outlet 표시 컴포넌트에 삽입
    
*********************************************/

export default function MainComponent() {
  return (
    // 라우터 루트로 라우터 구성시작
    // basename 속성은 package.json의 "homepage"속성값을
    // 읽어옴 (읽는 방법은 process.env.PUBLIC_URL)
    // <HashRouter>
    // basename속성을 쓰지 않는다.
    // 해쉬라우터는 homepage 속성값을 자동으로 연결해준다!
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* 라우터 경로 변경시 최상단이동 컴포넌트 */}
      <ScrollTop />

      <Routes>
        {/* 중요!!! 레이아웃 컴포넌트를 루트로 설정!
        루트 Route 는 홀로닫지말고 반드시 다른
        하위 라우트를 감싸도록한다!!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우트 셋팅 
        -> path설정대신 index키워드를 쓰면 
        첫페이지로 구성됨 -> MainArea 컴포넌트 <Outlet/>에
        출력된다!*/}
          <Route index element={<Main />} />
          <Route path="character" element={<Character />} />
          <Route path="comics" element={<Comics />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/series" element={<Series />} />
          <Route path="video" element={<Video />} />
          <Route path="games" element={<Games />} />
          <Route path="news" element={<News />} />
          <Route path="board" element={<Board />} />
          <Route path="detail" element={<CatDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="member" element={<Member />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* Layout 루트 Route로 하위 Route를 감싼다! */}
      </Routes>
    </BrowserRouter>
    // </HashRouter>
  );
}

/******************************************* 
  컴포넌트로 만들고 라우터 안에 넣고
  라우터 경로변경시 스크롤 최상단이동
*******************************************/
const ScrollTop = () => {
  // 라우터 경로 변경시 path 값 읽어오기
  // pathname 객체 속성에 담긴다!
  const { pathname } = useLocation();

  // 화면랜더링 구역에 스크롤상단이동 코드넣기
  useEffect(() => {
    // 스크롤 최상단 이동
    window.scrollTo(0, 0);
    // 변경된 라우터 경로값 확인
    // console.log("라우터경로:",pathname);
  }, [pathname]);
  // 의존성을 라우터 경로 변수로 설정한다!

  // 컴포넌트 리턴이 필요하나
  // 소스리턴이 아니므로 null를 쓴다
  return null;
}; /////////// ScrollTop 컴포넌트 ////////////

/// 컴포넌트 출력 ///
// 먼저 root 객체 만들기
const root = ReactDOM.createRoot(document.querySelector("#root"));
// 출력하기
root.render(<MainComponent />);
