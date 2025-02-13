// 보그 PJ 메인 페이지 컴포넌트 - main.js
import store from "../vuex_store.js";

// 메인페이지 컴포넌트 : 구성할 여러개의 컴포넌트호출 ////
export const MainComp = Vue.component("main-comp", {
    template: `
          <main>
              <!-- 배너영역 -->
              <banner-comp></banner-comp>
  
              <!-- Today’s Stories 영역 -->
              <today-area-comp list-tit="Today’s Stories" data-name="today"></today-area-comp>
  
              <!-- fashion 영역 -->
              <fashion-area-comp></fashion-area-comp>
          </main>
      `,
      created(){
        store.commit('setDataName','today');
      },
    // DOM구성후
    mounted() {
      // CSS 변경하기 ///
      $("#css-set").attr("href", "./css/main.css");
    },
  }); ///////////// MainComp ///////////////////