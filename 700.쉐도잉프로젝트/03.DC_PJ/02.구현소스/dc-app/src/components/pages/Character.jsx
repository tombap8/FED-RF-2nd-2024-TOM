// 캐릭터 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

export default function Character() {
  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <Banner catName="CHARACTERS" />

      {/* 2. 캐릭터 리스트 컴포넌트 */}
      <CatList />
    </>
  );
} /////////// Character /////////////////////
