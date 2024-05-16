// DKB PJ 메인 JS - main.js //////////////

// 공통처리함수 불러오기 : 가장먼저 처리한다!
import setElement from "./common.js";
setElement(); // 함수호출!!!

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 불러오기
import SmoothScroll from "./smoothScroll23.js";

// 데이터 셋팅 불러오기 //////
import * as dkbData from "../data/dkb_data.js";
// import { previewData } from '../data/dkb_data.js';

// 드래그 슬라이드 불러오기 ///////
import setSlide from "./drag_slide_multi.js";

// 서브박스 셋팅 코드 불러오기 ////
import showSubBox from "./sub_cont.js";
// 박스 생성후 호출(큐로 보내면 스택실행후 호출!)
setTimeout(showSubBox);
// 시간을 0으로 써도, 심지어 시간을 안써도
// setTimout()으로 함수를 호출하면
// 스택에 실행후 큐에서 가지고 있다가
// 스택 코드 실행이 모두 끝난후 호출하여 실행함!

///////////////////////////////////////////////

/// 구현코드 파트 //////////////

// 1. 부드러운 스크롤 호출
const mySmooth = new SmoothScroll(document, 30, 20);

// console.log('모듈로 메인JS호출!!!',
// document.querySelector('.top-menu'));

// 3. 인트로 동영상 파트 클릭시 동영상태그 넣기
// 이벤트 대상 === 변경대상 : .intro-mv-img
const introMv = myFn.qs(".intro-mv-img");
introMv.onclick = () => {
  // console.log("인트로영상!!!");
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
  // 데이터원본의 정렬을 내림차순으로 변경!
  // console.log(

  // 배열값인 객체의 idx키값을 기준으로
  // 내림차순 정렬을 할때 문자형 숫자이므로
  // Number() 숫자형변환 메서드로 싸서 숫자로써
  // 비교하여 정확한 내림차순이 되도록 한다!
  pData.sort((a, b) =>
    Number(a.idx) == Number(b.idx) ? 0 : Number(a.idx) < Number(b.idx) ? 1 : -1
  );
  // );

  // 구조: ul>li>h3+p

  // 1. 8개만 데이터를 html로 구성하여 넣는다!
  // html 코드변수
  // let hcode = `<ul class="fx-box">`;

  // li구성을 hcode변수에 대입연산자로 할당함!
  // for (let i = 0; i < 8; i++) {
  //   hcode += `
  //       <li>
  //           <h3>${pData[i].title}</h3>
  //           <p>${pData[i].story}</p>
  //       </li>
  //   `;
  // } //// for //////

  // hcode += `</ul>`;

  // 데이터 확인
  // console.log(hcode);
  // console.log('대상:',previewBox,'미리보기 data:',pData);

  // 2. 화면출력하기 -> map()으로 한번에 출력하자! ///////
  previewBox.innerHTML = `
    <ul class="fx-box" data-db="previewData">
      ${pData
        .map(
          (v) => `
        <li data-idx="${v.idx}">
            <h3>${v.title}</h3>
            <p>${"방송일 : " + v.date + " " + v.story}</p>
        </li>      
      `
        )
        .join("")}
    </ul>
  `;
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
  // let hcode = `<ul>`;

  // li구성을 hcode변수에 대입연산자로 할당함!
  // liveData 배열은 총8개임. 모두 돌기를 셋팅하자!
  // lvData.forEach((v) => {
  //   hcode += `
  //             <li>
  //                 <figure>
  //                     <img src="./images/live_photo/${v.imgName}.jpg" alt="${v.title}">
  //                     <figcaption>${v.title}</figcaption>
  //                 </figure>
  //             </li>
  //         `;
  // }); /////// forEach /////////////////

  // hcode += `</ul>`;

  // 데이터 확인
  // console.log(hcode);
  //   console.log('대상:',liveBox,'현장포토 data:',lvData);

  // 2. 화면출력하기 -> map()으로 데이터생성하기 ///////
  liveBox.innerHTML = `
  <ul data-db="liveData">
    ${lvData
      .map(
        (v) => `
      <li data-idx="${v.idx}">
        <figure>
        <img 
          src="./images/live_photo/${v.imgName[0]}.jpg" 
          alt="${v.title}">
        <figcaption>${v.title}</figcaption>
        </figure>  
      </li>
    `
      )
      .join("")}
  </ul>
  `;
})(); //// 현장포토 코드랩핑구역 종료 /////////

// 4. 대표이미지 파트 내용 넣기 //////////
/////// 대표이미지 구현 코드랩핑구역 시작 //////
(() => {
  // 대상: .poster-box
  const posterBox = myFn.qs(".poster-box");
  // 데이터: dkb_data.js 의 posterData배열
  const pData = dkbData.posterData;
  // 구조: ul > li > figure > img + figcaption

  // 1. 8개의 데이터를 html로 구성하여 넣는다!
  // html 코드변수
  // let hcode = `<ul>`;

  // li구성을 hcode변수에 대입연산자로 할당함!
  // posterData 배열은 총5개임. 모두 돌기를 셋팅하자!
  // pData.forEach((v) => {
  //   hcode += `
  //             <li>
  //                 <figure>
  //                     <img src="./images/poster_img/${v.imgName}.jpg" alt="${v.title}">
  //                     <figcaption>${v.title}</figcaption>
  //                 </figure>
  //             </li>
  //         `;
  // }); /////// forEach /////////////////

  // hcode += `</ul>`;

  // 데이터 확인
  // console.log(hcode);
  //   console.log('대상:',posterBox,'대표이미지 data:',pData);

  // 2. 화면출력하기 -> map()으로 데이터생성하기 ///////
  posterBox.innerHTML = `
  <ul data-db="posterData">
  ${pData
    .map(
      (v) => `
    <li data-idx="${v.idx}">
      <figure>
        <img 
          src="./images/poster_img/${v.imgName}.jpg" 
          alt="${v.title}">
        <figcaption>${v.title}</figcaption>
      </figure> 
    </li>  
  `
    )
    .join("")}
  </ul>
  `;
})(); //// 대표이미지 코드랩핑구역 종료 /////////

// 5. 최신동영상 파트 데이터 태그 구성하여 화면출력하기 ///
// 코드랩핑구역 시작 //////////////////////////
(() => {
  // 5-1. 변경대상: .clip-box
  const clipBox = myFn.qs(".clip-box");

  // 데이터 연결 변수할당
  const cData = dkbData.clipData;

  // 5-2. 생성코드 변수
  // let hcode = `<ul class="slide">`;

  // 데이터만큼 순회하여 li코드 만들기 ///
  // 데이터: dkbData.clipData
  // dkbData.clipData.forEach((v) => {
  //   hcode += `
  //   <li>
  //     <div class="clip-mv-box">
  //       <img
  //         src="./images/clip_img/${v.idx}.jpg"
  //         alt="${v.subtit}"
  //       />
  //     </div>
  //     <h4>${v.subtit}</h4>
  //     <h3>${v.title}</h3>
  //   </li>
  //   `;
  // }); /////////// forEach /////////////////

  // hcode += `</ul>`;

  // 5-3. 화면출력하기 -> map()으로 데이터생성하기 ///////
  clipBox.innerHTML = `
  <ul class="slide" data-db="clipData">
  ${cData.map(v=>`
    <li data-idx="${v.idx}">
      <div class="clip-mv-box">
        <img
          src="./images/clip_img/${v.idx}.jpg"
          alt="${v.subtit}"
        />
      </div>
      <h4>${v.subtit}</h4>
      <h3>${v.title}</h3>
    </li>
  `).join('')}
  </ul>
  `;
})();
// 코드랩핑구역 종료 //////////////////////////

// 드래그 슬라이드 태그 구성후 호출하기!
setSlide("banbx");

/**************************************************** 
  메인 페이지용 도깨비 메뉴 스크롤이동 제이쿼리 구현 
****************************************************/
// 메뉴 클릭 대상: .spart-menu a
$(".spart-menu a").click((e) => {
  // a 요소 클릭시 기본이동 막기
  e.preventDefault();

  // 1. 클릭한 a요소의 글자 읽어오기
  let txt = $(e.target).text();
  // console.log(txt);

  // 2. 이동할 위치값 알아내기
  let pos;
  // 2-1. 이동할 위치의 박스 아이디 매칭하기
  switch (txt) {
    case "미리보기":
      pos = "#preview-area";
      break;
    case "프로그램 소개":
      pos = "#intro-area";
      break;
    case "동영상":
      pos = "#clip-video-area";
      break;
    case "현장 포토":
      pos = "#real-photo-area";
      break;
    case "대표 포스터":
      pos = "#main-photo-area";
      break;
  } ///////// switch case ////////

  // 만약 해당된 요소가 없으면 여기서 돌아가!
  // 위에서 할당안되면 undefined이면 if문에서 false처리됨
  // !(NOT)연산자로 반대로 뒤집으면 false일때 처리함!
  if (!pos) return;

  // 2-2. 해당 박스 아이디의 위치값 알아내기
  // offset().top 제이쿼리 top 위치값정보
  pos = $(pos).offset().top;
  // console.log("위치값:", pos);

  // 3. 스크롤 애니메이션 이동하기
  // 제이쿼리는 이것을 정말 잘한다!!!
  // $("html,body").animate({scrollTop:몇px},시간,이징,함수)
  $("html,body").animate(
    { scrollTop: pos + "px" },
    800, // 시간(1/1000초)
    "easeInOutQuint", // 이징(https://easings.net)
    // 콜백함수(애니후 호출되는 함수)
    () => {
      // 이동후 부드러운 스크롤 위치값 업데이트 필수
      // 이것 안하면 위치이동후 스크롤시 튐!
      // 생성자함수 하위 객체변수로 등록된 함수를 호출함!
      mySmooth.setScrollPos(pos);
    }
  );
}); //////// 도깨비 파트 메뉴 클릭 함수 ///////////////

// 개별 박스에 부드러운 스크롤 생성자함수 적용하기연습
// $(".preview-box").css({
//   height: "200px",
//   overflow: "auto"
// })
// .on("wheel",e=>{
//   e.stopPropagation();
// })

// 부드러운 스크롤 개별박스 적용
// const smallSmooth =
// new SmoothScroll(
//   myFn.qs(".preview-box"),20,30);
