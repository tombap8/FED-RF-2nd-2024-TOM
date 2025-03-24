import React from "react";
import VidIntro from "../modules/VidIntro";

function Video({ catName }) {
  // catName - 페이지 카테고리명 데이터

  // 리턴 코드구역 ////////////
  return (
    <>
      {/* 1. 비디오 소개 컴포넌트 */}
      <VidIntro catName={catName} clsName="on" />
    </>
  );
}

export default Video;
