// 상단영역 컴포넌트 ///////

export default function TopArea() {
  // 코드 리턴구역 /////
  return (
    <header className="top-area ibx common-area">
      {/* <!-- 1-1.상단메뉴 --> */}
      <div className="tmenu">
        {/* <!-- 1-1-1.sns박스 --> */}
        <div className="sns">
          <a href="#" className="fi fi-instagram" title="인스타그램">
            <span className="ir">인스타그램</span>
          </a>
          <a href="#" className="fi fi-facebook" title="페이스북">
            <span className="ir">페이스북</span>
          </a>
          <a href="#" className="fi fi-twitter" title="트위터">
            <span className="ir">트위터</span>
          </a>
          <a href="#" className="fi fi-youtube-play" title="유튜브">
            <span className="ir">유튜브</span>
          </a>

          <a href="#" className="fi fi-laptop" title="로그인">
            <span className="ir">로그인</span>
          </a>
          <a href="#" className="fi fi-user-secret" title="회원가입">
            <span className="ir">회원가입</span>
          </a>
          <a href="#" className="fi fi-camera" title="갤러리">
            <span className="ir">갤러리</span>
          </a>
          <a href="#" className="fi cas" title="카카오스토리">
            <span className="ir">카카오스토리</span>
          </a>
        </div>
        {/* <!-- 1-1-2.사이드메뉴 --> */}
        <div className="sideMenu">
          <ul className="smbx">
            <li>
              <a href="#">SIDE MENU</a>
              {/* <!-- 서브메뉴 --> */}
              <ol className="smsub">
                <li>
                  <a href="#">회사 소개</a>
                </li>
                <li>
                  <a href="#">광고 및 제휴</a>
                </li>
                <li>
                  <a href="#">개인정보 처리방침</a>
                </li>
              </ol>
            </li>
            <li>
              <a href="#">SUBSCRIBE</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- 1-2.로고박스 --> */}
      <h1 className="logo">
        <a href="#">
          <img src="./images/mlogo.png" alt="메인로고" />
        </a>
      </h1>
      {/* <!-- 1-3.GNB박스 --> */}
      <nav className="gnb">
        <ul>
          <li>
            <a href="#">FASHION</a>
          </li>
          <li>
            <a href="#">BEAUTY</a>
          </li>
          <li>
            <a href="#">LIVING</a>
          </li>
          <li>
            <a href="#">PEOPLE</a>
          </li>
          <li>
            <a href="#">VIDEO</a>
          </li>
          <li>
            <a href="#">RUNWAY</a>
          </li>
          <li>
            <a href="#">TIME &amp; GEM</a>
          </li>
          <li>
            <a href="#">SHOPPING</a>
          </li>
          <li>
            {/* <!-- 돋보기 검색버튼 --> */}
            <i href="#" className="fi fi-search">
              <span className="ir">search</span>
            </i>
          </li>
        </ul>
      </nav>
    </header>
  );
}
