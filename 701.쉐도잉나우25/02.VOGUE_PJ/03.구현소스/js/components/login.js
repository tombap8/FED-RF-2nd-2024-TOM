// 보그 JS 로그인 컴포넌트 - login.js

// 로그인 기능 함수 불러오기 -> mounted에서 호출! ////
import validLogin from "../function/valid_login.js";

// 뷰엑스 스토어 불러오기
import store from "../vuex_store.js";

export const LoginComp =  
Vue.component("login-comp",{
    // 1. 템플릿
    template: `
    <div id="main-area">
        <main class="main-area ibx">
           <!-- 2-1. 로그인 페이지 상단영역 --> 
          <header class="ctop">
             <!-- 2-1-1. 서브타이틀 --> 
            <h2 class="stit">Login</h2>
          </header>
           <!-- 2-2. 갤러리 페이지 컨텐츠 박스 --> 
          <section class="scont">
             <!-- form 요소 :  
                입력데이터를 전송하기위한 요소
                속성
                action - 전송할 처리페이지
                method - post : post방식 전달설정
                        get : get방식 전달설정

                (get방식:url로 키=값 쌍으로 데이터전달)
                (post방식:페이지로 데이터를 전달하는 숨김방식)
              -->
            <form action="process.php" method="post" class="logF">
               <!-- 아이디박스 --> 
              <div class="minput">
                <label htmlFor="mid">아이디</label>
                <input
                  type="text"
                  name="mid"
                  id="mid"
                  maxlength="10"
                  placeholder="아이디를 입력해 주세요!"
                />
              </div>
               <!-- 비밀번호박스 --> 
              <div class="minput">
                <label htmlFor="mpw">비밀번호</label>
                <input
                  type="password"
                  name="mpw"
                  id="mpw"
                  maxlength="10"
                  placeholder="비밀번호를 입력해 주세요!"
                />
              </div>
               <!-- 버튼영역 --> 
              <div class="btnbx">
                <input type="submit" id="sbtn" value="LOGIN" />
                 <!-- type-"submit" 서브밋버튼 
                        전체 form요소의 데이터를 action
                        페이지로 전달함! -->
              </div>
               <!-- 기타링크 --> 
              <div class="addbx">
                <span>
                  <input type="checkbox" id="chkbx" name="chkbx" />
                  <label htmlFor="chkbx">아이디저장</label>
                </span>
                 <!-- 모바일에서 보일바 .bar1 --> 
                <b class="bar bar1"> | </b>
                <a href="#">아이디찾기</a>
                 <!-- 모바일에서 숨길바 .bar2 --> 
                <b class="bar bar2"> | </b>
                 <!-- 모바일에서 줄바꿈 .brk --> 
                <br class="brk" />
                <a href="#">비밀번호찾기</a> |<a href="#">회원가입</a>
              </div>
            </form>
          </section>
        </main>
      </div>
    `,
    // 2. 리턴함수 데이터
    data(){
        return{
          msg: "준비",
        };
    },
    // 3. 메서드
    methods: {
      // 전역 스토어 변수 업데이트 메서드 호출
      actLogin(pm,txt){
        // pm : 로그인 된 사용자 정보 객체
        // console.log('가상돔 메서드 실행!',pm);
        // this.msg = txt;

        // 1. 스토어 뮤테이션스 호출
        store.commit('setLogin',pm);
        // 2. 세션스토리지 셋업하기! 'login-user'
        sessionStorage.setItem('login-user', JSON.stringify(pm));
        // 3. 첫페이지로 라우팅하기
        this.$router.push('/');
      },
    },
    // 4. 데이터셋업파트
    created(){},
    // 5. DOM 셋업파트
    mounted(){
        // 로그인 기능함수 호출!!!
        validLogin(this.actLogin);
        // -> 뷰 컴포넌트 인스턴스의 메서드를 보냄!
        // ->> DOM에서 뷰 메서드 실행하는 쉬운방법!

        // CSS 변경하기 ///
        $('#css-set').attr('href','./css/login.css');
    },
});