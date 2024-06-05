// 상단 하단 공통 JS - common.js

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 공통 처리 데이터 불러오기
import comData from "./data/common_data.js";

// GNB 메뉴 데이터 불러오기
import gnbData from "./data/gnb_data.js";

/****************************************************
     [ 상단/하단 공통 함수 ]
******************************************************/
setElement(); // 함수호출!!!

export default function setElement() {
  // 1.대상선정: #header-area, #footer-area
  const headerArea = mFn.qs("#header-area");
  const footerArea = mFn.qs("#footer-area");

  // 2. 코드넣기 ///////
  headerArea.innerHTML = comData.headerArea;
  footerArea.innerHTML = comData.footerArea;

  /****************************************************
     [ GNB메뉴 ]
******************************************************/

  makeMenu(); // 함수호출!!!
  console.log(gnbData);
  // [ GNB메뉴코드 만들기 함수 ]
  function makeMenu() {
    mFn.qs("#gnb").innerHTML = `
    <ul>
    ${Object.keys(gnbData)
      .map(
        (v) => `
        <ol>
          ${`
                ${gnbData[v]
                  .map(
                    (v) => `
                    <li>
                        <a href="./${v}.html">${v}</a>       
                    </li>
                    `
                  )
                  .join("")}
            `}
        </ol>
      `
      )
      .join("")}
  </ul>
        
  `;
  } ////////// makeMenu 함수 //////////

  /****************************************************
     [ 스크롤 시 헤더 색변경 ]
  ******************************************************/

  // 1. 대상선정
  // 헤더
  const hdArea = mFn.qs("#header-area");
  const gnbA=mFn.qsa("#gnb ul li a");

  // 세로 스크롤이 80px 넘어가면 헤더 색 변경
  mFn.addEvt(window, "scroll", function () {
    if (window.scrollY > 80) {
      hdArea.classList.add("on");
    } else {
      hdArea.classList.remove("on");
    }
  });

  /****************************************************
     [ 검색버튼 클릭시 검색창 열고 닫기 ]
******************************************************/

  // 1. 대상선정
  // 검색버튼
  const icon = mFn.qs(".icon");
  // 검색창
  const search = mFn.qs(".search");

  // 2. 함수실행: 검색버튼 클릭시 검색창 열리고 닫히기
  icon.onclick = () => {
    search.classList.toggle("on");
  };

  /****************************************************
     [ 모바일 햄버거 버튼 클릭시 사이트맵 열고 닫기 ]
******************************************************/

  // 1. 대상선정
  // 햄버거버튼
  const icon2 = mFn.qs(".icon2");
  // 닫기버튼
  const icon3 = mFn.qs(".icon3");
  // 사이트맵
  const siteMap = mFn.qs(".m-sitemap");

  // 2. 함수실행
  icon2.onclick = () => {
    icon2.classList.add("on");
    icon3.classList.add("on");

    siteMap.classList.add("on");
  };
  icon3.onclick = () => {
    icon2.classList.remove("on");
    icon3.classList.remove("on");

    siteMap.classList.remove("on");
  };

  /****************************************************
     [ top버튼-클릭시 상단으로 이동하는 버튼]
******************************************************/

  // const topBtn = mFn.qs(".top-btn");

  // mFn.addEvt(window, "scroll", scrollTopBtn);

  // function scrollTopBtn() {
  //   let scTop = window.scrollY;
  //   // console.log("스크롤 위치 : ", scTop);

  //   if (scTop >= 300) {
  //     topBtn.classList.add("on");
  //   } else {
  //     topBtn.classList.remove("on");
  //   }
  // } ////////////scrollTopBtn함수////////////

  // topBtn.onclick = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }; ///////click///////////
} /////////// setElement 함수 ///////////////
