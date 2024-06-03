// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import {menu} from "../data/gnb";

export default function TopArea() {
  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1.상단영역 */}
      <header className="top-area">
        {/* 로그인 환영메시지 박스 */}
        <div className="logmsg">{logMsg}</div>
        {/* 네비게이션 GNB파트 */}
        <nav className="gnb">
          <ul>
            {/* 1. 로고 컴포넌트 */}
            <li>
              
            </li>
            {/* 2. GNB메뉴 데이터 배열로 만들기 */}
          </ul>
        </nav>
      </header>
    </>
  );
} /////////// TopArea /////////////////////
