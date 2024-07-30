// 패션 인트로 컴포넌트 ////
import React, { useContext } from "react";

// 컨텍스트 API 불러오기
import { pCon } from "./pCon";

// 데이터 불러오기
import { fsData } from "../../js/data/fashion_intro";

// CSS불러오기
import "../../css/fashion_intro.scss";

function FashionIntro({ catName, subCat, opt, seq }) {
  // 1. catName - 카테고리명 (men/women/style)
  // 2. subCat - 서브 카테고리명
  //  (서브가 아닌경우 subCat의 값은 "etc"임!)
  // 3. opt - 방향옵션(역방향은 true / 정방향은 false)
  //  (역방향은 flex-direction: row-reverse 적용!)
  // 4. sub일 경우 seq순번으로 선택 배열데이터를 정함!
  console.log(catName, subCat, opt, seq);

  // 컨텍스트 API사용하기
  const myCon = useContext(pCon);

  // 선택 데이터 변수할당
  const selData =
    catName == "sub" ? fsData[catName][subCat][seq] : fsData[catName];

  console.log("패션인트로 선택 Data:", selData);

  return (
    <div id={catName} className="fs-page">
      <ul
        className="pgc"
        style={{
          // 정방향, 역방향 적용코드
          flexDirection: opt ? "row-reverse" : "row",
        }}
      >
        {/* 1. 첫번째 이미지 박스 */}
        <li className="imgc">
          <img
            src={process.env.PUBLIC_URL + selData.isrc[0]}
            alt={selData.ialt[0]}
          />
        </li>
        {/* 2. 두번째 글자 박스 */}
        <li className="txtc">
          <h2
            className={
              catName == "style" || (catName == "sub" && seq == 0) ? "tm" : ""
            }
          >
            {/* (참고) 데이터에 태그가 있어서 이를 html로 넣으려면
            dangerouslySetInnerHTML={{__html:데이터}} 
            속성을 사용한다! */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                myCon.setPgName(catName);
              }}
            >
              {selData.tit[0][0]}
              <br />
              {selData.tit[0][1]}
            </a>
          </h2>
          {
            // 스타일인 경우 글자박스 하나더 출력됨
            (catName == "style" || (catName == "sub" && seq == 1)) && (
              <h2 className="tw">
                <a href="#">
                  {selData.tit[1][0]}
                  <br />
                  {selData.tit[1][1]}
                </a>
              </h2>
            )
          }
        </li>
        {/* 3. 세번째 이미지박스 : 스타일만! */}
        {
          // 스타일인 경우 li 이미지박스 생성
          (catName == "style" || (catName == "sub" && seq == 1)) && (
            <li className="imgc">
              <img
                src={process.env.PUBLIC_URL + selData.isrc[1]}
                alt={selData.ialt[1]}
              />
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default FashionIntro;
