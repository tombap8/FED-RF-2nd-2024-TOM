// DC.com 섹션소개 컴포넌트 - SecIntro.jsx ///
import React from "react";

// 섹션 소개 모듈용 데이터 불러오기
import { secIntroData } from "../../js/data/sec_intro";

// 섹션 소개 모듈용 CSS 불러오기
import "../../css/modules/sec_intro.scss";
import { Link } from "react-router-dom";

function SecIntro(props) {
  // 불러온 데이터 변수할당 ////
  const selData = secIntroData;

  // 리턴 코드구역 ///////////
  return (
    <section className="sec-intro">
      {/* 반복단위박스 */}
      {selData.map((v, i) => (
        <div key={i}>
          <div className="imbx">
            <img
              src={process.env.PUBLIC_URL + v.isrc}
              alt={v.tit.split('^')[0]}
            />
          </div>
          <div className="titbx">
            <h3>{v.tit.split('^')[0]}</h3>
            <h2>{v.tit.split('^')[1]}</h2>
          </div>
          <div className="btnbx">
            <Link to={v.link}>
              <button>{v.btn}</button>
            </Link>           
          </div>
        </div>
      ))}
    </section>
  );
}

export default SecIntro;
