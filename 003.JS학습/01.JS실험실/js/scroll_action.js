// JS실험실 : 04.스크롤액션 JS

// DOM 함수 객체 //////////////
const myFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// myFn 객체 /////////////

// 1. 대상선정 ///////////////

// 2. 함수 호출하기 ////////////
// 2-1. 글자등장함수 호출하기
showLetters();

// 3. 함수 만들기 ///////////////

// [ 글자등장 셋팅하기 ] /////////////////
// 글자등장함수 //////
function showLetters() {
  // 1. 대상선정 : .stage
  const stage = myFn.qs(".stage");
  console.log("대상:", stage);

  // 2. 글자 데이터 변수 할당
  const myText = "신카이 마코토";

  // 4. 데이터 글자 한 글자씩 태그로 싸기
  // for of 사용!

  // html태그 변수
  let hcode = "";
  // 지연시간 계산을 위한 순번변수
  let seqNum = 0;

  for (let x of myText) {
    // console.log(x);
    if (x === " ") {
      // 스페이스 공백처리
      hcode += "&nbsp;&nbsp;";
    } /// if ///
    else {
      // 글자일 경우 span태그 랩핑처리
      hcode += `
      <span
      style="transition-delay: ${seqNum * 0.08}s"
      >
      ${x}</span>`;
    } /// else ///

    // 중요!!! 지연시간에 곱해질 순번증가하기!
    seqNum++;
  } //////// for of /////////////

  // 5. 스테이지에 코드 출력하기 /////
  stage.innerHTML = hcode;

  // 6. 일정 시간 뒤 등장클래스 .on넣기
  setTimeout(() => {
    stage.classList.add("on");
  }, 2000);
} /////////// showLetters 함수 ///////////
