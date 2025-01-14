// 01. 컴포넌트 연습 JS
import myData from './comp_data.json' with{type:'json'};

/***************************************************** 
    [ 컴포넌트의 지역화 : 지역 컴포넌트 ]
     1. 지역 컴포넌트는 무엇인가?
     - 뷰인스턴스 내부에 셋팅되는 컴포넌트다.
     2. 전역 컴포넌트와 차이는 무엇인가?
     - 지역컴포넌트는 다른 뷰인스턴스에서 사용할 수 없다
     3. 왜 사용하는가?
     - 전역과 달리 특정 뷰인스턴스 전용으로 만들때 사용한다.
     4. 사용문법은 무엇인가?
     - 뷰인스턴스 안의 components 속성값으로 객체형식으로 쓴다.
     - 보통 템플릿 등의 속성객체는 별도의 변수에 할당 후 쓴다.

        ((구문))
        new Vue({
            components:{
                컴포넌트명: 셋팅객체,
                컴포넌트명: 셋팅객체,
                컴포넌트명: 셋팅객체,
            }
        })
     ____________________________________

        코드예)
        // 타이틀 컴포넌트 셋팅데이터 변수
        const titCompData = {
            template: '<h1>{{propsdata}}</h1>',
            props: ['propsdata']
        }

        // 배너 컴포넌트 셋팅데이터 변수
        const banCompData = {
            template: '<div>{{propsdata}}</div>',
            props: ['propsdata']
        }
            
        // 뷰 인스턴스 생성코드 ////
        new Vue({
            el: '#app',
            // 지역 컴포넌트 셋팅속성 ///
            components: {
                'tit-comp': titCompData,
                'ban-comp': banCompData,
            },
            data: {
                message: 'Hello',
                num: 10
            }
    })

    _________________________________________
    
    ((비교참고 : 전역컴포넌트))
    - 서로 다른 뷰 인스턴스에서 모두 사용가능한 컴포넌트
    ((구문))
    Vue.component(컴포넌트이름, {셋팅객체});

*****************************************************/

// 1. 상단영역 전역 컴포넌트 데이터
const titCompData = {
  template: `
      <strong>
          <span>
            😉Vue JS😎 컴포넌트 :
          </span>
          쇼핑모~~~올 갤러리 리스트
        </strong>
      `,
}; ///// 전역컴포넌트1 /////

//   new Vue({el:'.tit'});

// [갤러리용 변수]
let inum = 0;

// 2. 갤러리 리스트에 넣을 전역 컴포넌트 데이터 ///
const listCompData = {
  // (1) 템플릿 설정
  template: `
          <div>
              <img 
                  v-bind:src="gsrc" 
                  v-on:click="goPapa"
                  v-on:mouseover="ovNow"
              alt="아이템">
              <aside>
              <h2>{{gname}}</h2>
              <h3>{{gprice}}</h3>
              </aside>
          </div>
      `, //// template /////

  // (2) 프롭스 다운!!! -> 부모요소에 만든 요소명을 등록함!
  // props: [] -> 배열형태로 여러개 등록 가능!
  props: ["list-num", "my-seq"],

  // (3) data속성 : 컴포넌트에서 쓸 데이터
  // data: function(){ 이형태 또는 메서드형으로!
  data() {
    // 메서드형!
    // 컴포넌트 data는 함수형태로 반드시 return을 써야함!
    return {
      // 이미지 src
      // gsrc: `./images/${this.setNum()}.jpg`,
      gsrc: `./images/${this.listNum}.jpg`,
      // 상품명
      gname: "Sofia24" + this.listNum + "WD" + (this.mySeq % 2 ? "🙆‍♂️" : "👩‍⚕️"),
      // gname: this.key,
      // ->key속성은 유일키 구분목적속성이므로
      //   일반데이터로 사용할 수 없다! 에러남!

      // 상품가격
      gprice: this.addComma((123000 * this.listNum) / 2) + `원`,
    };
  }, // data속성

  // (4) methods 속성
  methods: {
    // 연속번호만들기 테스트용 메서드
    setNum() {
      return ++inum;
    },
    // 세자리마다 콤마추가 메서드
    addComma(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    // 부모와 자식 컴포넌트 연결하기
    goPapa() {
      //-> goPapa는 자식컴포넌트에서 호출!
      this.$emit("hull");
      // $emit() 메서드는 부모에 설정한 새로운 이벤트와 연결
    },
    ovNow() {
      //-> ovNow도 자식컴포넌트에서 호출!
      this.$emit("gotkimchi");
    },
  },
}; ///////// list-comp 데이터 ////////////

// 3. 유튜브 동영상 컴포넌트 데이터 //////
const ifrCompData = {
  // 3-1. template옵션
  template: `
    <iframe width="49%" style="aspect-ratio: 16/9;" 
    v-bind:src="ifrSrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `, /// template ////
  // [ 프롭스다운 설정하기 ]
  props: ["mv-code"],
  // -> 사용시 this.mvCode
  // 3-2. data 옵션
  data() {
    return {
      ifrSrc: this.getIframeSrc(this.mvCode),
    };
  }, /// data ///
  // 3-3. methods 속성
  methods: {
    // 동영상 정보 리턴함수
    getIframeSrc(code) {
      // 동영상코드
      return `https://www.youtube.com/embed/${code}?autoplay=1&mute=1&loop=1&playlist=${code}`;
    },
  },
}; ////////// ifr-comp 데이터 /////////

// 4. 하단 컴포넌트 데이터 ///////////
const footerCompData = {
  template: `
          <div style="background-color:black;text-align:center;color:white;line-height:2;font-weight:bold; padding:3vw; margin-top:1vw;">
              <h2>Discovery Expedition</h2>
              <h3>Copyright © F&F Corp. All Rights Reserved.</h3>        
          </div>
      `,
};

// 2. 추가 리스트 데이터 ////////
const listComp2Data = {
  // (1) 템플릿 설정
  template: `
        <div>
            <img 
                v-bind:src="gsrc" 
            alt="아이템">
            <aside>
            <h2>{{gname}}</h2>
            <h3>{{gprice}}</h3>
            </aside>
        </div>
    `, //// template /////
  // v-bind:src 속성은 일반 src속성과 달리
  // 뷰JS에서 속성값을 바인딩하여 넣는다는 코딩법이다!
  // -> 일반적으로 v-bind:속성 이렇게 쓰면
  // 뷰JS용 바인딩 속성이 된다!!!

  // 부모가 공개한 바인딩 속성을 가져온다!
  // 프롭스 다운!!! -> 부모요소에 만든 요소명을 등록함!
  // props: [] -> 배열형태로 여러개 등록 가능!
  props: ["m-list"],
  // 주의: 이것을 변수로 쓸때는 캐밥케이스를 캐믈케이스로
  // 바꿔서 쓴다~! 예) 'list-num' -> listNum
  // 그리고 프롭스 다운변수도 내부에 등록되었으므로
  // this키워드로 호출함! 예) this.listNum

  // (2) data속성 : 컴포넌트에서 쓸 데이터
  // data: function(){ 이형태 또는 메서드형으로!
  data() {
    // 메서드형!
    // 컴포넌트 data는 함수형태로 반드시 return을 써야함!
    return {
      // 이미지 src
      // gsrc: `./images/${this.setNum()}.jpg`,
      gsrc: `./images/${this.mList.idx}.jpg`,
      // 상품명
      gname: this.mList.gName,
      // gname: this.key,
      // ->key속성은 유일키 구분목적속성이므로
      //   일반데이터로 사용할 수 없다! 에러남!

      // 상품가격
      gprice: this.addComma(this.mList.gPrice) + `원`,
    };
  }, // data속성

  // (3) methods 속성
  methods: {
    // 연속번호만들기 테스트용 메서드
    setNum() {
      return ++inum;
    },
    // 세자리마다 콤마추가 메서드
    addComma(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    // 부모와 자식 컴포넌트 연결하기
    goPapa() {
      //-> goPapa는 자식컴포넌트에서 호출!
      this.$emit("hull");
      // $emit() 메서드는 부모에 설정한 새로운 이벤트와 연결
    },
    ovNow() {
      //-> ovNow도 자식컴포넌트에서 호출!
      this.$emit("gotkimchi");
    },
  },
}; ///////// list-comp2 데이터 ///////////

// 컴포넌트의 부모 뷰인스턴스
new Vue({
  el: ".main-wrap",
  data: {
    setData: myData,
  },
  // 지역 컴포넌트 속성 셋팅 ///
  components: {
    "tit-comp": titCompData,
    "list-comp": listCompData,
    "ifr-comp": ifrCompData,
    "footer-comp": footerCompData,
    "list-comp2": listComp2Data,
  },
  // 자식컴포넌트의 전달값을 받기위한 메서드를 만든다!
  methods: {
    // 자식이벤트 전달후 실행메서드
    goMsg() {
      alert("자식이 부모에게 이벤트전달 성공!");
    },
    ovMsg() {
      console.log("오버!오케이!");
    },
  },
});
