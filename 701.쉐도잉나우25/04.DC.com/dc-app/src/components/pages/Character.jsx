// DC.com 캐릭터 페이지 컴포넌트 - Character.jsx ////

import React from "react";
import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

function Character(props) {
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <Banner catName="CHARACTERS" />

      {/* 2. 캐릭터 리스트 컴포넌트 */}
      <CatList />
    </>
  );
}

export default Character;
