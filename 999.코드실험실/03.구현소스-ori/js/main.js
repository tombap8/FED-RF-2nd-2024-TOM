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
  for (let i = 0; i < 2; i++) {
    // 슬라이드 넣기
    slide.innerHTML = Object.values(bgData).map(
      (v) =>
        `
        <li data-seq="${v.idx}">
          <img src="./img/main_card${v.idx}.jpg" alt="${v.tit}" />
        </li>    
      `
    );
    // 블릿 넣기
    // indic.innerHTML += `
    // <li ${i === 0 ? 'class="on"' : ""}>
    //     <img src="images/dot1.png" alt="흰색">
    //     <img src="images/dot2.png" alt="회색">
    // </li>
    // `;
  } ////// for ////////

  // li를 생성한 후 그 li다시 수집한다!
  // 블릿의 li까지 수집! indic 변수
  indic = mFn.qsa(".indic li");

  // 2. 버튼을 모두 이벤트 설정하기
  for (let x of abtn) {
    x.onclick = () => btn2(x.innerText);
    clearMyInterval();
  } /// for of ///

  // 광클 금지변수
  let prot = false;

  /****************************************** 
     함수명: goSlide
     기능: 슬라이드 이동
     ******************************************/
  function goSlide(evt, sts = true) {
    if (sts) {
      clearAuto();
    } ///if문

    // 광클금지 설정하기 ///////////
    if (prot) return; // 돌아가!(함수나감!)
    prot = true; // 잠금! (뒤의호출막기!)
    setTimeout(() => {
      prot = false; // 0.6초후 해제!
    }, 600);
    /////////////////////////////////////

    // 슬라이드 상태 변환 변수
    let slideSts = 0;

    // 함수호출확인
    // console.log("나 슬라이드야~!", this, isRbtn);
    // this는 호출한 버튼 자신

    // 2. 버튼별 분기하기 //////
    // 2-1. 2번 버튼일 경우 ////

    if (sts) {
      btn2();
    } //// if ////

    /////////////////////////////////////////////////////////////////

    let seq = slide
      .querySelectorAll("li")
      [sts ? 0 : 1].getAttribute("data-seq");
    console.log("블릿이 읽어올 슬순번:", seq, "/데이터형:", typeof seq);
    // string - 문자형, number - 숫자형

    // 4. 블릿변경하기 ///////////
    // 모든 클래스 on지우기+현재 순번 클래스 넣기
    indic.forEach((ele, idx) => {
      // ele - 각각의 li, idx - 각각의 순번
      if (idx == seq) {
        // 현재순번 on넣기
        // ==으로 비교해야 결과가 나옴
        // data-seq 속성은 문자형숫자이므로!
        // ===은 형까지 비교하기때문에 안나옴!
        console.log("누구냐", ele);
        ele.classList.add("on");
      } /// if ///
      else {
        // 나머지는 on빼기
        ele.classList.remove("on");
      } /// else ///
    }); ///// forEach /////

    if (seq == 0) {
      console.log("Ddmdmd");
      // bgImg[0].style.diplay="none";
    }
    if (seq == 1) {
      bgspan.innerText = "Korean Colors";
      bgColor.style.backgroundColor = "#13510c";

      bgspan.style.transition = "1.5s ease-in-out";
      bgColor.style.transition = "1.5s ease-in-out";
    } else if (seq == 0) {
      bgspan.innerText = "Oil Colors";
      bgColor.style.backgroundColor = "#370c51";

      bgspan.style.transition = "1.5s ease-in-out";
      bgColor.style.transition = "1.5s ease-in-out";
    }
  } ///////////// goSlide 함수 ////////////////
  /////////////////////////////////////////////

  function myInterval (){

    myIval = setInterval(btn2, 3000);
  }

  function clearMyInterval (){
    clearInterval(myIval);
  }

  myInterval();


  function btn2(txt) {
    let number;
    if(txt) number = Number(txt)-1;
    console.log("여기봐~~~",number);

    // 퇴장
    slide.style.right = "30rem";
    slide.style.opacity = 0;
    slide.style.transition = "1.5s ease-in-out";
    // (2)이동하는 시간 0.6초간 기다림!


    let orgTg = document.querySelector(".back-card");
    let myTg = orgTg.querySelector("span");
    let codeName = slide
    .querySelectorAll("li")[number?number:1]
    .querySelector("img").getAttribute("alt").replace(/\s/g,'');

    myTg.style.opacity = 0;
    myTg.style.translate = "0 20%";
    myTg.style.transition = "1.5s ease-in-out";

    // 배경색도 변경
    orgTg.style.backgroundColor = bgData[codeName].color;
    orgTg.style.transition = "1.5s ease-in-out";

    let myValue = slide
      .querySelectorAll("li")[number?number:1]
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
      slide.appendChild(slide.querySelectorAll("li")[number?number:0]);
      // 슬라이드 left 값이 -100% 이므로
      // (2-2) left값을 0으로 변경
      slide.style.right = "12rem";
      // (2-3) left 트랜지션 없애기
      slide.style.opacity = 1;
      slide.style.transition = "1.5s ease-in-out";

      // console.log(slide.querySelectorAll("li")[0].querySelector("img").getAttribute("alt").replace(/\s/g,''));
    }, 1500);
  } /////////오른쪽버튼 클릭 함수


  function btn1() {
    // 하위 li수집
    let list = slide.querySelectorAll("li");
    // console.log("dd",list);

    slide.style.right = "30rem";
    slide.style.opacity = 0;
    slide.style.transition = "1.5s ease-in-out";

    //////////////////////////////////

    setTimeout(() => {
      // (3) left 값을 0으로 트랜지션하여 들어옴
      slide.insertBefore(list[list.length - 1], list[0]);
      slide.style.right = "12rem";
      // (2-3) left 트랜지션 없애기
      // slide.style.transition = "none";
      slide.style.opacity = 1;
      slide.style.transition = "1.5s ease-in-out";
    }, 1500);
  } ////////////////왼쪽버튼 클릭함수////////////////

  //-----------------------자동넘김-----------------//

  // 인터발용 변수(지울목적)
  let autoI;
  // 타임아웃용 변수 (지울목적)
  let autoT;

  // 자동넘김호출함수 최초호출하기
  // autoSlide();

  // [자동넘김호출]
  function autoSlide() {
    // setInterval(함수,시간)
    // - 일정시간간격으로 함수를 호출
    // clearInterval(인터발변수)
    // - 변수에 담긴 인터발을 지움(멈춤)

    setInterval(() => {
      abtn[1].onclick();
    }, 3000);

    autoI = setInterval(() => {
      abtn[1].onclick();
      // 값을 2개 보내야함.
      // 첫번째 전달값은 이밴트 객체가 들어가는 변수임으로 false값을 쓰고
      // 두번째 전달값은 자동호출임을 알리는 변수임으로 false값을 전달한다.
      // goSlide(false, false);
    }, 3000);
  } ////////autoslide함수///////////////

  // [인터발지우기 함수]
  function clearAuto() {
    // 지우기 확인
    console.log("인터발지워!");
    clearInterval(autoI);

    // 타임아웃지우기 : 실행쓰나미 방지
    clearTimeout(autoT);

    // 5초후 아무작동도 안하면 다시 인터발호출
    autoT = setTimeout(() => {
      autoSlide();
    }, 5000);
  } ///////clearAuto함수///////////////
} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
