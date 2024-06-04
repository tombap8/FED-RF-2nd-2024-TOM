// 하단영역 컴포넌트 ///

import Logo from "../modules/Logo";

export default function FooterArea() {
  //// 코드 리턴구역 //////////////
  return (
    <footer className="info">
      <ul>
        {/* 하단로고 컴포넌트 넣기 */}
        <li>
          <Logo logoStyle="bottom" />
        </li>
        <li>
          {/* 하단링크박스 */}
          <ol className="bmenu"></ol>
        </li>
        <li>© & ™ DC. ALL RIGHTS RESERVED</li>
      </ul>
    </footer>
  );
} /////////// FooterArea /////////////////////
