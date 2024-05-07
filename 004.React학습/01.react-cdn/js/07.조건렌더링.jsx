// 07.리액트 : 조건 렌더링  + 리스트 렌더링

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 출력대상: .root
const root = mFn.qsa(".root");
console.log(root);

/**************************************** 
    1. if문을 사용하여 조건부 렌더링하기
    - 리액트에서는 조건부로 구성요소를
    렌더링 할 수 있다!
****************************************/

// 1번 컴포넌트 /////////////////////
function MakeDeveloper() {
  return <h1>나는 개발자야!</h1>;
} /////// MakeDeveloper 컴포넌트 ///////////

// 2번 컴포넌트 /////////////////////
function LostDeveloper() {
  return <h1>개발자가 뭐지?</h1>;
} /////// LostDeveloper 컴포넌트 ///////////

// 3번 컴포넌트 /////////////////////
function MakeImage({ isrc, ialt, itit }) {
  return <img src={isrc} alt={ialt} title={itit} />;
} ////////// MakeImage 컴포넌트 ////////////

// 메인 출력 컴포넌트 ////////////////////
// 컴포넌트 내부에서 호출하는 다른 컴포넌트를
// 보통 서브컴포넌트라고 부른다~!
function Developer({ isNormal, isrc, ialt, itit }) {
  // isNormal은 개발자가 아니면 true
  if (isNormal) {
    return (
      <React.Fragment>
        <LostDeveloper />
        <MakeImage isrc={isrc} ialt={ialt} itit={itit} />
      </React.Fragment>
    ); ///////// return ///////////
  } /////////// if ////////////

  // 위의 if문 return에 걸리면
  // 아랫쪽 return에는 내려오지 않는다!

  // 리턴 코드 만들기 ///////////
  return (
    <React.Fragment>
      <MakeDeveloper />
      <MakeImage isrc={isrc} ialt={ialt} itit={itit} />
    </React.Fragment>
  ); ///////// return ///////////
} //////////// Developer 컴포넌트 //////////////

// 이미지경로 배열
const devImg = [
  "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/HYAONH6EGJBKIU5CJWWF343MKE.jpg",
  "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/24/BoiledMovie/20220824133926904mopw.png",
];

// 컴포넌트 호출하기 1 : 개발자 찍기
// 먼저 가상돔에 컴포넌트 리턴코드를 넣어준다!
ReactDOM.render(
  <Developer
    isNormal={false}
    isrc={devImg[0]}
    ialt="개발자 공유"
    itit="프론트엔드 개발자 공유입니다!"
  />,
  root[0]
);
// ReactDOM.render(어쩌구,저쩌구);
// 어쩌구를 저쩌구에 출력해라!

// 컴포넌트 호출하기 2 : 일반인 찍기
// 먼저 가상돔에 컴포넌트 리턴코드를 넣어준다!
ReactDOM.render(
  <Developer
    isNormal={true}
    isrc={devImg[1]}
    ialt="일반인 동석"
    itit="개발자가 뭡니까?"
  />,
  root[1]
);
// ReactDOM.render(어쩌구,저쩌구);
// 어쩌구를 저쩌구에 출력해라!

/**************************************************** 
    2. if문이 아닌 조건 표현하기
    -> 조건식 && JSX표현식
    조건이 true일때만 && 뒤의 JSX표현식이 출력됨!
    -> 조건식은 true / false 의 결과가 나오는 식이며
    AND 조건, OR 조건, NOT조건식이 모두 사용가능함!
    예) (A == "사자" && (B > 10 || C == "별" || !D)) 
****************************************************/

// 개발자의 취향을 알아보자!

// 2-1. 제목을 찍기 위한 타이틀 컴포넌트
function SetTitle({ title }) {
  return <h1>👩‍🔧개발자👨‍🔧가 좋아하는 {title}</h1>;
} ///////// SetTitle 컴포넌트 /////////////

// 음식리스트
const foods = ["스파게티", "짜파게티", "냉면", "짜장면", "마라탕"];

// 2-2. 반복리스트를 위한 컴포넌트 ///////////
function FoodList({ foodName }) {
  return <li>개발자는 {foodName} 좋아해!</li>;
} /////////// FoodList 컴포넌트 ///////////////

// 2-3. 개발자 선호 음식 리스트 출력 컴포넌트 //////
function WishList({ wList }) {
  // wList - 좋아하는 음식리스트(배열)

  // 리턴 코드 구역 //////////////
  return (
    <React.Fragment>
      {/* 음식 리스트 타이틀 */}
      <SetTitle title="음식" />
      {wList.length > 0 && (
        <div>
          <h2>
            개발자가 좋아하는 음식은 모두
            {wList.length}가지 입니다!
          </h2>
          <ul>
            {
              wList.map((v) => (
                <FoodList foodName={v} />
              ))
              // 배열변수.map() 메서드사용!
              // map메서드는 원래 새로운배열을
              // 현재 자리에 출력하는 용도임
              // 그러나 리액트는 이것을 변경하여
              // 표현식안에서 출력시
              // 태그JSX 형식으로 변환해 줌!
              // JS 처럼 map().join('')처리
              // 불필요!!!
            }
          </ul>
        </div>
      )}
      {/*  배열값이 0인 경우 다른것 출력하기 */}
      {
        wList.length == 0 &&
        <h2>아직 개발자 음식 리스트가 업데이트 되지 않았습니다!</h2>
      }
    </React.Fragment>
  );
} ////////// WishList 컴포넌트 ///////////////

// 컴포넌트 출력하기 : 배열값 있는 경우 /////
ReactDOM.render(<WishList wList={foods} />, root[2]);
// ReactDOM.render(어쩌구,저쩌구);

// 컴포넌트 출력하기 : 배열값 없는 경우 /////
ReactDOM.render(<WishList wList={[]} />, root[3]);
// ReactDOM.render(어쩌구,저쩌구);
