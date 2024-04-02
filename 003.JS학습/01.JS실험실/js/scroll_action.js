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

/**************************************************** 
    [ 스크롤 이벤트를 활용한 요소 등장액션 기능구현하기 ]

  1. 사용 이벤트 : scroll
  -> 스크롤 바가 있는 페이지에서 또는 부분박스에서
  스크롤 바가 이동할때 발생하는 이벤트
  -> 주의: wheel 이벤트와는 다르다! 무엇이?
  스크롤바가 이동하지 않아도 마우스 휠이 작동될때 발생한다!
  (휠이벤트는 모바일에서 사용불가!)

  2. 스크롤바 위치값 알아내기 : 세로방향(Y축)
    (1) window.scrollY (IE6~11지원안함)
    (2) document.scrollingElement.scrollTop
    (3) document.documentElement.scrollTop
    (4) document.querySelector('html').scrollTop
    -> 가로방향 스크롤바는 Y대신 X라는 문자를 사용함!

  3. 스크롤 등장 대상요소의 보이는 화면에서의 top값
    getBoundingClientRect().top
    -> 보이는 화면상단을 기준으로 이것보다 위로 갈경우
    마이너스값을 리턴한다!
    -> 기준: 보이는 화면크기를 기준하면 된다!
    -> 윈도우화면 전체: window.innerHeight
    예) 화면의 3/2는 window.innerHeight/3*2
    예) 화면의 4/3는 window.innerHeight/4*3

  ****************************************************/

// 1. 대상선정 ///////////////
// 스크롤 등장대상 : .hide-el (별도의 클래스를 줌!)
const scAct = myFn.qsa('.hide-el');
// console.log('대상:',scAct);

// 2. 이벤트 설정 및 함수 호출하기 ////////////
// 2-1. 글자등장함수 호출하기
showLetters();
// 2-2. 스크롤 등장액션 이벤트 설정하기
myFn.addEvt(window,'scroll',showIt);

// 3. 함수 만들기 ///////////////
// 3-1. 스크롤 등장액션 함수
function showIt() {
    let temp = scAct[0].getBoundingClientRect().top;
    // 함수호출확인
    console.log('첫번째대상위치:',temp);



} /////////// showIt 함수 /////////////

// [ 글자등장 셋팅하기 ] /////////////////
// 글자등장함수 //////
function showLetters() {
  // 1. 대상선정 : .stage
  const stage = myFn.qs(".stage");
//   console.log("대상:", stage);

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
