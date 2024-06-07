// 배너 컴포넌트 슬라이드 기능함수 - go_slide.js

// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 생성자 함수로 만들어서 사용하기! /////
// -> 컴포넌트별로 변수와 함수가 별도로 메모리구역이 설정됨!
// -> 변수,함수의 지역화가 가능해짐! -> 같은 이름의 변수,함수로
// 서로 상관될 일이 없어진다!
// ((생성자함수의 필수요건!))
// (1) 생성자함수는 대문자로 시작하는 이름을 가짐
// (2) 생성자함수는 호출시 new키워드로 생성함
// (3) 생성자함수의 변수, 함수는 this 키워드로 노출함!
function SlideFn() {
  // 1. 변수설정 //////////////////
  // (1) 애니시간
  const A_TM = 600;
  // (2) 애니이징
  const A_ES = "easeInOutQuint";
  // (3) 광클상태변수(1-불허용,0-허용)
  let cSts = 0;
  // (4) 슬라이드순번
  let sNum = 0;

  //// 2. 슬라이드 이동구현 함수 ///////
  //// 이벤트 설정 및 함수 호출은 리액트파트에서 처리함!!
  //-> 그래야 다중 컴포넌트 배치시 개별화를 할 수 있다!
  // this.변수 = 화살표함수 -> 함수인 변수를 this키워드로 등록하면
  // 생성자함수를 담은 변수에서 하위 변수로 노출됨! 그래서 사용가능
  this.goSlide = (e) => {
    // 1. 이벤트가 발생한 요소
    const tg = e.target;
    // console.log(tg);

    // 2. 대상선정
    // (1) 슬라이드 : 클릭된 버튼으로 부터 잡아줌!
    const sldBox = $(tg).siblings(".slider");
    // (2) 슬라이드 블릿 : 형제요소는 .indic임!
    const indic = $(tg).siblings(".indic").find("li");
    // console.log('블릿:',indic);
    // (3) 슬라이드 개수
    const sCnt = sldBox.find("li").length;
    // console.log('슬라이드개수:',sCnt);

    // 3. 기능구현
    // 0. 광클금지 /////////////
    if (cSts) return;
    cSts = 1; //잠금
    setTimeout(() => (cSts = 0), A_TM);
    ////////////////////////////

    // 1. 오른쪽버튼 여부
    let isR = $(tg).is(".rb");
    // console.log("버튼클릭!", isR);

    // 2. 버튼별분기
    // 2-1. 오른쪽버튼
    if (isR) {
      // 슬라이드가 왼쪽으로 이동함
      // left값이 -100%
      sldBox.animate({ left: "-100%" }, A_TM, A_ES, () => {
        // 콜백함수(애니후)
        // 맨앞li 맨뒤로 이동
        sldBox
          .append(sldBox.find("li").first())
          // 동시에 left값은 0으로 초기화함!
          .css({ left: "0" });
      });
      // 슬라이드 순번 증가(끝번호보다 크면 0)
      sNum++;
      if (sNum >= sCnt) sNum = 0;
    } //////// if /////////
    // 2-2. 왼쪽버튼
    else {
      // 맨뒤li 맨앞으로 이동
      sldBox
        .prepend(sldBox.find("li").last())
        // left값 -100%
        .css({ left: "-100%" })
        // left값을 0으로 애니메이션
        .animate({ left: "0" }, A_TM, A_ES);

      // 슬라이드순번 감소(0보다 작으면 끝번호)
      sNum--;
      if (sNum < 0) sNum = sCnt - 1;
    } /////// else /////////

    // console.log("슬순번:", sNum);

    // 블릿해당순번 클래스'on'넣기(다른li는 제거)
    indic.eq(sNum).addClass("on").siblings().removeClass("on");
  }; ////////////// goSlide함수 /////////////
} //////////// SlideFn 생성자함수 /////////////

// 함수내보내기
export default SlideFn;
