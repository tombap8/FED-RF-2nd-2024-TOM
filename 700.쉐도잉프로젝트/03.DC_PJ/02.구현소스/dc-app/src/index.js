import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, HashRouter } from "react-router-dom";
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
    // server.js 파일은 Express 서버에서
    // 구동을 위한 기본 설정을 읽어들이는 파일임!

    // 익스프레스 기본 모듈 import
    const express = require("express");
    // 서버경로를 위한 import
    const path = require("path");
    // 서버역할을 위한 익스프레스 생성자 메서드 불러오기
    const app = express();

    // 멀터 미들웨어를 불러온다!왜? 파일전송처리를 위해!
    const multer = require("multer");

    // 멀터를 이용하여 업로드 셋업을 한다!
    // multer() 에 업로드할 폴더위치를 정해준다!
    // dest 속성에 값으로 셋팅!
    // 커스터마이징 없이 기본 dest 로 업로드 위치를 셋팅하면
    // 폴더가 없을경우 폴더를 생성해 준다!

    // But...! 파일명을 겹쳐지므로 이것을 커스터마징하여
    // 변경하면 자동으로 폴더를 생성하지 않으므로
    // 우리가 uploads라는 폴더를 생성해야한다!
    // -> 배포시 이 폴더가 생기도록 SPA 개발폴더의 public아래에
    // uploads 폴더를 만들어준다!

    // 파일명을 내가 원하는 원래 이름으로 들어가도록 변경한다!
    // 멀터 스토리지의 저장소를 사용함!
    const storage = multer.diskStorage({
        // 폴더경로를 여기 설정함(dest설정은 지원준다!)
        destination: function (req, file, setPath) {
            // 여기에 파일저장위치를 지정함!
            setPath(null, "public/uploads/");
            // -> 아래는 실서버 배포시 변경용코드![1]
            // setPath(null,"build/uploads/");
            // 여기지정하면 자동으로 uploads파일을 만들지 않음!
        },
        // 파일명이 원래 이름으로 들어가도록 변경하기
        filename: function (req, file, setName) {
            // 파일명을 오리지널 이름으로 변경
            setName(null, file.originalname);
            // 내부전달 2번째 값에 파일정보가 들어오고
            // originalname 속성은 파일명+확장자가 있다!
        },
    });

    // 변경된 정보가 반영도록 storage를 담아준다!
    const upload = multer({ storage: storage });

    // 기본 경로만 사용한 방식:
    // const upload = multer({ dest: "build/uploads/" });

    // 파일업로드는 POST방식으로 진행함!
    // 익스프레스 서버 메서드에 post()메서드로 설정함!
    // -> 첫번째값은 루트아래에 업로드관련 post전송을 선택
    // -> xxx는 폴더명이 아니고 작업명이다!!!
    // -> 두번째 항목은 전송종류를 설정 : 파일전송은 'file'
    // -> 세번째는 내부전달 변수인 요청,응답에 대한 함수
    app.post("/xxx", upload.single("file"), (req, res) => {
        console.log(req.file);
    });

    // 기본 포트 연결하기
    app.listen(8080, function () {
        console.log("8080포트로 연결됨!");
    });

    // 서버 루트폴더 정적연결하기!(루트 정하기)
    // -> SPA에서 빌드하면 배포용 소스가 build폴더에 생성되므로
    // 이 배포용 폴더를 Root로 잡으면 편하다!!!
    app.use(express.static(path.join(__dirname, "/public")));
    // -> 아래는 실서버 배포시 변경용코드![2]
    // app.use(express.static(path.join(__dirname, "/build")));
    // -> SPA 앱 빌드시 유의사항 : package.json파일에
    // home:'http://localhost:8080' 를 등록하여 사용함!!!
    // localhost는 127.0.0.1 내부호출 아이피와 동일함!

    // 첫페이지 설정하기! -> url로 쳐서 들어가는 경로를 설정함!
    // -> get방식으로 연결하기 때문에 get()메서드 사용!
    app.get("/", function (request, response) {
        // 내부로 전달되는 값은 처음것이 요청, 두번째가 응답임!
        response.sendFile(path.join(__dirname), "/public/index.html");
        // -> 아래는 실서버 배포시 변경용코드![3]
        // response.sendFile(path.join(__dirname), "/build/index.html");
        // 첫페이지는 요청에 대한 응답임! 파일을 내려보내주니까
        // sendFile() 메서드사용!
    });

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
