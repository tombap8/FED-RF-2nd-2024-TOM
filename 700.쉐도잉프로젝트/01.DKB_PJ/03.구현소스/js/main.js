// DKB PJ 메인 JS - main.js //////////////

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 불러오기
import { startSS, setScrollPos } from "./smoothScroll23.js";

// 모듈로 호출된 JS에서는 다른 외부JS를 import로 호출가능!
// import하려는 파일에서 반드시 함수,변수 등을 export해야함!
import slideFn from "./slide.js";

// 데이터 셋팅 불러오기 //////
import * as dkbData from "../data/dkb_data.js";
// import { previewData } from '../data/dkb_data.js';
///////////////////////////////////////////////

/// 구현코드 파트 //////////////

// 1. 부드러운 스크롤 호출
startSS();

// console.log('모듈로 메인JS호출!!!',
// document.querySelector('.top-menu'));

// 2. slideFn 슬라이드 기능함수 호출!
slideFn();

// 3. 인트로 동영상 파트 클릭시 동영상태그 넣기
// 이벤트 대상 === 변경대상 : .intro-mv-img
const introMv = myFn.qs(".intro-mv-img");
introMv.onclick = () => {
  console.log("인트로영상!!!");
  // 1. 동영상 넣기
  introMv.innerHTML = `<video src="./images/intro_mv.mp4" 
    autoplay controls></video>`;

  // 2. 클래스 off 지우기(플레이버튼 안나오게함)
  introMv.classList.remove("off");
}; ///////// click 이벤트함수 //////////////

/************************************************ 
 * [ 코드랩핑이란? ]
    로딩시 바로 실행됨->실행코드를 지역화하고자 할때
    함수로 만들고 이를 호출하면 됨. 그러나 불편함!
    익명함수로 만들고 바로 실행하게 하면됨!
    방법 : (익명함수)() -> 바로 실행됨!
    실제코드 : (()=>{코드})()
    실제코드 : (function(){코드})()
    -> 이러한 처리방법을 코드의 지역화 또는
    코드랩핑이라고 부르기도 함
    -> 이렇게하는 목적은 변수,함수 충돌방지임!

************************************************/

// 2. 미리보기 파트 내용 넣기 //////////
/////// 미리보기 구현 코드랩핑구역 시작 //////
(() => {
  // 대상: .preview-box
  const previewBox = myFn.qs(".preview-box");
  // 데이터: dkb_data.js 의 previewData배열
  const pData = dkbData.previewData;
  // 구조: ul>li>h3+p

  // 1. 8개만 데이터를 html로 구성하여 넣는다!
  // html 코드변수
  let hcode = `<ul class="fx-box">`;

  // li구성을 hcode변수에 대입연산자로 할당함!
  for (let i = 0; i < 8; i++) {
    hcode += `
        <li>
            <h3>${pData[i].title}</h3>
            <p>${pData[i].story}</p>
        </li>
    `;
  } //// for //////

  hcode += `</ul>`;

  // 데이터 확인
  // console.log(hcode);
  // console.log('대상:',previewBox,'미리보기 data:',pData);

  // 2. 화면출력하기 ///////
  previewBox.innerHTML = hcode;
})(); //// 미리보기 코드랩핑구역 종료 /////////

// 3. 현장포토 파트 내용 넣기 //////////
/////// 현장포토 구현 코드랩핑구역 시작 //////
(() => {
  // 대상: .live-box
  const liveBox = myFn.qs(".live-box");
  // 데이터: dkb_data.js 의 liveData배열
  const lvData = dkbData.liveData;
  // 구조: ul > li > figure > img + figcaption

  // 1. 8개의 데이터를 html로 구성하여 넣는다!
  // html 코드변수
  let hcode = `<ul>`;

  // li구성을 hcode변수에 대입연산자로 할당함!
  // liveData 배열은 총8개임. 모두 돌기를 셋팅하자!
  lvData.forEach((v) => {
    hcode += `
              <li>
                  <figure>
                      <img src="./images/live_photo/${v.imgName}.jpg" alt="${v.title}">
                      <figcaption>${v.title}</figcaption>
                  </figure>      
              </li>
          `;
  }); /////// forEach /////////////////

  hcode += `</ul>`;

  // 데이터 확인
  // console.log(hcode);
  //   console.log('대상:',liveBox,'현장포토 data:',lvData);

  // 2. 화면출력하기 ///////
  liveBox.innerHTML = hcode;
})(); //// 현장포토 코드랩핑구역 종료 /////////
