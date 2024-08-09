<!-- 상단영역 컴포넌트 : TopComp.vue -->

<!-- 1.템플릿 HTML 코드구역 -->
<template>
  <header>
    <ul class="gnb">
      <!--  v-값,i-속성명 -->
      <!-- 리액티브 데이터인 뷰엑스 스토어 cityData변수를
          컴포넌트 변수인 sdata에 할당하여 사용하면 처음에만 할당된
          변수로 셋팅이되고 cityData가 변경될때 반영되지 않는다!
          따라서 리액티브 데이터를 직접 해당자리에 사용해야한다! -->
      <!-- <li v-for="(v,i) in sdata" v-bind:key="i" v-if="i!='인트로'"> -->
      <li
        v-for="(v, i) in this.$store.state.cityData"
        v-bind:key="i"
        
      >
        <a href="#" v-if="i!='인트로'" v-on:click="chgData(i)">
          {{ i }}
        </a>
      </li>
    </ul>
    <!-- 메뉴선택이동링크 -->
    <div class="m2">
      <!-- 
          v-on:이벤트명.prevent 
          기본기능막기 옵션 .prevent는 
          event.preventDefault()와 같다!
  
          참고) 
          v-on:이벤트명.stop 
          이벤트버블링막기 옵션 .stop은
          event.stopPropagation()과 같다!
          -->
      <a href="#" v-on:click.prevent="chgMenu(num)" v-text="'메뉴' + num"></a>
    </div>
  </header>
</template>

<!-- 2. 스크립트 코드구역 -->
<script>
// 제이쿼리 임포트
import $ from "jquery";

export default {
  // 컴포넌트를 부르는 이름지정
  name: "TopArea",
  // 컴포넌트 데이터 설정하기 : 리턴함수로 만든다!
  data() {
    return {
      // 1. 도시정보 객체변수
      sdata: this.$store.state.cityData,
      // 2. 메뉴번호(처음에 다음메뉴인 2번넣기)
      num: 2,
    };
  },
  // 메서드 생성구역 ////
  methods: {
    // 스토어 변수 업데이트 메서드
    chgData(pm) {
      console.log("업데이트!", pm);
      // 뮤테이션 메서드 호출하기!
      this.$store.commit("chgData", pm);
    },
    // 메뉴변경하기 메서드
    chgMenu(n) {
      // n - 메뉴번호전달
      console.log("메뉴변경:", n);
      // 뮤테이션 메서드 호출하기!
      this.$store.commit("chgMenu", n);

      // 메뉴1/메뉴2 전환을 위한 변수변경하기
      // 컴포넌트 변수인 num을 변경한다!
      n === 1 ? (this.num = 2) : (this.num = 1);

      // 메뉴변경시 DOM이 변경되므로
      // 제이쿼리 메서드 호출하기!
      // 단, 제이쿼리 코드블록으로 싸서
      // 호출함으로 DOM로드후 실행 보장!!!
      $(() => this.setJQ());
    },
    // 제이쿼리 셋팅 메서드 ///////
    setJQ() {
      console.log("jQ셋팅!");
      // 링크 클릭시 a에 클래스 on주기
      $(".gnb a").click(function (e) {
        e.preventDefault();
        $(this).addClass("on").parent().siblings().find("a").removeClass("on");

        // 박스 애니
        showBx();
      }); ////////// click ///////////

      function showBx() {
        // 이미지와 설명박스 순서대로 나타나기
        $("main img").css({ opacity: 0 }).stop().delay(500).fadeTo(500, 1);

        $("main p").css({ opacity: 0 }).stop().delay(1000).fadeTo(500, 1);
      } ////// showBx ////
    },
  },
  // DOM을 만들고 난후
  mounted() {
    // 제이쿼리 셋팅 메서드 호출!
    this.setJQ();
  },
};
</script>

<!-- 3. CSS 설정구역 : 여기서는 지역적용 scoped -->
<style scoped>
.m2 {
  display: block;
  text-align: right;
}
.m2 a {
  font-size: 20px;
}
.m2 a:hover {
  text-decoration: underline;
  text-decoration-style: double;
  color: green;
}
header {
  padding: 15px;
  border: 2px solid #ccc;
}
header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 0 15px;
}
header a {
  font-size: 30px;
  color: #222;
  text-decoration: none;
}
header a:hover,
header a.on {
  color: orangered;
  text-decoration: overline;
  text-decoration-style: wavy;
}
</style>
