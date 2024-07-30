import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

// 부드러운 스크롤 JS
import { scrolled, setPos } from "../../js/func/smoothScroll24";

// 컨텍스트 API 불러오기
import { pCon } from "../modules/pCon";

import { SwiperBan } from "../plugin/SwiperBan";
import SinSang from "../modules/SinSang";

// gnb 데이터 가져오기
import { gnbData } from "../../js/data/gnb";


// 리액트용 패럴랙스 - 설치 : npm i react-parallax
import { Parallax } from "react-parallax";


// 제이쿼리 불러오기
import $ from "jquery";

// CSS불러오기
import "../../css/fashion.scss";
import FashionIntro from "../modules/FashionIntro";


function Fashion({subCat}) {
    // subCat - 서브 카테고리명
    // 값: men / women / style

  // 컨텍스트 API사용하기
  const myCon = useContext(pCon);

  // (( 화면랜더링 실행구역 : useLayoutEffect ))
  // 실제DOM이 화면출력전 가상 DOM에서 태그가
  // 모두 만들어진 후가 useLayoutEffect임!
  // 뭔가 미리 DOM셋팅이 필요한 코드는 여기서작성!
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

    // 소멸자 구역 //////////
    return () => {
      // 부드러운 스크롤 해제하기
      document.removeEventListener("wheel", scrolled, { passive: false });

      // 스크롤바 없애기
      $("html,body").css({
        overflow: "hidden",
      });

      // 부드러운 스크롤 위치초기화
      setPos(0);

      // 실제 스크롤위치값 초기화
      window.scrollTo(0, 0);
    };
  }, []);

  // (( 화면랜더링 실행구역 : useEffect ))
  // -> 화면에 요소가 실제로 출력된후 ////
  // DOM이벤트 설정시 여기서 코딩해야 적용됨!
  useEffect(() => {
    // 로고 클릭시 페이지 이동하기
    $("#logo a").on("click", (e) => {
      e.preventDefault();
      myCon.setPgName("main");
    }); ////////// click ////////////
  }, []);

  

  // 후크 상태변수
  const [item, setItem] = useState("m1");

  // 신상컴포넌트에서 상세컴포넌트로 값을 전하기 위한
  // 상태변수를 셋팅하여 함수로 이것을 변경하게 해준다!
  // 프롭스 펑션다운~!!
  const chgItem = (v) => {
    console.log("상품정보:", v);
    // 상태변수 업데이트
    setItem(v);
    // 상세박스 슬라이드 애니로 보이기
    $(".bgbx").slideDown(400);
  }; /////////// chgItem 함수 //////

  // 코드리턴구역 //////////////////
  return (
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page">
        <SwiperBan cat={subCat} />
      </section>
      {/* 2. 신상품영역 */}
      <section id="c1" className={"cont sc-ani c1 "+subCat}>
        <SinSang cat={subCat} chgItemFn={chgItem} setPos={setPos} />
      </section>
      {/* 2.5. 상세보기박스 */}
      <div className="bgbx"></div>
      {/* 3. 패럴랙스 영역 : 리액트용 패럴랙스 적용 */}
      <section id="c2" className="cont">
        <Parallax
          className="c2"
          // 패럴랙스할 배경이미지 설정속성 bgImage
          bgImage={process.env.PUBLIC_URL+"/images/sub/" + 
          subCat + "/02.special.png"}
          // 패럴랙스 이동정도 조정속성 strength
          // 수치범위 :  -500 ~ 1000 -> 높은 숫자는 반대방향
          strength={200}
        >
          <h2 className="c2tit sc-ani">2024 {gnbData[subCat][1]}</h2>
        </Parallax>
      </section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3">
        <FashionIntro catName="sub" subCat={subCat} opt={true} seq={0} />
      </section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4">
        <FashionIntro catName="sub" subCat={subCat} opt={false} seq={1} />
      </section>
    </>
  );
}

export default Fashion;
