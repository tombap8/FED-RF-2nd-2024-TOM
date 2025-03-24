// DC.com - 캐릭터 검색결과 리스트 생성 모듈 - SearchingCat.jsx

import React from "react";

// 모듈용 CSS 불러오기
import "../../css/modules/searching_cat.scss";
import { Link } from "react-router-dom";

function SearchingCat({ selData }) {
  // selData - 전달된 선택 배열데이터

  // 선택 데이터(배열)의 개수를 구하여 조건출력함!
  const total = selData.length;
  console.log("데이터개수:", total);

  // 리턴 코드구역 ///////////////
  return (
    <>
      {
        // 데이터가 있을 경우
        total > 0 && (
          <ul className="clist">
            {selData.map((v, i) => (
              <li key={i}>
                <Link
                  to="/detail"
                  state={{
                    cname: v.cname, // 캐릭터이름
                    cdesc: v.cdesc, // 캐릭터설명
                    facts: v.facts, // 캐릭터상세
                  }}
                >
                  {/* 캐릭터 이미지 */}
                  <img src={process.env.PUBLIC_URL + v.tmsrc} alt={v.cname} />

                  {/* 캐릭터 이름 */}
                  <h3>{v.cname}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
      {
        // 데이터가 없을 경우
        total === 0 && (
          <h2 style={{ textAlign: "center" }}>
            Sorry, we don't have any matches for that. But there's plenty more
            to see on DC!
          </h2>
        )
      }
    </>
  );
}

export default SearchingCat;
