// 보그 PJ 회원가입 컴포넌트 - join.js

// 유효성검사 함수 불러오기
import valid_member from "../function/valid_member.js";
// 메모리상 로딩한 본 함수는 DOM에 작동할 것이므로
// 반드시 뷰 인스턴스 mounted 메서드에서 호출한다!

// 1. 회원가입 컴포넌트
export const JoinComp = Vue.component("join-comp", {
  // 1-1. 템플릿코드설정 /////
  template: `
    <div id="main-area">
        <main class="main-area ibx">
          <!-- 2-1. 회원가입 페이지 상단영역 -->
          <header class="ctop">
            <!-- 2-1-1. 서브타이틀 -->
            <h2 class="stit">Member</h2>
          </header>
          <!-- 2-2. 갤러리 페이지 컨텐츠 박스 -->
          <section class="scont">
            <form action="process.php" method="post" class="logF">
              <ul>
                <!-- 아이디 -->
                <li>
                  <label htmlFor="mid" class="itit"> 아이디 </label>
                  <input
                    type="text"
                    name="mid"
                    id="mid"
                    maxlength="20"
                    placeholder="영문자로 시작하는 6~20글자 영문자/숫자"
                  />
                  <span class="msg"></span>
                </li>
                <!-- 비밀번호 -->
                <li>
                  <label htmlFor="mpw" class="itit"> 비밀번호 </label>
                  <input
                    type="password"
                    name="mpw"
                    id="mpw"
                    maxlength="15"
                    placeholder="특수문자,문자,숫자포함 형태의 5~15자리"
                  />
                  <b class="eye">👁</b>
                  <span class="msg"></span>
                </li>
                <!-- 비밀번호확인 -->
                <li>
                  <label htmlFor="mpw2" class="itit"> 비밀번호확인 </label>
                  <input
                    type="password"
                    name="mpw2"
                    id="mpw2"
                    maxlength="20"
                    placeholder="비밀번호확인을 입력해 주세요!"
                  />
                  <span class="msg"></span>
                </li>
                <!-- 이름 -->
                <li>
                  <label htmlFor="mnm" class="itit"> 이름 </label>
                  <input
                    type="text"
                    name="mnm"
                    id="mnm"
                    maxlength="20"
                    placeholder="이름을 입력해 주세요!"
                  />
                  <span class="msg"></span>
                </li>
                <!-- 성별 -->
                <li>
                  <span class="itit">성별</span>
                  <label htmlFor="gen1">남성</label>
                  <input 
                    type="radio" 
                    name="gen" 
                    id="gen1" 
                    value="m"
                  />
                  <label htmlFor="gen2">여성</label>
                  <input 
                    type="radio" 
                    name="gen" 
                    id="gen2" 
                    value="w"
                    checked 
                  />
                  <!-- 라디오버튼의 name 속성을 
                      같은 이름으로 쓰면 그룹핑되어
                      하나만 선택된다!     
                    checked 속성 - 기본체크설정
                    value값 설정해야 선택값 읽을때 사용됨!
                    (남성은 'm', 여성은 'w')
                    -->
                </li>
                <!-- 이메일 -->
                <li>
                  <label htmlFor="email1" class="itit"> 이메일 </label>
                  <input
                    type="text"
                    id="email1"
                    name="email1"
                    placeholder="이메일앞주소"
                  />
                  <span class="gol">@</span>
                  <select name="seleml" id="seleml">
                    <option value="init">선택해주세요</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="hotmail.com">hotmail.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="free">직접입력</option>
                  </select>
                  <span class="msg"></span>
                </li>
                <!-- 이메일 뒷주소 직접입력 -->
                <li>
                  <label htmlFor="email2"></label>
                  <input
                    type="text"
                    name="email2"
                    id="email2"
                    placeholder="이메일뒷주소"
                  />
                </li>
                <!-- 서브밋버튼 -->
                <li>
                  <input type="submit" value="가입하기" id="btnj" />
                </li>
              </ul>
            </form>
          </section>
          <!-- 2-3. 동의/비동의 박스 -->
          <section id="conf"></section>
        </main>
      </div>
  `,
  // 1-2. 데이터 셋업 리턴 메서드 /////
  data() {
    return {
      
    };
  },
  // 컴포넌트 라이프 사이클 메서드 구역 ///
  // mounted 메서드 : DOM로딩후 실행구역!
  // -> 일반 DOM코딩 JS는 여기서 호출한다!!!
  mounted() {
    // 유효성검사 함수호출!
    valid_member();
  }, /// mounted ///////
});
