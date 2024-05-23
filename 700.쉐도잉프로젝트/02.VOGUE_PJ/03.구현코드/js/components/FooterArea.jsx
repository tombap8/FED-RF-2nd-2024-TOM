// 하단영역 컴포넌트 ///////

export default function FooterArea() {
  // 코드 리턴구역 /////
  return (
    <React.Fragment>
      <div id="footer-area">
        <footer className="footer-area ibx common-area">
          {/* <!-- 3-1.하단로고 --> */}
          <div className="blogo">
            <img src="./images/footer_logo.png" alt="하단로고" />
          </div>
          {/* <!-- 3-2.회사주소 --> */}
          <address className="addr">
            WWW.VOGUE.COM Ⓒ CONDÉNAST ASIA PACIFIC. INC. ALL RIGHTS RESERVED.
            VOGUE.COM KOREA IS OPERATED BY DOOSAN MAGAZINE.
          </address>
          {/* <!-- 3-3.하단링크 --> */}
          <ul className="blink">
            <li>
              <a href="#">정기구독</a>
            </li>
            <li>
              <a href="#">회사소개</a>
            </li>
            <li>
              <a href="#">광고 및 제휴</a>
            </li>
            <li>
              <a href="#">개인정보 처리방침</a>
            </li>
          </ul>
        </footer>
      </div>

      {/* <!-- 위로가기버튼 --> */}
      <a href="#" class="tbtn fi fi-angle-up">
        <span class="ir">위로가기버튼</span>
      </a>
    </React.Fragment>
  );
} ///////// FooterArea 컴포넌트 ///////////
