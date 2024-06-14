// 패션 인트로 컴포넌트 ////
import React from "react";

// 데이터 불러오기
import { fsData } from "../../js/data/fashion_intro";

// CSS불러오기
import "../../css/fashion_intro.scss";

function FashionIntro({catName, subCat}) {
    // catName - 카테고리명
    // subCat - 서브 카테고리명
    // 서브가 아닌경우 subCat의 값은 "etc"임!

    // 선택 데이터 변수할당
    const selData = fsData[catName];

  return (
    <div id={catName} className="fs-page">
      <ul className="pgc">
        <li className="imgc">
          <img src={selData.isrc} alt={selData.ialt} />
        </li>
        <li className="txtc">
          <h2>
            {/* (참고) 데이터에 태그가 있어서 이를 html로 넣으려면
            dangerouslySetInnerHTML={{__html:데이터}} 
            속성을 사용한다! */}
            <a href="#">
             {selData.tit[0]}<br />
             {selData.tit[1]}
            </a>
          </h2>
        </li>
      </ul>
    </div>
  );
}

export default FashionIntro;
