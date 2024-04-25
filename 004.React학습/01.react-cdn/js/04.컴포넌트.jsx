// 04.리액트 컴포넌트 JSX

// 내함수 불러오기
import mFn from "./my_function";
// console.log(mFn);

// 외부 컴포넌트 불러오기
import Avengers from "./avengers";
// 리액트에서는 from뒤 파일명에 "js/jsx"를 생략해도 됨!


/************************************************* 
    [ 리액트 컴포넌트 ]
    - 컴포넌트는 HTML요소를 반환하는 함수다!

    [ 특징 ]
    1. 컴포넌트는 독립적이고 재사용이 가능한 코드집합
    2. JS함수와 비슷하지만
        HTML코드 반환이 필수라는 점이 다름!
    3. 컴포넌트는 다음 2가지로 생성가능함
        1) 클래스형 컴포넌트
        2) 함수형 컴포넌트
        (-> 우리는 함수형 컴포넌트에 집중할 예정!)

    -> 클래스형 컴포넌트는 리액트 초중기에 주로
    사용되었으나... React 16.8버전에서 Hooks와
    함께는 더 이상 사용되지 않는다!
    Hooks는 함수형 컴포넌트에서만 사용가능하다!

    ____________________________________________

    [ 첫번째 컴포넌트 만들기! ]
    - 리액트 컴포넌트 이름은 반드시 첫글자가 대문자로 만든다!
    (안지키면 적용안됨!!!)

    [ 클래스 컴포넌트 ]
    클래스 컴포넌트에서는 
    extends React.Component 상속문이 포함돼야함!

    -> 컴포넌트에서도 메서드가 필요함
    render() 메서드는 HTML을 반환함
    (함수형 컴포넌트의 return 키워드를 
        사용할 수 있는 역할을 함!)

*************************************************/

/// [ 클래스형 컴포넌트 만들기 ] ///
// extends 는 부모클래스 상속 키워드!
// React.Component 컴포넌트 기능구현 부모 클래스
class GoghWork extends React.Component {
  // 클래스형 컴포넌트에서는 render() 메서드로
  // HTML코드를 리턴한다! 내부에 return구문 필요!
  render() {
    // html 코드리턴
    return (
      <React.Fragment>
        <h2>안녕! 나는 고흐그림이야!</h2>
        <MakeImage isrc="01.png" ialt="고흐그림" />
        {/* <img src="./images/01.png" alt="고흐그림" /> */}
      </React.Fragment>
    );
  }
} ///////// GoghWork 클래스형 컴포넌트 //////

// 전체 출력요소 선택하기
const target = mFn.qsa(".root");

// 첫번째 .root에 고흐출력하기
ReactDOM.render(<GoghWork />, target[0]);

// [ 함수형 컴포넌트 만들기 ] ////
// 첫글자는 대문자!
function IronMan() {
  return (
    <React.Fragment>
      <h2>안녕! 나는 아이언맨이야!</h2>
      <MakeImage isrc="ab1.jpg" ialt="아이언맨" />
      {/* <img src="./images/ab1.jpg" alt="아이언맨" /> */}
    </React.Fragment>
  );
} ///////// IronMan 컴포넌트 /////////////

// [ 이미지 생성 공통 컴포넌트 ] ////
// -> 비구조화할당(구조분해할당)을 사용하여
// 전달객체를 개별 변수값으로 처리할 수 있다!
// function MakeImage(헐) {
// function MakeImage({ialt, isrc}) {
function MakeImage({ ialt: ㅎㅎ, isrc: ㅋㅋ }) {
  // 하나의 변수에는 전달된 값이 보낼때 설정된
  // 객체로 전달된다! {속성:값,속성:값,...}
  // console.log(헐);
  return <img src={"./images/" + ㅋㅋ} alt={ㅎㅎ} />;
  // return <img src={"./images/" + isrc} alt={ialt} />;
  // return <img src={"./images/" + 헐.isrc} alt={헐.ialt} />;
} /////// MakeImage 컴포넌트 //////////

// 두번째 .root에 아이언맨출력하기
ReactDOM.render(<IronMan />, target[1]);

/************************************************* 
    [ Props 사용하기 ]
    props는 properties 에서 나온말
    속성들... 즉, 변수에 값을 할당하여 전달하는 방법
    함수의 전달값과 같고 속성으로 컴포넌트에 보낸다!
    -> props는 05번 다음번에 자세히 다룬다!
    -> props라는 변수명은 마음대로 지을 수 있다!
    -> 컴포넌트에 중괄호를 사용하면 개별적인 속성변수를
    전달 받을 수 있다! (구조분해할당방식!)
*************************************************/

// 내가 좋아하는 색 표시하기 컴포넌트 //////////
function FavoriteThings(조아) {
  return (
    <h2>
      내가 좋아하는 색은 {조아.color}이야! <br />
      그리고 좋아하는 음식은 {조아.food}야! <br />
      취미는 {조아.hobby}야! 알겠니???
    </h2>
  );
} ////////// FavoriteThings 컴포넌트 ///////////

// 좋아하는 색과 음식, 취미를 각각 속성명으로 생성하여
// 컴포넌트를 호출하면 개별적으로 속성을 구분할 수 있다!
// 출력: 세번째 .root
ReactDOM.render(
<FavoriteThings color="와인색" food="와인이" hobby="와인마시기" />, 
target[2]);

// 출력: 네번째 .root
ReactDOM.render(
<FavoriteThings color="푸르딩딩한색" food="김치전이" hobby="야구보기" />, 
target[3]);


/************************************************* 
    컴포넌트 내부에서 다른 컴포넌트를 호출 할 수 있다!
*************************************************/

function Who(){
  return (
    <div>
      <h1>김똑팔이가 누구야?</h1>
      {/* 다른컴포넌트 넣기 */}
      <Answer />
    </div>
  );
} ///////// Who 컴포넌트 ///////////////

// 컴포넌트 내부에서 호출할 컴포넌트 /////
function Answer(){
  return <h2>김씨가 똑하고 팔이 부러졌대!</h2>
} /////////// Answer 컴포넌트 //////////////

// 출력: 다섯번째 .root
ReactDOM.render(<Who />,target[4]);

// 출력: 여섯번째 .root
ReactDOM.render(<Avengers />,target[5]);


/*************************************************** 
    [ 컴포넌트의 파일분리 ]
    리액트는 코드를 재사용하는 것이므로
    컴포넌트를 별도의 파일로 분할 하는것 일반적이다!

    {분할방법}
    1. jsx의 새파일을 생성한다.
    2. 대문자로 시작하는 컴포넌트를 구현한다.
    3. 분할구현된 jsx파일을 import하여 호출한다.

    -> 일반적으로 js파일 상단에 import 키워드로 불러오면
    되는데 지금 사용하는 CDN방식의 바벨모듈에서는
    주의 사항이 있으니 참고 바란다!(아래참고)

***************************************************/
/************************************************* 
[ 바벨을 사용할때 모듈로 파일 호출시 주의사항! ]
  ____________________________________________

  설치형이 아닌 CDN방식의 바벨은 호출셋업의 시차로
  바로 모듈을 호출하면 에러가 발생한다!
  따라서 모듈을 사용할 파일을 아래와 같은 형식으로
  메인 html 상단에 호출해 줘야만 한다!!!

  -> 상단에 모듈화한 JS를 먼저 불러준다!

  <script src="모듈화한js" 
  data-plugins="transform-es2015-modules-umd" 
  type="text/babel"></script>

  -> 아래쪽에 모듈을 호출하는 JS를 불러준다!

  <script src="모듈을 호출하는 JS" 
  data-plugins="transform-es2015-modules-umd" 
  type="text/babel"></script>

  ->>> 위의 호출 속성 중 기본적으로
  type="text/babel" 은 당연히 해야하고

  ->>> 여기에 더하여 하나의 속성을 추가한다!
  data-plugins="transform-es2015-modules-umd"

  이 속성과 값이 바벨에서 모듈을 사용하게 하는
  es2015 즉 ES6버전에서의 모듈문법을 사용하게끔 해준다!
*************************************************/
