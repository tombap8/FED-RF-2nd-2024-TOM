// DC.com 배너 컴포넌트 ///////
import React from "react";

// 배너 데이터
import { banData } from "../data/banner";

// 배너 CSS
import "../../css/banner.scss";
// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

function Banner({catName}) {
    // catName 배너 데이터 카테고리이름

    // 선택 데이터
    const selData = banData[catName];


  // 코드 리턴구역 /////////
  return (
    <div className="banner">
      {/* 이동슬라이드 */}
      <ul className="slider">
        {selData.map((v, i) => (
          <li key={i}>
            <img src={v.src} alt={v.tit1 == "" ? "banner image" : v.tit1} />
            <section className="bantit">
              <h2>{v.tit1}</h2>
              <p>{v.tit2}</p>
              {/* 버튼 데이터가 있을때만 출력 */}
              {v.btn != "" && <button>{v.btn}</button>}
            </section>
          </li>
        ))}
      </ul>

      {/* 양쪽이동버튼 */}
      <button className="abtn lb">＜</button>
      <button className="abtn rb">＞</button>
      {/* 블릿 인디케이터 - 선택데이터의 개수만큼 만들기 */}
      <ol className="indic"></ol>
    </div>
  );
}

export default Banner;
