// 02. 컴포넌트 연습2 JS - 부모변수를 자식에게 전달!
// ->>> Props Down 프롭스 다운!!!

// 뷰JS 인스턴스 생성용 함수 : x 는 대상요소
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
// Vue.component(케팝케이스컴포넌트태그명, {옵션})
// 이것으로 생성함!
// 같은 이름의 태그구성요소에 실제 template 값이 들어감!
Vue.component("tit-comp", {
  template: `
        <strong>
            <span>
                😊Vue JS😜 컴포넌트 : 
            </span>
            쇼핑모~~~올 갤러리 리스트
        </strong>
    `,
}); //// 전역 컴포넌트 1 ////////

// 컴포넌트를 먼저 만들고나서 뷰인스턴스 생성함!

// 뷰인스턴스 생성하기 : 타이틀 컴포넌트
makeVue(".tit");

// [ 갤러리 리스트용 변수 셋팅 ] //////
// (1) 갤러리 이미지번호용 변수
let inum = 0;
// (2) 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
Vue.component("list-comp", {
  // 2-1. template 옵션 : 태그구성
  // v-bind:속성 디렉티브
  // 변수를 사용할 수 있는 속성재구성해줌!
  template: `
      <div>
        <img 
          v-bind:src="gsrc" 
          v-on:click="goMsg('나야나!')"
          alt="의류아이템"
        >
        <aside>
          <h2 v-text="gname"></h2>
          <h3 v-text="gprice"></h3>
        </aside>
      </div>
    `, // template ////

  // [ 상위 컴포넌트 전달변수 설정속성 : props ]
  props: ["list-num","my-seq","end-let"],

  // 배열형은 설정한 변수명을 문자형으로 나열만 하면되고
  // 만약 각 변수의 데이터형(type)을 특정하고 싶으면
  // 객체형을 사용하여 아래와 같이 표현한다!
  // props: {변수명:변수형}

  // props: {
  //   "list-num":Number,
  //   "my-seq":Number,
  //   "end-let":String
  // },

  // 이 변수를 사용할때는 캐믈케이스 변수로 사용함!
  // "list-num" -> this.listNum
  // -> 내부용 변수이므로 this 키워드 반드시 사용!

  // 2-2. data 옵션 : 컴포넌트 내부 변수셋팅
  // 실행원리 : 컴포넌트가 빌드할때
  // data 속성의 함수를 호출한다!
  // 그래서 함수의 리턴되는 객체값이
  // 컴포넌트 내부에 전달된다!
  // data: function(){}
  data() {
    // 객체리턴필수!!!(중요!!!)
    return {
      // 이미지 src
      gsrc: `./images/${this.listNum}.jpg`,
      // 상품명
      gname: this.setName()+" "+this.endLet+this.mySeq,
      // 상품가격
      gprice: this.setPrice(),
    };
  }, /// data ////
  // 2-3. methods 속성 : 컴포넌트 내부 메서드 셋팅
  methods: {
    // (1) 이미지번호 만들기 함수
    // 외부전역변수 inum을 1씩 증가하여 리턴함
    setNum() {
      return ++inum;
    },

    // (2) 상품명 만들기 함수
    setName() {
      return goods[Math.floor(Math.random() * 4)];
    },

    // (3) 가격만들기 함수
    setPrice() {
      let rdm = Math.ceil(Math.random() * 17) + 3;
      return this.addCommas(20000 * rdm) + "원";
    },

    // (4) 세자리콤마 함수
    addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
}); ///// component ////////////

// 뷰인스턴스 생성하기 : 리스트 컴포넌트
// makeVue(".grid");

// lise-comp라는 자식 컴포넌트의 부모컴포넌트!
new Vue({
  // 1. 대상
  el: ".grid",
  // 2. 메서드
  methods: {
    // 자식 이벤트 전달후 실행메서드!
    goMsg(txt){
      alert("자식이 부모에게 이벤트 전달 성공!!!"+txt);
    },
    // 자식 컴포넌트의 오버 이벤트가 전달되어
    // 호출하는 메서드
    overMsg(pm){
      // pm 전달받을 객체값 {이름:"어쩌구",나이:"저쩌구"}
      alert('오 마이 갓김치!'+pm.이름+' 나이는 '+pm.나이);
    },

  },
});


// 3. 유튜브 동영상 컴포넌트 만들기
Vue.component("ifr-comp",{
    // 3-1. template옵션
    template:`
    <iframe width="49%" style="aspect-ratio: 16/9;" 
    v-bind:src="ifrSrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `, /// template ////
    // [ 프롭스다운 설정하기 ]
    props: ["mv-code"],
    // -> 사용시 this.mvCode
    // 3-2. data 옵션
    data(){
        return{
            ifrSrc: this.getIframeSrc(this.mvCode),
        };
    }, /// data ///
    // 3-3. methods 속성
    methods: {
      // 동영상 정보 리턴함수
      getIframeSrc(code) { // 동영상코드
        return `https://www.youtube.com/embed/${code}?autoplay=1&mute=1&loop=1&playlist=${code}`;
      },
    },
});

// 뷰인스턴스 생성하기 : 유튜브 동영상 컴포넌트
makeVue(".you-box");

// 4. 하단 컴포넌트 만들기
Vue.component("footer-comp",{
    template:`
        <div style="background-color:black;text-align:center;color:white;line-height:2;font-weight:bold; padding:3vw; margin-top:1vw;">
            <h2>Discovery Expedition</h2>
            <h3>Copyright © F&F Corp. All Rights Reserved.</h3>        
        </div>
    `,
});

// 뷰인스턴스 생성하기 : 하단 컴포넌트
makeVue(".tit2");