// DC.com 배너 컴포넌트 ///////
import React from "react";

// 배너 데이터
import { banData } from "../data/banner";

// 배너 CSS
import "../../css/banner.scss";
// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

function Banner(props) {
  // 코드 리턴구역 /////////
  return (
    <div className="banner">
      {/* 이동슬라이드 */}
      <ul className="slider"></ul>

      {/* 양쪽이동버튼 */}
      <button className="abtn lb" onClick={goSlide}>
        ＜
      </button>
      <button className="abtn rb" onClick={goSlide}>
        ＞
      </button>
      {/* 블릿 인디케이터 - 선택데이터의 개수만큼 만들기 */}
      <ol className="indic"></ol>
    </div>
  );
}

export default Banner;
