// 04.리액트 컴포넌트 JSX
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
const target = document.querySelectorAll(".root");

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
function MakeImage(props) {
  return <img src={"./images/" + props.isrc} alt={props.ialt} />;
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
    전달 받을 수 있다!
*************************************************/
