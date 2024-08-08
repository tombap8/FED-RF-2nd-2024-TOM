// 쇼핑몰 갤러리 JS - small.js

// 템플릿 html코드 객체 JS 가져오기
import hcode from "./hcode.js";

// 뷰JS 인스턴스 생성용 함수!
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역컴포넌트 만들기
Vue.component('tit-comp',{
    // 1-1. 템플릿 셋팅
    template: hcode.tit,
}); ///// 전역 컴포넌트 1 /////////

// 뷰인스턴스 생성하기
makeVue('.tit');

// 이미지번호 숫자증감 변수
let inum = 0;

// 세일가격 계산을 위한 임시변수
let temp;

// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
// ->>> 자식컴포넌트!!!
Vue.component("list-comp", {
  // 2-1. template 옵션 : 태그구성
  // src속성을 셋팅된 변수를 적용하기위해
  // 속성앞에 v-bind:을 붙여서 v-bind:src
  // 로쓰면 값으로 문자형을 써도 그 안의
  // 값은 변수가 된다!!!(중요!!!)
  template: hcode.list,
// 2-2. props 옵션 : 
// -> 부모 인스턴스요소에서 v-bind:속성명=값 으로
// 전달한 속성변수를 받는 옵션
// 사용법 ->>> props: []/{} 로 받음
// [] 배열로 받으면 변수만 쓰고
// {} 객체로 받으면 변수를 속성에, 값은 데이터형을 씀
props:['data-num','my-seq','end-let'],
// props:{'data-num':Number}, -> 데이터형 일치
// props:{'data-num':String}, -> 데이터형 불일치로 에러발생

// props로 셋팅한 부모전달 속성을 this키워드와 함께
// 변수형으로 사용하는 방법은??? 캐믈케이스로 변환사용!
// 'data-num' -> this.dataNum 


  // 2-3. data 옵션 : 컴포넌트 내부 변수셋팅
  // 실행원리: 컴포넌트가 빌드할때
  // data속성의 함수를 호출한다!
  // 그래서 리턴되는 객체값이 컴포넌트내부에
  // 전달된다!!!
  data () {
    // 템플릿에서 사용할 변수는 반드시 리턴함!
    // 속성:값으로 구성된 객체를 리턴한다!
    return {
      // 1.이미지 src
      gsrc: `images/${this.dataNum}.jpg`,
      // 2.상품명 : data-num 값이 짝수/홀수에 따라 아이콘변경
      gname: 'DE-'+this.setName()+this.endLet
      +(this.dataNum%2?"😘":"👍"),
      // 3.상품가격
      gprice: this.setPrice(),
      // 4.세일가격 : 상품원래가격의 30%세일(원가격*0.7) 
      // -> 외부의 전역변수temp에 원가격있음!
      salePrice: (temp*0.7).toFixed(0),
      // 숫자.toFixed(자릿수) -> 소수점 아래 자리
    };
  },
  // 2-4. methods 속성 : 컴포넌트 내부 메서드 셋팅
  methods: {
    // 자식 메서드에서 부모메서드를 호출한다!
    goPapa(txt){
      // this.$emit(부모이벤트명,전달값)
      // 부모가 만든이벤트명은 여기서 hull
      this.$emit('hull',txt);
      // 과정: 자식이벤트인 'click'이벤트가
      // 부모 컴포넌트에 셋팅된 'hull'이벤트로
      // 전달되어 거기연결된 함수가 실행된다!
    },
    goMama(pm){ // pm - 전달변수
      // this.$emit(부모이벤트명,전달값)
      // 부모가 만든이벤트명은 여기서 hull
      this.$emit('got-kimchi',pm);
      // 과정: 자식이벤트인 'click'이벤트가
      // 부모 컴포넌트에 셋팅된 'hull'이벤트로
      // 전달되어 거기연결된 함수가 실행된다!
    },
    // 이미지번호 만들기 함수
    // inum을 1씩증가하여 리턴함
    setNum() {
      inum += 1;
      // console.log("num:", inum);
      return inum;
    },
    // 상품명 만들기 함수
    setName() {
      // 0~3 사이난수
      let rdm = Math.floor(Math.random() * 4);
      // 이름리턴
      return goods[rdm];
    },
    // 가격만들기 함수 : 숫자만 만들어서 리턴
    setPrice() {
      let rdm = Math.ceil(Math.random() * 17) + 3;
      let retVal = 20000 * rdm;
      // 세일가격 계산을 위한 임시변수에 할당후 리턴
      temp = retVal;
      return retVal;
    },
    // 세일여부 리턴 메서드
    retSale(){
      return(
        this.dataNum == 3 ||
        this.dataNum == 5 ||
        this.dataNum == 14 ||
        this.dataNum == 22 ||
        this.dataNum == 26 ||
        this.dataNum == 38 ||
        this.dataNum == 45 ||
        this.dataNum == 50
      );
    },
    // 세자리콤마 함수
    addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
}); ////////// 전역컴포넌트2 /////////////


// 리스트뷰 인스턴스 생성하기
// makeVue(".grid");
// [ 부모컴포넌트에서 메서드 설정으로 해야
// 자식컴포넌트가 호출할 수 있는 메서드를 만들어짐! ]
// ->>> 부모컴포넌트 !!!
new Vue({
  el:'.grid',
  // 부모 뷰 인스턴스 메서드구역
  methods:{
    // 자식 이벤트 전달후 실행메서드!
    goMsg(txt){
      alert('자식이 부모에게 이벤트 전달 성공!!!'+txt);
    },
    // 자식 컴포넌트의 오버이벤트가 전달되어 
    // 호출하는 함수
    overMsg(pm){ // pm - 전달변수
      alert('오 마이 갓김치!'+pm.이름+' 나이는 '+pm.나이);
    },
  },
});


/////////// 상품상세정보 컴포넌트 ////////////
Vue.component('win-comp',{
  template: hcode.detail,
}); ////////// win-comp 컴포넌트 ///////////

///// win-comp 부모 컴포넌트 뷰인스턴스 생성하기 /////
new Vue({
  // 대상선정
  el: ".pbg",
  // DOM이 모두 로딩후 실행구역(리액트의 useLayoutEffect와 유사함)
  mounted(){
    // 제이쿼리 코드를 사용가능!

    // 원래가격변수 : 각 리스트 아이템 클릭순간 셋팅
    let orgPrice;

    // 현재리스트 순번 : 양쪽 이동버튼에서 사용
    let cIdx;


    // 1. 갤러리 리스트 클릭시 큰 이미지박스 보이기
    $(".grid>div").on('click',function(){
      // console.log('대상:',this);

      // 현재리스트 순번 셋팅하기
      cIdx = $(this).index();
      console.log('클릭된리스트순번:',cIdx);

      // 클릭된 이미지 경로 읽어오기
      let isrc = $(this).find('img').attr('src');
      console.log('이미지경로:',isrc);

      // 상세정보창 큰 이미지 변경하기
      $('.gimg img').attr('src',isrc);

      // 상품명 읽어오기
      let cName = $('aside h2',this).html();
      // 상품명 넣기
      $('#gtit').html(cName);

      // 가격 읽어오기
      let cprice = $('aside h3',this).html();
      // 가격 넣기
      $('#gprice').html(cprice);
      
      // 최초 가격 총합계 넣기
      let tprice = 
      $('aside h3 span:last-child',this).html();
      $('#total').html(tprice);
      
    
      // 원래가격 셋팅하기: '원',',' 모두 없앰!
      orgPrice = Number(tprice.replace('원','').replace(/,/g,''));
      console.log('원래가격:',orgPrice);
      // 문자열.replace(바꿀놈, 바뀔놈)


      // 상품상세정보창 보이기
      $('#bgbx').show();

      // 개수 초기화
      sum.val('1');

    }); ////////// click ///////////

    // 개수대상
    const sum = $("#sum");

    // 증감버튼 셋팅 ////
    $('.chg_num img').click(function(){
        // 클릭된 증감 이미지 순번
        let idx = $(this).index();
        console.log('순번:',idx);
        

        // 현재 개수
        let num = Number(sum.val());

        // 반영될 변경수
        let setNum;

        // 증감분기
        if(idx===0){ // 증가
          setNum = ++num;          
          if(setNum>50){ setNum=50;num=50;}
        }
        else{
          setNum = --num;
          if(setNum<1){ setNum=1;num=1;}
        } /// else ///

        // 최종반영하기        
        sum.val(setNum);
        $('#total').html(
          addCommas(orgPrice*setNum)+"원");
    })

    // 닫기버튼 셋팅
    $('.cbtn').click((e)=>{
      e.preventDefault();
      $('#bgbx').hide()});

      // 세자리콤마 함수
    const addCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 이전/다음 버튼 셋팅하기
    // 대상: .abtn
    $('.abtn').click(function(e){
      e.preventDefault();

      // 오른쪽 버튼이면 true
      let isR = $(this).is('.rb');
      
      // 방향분기 ////
      if(isR){ // 오른쪽
        // 다음순번
        ++cIdx;
        if(cIdx>49) cIdx=0;
      }
      else{ // 왼쪽
        --cIdx;
        if(cIdx<0) cIdx=49;
      }

      // 정보 타겟요소(리스트 순번으로 가져옴)
      const target = $('.grid>div').eq(cIdx);
      console.log('cIdx:',cIdx,'/타겟:',target);

      // 처음 리스트 클릭하여 열때 셋팅한 것들을
      // 모두 다시 셋팅한다! 단, 주인공이 target!!!

      // 타겟 이미지 경로 읽어오기
      let isrc = target.find('img').attr('src');
      console.log('이미지경로:',isrc);

      // 상세정보창 큰 이미지 변경하기
      $('.gimg img').attr('src',isrc);

      // 상품명 읽어오기
      let cName = $('aside h2',target).html();
      // 상품명 넣기
      $('#gtit').html(cName);

      // 가격 읽어오기
      let cprice = $('aside h3',target).html();
      // 가격 넣기
      $('#gprice').html(cprice);
      
      // 최초 가격 총합계 넣기
      let tprice = 
      $('aside h3 span:last-child',target).html();
      $('#total').html(tprice);
      
    
      // 원래가격 셋팅하기: '원',',' 모두 없앰!
      orgPrice = Number(tprice.replace('원','').replace(/,/g,''));
      console.log('원래가격:',orgPrice);
      // 문자열.replace(바꿀놈, 바뀔놈)

      // 개수 초기화
      sum.val('1');

    }); /////////// click //////////////



  }, ///// mounted ///////////
}); //////// win-comp 인스턴스 생성 ///////////

