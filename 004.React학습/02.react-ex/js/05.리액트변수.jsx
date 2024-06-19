// 05.리액트변수 : useRef

// 메인 컴포넌트
function MainComp() {
  console.log("컴포넌트 랜더링");
  // 이름 상태관리 변수
  const [stsName, setStsName] = React.useState("공유");
  let varName = "김수현";

  const refName = React.useRef("송새벽");

  React.useEffect(() => {
    let ele = document.querySelectorAll(".name");
    ele[1].innerText = varName;
    ele[2].innerText = refName.current;
  });

  // 이름바꾸기 함수
  const changeName = React.useCallback(
    (e) => {
      let txt = e.target.innerText;
      let val = e.target.previousElementSibling.value;
      switch (txt) {
        case "이름바꿔 : useState":
          console.log("변경전:", stsName);
          setStsName(val);
          console.log("변경후:", stsName);
          break;
        case "이름바꿔 : let":
          console.log("변경전:", varName);
          varName = val;
          console.log("변경후:", varName);

          break;
        case "이름바꿔 : useRef":
          console.log("변경전:", refName.current);
          refName.current = val;
          console.log("변경후:", refName.current);

          break;
      }
    },
    [stsName]
  );

  // 코드리턴 /////////////////
  return (
    <React.Fragment>
      <h1>[ 🚩useRef 변수사용하기🚩 ]</h1>
      <div className="wrap">
        <div>
          <h1>
            1. useState 출력
            <br />
            나는 <span className="name">{stsName}</span> 좋아해!
          </h1>
          <h1>
            2. let 출력
            <br />
            나는 <span className="name">{varName}</span> 좋아해!
          </h1>
          <h1>
            3. useRef 출력
            <br />
            나는 <span className="name">{refName.current}</span> 좋아해!
          </h1>
        </div>
        <div>
          <h2>1. useState 이름변경</h2>
          <input type="text" className="ip-name1" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : useState</button> <br />
          <h2>2. let 이름변경</h2>
          <input type="text" className="ip-name2" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : let</button> <br />
          <h2>3. useRef 이름변경</h2>
          <input type="text" className="ip-name3" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : useRef</button>
        </div>
      </div>
    </React.Fragment>
  );
} ///////////// MainComp 컴포넌트 ////////////

// 컴포넌트 출력하기 ///////
ReactDOM.render(<MainComp />, document.querySelector("#root"));
