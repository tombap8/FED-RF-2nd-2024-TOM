<!-- 1.템플릿 구역 -->
<template>
  <!-- 원래 루트인 #app은 대체된다! -->
  <div id="app">
    <TopArea />
    <MainArea />
    <FooterArea />
  </div>
</template>

<!-- 2. 스크립트 구역 -->
<script>
// 여기서 import해준다!
import TopArea from "./components/TopArea.vue";
import MainArea from "./components/MainArea.vue";
import FooterArea from "./components/FooterArea.vue";

export default {
  // 내보낼 컴포넌트 이름
  name: 'App',
  // 내보낼 컴포넌트 등록
  components: {
    TopArea,
    MainArea,
    FooterArea,
  },
}
</script>

<!-- 3. 스타일구역 : scoped 키워드 없으면 전역 -->
<style>
/* 최상위요소 */
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
