// DC.com 캐릭터 상세 페이지 모듈 - CatDetail.jsx

import React, { useLayoutEffect } from "react";
import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

// 모듈 CSS 불러오기
import "../../css/pages/cat_detail.scss";
import { useLocation } from "react-router-dom";

function CatDetail() {
  // 라우터 호출시 전달한 값을
  // useLocation 인스턴스 중 state속성을 같은
  // 이름의 변수로 구조분해할당 방식으로 받는다!
  const { state } = useLocation();
  // state객체의 같은 이름의 속성명으로 구조분해할당한다!
  const { cname, cdesc, facts } = state;
  // console.log(cname,cdesc,facts);
  // 전달된 변수
  // 1. cname - 캐릭터이름(배너 catName 속성정보로도 사용)
  // 2. cdesc - 캐릭터 설명
  // 3. facts - 캐릭터 상세

  // 라우터 경로 변경없어도 위로 이동하기
  // 의존성심기 - state 전달값
  useLayoutEffect(()=>{
    // 의존성 변수 state가 변경될때 이 구역 실행
    window.scrollTo(0,0);
  },[state]);

  // 리턴 코드구역 ///////////////
  return (
    <>
      {/* 1. 배너모듈 */}
      <Banner catName={cname} />
      {/* 2. 상세정보박스 */}
      <div className="detail">
        {/* 2-1. 캐릭터 설명박스 */}
        <div className="desc-box">
          {/* (1) 캐릭터명 */}
          <h2>{cname}</h2>
          {/* (2) 캐릭터소개 */}
          <div className="cdesc">
            {
                // cdesc 데이터의 '^'로 잘라서 p요소 할당
                cdesc.split('^').map((v,i)=>
                <p key={i}>{v}</p>)                
            }
          </div>
        </div>
        {/* 2-2. 캐릭터명세 */}
        <div className="facts">
          <div>
            <h3>CHARACTER FACTS</h3>
            <table>
              <tbody>
                {
                    // facts 데이터를 '^'로 잘라서 map돌림
                    facts.split('^').map((v,i)=>
                    <tr key={i}>                        
                        {/* ':'으로 잘라서 타이틀:내용 */}
                        <td>{v.split(':')[0]} : </td>
                        <td>{v.split(':')[1]}</td>
                    </tr>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3. 캐릭터 리스트 모듈 */}
      <CatList />
    </>
  );
}

export default CatDetail;
