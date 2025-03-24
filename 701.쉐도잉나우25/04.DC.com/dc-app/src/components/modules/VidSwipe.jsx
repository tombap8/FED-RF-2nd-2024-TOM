// DC.com 비디오 스와이프 컴포넌트 - VidSwipe.jsx ///

import React from "react";

// 비디오 스와이프용 데이터 불러오기
import { catTit } from "../../js/data/vid_swipe";

// 비디오 스와이프 CSS 불러오기
import "../../css/modules/vid_swipe.scss";
import SwiperVid from "../plugin/SwiperVid";

function VidSwipe({ catName }) {
  // catName - 데이터 분류명

  // 리턴 코드구역 ////////
  return (
    <section className="vid-swbox">
      {/* 1. 모듈 타이틀 */}
      <h2 className="tit">{catTit[catName]}</h2>
      {/* 2. 스와이퍼 컴포넌트 : SwiperVid
      -> 전달속성 catName으로 데이터선택값 보내기 */}
      <SwiperVid catName={catName} />
      {/* 3. 비디오 재생창 */}
      <section className="vid-bx">
        {/* 비디오 중앙박스 */}
        <div className="play-vid">
          {/* 비디오 타이틀 */}
          <h2 className="ifr-tit"></h2>
          {/* 아이프레임 */}
          <iframe src="https://www.youtube.com/embed/nI9uUv6AdoY" allow="autoplay"></iframe>
          {/* 닫기버튼 */}
          <button className="cbtn">×</button>
        </div>
      </section>
    </section>
  );
}

export default VidSwipe;
