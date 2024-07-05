// Pilot PJ - 신상 컴포넌트 함수 - sinsang_fn.js

// 제이쿼리
import $ from "jquery";

// 상품에 오버시 상품정보를 보여주는 함수 /////
const showInfo = (e,selData) => {
  // console.log(selData);
  e.preventDefault();
  // 대상
  const tg = $(e.currentTarget);
  // 1. 이벤트가 발생한 li의 class읽어오기(상품정보객체의 키)
  let gKey = tg.attr("class");
  // console.log('나야나!',selData[gKey]);

  // 2. 상품정보박스를 만들고 보이게하기
  // 마우스 오버된 li자신에 넣어줌
  tg.append(`<div class="ibox"></div>`);

  // console.log(
  //   selData[gKey].split('^')
  //   .map((v)=>`<div>${v}</div>`));

  // 3. 현재li에 만든 .ibox에 데이터 넣기+등장
  tg.find(".ibox")
    .html(
      selData[gKey]
        .split("^")
        .map((v, i) => `<div>${i == 2 ? addComma(v) + "원" : v}</div>`)
    )
    // 등장애니
    .animate(
      {
        top: "110%",
        opacity: 1,
        zIndex: 1,
      },
      300
    );
}; /////////// showInfo함수 ///////////////

//정규식함수(숫자 세자리마다 콤마해주는 기능)
function addComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 정보박스 지우기 함수
const removeInfo = (e) => {
  e.preventDefault();
  $(e.currentTarget).find(".ibox").remove();
};

// [ 신상품 리스트 이동함수 ] //////
const flowList = (ele,lpos,callSts) => {
  // ele-움직일대상
  // console.log(callSts.current);
  // 대상의 left값을 1씩 감소함
  lpos.current--;

  // 이미지박스 한개가 나가면 잘라서 맨뒤로 보냄
  if (lpos.current < -300) {
    // 위치값 초기화!(-301일때 0으로 변경!)
    lpos.current = 0;
    // 첫번째 li 맨뒤로 이동
    ele.append(ele.find("li").first());
  } ///// if //////

  // 적용함
  ele.css({ left: lpos.current + "px" });

  // 재귀호출
  // console.log("재귀:",callSts.current);
  if (callSts.current) 
  setTimeout(() => flowList(ele,lpos,callSts), 40);
}; ////////// flowList ////////////

// 내보내기 /////
export {showInfo,removeInfo,flowList};
