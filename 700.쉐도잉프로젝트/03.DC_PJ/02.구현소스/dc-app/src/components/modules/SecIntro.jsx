// DC.com 섹션소개모듈 -  SecIntro.jsx
import React from "react";

// 섹션소개모듈 데이터 가져오기
import { secIntroData } from "../data/sec_intro";

// 섹션소개모듈 CSS 불러오기
import "../../css/sec_intro.scss";
import { Link } from "react-router-dom";

function SecIntro(props) {
  // 불러온 데이터 변수할당
  const selData = secIntroData;

  return (
    <>
      <section className="sec-intro">
        {/* 반복단위박스 */}
        {selData.map((v, i) => (
          <div key={i}>
            {/* 1. 이미지박스 */}
            <div className="imbx">
              <img 
              src={process.env.PUBLIC_URL+v.isrc} 
              alt={v.tit.split("^")[0]} />
              {/* split()으로 자르면 배열이된다! */}
            </div>
            {/* 2. 타이틀박스 */}
            <div className="titbx">
              <h3>{v.tit.split("^")[0]}</h3>
              <h2>{v.tit.split("^")[1]}</h2>
            </div>
            {/* 3. 버튼박스 */}
            <div className="btnbx">
              <Link to={v.link}>
                <button>{v.btn}</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default SecIntro;
