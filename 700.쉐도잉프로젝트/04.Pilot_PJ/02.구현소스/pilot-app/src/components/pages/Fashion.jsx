import React, { useLayoutEffect } from "react";

// 부드러운 스크롤 JS
import { scrolled, setPos } from "../../js/func/smoothScroll24";

// 컨텍스트 API 불러오기
import { pCon } from "./pCon";

// 제이쿼리 불러오기
import $ from "jquery";

// CSS불러오기
import "../../css/fashion.scss";

function Fashion(props) {
  // 컨텍스트 API사용하기
  const myCon = useContext(pCon);

  // 화면랜더링 실행구역
  useLayoutEffect(() => {
    document.addEventListener("wheel", scrolled, { passive: false });
    // 이벤트 설정시 passive:false 설정의 이유는
    // 기본 설정값은 true이고 이것은 window,document,body
    // 이 세가지에 preventDefault() 기본작동막기를 할 경우
    // 이것을 사용할 수 없도록 설정된 값이 treu다!
    // passive모드를 false로 꺼놔야 window,document,body
    // 에 대한 기본 막기가 가능함!(여기서는 스크롤 기능임!)

    // 부드러운 스크롤 위치초기화
    // setPos(0);

    // 실제 스크롤위치값 초기화
    window.scrollTo(0, 0);

    // 스크롤바 생성하기(x축은 숨김)
    $("html,body").css({
      overflow: "visible",
      overflowX: "hidden",
    });

    // 로고 클릭시 페이지 이동하기
    $("#logo a").on("click", (e) => {
      e.preventDefault();
      myCon.setPgName("main");
    }); ////////// click ////////////

    // 소멸자 구역 //////////
    return () => {
      // 부드러운 스크롤 해제하기
      document.removeEventListener("wheel", scrolled, { passive: false });
    };
  }, []);

  // 코드리턴구역 //////////////////
  return (
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page"></section>
      {/* 2. 신상품영역 */}
      <section id="c1" className="cont sc-ani c1"></section>
      {/* 2.5. 상세보기박스 */}
      <div className="bgbx"></div>
      {/* 3. 패럴랙스 영역 : 리액트용 패럴랙스 적용 */}
      <section id="c2" className="cont"></section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3"></section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4"></section>
    </>
  );
}

export default Fashion;
