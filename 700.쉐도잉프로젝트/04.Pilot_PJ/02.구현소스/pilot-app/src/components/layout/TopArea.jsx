import React from "react";

// 메뉴 데이터 불러오기
import { gnbData } from "../../js/data/gnb";

function TopArea(props) {
  return (
    <>
      <div id="top-area">
        <header className="top-area ibx">
          <h1 id="logo">
            <a href="#">
              <img src="/images/main_logo.png" alt="파일럿로고" />
            </a>
          </h1>
          <nav className="gnb">
            <ul>
              <li className="bld">배너순번 li 숨기기</li>
              {gnbData.main.map((v, i) => (
                <li key={i}>
                  <a href="#">{v}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ham">
            <span></span> <span></span> <span></span>
          </div>
          {/* 전체메뉴 컴포넌트 */}
        </header>
      </div>
    </>
  );
}

export default TopArea;
