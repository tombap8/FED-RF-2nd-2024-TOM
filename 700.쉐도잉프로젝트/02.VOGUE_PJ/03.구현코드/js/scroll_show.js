// 보그 PJ 스크롤 등장함수 - scroll_show.js
export default function scrollShowFn() {
  // DOM 함수 객체 //////////////
  const myFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),

    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
    // 바운딩함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
    // 옵셋탑값 반환함수
    getOT: (ele) => ele.offsetTop,
  }; /////// myFn 객체 /////////////

  // 1. 대상선정 ///////////////
  const scAct = myFn.qsa(".hide-el");
  // 2-2. 스크롤 등장액션 이벤트 설정하기
  myFn.addEvt(window, "scroll", showIt);
  // 3. 함수 만들기 ///////////////
  // 3-1. 스크롤 등장액션 함수
  function showIt() {
    scAct.forEach((ele) => addOn(ele));
  } /////////// showIt 함수 /////////////
  // 스크롤 등장 기준설정 : 화면의 2/3
  const CRITERIA = (window.innerHeight / 3) * 2;
  //// [ 클래스 on 넣기 함수 ] ///////////
  function addOn(ele) {
    // 바운딩값 구하기
    let bcrVal = myFn.getBCR(ele);
    // 기준값보다 작을때 등장
    if (bcrVal < CRITERIA) ele.classList.add("on");
    // 기준값보다 크면 원상복귀(숨김-on빼기)
    else ele.classList.remove("on");
  } ///////////// addOn 함수 //////////////
} //////////// scrollShowFn /////////////////
