import React, { useEffect } from "react";

// 배너모듈 CSS
import "../../css/banner.scss";
import { dragBanner } from "../../js/func/drag_banner";

function Banner(props) {
  // 배너리스트 개수
  const BAN_CNT = 6;

  // 리스트를 만드는 함수 ////
  const makeList = (gubun) => {
    // gubun : true - 배너 / false - 블릿

    // 참고)
    // 0/1로 false/true를 대신하면 리액트에서는
    // 이 숫자를 하단에 출력함! 따라서 true/false로
    // 변경하여 코딩하면 이 문제는 해결됨!

    // for문을 돌려서 태그를 생성할때 배열에 담는다!
    // -> 문자형이 아닌 JSX의 태그이므로 배열에 담고
    // for문 없이 그대로 태그를 출력할 수 있다!
    let hcode = [];

    for (let i = 0; i < BAN_CNT; i++) {
      if (gubun) {
        // 배너코드
        hcode[i] = (
          <li className={"ban" + (i == 0 ? "6" : i)} key={i}>
            <span className="ir">배너{i == 0 ? "6" : i}</span>
          </li>
        );
      } else {
        // 블릿코드
        hcode[i] = (
          <li className={i == 0 ? "on" : ""} key={i}>
            <a href="#">
              <span className="bld">블릿</span>
            </a>
          </li>
        );
      }
    } //////// for //////////

    // console.log(hcode);

    // 코드리턴
    return hcode;
  }; ///////// makeList 함수 /////////

  // 화면 랜더링 실행구역 ///////
  useEffect(()=>{
    // 배너기능함수 호출!
    dragBanner();
  },[]);

  /// 코드 리턴구역 //////////
  return (
    <>
      <ul className="slide">{makeList(true)}</ul>
      <ol className="bindic">{makeList(false)}</ol>
      <div className="cover"></div>
    </>
  );
}

export default Banner;
