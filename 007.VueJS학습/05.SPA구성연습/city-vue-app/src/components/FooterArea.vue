<template>
  <!-- 하단파트를 라우터 메뉴 파트와 하나의 Root로 묶어야함! -->
  <div>
    <footer>
      <address>서울시 강남구 역삼동 119 뷰엑스B</address>
    </footer>
    <!-- 하단 라우터 메뉴넣기 -->
    <div class="asso">
      <router-link to="/trip" tag="button"> 세계여행사</router-link>
      <router-link to="/foods"> 세계먹거리</router-link>
      <!-- 
          [라우터에서 연결한 컴포넌트(템플릿) 보일곳]
          router-view를 쓴 자리에 컴포넌트 소스코드가 뿌려짐!
          -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterArea",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  border: 1px solid #ccc;
  text-align: center;
  padding: 20px;
}
/* 라우터 출력용 CSS추가 */

/* 라우터 */
.router {
  text-align: center;
  color: #fff;
  background: #fff no-repeat center/cover;
  height: 30vh;
  line-height: 30vh;
  font-size: 24px;
  text-shadow: 2px 2px 2px #000;
  border-radius: 20px;
  box-shadow: 2px 2px 2px #0000008b;
}
.trip {
  background-image: url(https://as2.ftcdn.net/v2/jpg/03/73/40/29/1000_F_373402961_zHwVILZu4UNblYegPKkKTsyiuHdtRscG.jpg);
}
.foods {
  background-image: url(https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png);
}
.asso {
  text-align: center;
  border-top: 4px double darkgreen;
}
.asso a {
  color: green;
  display: inline-block;
  padding: 10px;
  text-decoration: none;
}

/* 선택된 라우터 선택메뉴 클래스 */
.router-link-active {
  text-decoration: overline !important;
  font-weight: bold;
}
</style>
