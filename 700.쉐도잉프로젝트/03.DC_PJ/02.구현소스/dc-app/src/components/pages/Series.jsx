// 시리즈 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import VidIntro from "../modules/VidIntro";
import VidSwipe from "../modules/VidSwipe";

export default function Series() {
  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <Banner catName="SERIES" />

      {/* 2. 시리즈페이지 비디오소개 */}
      <VidIntro catName="MOVIES" clsName="on" />

      {/* 3. 비디오스와이프 컴포넌트 */}
      <VidSwipe catName="movies" />
    </>
  );
} /////////// Series /////////////////////
