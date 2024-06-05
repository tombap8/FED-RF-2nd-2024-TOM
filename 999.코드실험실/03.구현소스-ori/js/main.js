// 메인 JS - main.js

// 함수 연결
import mFn from "./my_function.js";
// 배경데이터
import bgData from "./data/bg_data.js";

// HTML태그 로딩후 loadFn함수 호출! ///
mFn.addEvt(window, "DOMContentLoaded", loadFn);

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
  console.log("로딩완료!");

  // 이동버튼 대상:  .abtn
  const abtn = mFn.qsa(".abtn");
  // 변경대상 : #slide
  const slide = mFn.qs(".slide");
  // 변경대상 : 백카드 span
  const bgspan = mFn.qs(".back-card span");
  // 변경대상 : 백카드 색
  const bgColor = mFn.qs(".back-card");
  // 배경이미지
  const bg = mFn.qs(".main1");

  // 블릿버튼 : .indic
  let indic = mFn.qs(".indic");
  // console.log(abtn,slide);

  // 인터발변수
  let myIval;

  //////////// 초기셋팅하기 ////////
  // for (let i = 0; i < bgData.length; i++) {
  // 슬라이드 넣기
  slide.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `
        <li class="s${v.idx}">
          <img src="./img/main_card${v.idx}.jpg" alt="${v.tit}" />
        </li>    
      `
    )
    .join("");
  indic.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `
        <li><a href="#" class="abtn ab${v.idx}">0${v.idx}</a></li>
      `
    )
    .join("");
  // 블릿 넣기
  // indic.innerHTML += `
  // <li ${i === 0 ? 'class="on"' : ""}>
  //     <img src="images/dot1.png" alt="흰색">
  //     <img src="images/dot2.png" alt="회색">
  // </li>
  // `;
  // } ////// for ////////

  // li를 생성한 후 그 li다시 수집한다!
  // 블릿의 li까지 수집! indic 변수
  indic = mFn.qsa(".indic li");

  // 2. 버튼을 모두 이벤트 설정하기
  for (let x of indic) {
    x.onclick = () => {
      // 읽어온 숫자 앞에 "0"빼고 숫자화
      let pNum = Number(x.innerText);
      console.log(pNum);
      nowNum = pNum;
      showSlide(pNum);
      clearMyInterval();
    };
  } /// for of ///

  function myInterval() {
    myIval = setInterval(showSlide, 3000);
  }

  function clearMyInterval() {
    clearInterval(myIval);
  }

  myInterval();

  // 현재작동번호
  let nowNum = 1;

  function showSlide(pNum) {
    // 파라미터로 넘어온 숫자
    console.log("현재작동번호:", nowNum);
    console.log("클릭된번호:", pNum);

    // 클릭된 번호와 현재 작동번호와 같으면 돌아가!
    if (pNum == nowNum) return;
    // 퇴장
    slide.style.right = "30rem";
    slide.style.opacity = 0;
    slide.style.transition = "1.5s ease-in-out";
    // (2)이동하는 시간 0.6초간 기다림!

    let orgTg = document.querySelector(".back-card");
    let myTg = orgTg.querySelector("span");
    let codeName = slide
      .querySelectorAll(`li.s${pNum ? pNum - 1 : nowNum}`)[0]
      .querySelector("img")
      .getAttribute("alt")
      .replace(/\s/g, "");

    // 현재 슬라이드 이름과 같은 데이터의 idx를 전역변수에 저장하여
    // 같은 번호를 클릭한 경우 못들어오게 한다!
    nowNum = Number(bgData[codeName].idx);

    myTg.style.opacity = 0;
    myTg.style.translate = "0 20%";
    myTg.style.transition = "1.5s ease-in-out";

    // 배경색도 변경
    orgTg.style.backgroundColor = bgData[codeName].color;
    orgTg.style.transition = "1.5s ease-in-out";

    let myValue = slide
      .querySelectorAll(`li.s${pNum ? pNum - 1 : nowNum}`)[0]
      .querySelector("img")
      .getAttribute("alt");
    console.log(myValue);

    setTimeout(() => {
      myTg.style.opacity = 1;
      myTg.style.translate = "0 0";
      myTg.innerText = myValue;
    }, 1500);

    // 1.5초후 등장
    setTimeout(() => {
      // (2-1) 맨앞 li 맨뒤로 이동
      pNum
        ? slide.insertBefore(
            slide.querySelectorAll("li")[pNum - 1],
            slide.querySelectorAll("li")[0]
          )
        : slide.appendChild(
            slide.querySelectorAll(`li.s${nowNum}`)[0]
          );
      // 슬라이드 left 값이 -100% 이므로
      // (2-2) left값을 0으로 변경
      slide.style.right = "12rem";
      // (2-3) left 트랜지션 없애기
      slide.style.opacity = 1;
      slide.style.transition = "1.5s ease-in-out";

      
      // console.log(slide.querySelectorAll("li")[0].querySelector("img").getAttribute("alt").replace(/\s/g,''));
    }, 1500);

    // 넘어온 값이 없으면 기존값을 증가함!
    if (!pNum) nowNum++;
    if (nowNum < slide.querySelectorAll("li").length) nowNum = 1;

  } /////////오른쪽버튼 클릭 함수
} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
