// 06.Event : 리액트 이벤트

// 나의 함수 불러오기
import mFn from "./my_function";

/************************************************************* 
    [ 리액트 이벤트 ]

    1. 일반 HTML DOM 이벤트와 마찬가지로 사용자이벤트 사용가능함
    2. 이벤트 종류: click, change, mouseover 등 일반이벤트
    3. 이벤트 표기법: 캐믈케이스 - 첫글자소문자 단어마다 대문자
      예) onclick -> onClick
    4. 이벤트 핸들러 : 중괄호 안에 작성(중괄호는 JSX표현식영역)
      예) onclick="getIt()" => onClick={getIt}

    5. 리액트에 속성형태로 등록하는 이벤트는 html요소에 등록된
    이벤트 속성과 달리 JS 이벤트 리스너를 통한 이벤트 객체에
    등록되므로 html 태그상 이벤트 등록속성이 보이지 않는다!

    [ 컴포넌트 호출시 중요한 특징하나!!! ]
    ->>> 설정된 전달변수와 셋팅속성은 전달된 속성값만 셋팅된다!
    쉽게말해 보내주지 않은 속성은 스킵(skip!!!)된다는 말!

*************************************************************/

/////// 전체 이벤트 적용할 컴포넌트 구성하기 //////////////////
function EventShow() {
  /// 컴포넌트 리턴 코드 위에서 이벤트처리를 위한
  // 함수를 만들어서 사용할 수 있다!!!
  // 지역함수로 사용되는 것임!

  // 오버시 이벤트 한번만 실행되게 상태변수만들기
  let onceSts = false;

  // 1. 컴포넌트 내부함수 //////////

  // (1) 소원이 무엇이냐 물어보는 함수 ///////////
  const showAladin = () => {
    // 1. 한번만 실행 분기문
    if (onceSts) return;
    onceSts = true; // 한번만 실행

    console.log("알라딘이 누구야?");

    // 2. 알라딘 이미지 출력하기
    // (1) html 출력대상 : #ala
    let alaBox = mFn.qs("#ala");

    // (2) 이미지출력
    ReactDOM.render(<MakeImg isrc="./images/ala4.jpg" ialt="알라딘" />, alaBox);
    // 컴포넌트 호출시 전달변수를 셋팅하여 보내야하는데
    // 만약 전달변수이름이 잘못되었거나 보내주지 않으면
    // 컴포넌트에서 에러가 나지 않고 해당 항목을
    // 제외하여 표시하지 않는 특징 있음!
    // 여기서 icss가 있으나 안보내주니 표시되지 않는다!

    // 3. 말풍선 박스에 글자넣기 ///
    let titBox = mFn.qs(".tit");
    titBox.innerText = "소원이 무엇이냐?";

    // 4. 말풍선 박스에 인라인 CSS코드 넣기
    titBox.style.cssText = `
            width: 50%;
            padding: 50px 0;
            margin: 0 auto;
            border: 2px solid lime;
            opacity: 0;
        `;

    // 5. 0.5초후 CSS변경으로 타이틀 등장하기
    setTimeout(() => {
      let tg = titBox.style;
      tg.transition = "2s ease-in-out 1s";
      tg.opacity = 1;
      tg.borderRadius = "50%";
      tg.translate = "0 -200px";
      tg.fontSize = "40px";
      tg.color = "white";
      tg.backgroundColor = "rgba(0,0,0,.5)";
    }, 500);

    // 6. 램프가져오기 버튼 3초후 보이기
    setTimeout(() => {
      mFn.qsa("button")[0].style.display = "inline-block";
    }, 3000);
  }; ////////// showAladin 함수 ///////////

  // (2) 램프가져오기 함수 ////////////
  const getLamp = () => {
    console.log("램프 가져와~!!!");

    // 1. 램프선택하기 : .lamp
    let lampBox = mFn.qs(".lamp");

    // 램프 이미지 CSS 객체셋팅
    let lampCSS = {
      position: "absolute",
      top: "0",
      right: "0",
      width: "200px",
      borderRadius: "50%",
      zIndex: "999",
      transition: "2s, right 1s 2s",
    };

    // 2. 램프 이미지 넣기
    ReactDOM.render(
      <MakeImg
        isrc="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3168457870/B.png"
        ialt="알라딘램프"
        icss={lampCSS}
      />,
      lampBox
    );

    // 3. 0.5초후 램프 이미지 중앙이동하기
    setTimeout(() => {
      let lampImg = mFn.qsEl(lampBox, "img").style;
      // 수직방향이동
      lampImg.top = "310px";
      // 수평방향 중앙계산 이동
      lampImg.right = "calc(50% - 100px)";
      // 회전하기
      lampImg.rotate = "720deg";
    }, 500);

    // 4. 소원빌기 버튼 3초후 보이기
    setTimeout(() => {
      mFn.qsa("button")[1].style.display = "inline-block";
    }, 3000);
  }; ////////// getLamp 함수 ///////////

  // (3) 페라리 가져오기 함수 /////////////
  const getFerrari = () => {
    console.log("페라리 줄께~!");
    // 페라리 이미지 넣기
    // 대상: #ferrari
    ReactDOM.render(
      <MakeImg
        isrc="./images/ferrari.png"
        ialt="페라리레드"
        itit="클릭하면 시운전해요!"
        idName="fcar"
        // 함수에 값을 보낼때는 익명함수로 처리!
        clickFn={() => moveCar("#fcar")}
      />,
      mFn.qs("#ferrari")
    );
    // ReactDOM.render(어쩌구,저쩌구);
    // 어쩌구를 저쩌구에 넣기
  }; //////////// getFerrari 함수 //////////

  /// 2. 리턴 코드 만들기 ////////////
  return (
    <React.Fragment>
      <div id="tbox" style={{ textAlign: "center" }}>
        {/* 스타일 인라인 적용시 바깥중괄호는 표현식
                내부 중괄호는 객체형식의 스타일 설정임! */}
        <MakeImg
          isrc="./images/genie.avif"
          ialt="지니"
          /* 마우스오버시 showAladin함수호출 */
          overFn={showAladin}
        />
        {/* 램프가 들어갈 요소 */}
        <div className="lamp"></div>
        {/* 버튼들 */}
        <button onClick={getLamp}>램프가져오기~!</button> <br />
        <button onClick={getFerrari}>소원빌기~! 페라리주세요~!!!</button>
        {/* 소원이 무엇이냐 말풍선박스 */}
        <div className="tit"></div>
      </div>
    </React.Fragment>
  );
} /////////// EventShow 컴포넌트 /////////////////

/******************************************* 
    이미지 생성 컴포넌트 : MakeImg
*******************************************/
function MakeImg({ isrc, ialt, icss, overFn, clickFn, itit, idName }) {
  // ((리턴코드 작성시 주의사항))
  // return키워드 바로 뒤에 JSX태그를 바로 이어쓰거나
  // 소괄호 시작부분을 같은 라인에 써야 에러가 나지 않는다!
  return (
    <img
      src={isrc}
      alt={ialt}
      style={icss}
      title={itit}
      id={idName}
      onMouseOver={overFn}
      onClick={clickFn}
    />
  );
} ///////////// MakeImg 컴포넌트 ////////////////

// 화면출력하기 ////////////
// ReactDOM.render(넣을코드,대상)
ReactDOM.render(<EventShow />, mFn.qs("#root"));

//// 일반함수로 페라리 움직이기 구현 ////////////
function moveCar(eleName) {
  // eleName - 요소명
  console.log("페라리 움직여!", eleName);

  // 1. 대상요소 셋팅하기
  const tg = mFn.qs(eleName).style;
  console.log(tg.translate, tg.scale);

  // 2. 번갈아서 왔다갔다 움직이기
  tg.translate = tg.translate == "150%" ? "0" : "150%";
  tg.scale = tg.scale == "2" ? "1" : "2";

  tg.transition = "2s ease-in-out";
} ////////////// moveCar 함수 ///////////////
