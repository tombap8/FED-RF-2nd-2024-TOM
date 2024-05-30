// 보고 JS 로그인 컴포넌트 ///////

// 로그인 유효성검사 JS 불러오기
import validateLogin from "../valid_login";

export default function Login({changeMenu}) {  
  // changeMenu - 상태변수메서드 setMenu전달

  // 페이지 랜더링 후 실행구역 ///
  React.useEffect(()=>validateLogin(changeMenu),[]);


  // 코드 리턴구역 //////////
  return (
    <div id="main-area">
      <main className="main-area ibx">
        {/* <!-- 2-1. 로그인 페이지 상단영역 --> */}
        <header className="ctop">
          {/* <!-- 2-1-1. 서브타이틀 --> */}
          <h2 className="stit">Login</h2>
        </header>
        {/* <!-- 2-2. 갤러리 페이지 컨텐츠 박스 --> */}
        <section className="scont">
          {/* <!-- form 요소 :  
                  입력데이터를 전송하기위한 요소
                  속성
                  action - 전송할 처리페이지
                  method - post : post방식 전달설정
                          get : get방식 전달설정

                  (get방식:url로 키=값 쌍으로 데이터전달)
                  (post방식:페이지로 데이터를 전달하는 숨김방식)
              -->*/}
          <form action="process.php" method="post" className="logF">
            {/* <!-- 아이디박스 --> */}
            <div className="minput">
              <label htmlFor="mid">아이디</label>
              <input
                type="text"
                name="mid"
                id="mid"
                maxlength="10"
                placeholder="아이디를 입력해 주세요!"
              />
            </div>
            {/* <!-- 비밀번호박스 --> */}
            <div className="minput">
              <label htmlFor="mpw">비밀번호</label>
              <input
                type="password"
                name="mpw"
                id="mpw"
                maxlength="10"
                placeholder="비밀번호를 입력해 주세요!"
              />
            </div>
            {/* <!-- 버튼영역 --> */}
            <div className="btnbx">
              <input type="submit" id="sbtn" value="LOGIN" />
              {/* <!-- type-"submit" 서브밋버튼 
                      전체 form요소의 데이터를 action
                      페이지로 전달함! -->*/}
            </div>
            {/* <!-- 기타링크 --> */}
            <div className="addbx">
              <span>
                <input type="checkbox" id="chkbx" name="chkbx" />
                <label htmlFor="chkbx">아이디저장</label>
              </span>
              {/* <!-- 모바일에서 보일바 .bar1 --> */}
              <b className="bar bar1"> | </b>
              <a href="#">아이디찾기</a>
              {/* <!-- 모바일에서 숨길바 .bar2 --> */}
              <b className="bar bar2"> | </b>
              {/* <!-- 모바일에서 줄바꿈 .brk --> */}
              <br className="brk" />
              <a href="#">비밀번호찾기</a> |<a href="#">회원가입</a>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
} //////////// Login 컴포넌트 //////////////
