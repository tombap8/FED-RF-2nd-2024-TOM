// 메인 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import CatList from "../modules/CatList";
import SecIntro from "../modules/SecIntro";
import VidIntro from "../modules/VidIntro";
import VidSwipe from "../modules/VidSwipe";

export default function Main() {
  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1. 배너 컴포넌트
           "main"이름 뒤의 숫자는 1~3사이 랜덤수 */}
      <Banner catName={"main" + Math.ceil(Math.random() * 3)} />

      {/* 2. 섹션소개 컴포넌트 */}
      <SecIntro />

      {/* 3. 비디오 소개 컴포넌트
           catName 카테고리명, clsName 배경색넣을 클래스(on/off) */}
      <VidIntro catName="main" clsName="off" />

      {/* 4. 비디오스와이프 컴포넌트 */}
      <VidSwipe catName="main" />

      {/* 5. 캐릭터 리스트 컴포넌트 */}
      <CatList />

      {/* 6. 캐릭터 배너 컴포넌트 */}
      <Banner catName="CHARACTERS" />
    </>
  );
} /////////// Main /////////////////////
