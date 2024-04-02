// 쇼핑몰 배너 JS - 03.페이드효과 //

// DOM 선택함수
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);

// addEvent 함수
// ele - 요소, evt - 이벤트, fn - 함수
const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window, "DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
******************************************/
function loadFn() {
  console.log("로딩완료!");

  // 이동버튼 대상:  .abtn
  const abtn = qsa(".abtn");
  // 변경대상 : #slide
  const slide = qs("#slide");
  // 블릿버튼 : .indic
  let indic = document.querySelector(".indic");
  // console.log(abtn,slide);

  //////////// 초기셋팅하기 ////////
  // 5개의 슬라이드와 블릿을 만들어준다!
  for (let i = 0; i < 5; i++) {
    // 슬라이드 넣기
    slide.innerHTML += `
    <li data-seq="${i}">
        <img 
        src="images/slide0${i + 1}.jpg"         
        alt="slide">
    </li>    
    `;
    // 블릿 넣기
    indic.innerHTML += `
    <li ${i === 0 ? 'class="on"' : ""}>
        <img src="images/dot1.png" alt="흰색">
        <img src="images/dot2.png" alt="회색">
    </li>
    `;
  } ////// for ////////

  // li를 생성한 후 그 li다시 수집한다!
  // 블릿의 li까지 수집! indic 변수
  indic = document.querySelectorAll('.indic li');

  // 슬라이드 순번 전역변수
  let snum = 0;

} /////////////// loadFn 함수 //////////////
