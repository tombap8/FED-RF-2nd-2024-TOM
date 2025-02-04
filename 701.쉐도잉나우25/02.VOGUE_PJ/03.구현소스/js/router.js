// 뷰 라우터 셋팅 JS : router.js

// 컴포넌트 불러오기 /////
// [1] 공통컴포넌트
import { MainComp } from "./components/main.js";
import { TopComp } from "./components/common.js";
import { BannerComp } from "./components/banner.js";
import { JoinComp } from "./components/join.js";
import { LoginComp } from "./components/login.js";
import { TodayAreaComp } from "./components/today_area.js";
import { FashionAreaComp } from "./components/fashion-area.js";



/********************************************************* 
    [파라미터로 전달된 라우터 값을 읽는 코드법]
    this.$route.params.cls
    1. this 는 현재 라우터를 사용하는 뷰인스턴스
    2. $route 는 현재 연결된 라우트 정보객체
    3. params 는 라우트 하위 파라미터 전달속성
    4. cls / item 은 전달된 파라미터이름 (여기서 값이 나옴)
******************************************************/

// [ 뷰라우터 인스턴스 내보내기 ] /////
// -> 라우터 셋팅 방식
// new VueRouter({routes:[]})
// -> 만약 외부에 셋팅될 경우
// -> const routes = []
// -> new VueRouter({routes})
// -> routes라는 속성명은 정해진이름임!
export default new VueRouter({
  routes: [
    {
      // (1) 경로설정 : path
      path: "/",
      // (2) 연결할 컴포넌트 설정 : component
      component: MainComp,
    },
    {
      // (1) 경로설정 : path
      path: "/login",
      // (2) 연결할 컴포넌트 설정 : component
      component: LoginComp,
    },
    {
      // (1) 경로설정 : path
      path: "/join",
      // (2) 연결할 컴포넌트 설정 : component
      component: JoinComp,
    },
  ],
}); ///////// VueRouter ////////////////
