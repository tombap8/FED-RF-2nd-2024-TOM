// 메인페이지 컨텐츠 컴포넌트 - MainCont.jsx
import React from "react";
import Banner from "../modules/Banner";
function MainCont(props) {
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <section
        id="ban"
        className="page none-sel"
        style={{ background: "lightblue" }}
      >
        <Banner />
      </section>
    </>
  );
}

export default MainCont;
