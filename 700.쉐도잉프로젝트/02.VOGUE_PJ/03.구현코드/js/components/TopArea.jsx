// 상단영역 컴포넌트 ///////

export default function TopArea({ changeMenu }) {
  // changeMenu - 부모의 setMenu 상태관리 메서드

  // 메뉴 배열
  const menuArr = [
    "FASHION",
    "BEAUTY",
    "LIVING",
    "PEOPLE",
    "VIDEO",
    "RUNWAY",
    "TIME & GEM",
    "SHOPPING",
  ];

  // 메뉴 변경하기 함수 ///////
  const chgMenuFn = (v) => {
    console.log(v);

    // 전달값 변경하기 : 소문자 변경
    v = v.toLowerCase();

    // 부모 메뉴변경 상태메서드로 메뉴변경
    changeMenu(v);
  }; ////////// chgMenuFn 함수 /////////

  // 코드 리턴구역 /////
  return (
    <div id="top-area">
      <header className="top-area ibx common-area">
        {/* 1-1.상단메뉴 */}
        <div className="tmenu">
          {/* 1-1-1.sns박스 */}
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

            <a
              href="#"
              className="fi fi-laptop"
              title="로그인"
              onClick={() => chgMenuFn("login")}
            >
              <span className="ir">로그인</span>
            </a>
            <a
              href="#"
              className="fi fi-user-secret"
              title="회원가입"
              onClick={() => chgMenuFn("member")}
            >
              <span className="ir">회원가입</span>
            </a>
            <a
              href="#"
              className="fi fi-camera"
              title="갤러리"
              onClick={() => chgMenuFn("gallery")}
            >
              <span className="ir">갤러리</span>
            </a>
            <a href="#" className="fi cas" title="카카오스토리">
              <span className="ir">카카오스토리</span>
            </a>
          </div>
          {/* 1-1-2.사이드메뉴 */}
          <div className="sideMenu">
            <ul className="smbx">
              <li>
                <a href="#">SIDE MENU</a>
                {/* 서브메뉴 */}
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
        {/* 1-2.로고박스 */}
        <h1 className="logo">
          <a href="#" onClick={() => chgMenuFn("home")}>
            <img src="./images/mlogo.png" alt="메인로고" />
          </a>
        </h1>
        {/* 1-3.GNB박스 */}
        <nav className="gnb">
          <ul>
            {menuArr.map((v) => (
              <li>
                <a
                  href="#"
                  onClick={() => {
                    chgMenuFn(v);
                  }}
                >
                  {v}
                </a>
              </li>
            ))}

            <li>
              {/* 돋보기 검색버튼 */}
              <i href="#" className="fi fi-search">
                <span className="ir">search</span>
              </i>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
} ///////// TopArea 컴포넌트 ///////////

// //// 모바일용 버튼 컴포넌트 : header.top-area 안에 /////
// function MobBtns() {
//   return (
//     <>
//       {/* 모바일용 햄버거버튼 */}
//       <a href="#" className="mobtn hbtn fi fi-nav-icon">
//         <span className="ir">GNB button</span>
//       </a>
//       {/* 모바일용 검색버튼 */}
//       <a href="#" className="mobtn sbtn fi fi-search">
//         <span className="ir">search</span>
//       </a>
//     </>
//   );
// } /////////////// MobBtns //////////////////


// //// 모바일용 메뉴창 컴포넌트 : header.top-area 밖에 /////
// function MobMenu() {
//   return (
//     <>
//     {/* 1.4.모바일 검색박스 */}
//         <div className="mos">
//             <div className="mwrap">
//                 {/* 입력창박스 */}
//                 <div id="search">
//                     <input type="text" className="search"/>
//                 </div>
//                 {/* 검색버튼 */}
//                 <button className="scbtn fi fi-search">
//                     <span className="ir">돋보기검색아이콘</span>
//                 </button>
//             </div>
//         </div>

//         {/* 1.5.모바일 전체메뉴 */}
//         <div id="mobx">
//             {/* 1.5-1.모바일 GNB 메뉴 */}
//             <nav className="mognb">
//                 <ul>
//                     <li>
//                         <a href="#">FASHION</a>
//                     </li>
//                     <li>
//                         <a href="#">BEAUTY</a>
//                     </li>
//                     <li>
//                         <a href="#">LIVING</a>
//                     </li>
//                     <li>
//                         <a href="#">PEOPLE</a>
//                     </li>
//                     <li>
//                         <a href="#">VIDEO</a>
//                     </li>
//                     <li>
//                         <a href="#">RUNWAY</a>
//                     </li>
//                     <li>
//                         <a href="#">SHOPPING</a>
//                     </li>
//                 </ul>
//             </nav>
//             {/* 1.5-2.모바일 sns 메뉴 */}
//             <div className="mosns">
//                 <a href="#" className="fi fi-instagram">
//                     <span className="ir">인스타그램</span>
//                 </a>
//                 <a href="#" className="fi fi-facebook">
//                     <span className="ir">페이스북</span>
//                 </a>
//                 <a href="#" className="fi fi-twitter">
//                     <span className="ir">트위터</span>
//                 </a>
//                 <a href="#" className="fi fi-youtube-play">
//                     <span className="ir">유튜브</span>
//                 </a>
//                 <a href="#">
//                     <span className="ir">카카오스토리</span>
//                 </a>

//             </div>
//             {/* 1.5-3.매거진박스 */}
//             <figure className="magbox">
//                 {/* 잡지커버이미지 */}
//                 <a className="mcover" href="#">
//                     <img src="./images/cover.jpg" alt="보그표지"/>
//                 </a>
//                 {/* 잡지설명 */}
//                 <figcaption>
//                     정기구독을 신청하면 최대 30% 할인혜택을 드립니다!
//                 </figcaption>
//                 {/* 정기구독버튼 */}
//                 <button className="magbtn">정기구독 신청</button>
//             </figure>

//             {/* 하단링크박스 */}
//             <ul className="moblink">
//                 <li>
//                     <a href="#">회사소개 /</a>
//                 </li>
//                 <li>
//                     <a href="#">광고 및 제휴 /</a>
//                 </li>
//                 <li>
//                     <a href="#">
//                         <strong>개인정보 처리방침</strong>
//                     </a>
//                 </li>
//             </ul>
//         </div>
// </>
//   );
// } /////////////// MobMenu //////////////////
