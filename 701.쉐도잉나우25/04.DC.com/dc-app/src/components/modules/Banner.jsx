// DC.com 배너 컴포넌트 - Banner.jsx ///////
import React from "react";

// 배너 데이터 불러오기 ///
import { banData } from "../../js/data/banner";

// 배너용 CSS 불러오기 ///
import "../../css/modules/banner.scss";

// 배너 슬라이드 기능 함수 불러오기 ///
import SlideFn from "../../js/func/go_slide";

function Banner({ catName }) {
  // catName - 배너 데이터 카테고리 이름

  // 슬라이드 기능 생성자함수 인스턴스 생성하기
  const slideFn = new SlideFn();

  // 선택데이터 ////
  const selData = banData[catName];

  return (
    <>
      <div className="banner">
        {/* 슬라이드 리스트 */}
        <ul className="slider">
          {
            // 배열데이터 개수 만큼 슬라이드 생성하기
            selData.map((v, i) => (
              <li key={i}>
                <img src={process.env.PUBLIC_URL + v.src} alt={v.tit1} />
                <section className="bantit">
                  <h2>{v.tit1}</h2>
                  <p>{v.tit2}</p>
                  {
                    // 버튼 데이터가 없으면 버튼출력안함
                    v.btn !== "" && <button>{v.btn}</button>
                  }
                </section>
              </li>
            ))
          }
        </ul>
        {
          // 슬라이드 배열개수가 1초과일때만 나오기
          // 양쪽이동버튼 + 블릿표시자
          selData.length > 1 && (
            <>
              {/* 양쪽이동버튼 */}
              <button className="abtn lb" onClick={slideFn.goSlide}>
                ＜
              </button>
              <button className="abtn rb" onClick={slideFn.goSlide}>
                ＞
              </button>
              {/* 블릿 표시자 */}
              <ol className="indic">
                {
                  // 슬라이드 개수만큼 li블릿 만들기
                  // 단, 첫번째 li에만 클래스'on'넣기
                  selData.map((v, i) => (
                    <li key={i} className={i === 0 ? "on" : ""}></li>
                  ))
                }
              </ol>
            </>
          )
        }
      </div>
    </>
  );
}

export default Banner;
