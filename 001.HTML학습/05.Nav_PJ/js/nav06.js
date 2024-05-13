// 네비게이션 유형6 JS - nav06.js
// 가로네비 서브별 드롭다운 전체창

// [1] 모듈 불러오기 파트 ///////////////
// 내함수 불러오기
import mFn from "./my_function.js";

// GNB메뉴 생성 함수 파일 불러오기
import makeMenu from "./gnb_menu.js";

// 드래그 슬라이드 기능 함수 불러오기
import setSlide from "./drag_slide.js";

// [2] 기능구현 파트 ///////////////

// 메뉴 구현함수 호출하기
makeMenu(mFn.qs(".gnb"));

// 바로실행 구역함수1 /////////
(()=>{
  // 1. 배너 리스트 셋팅하기 ////
  // (1) 대상: .ban-slide
  const slideBox = mFn.qs('.ban-slide');
  
  // 슬라이드 코드변수
  let slideCode = '';
  
  // (2) 슬라이드 li코드 만들기
  for(let i=12; i<=24; i++){
    // 끝번호둘 12,13부터 시작하고 1부터 11까지나열
    let temp = (i>13) ? (i-13) : i;
    
    // 세번째 슬라이드(이미지1번)에만 클래스on넣기
    slideCode += `
    <li ${temp===1?'class="on"':''}>
    <img 
    src="./images/img_nav06/ban${temp}.png" 
    alt="시코르배너">
    </li>
    `;
  } //////// for //////////
  
  // (3) 리스트 코드 요소에 출력하기
  slideBox.innerHTML = slideCode;

})();


// 바로실행 구역함수2 /////////
(()=>{
  // 2. 서브배너 리스트 셋팅하기 ////
  // (1) 대상: .sub-slide
  const slideBox = mFn.qs('.sub-slide');
  
  // 슬라이드 코드변수
  let slideCode = '';
  
  // (2) 슬라이드 li코드 만들기
  for(let i=6; i<=12; i++){
    // 끝번호둘 6,7부터 시작하고 1부터 5까지나열
    let temp = (i>7) ? (i-7) : i;
    
    // 세번째 슬라이드(이미지1번)에만 클래스on넣기
    slideCode += `
    <li ${temp===1?'class="on"':''}>
    <img 
    src="./images/img_nav06/sban${temp}.jpg" 
    alt="시코르서브배너">
    </li>
    `;
  } //////// for //////////
  
  // (3) 리스트 코드 요소에 출력하기
  slideBox.innerHTML = slideCode;

})();

//////////////////////////////////////
// 2. 드래그 슬라이드 기능 함수 호출하기
setSlide("banbx");