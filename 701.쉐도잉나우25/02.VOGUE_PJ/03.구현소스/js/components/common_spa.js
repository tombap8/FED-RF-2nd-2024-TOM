// 보그 PJ 공통 컴포넌트 : SPA용 - common_spa.js
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
            {{$store.state.logSet.name}}
          </h1>
        </div>
        <!-- 1-2. 메뉴박스 -->
        <nav class="gnb">
          <ul>
            <li v-for="v in this.gnbMenu">
              <a href="#">{{v}}</a>
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
          <ol :class="$store.state.logCls">
            <li 
              v-for="
                (v,k) in this.addMenu
                /* v - 객체값, k - 키명 */
              "
            >
            <a href="#" @click.prevent="testFn" v-if="k=='로그아웃'">
              <i :class="v[0]" :title="k"></i>
            </a>
              <router-link :to="v[1]" v-else>
                <i :class="v[0]" :title="k"></i>
              </router-link>
            </li>
          </ol>
        </nav>
        <div id="login-msg"></div>
      </header>      
    </div>   
    `,
  // 1-2. 데이터 셋업 리턴 메서드 /////
  data() {
    return {
      // (1) GNB 메뉴 데이터
      gnbMenu: ["FASHION", "BEAUTY", "LIFESTYLE", "CULTURE", "VIDEO"],
      // (2) 요약 메뉴 데이터
      sumMenu: ["KOREA", "구독하기", "≡"],
      // (3) 추가가 메뉴 데이터 : 
      // 키는 메뉴, 값은 배열로 폰트어썸 클래스(0), 라우터경로(1)
      addMenu: {
        로그인: ["fa-solid fa-right-to-bracket","/login"],
        로그아웃: ["fa-solid fa-right-from-bracket","/logout"],
        회원가입: ["fa-solid fa-user","/join"],
        장바구니: ["fa-solid fa-cart-shopping","/cart"],
      },
    };
  }, /// data ///

  // 1-3. 컴포넌트 메서드구역 /////
  methods:{
    testFn(){
      console.log("testFn() 실행");
      if(confirm("로그아웃 하시겠습니까?"))
      store.commit('setLogout');
    },
    // goPage : 링크이동 메서드 /////
    goPage(gubun){ // gubun - 구분키(키명)
      console.log(gubun);
      // 페이지명 셋팅변수
      let pgName;
      // 구분키별 분기 //
      switch(gubun){
        case "로그인": pgName = "login"; break;
        case "회원가입": pgName = "member"; break;
        case "장바구니": pgName = "cart_list"; break;
      } //// switch /////////

      // 페이지 이동하기 ///
      location.href = pgName + '.html';

    }, //// goPage 메서드 ////
  }, /// methods //////
  // 1-4. 컴포넌트 라이프사이크 메서드 : mounted
  mounted(){
    // 폰트어썸 link CSS 넣기
    $('head').append(`
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
