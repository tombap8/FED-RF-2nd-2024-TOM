// DC.com 비디오 소개 모듈
import React from "react";

// 비디오 소개 모듈 데이터 가져오기
import { vidIntroData } from "../data/vid_intro";

// 비디오 소개 모듈 CSS 불러오기
import "../../css/vid_intro.scss";

function VidIntro({ catName, clsName }) {
  // catName - 카테고리명
  // clsName - 클래스명

  // 선택 데이터 변수할당
  const selData = vidIntroData[catName];

  // 링크가 있는 코드 만들기 함수
  const linkCode = (v) => {
    // 별로 자른후 배열로 변환!
    let data = v.split("*");
    // 코드 리턴구역 /////
    return(
    <>
    {data[0]}
    <a 
        href={selData.link[1]}
        target="_blank"
    >
        {selData.link[0]}</a>
    {data[1]}    
    </>
    );
  };

  return (
    <section className={"vidbox " + clsName}>
      <div>
        {/* 1. 비디오파트 */}
        <div className="vb1">
          <iframe src={selData.vsrc} title={selData.btit}></iframe>
        </div>
        {/* 2. 타이틀 / 설명파트 */}
        <div className="vb2">
          {/* 작은제목 */}
          <h3>{selData.stit}</h3>
          {/* 큰제목 */}
          <h2>{selData.btit}</h2>
          {/* 요약소개(링크포함) : sum */}
          <p>{
            selData.sum.indexOf("*") == -1 
                ? selData.sum 
                : linkCode(selData.sum)
          }</p>
          {/* 설명(링크포함) : desc */}
          <p>{
            selData.desc.indexOf("*") == -1 
                ? selData.desc 
                : linkCode(selData.desc)          
          }</p>
        </div>
      </div>
    </section>
  );
}

export default VidIntro;
