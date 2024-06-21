import React from "react";

// 신상 함수 불러오기 ////
import { showInfo,removeInfo,flowList } from "../../js/func/sinsang_fn";

function SinSang({cat, chgItemFn}) {
    // cat - 카테고리 분류명 (men/women/style)
    // chgItemFn - 선택상품정보 변경 부모함수

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
          onMouseEnter={showInfo}
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
              src={"./images/goods/" + cat + "/m" + (x + 1) + ".png"}
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
        <button>전체리스트</button>
      </h2>
      <div className="flowbx"      
      onMouseEnter={() => {}}
      onMouseLeave={() => {
        callSts.current = 1;
        flowList($(".flist"));
      }}
      >
        <ul className="flist">{makeList()}</ul>
      </div>
    </>
  );
}

export default SinSang;
