import React from "react";
import MainCont from "../pages/MainCont";
import Fashion from "../pages/Fashion";

function MainArea({ page }) {
  // page 페이지변경 문자값전달
  // 5가지 값 : main / glist / men / women / style
  console.log("메인전달page:",page);

  // 코드 리턴구역 /////////////
  return (
    <>
      {/* 조건출력으로 페이지별 분기 */}
      {page == "main" && <MainCont />}
      {
      (page == "men" ||
      page == "women" ||
      page == "style") 
      
      && <Fashion subCat={page} />}
    </>
  );
}

export default MainArea;
