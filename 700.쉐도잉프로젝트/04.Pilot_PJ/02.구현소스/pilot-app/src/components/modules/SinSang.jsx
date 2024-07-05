import React, { useContext, useLayoutEffect, useRef } from "react";

// 제이쿼리 불러오기
import $ from "jquery";

// 신상 함수 불러오기 ////
import { showInfo, removeInfo, flowList } from "../../js/func/sinsang_fn";

// 신상 데이터 불러오기 /////
import { sinsangData } from "../../js/data/sinsang";
import { pCon } from "./pCon";

function SinSang({ cat, chgItemFn, setPos }) {
  // cat - 카테고리 분류명 (men/women/style)
  // chgItemFn - 선택상품정보 변경 부모함수
  // setPos - 부드러운 스크롤 위치값 변경함수

  // 전역컨텍스트 사용하기
  const myCon = useContext(pCon);

  // 신상품 리스트 이동함수 사용변수 ///
  // 위치값변수(left값) -> 리랜더링시 기존값을 유지하도록
  // ->  useRef를 사용한다!! -> 변수명.current로 사용!
  const lpos = useRef(0);
  // 재귀호출 상태값(true-호출,false-멈춤)
  const callSts = useRef(true);

  // 전달변수 cat 카테고리명이 다를 경우에만 업데이트!
  useLayoutEffect(()=>{    
    console.log("초기화실행!!");
    // 신상 흘러가기 변수 초기화
    lpos.current = 0;
    // 신상 멈춤/가기 상태변수 초기화
    callSts.current = false;
    // 다시호출하여 초기화적용!
    flowList($(".flist"), lpos, callSts)
    // 윈도우최상
    window.scrollTo(0,0);
    // 부드러운 스크롤 0
    setPos(0);
  },[cat]); /////// cat이 다를때

  // 신상품 선택 데이터 만들기
  const selData = sinsangData[cat];

  // [신상품 리스트 코드생성 함수] //////////
  const makeList = () => {
    // 코드 담을 배열
    let temp = [];
    // 원하는 반복수 만큼 for문실행하여 배열에 JSX태그 담기
    for (let x = 0; x < 9; x++) {
      temp[x] = (
        <li
          className={"m" + (x + 1)}
          key={x}
          onMouseEnter={(e) => showInfo(e, selData)}
          onMouseLeave={removeInfo}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              chgItemFn("m" + (x + 1));
            }}
          >
            <img
              src={process.env.PUBLIC_URL+"/images/goods/" + cat + "/m" + (x + 1) + ".png"}
              alt="신상품"
            />
          </a>
        </li>
      );
    } ///// for /////
    // JSX태그를 담은 배열을 리턴->자동태그변환!
    return temp;
  };

  // 코드리턴구역 /////////////////////
  return (
    <>
      <h2 className="c1tit">
        NEW MEN'S ARRIVAL
        <button 
        onClick={()=>
        myCon.setPgName("item-list")}>전체리스트</button>
      </h2>
      <div
        className="flowbx"
        onMouseEnter={() => {
          // 호출참조변수값 false로 변경
          callSts.current = false;
          // -> 이 값으로 옆으로 흘러가기 멈춤
        }}
        onMouseLeave={() => {
          // 호출참조변수값 ture로 변경
          callSts.current = true;
          // 다시 흘러가기 함수 호출!
          flowList($(".flist"), lpos, callSts);
        }}
      >
        <ul className="flist">{makeList()}</ul>
      </div>
    </>
  );
}

export default SinSang;
