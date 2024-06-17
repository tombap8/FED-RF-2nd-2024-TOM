// DC PJ 캐릭터 리스트 컴포넌트
import React from "react";

// 캐릭터 리스트 CSS
import "../../css/cat_list.scss";
import { SwiperCat } from "../plugin/SwiperCat";
/* 
Root >
    section.cat-swbox >
        h2.tit + 스와이퍼 컴포넌트(<SwiperCat />)
    _______________________________

    -> 스와이퍼 컴포넌트 구조:
        스와이퍼 리스트 >
            a링크(<Link>) >
                section.sw-inbox2 > img
                +
                div.cat-tit2 > h3
*/

function CatList(props) {

  // 코드리턴구역 /////////
  return (
    <section className="cat-swbox">
      {/* 1. 모듈타이틀 */}
      <h2 className="tit">WHO'S WHO: THE JUSTICE LEAGUE</h2>
      {/* 2. 스와이퍼 컴포넌트 */}
      <SwiperCat />
    </section>
  );
}

export default CatList;
