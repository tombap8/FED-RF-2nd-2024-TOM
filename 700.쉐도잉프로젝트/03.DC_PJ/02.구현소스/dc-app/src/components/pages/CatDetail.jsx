// DC PJ 캐릭터 상세페이지
// -> 캐릭터 리스트로 부터 라우팅 이동하여 보이는 페이지

import React, { useEffect } from "react";

// 라우터로 전달한 state값을 읽기위한 객체
import { useLocation } from "react-router-dom";

import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

// CSS불러오기
import "../../css/cat_detail.scss";

function CatDetail() {
  // 라우터 호출시 전달한 값을 받는다!
  const loc = useLocation();
  const cname = loc.state.cname;
  const cdesc = loc.state.cdesc;
  const facts = loc.state.facts;
  // console.log(cname, cdesc, facts);

  // 화면랜더링 실행구역 ////
  // 매번실행해야 이미 생성된 컴포넌트의
  // 랜더링 실행구역이 업데이트시에도 작동한다!
  useEffect(()=>{
    window.scrollTo(0,0);
  });

  // 코드리턴구역 //////////////////
  return (
    <>
      {/* 1.배너모듈 */}
      <Banner catName={cname} />
      {/* 2.상세정보박스 */}
      <div className="detail">
        {/* 2-1.캐릭터 설명박스 */}
        <div className="desc-box">
          {/* 캐릭터명 */}
          <h2>{cname}</h2>
          {/* 캐릭터소개 */}
          <div className="cdesc">
            {
              // 문자데이터 중 "^"로 잘라서
              // 배열로 만들고 각각 p태그로
              // 랩핑해 준다! -> split(문자열)
              cdesc.split("^").map((v, i) => (
                <p key={i}>{v}</p>
              ))
              // console.log(cdesc.split("^"))
            }
          </div>
        </div>
        {/* 2-2.캐릭터명세 */}
        <div className="facts">
          <div>
            <h3>CHARACTER FACTS</h3>
            {/* 테이블로 명세배열만큼 tr을 만들어준다! */}
            <table>
              <tbody>
                {facts.split("^").map((v, i) => (
                  <tr key={i}>
                    {v.split(":").map((v, i) => (
                      <td key={i}>
                        {v}
                        {i == 0 && " : "}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3.캐릭터리스트모듈 */}
      <CatList />
    </>
  );
}

export default CatDetail;
