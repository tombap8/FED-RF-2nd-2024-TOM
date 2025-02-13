// 보그 PJ 공통 컴포넌트 : SPA용 - common_spa.js

// 상단영역 데이터 불러오기 ///
import {gnbMenu, sumMenu, addMenu} from "../../data/gnb_data.js";

// 뷰엑스 스토어 불러오기 ///
import store from "../vuex_store.js";

// 1. 상단컴포넌트
const TopComp = Vue.component("top-comp", {
  // 1-1. 템플릿코드설정 /////
  template: `  
    <div id="top-area">
      <header class="top-area inbox">
        <!-- 1-1. 로고박스 -->
        <div class="logo">
          <h1>
            <!-- 라우터 첫 페이지 이동셋팅 -->
            <router-link to="/">
              <img src="./images/svg/logo.svg" alt="메인로고" />
            </router-link>
          </h1>
        </div>
        <!-- 1-2. 메뉴박스 -->
        <nav class="gnb">
          <ul>
            <li v-for="v in Object.keys(this.gnbMenu)">
              <router-link :to="{
                name:'sub-page',
                // query는 get방식처럼 url창으로 전달함
                // 값은 {키:값,키:값} 객체형식임
                // 결과는 url?키=값&키=값
                query:{id:v}
               }">
                {{v}}
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- 1-3. 요약메뉴박스 -->
        <nav class="sum-menu">
          <ol>
            <li v-for="v in this.sumMenu">
              <a href="#">{{v}}</a>
            </li>
          </ol>
        </nav>
        <!-- 1-4. 추가메뉴박스 -->
        <nav class="add-menu">
          <ol :class="$store.state.loginCls">
            <li 
              v-for="
                (v,k) in this.addMenu
                /* v - 객체값, k - 키명 */
              "
            >
              <!-- 
              로그아웃일때는 일반 a요소

              [뷰JS 조건문 디렉티브]
              v-if="조건" / v-else-if="조건" / v-else
              -->

              <a href="#" 
                v-if="k=='로그아웃'"
                @click.prevent="logoutFn"
              >
                <i :class="v[0]" :title="k"></i>
              </a>

              <!-- 기타일때는 라우터링크 -->

              <router-link :to="v[1]" v-else>
                <i :class="v[0]" :title="k"></i>
              </router-link>
            </li>
          </ol>
        </nav>
        <!-- 로그인 환영메시지 박스 -->
        <div id="login-msg">{{$store.state.welcomeMsg}}</div>
      </header>      
    </div>   
    `,
  // 1-2. 데이터 셋업 리턴 메서드 /////
  data() {
    return {gnbMenu,sumMenu,addMenu};
    // 구조분해할당 방식으로 같은 이름의 객체 가져오기
    // return {gnbMenu:gnbMenu, sumMenu:sumMenu, addMenu:addMenu};
    // 외부에서 가져온 객체를 같은 이름으로 할당하는 경우가 많다!
    // 이때 같은 이름으로 구조분해하여 할당하는 방식은
    // 코딩량을 줄여주며 가독성을 높인다!
  }, /// data ///

  // 1-3. 컴포넌트 메서드구역 /////
  methods: {
    // 로그아웃 메서드 /////
    logoutFn() {
      if (confirm("로그아웃 하시겠습니까?")) store.commit("setLogout");
    },
    // goPage : 링크이동 메서드 /////
    goPage(gubun) {
      // gubun - 구분키(키명)
      console.log(gubun);
      // 페이지명 셋팅변수
      let pgName;
      // 구분키별 분기 //
      switch (gubun) {
        case "로그인":
          pgName = "login";
          break;
        case "회원가입":
          pgName = "member";
          break;
        case "장바구니":
          pgName = "cart_list";
          break;
      } //// switch /////////

      // 페이지 이동하기 ///
      location.href = pgName + ".html";
    }, //// goPage 메서드 ////
  }, /// methods //////
  // 1-4. 컴포넌트 라이프사이크 메서드 : mounted
  mounted() {
    // 폰트어썸 link CSS 넣기
    $("head").append(`
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    />
    `);
  }, /// mounted ///
}); /// TopComp ///////////////

// 2. 하단컴포넌트 /////////////////////
const BottomComp = Vue.component("bottom-comp", {
  // 템플릿 코드 ////
  template: `
    <div id="footer-area">
        <footer class="footer-area ibx common-area">
          <!-- 3-1.하단로고 -->
          <div class="blogo">
            <img src="./images/svg/logo_white_m.svg" alt="하단로고" />
          </div>
          <!-- 3-2.하단링크 -->
          <ul class="blink">
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
          <!-- 3-3.회사주소 -->
          <address class="addr">
            VOGUE.CO.KR IS OPERATED BY DOOSAN MAGAZINE
          </address>
        </footer>
        <!-- 위로가기버튼 -->
        <a href="#" class="tbtn fi fi-angle-up">
          <span class="ir">위로가기버튼</span>
        </a>
      </div>      
  `,
  // 데이터 설정 ////
  data() {
    return {};
  },
});

// 3. 내보내기
export { TopComp, BottomComp };
