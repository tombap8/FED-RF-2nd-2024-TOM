/// 하단영역 컴포넌트 : FooterArea.jsx /////

// 하단메뉴 데이터 불러오기 ////
import { bmData } from "../../js/data/bmenu";

// 하단영역 CSS 불러오기 ////
import '../../css/common/footer_area.scss';
import Logo from "../modules/Logo";
import { memo } from "react";
import Weather from "../modules/Weather";

// React.memo() 를 사용한 컴포넌트 메모이제이션
// -> 컴포넌트를 할당형으로 변경한다!!!
export const FooterArea = memo(() => {
  console.log('하단영역 랜더링!!!');
  /// 리턴 코드구역 ////////
  return (
    <footer className="info">
      <ul>
        {/* 하단로고 컴포넌트 넣기 */}
        <li>
          <Logo logoStyle="bottom" />
        </li>
        <li>
          {/* 하단링크박스 */}
          <ol className="bmenu">
            {
                bmData.map((v,i)=>
                <li key={i}>
                    <a 
                        href={v.link} 
                        target="_blank"
                        rel="noreferrer"
                    >
                        {v.txt.toUpperCase()}
                    </a>
                </li>)
            }
          </ol>
        </li>
        <li>© & ™ DC. ALL RIGHTS RESERVED</li>
      </ul>
      {/* 날씨정보 컴포넌트 */}
      <Weather />
    </footer>
  );
}); //////////// FooterArea 컴포넌트 ///////////
