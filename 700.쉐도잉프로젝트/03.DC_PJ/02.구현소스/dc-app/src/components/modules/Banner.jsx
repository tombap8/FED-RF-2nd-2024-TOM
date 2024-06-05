// DC.com 배너 컴포넌트 ///////
import React from "react";

// 배너 데이터
import { banData } from "../data/banner";

// 배너 CSS
import "../../css/banner.scss";

function Banner({ catName }) {
  // catName 배너 데이터 카테고리이름

  // 선택 데이터
  const selData = banData[catName];

  // 코드 리턴구역 /////////
  return (
    <div className="banner">
      {/* 이동슬라이드 */}
      <ul className="slider">
        {selData.map((v, i) => (
          <li key={i}>
            <img src={v.src} alt={v.tit1 == "" ? "banner image" : v.tit1} />
            <section className="bantit">
              <h2>{v.tit1}</h2>
              <p>{v.tit2}</p>
              {/* 버튼 데이터가 있을때만 출력 */}
              {v.btn != "" && <button>{v.btn}</button>}
            </section>
          </li>
        ))}
      </ul>

      {
        // 배너 데이터가 1개면 양쪽이동버튼 출력안함
        // 배열.length 로 배열개수가 1 이상일때만 출력
        selData.length > 1 && (
          <>
            {/* 양쪽이동버튼 */}
            {/* 양쪽이동버튼 */}
            <button className="abtn lb">＜</button>
            <button className="abtn rb">＞</button>
            {/* 블릿 인디케이터 
            - 선택데이터의 개수만큼 만들기
            map메서드의 반복기능만 이용하여 태그생성
            순번은 첫번째 블릿li만 클래스"on"넣기 */}
            <ol className="indic">
                {selData.map((v,i)=>
                <li key={i} className={i==0?"on":""}></li>
                )}
            </ol>
          </>
        )
      }
    </div>
  );
}

export default Banner;
