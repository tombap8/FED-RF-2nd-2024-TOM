// 05.리액트변수 : useRef

// 메인 컴포넌트
function MainComp() {
    // 이름 상태관리 변수
    const [stsName, setStsName] = React.useState("공유");
    let varName = "김수현";

    const refName = React.useRef("송새벽");

    // 이름바꾸기 함수
    const changeName = () => {
      setStsName(refName.current);
    };
  
    
  // 코드리턴 /////////////////
    return (
      <div>
        <h1>1.나는 <span className="name"></span> 좋아해!</h1>
        <h1>2.나는 <span className="name"></span> 좋아해!</h1>
        <h1>3.나는 <span className="name"></span> 좋아해!</h1>
        <input type="text" className="ip-name1" />
        <button>이름바꿔1</button>
        <input type="text" className="ip-name2" />
        <button>이름바꿔2</button>
        <input type="text" className="ip-name3" />
        <button>이름바꿔3</button>
      </div>
    );
  } ///////////// MainComp 컴포넌트 ////////////

  // 컴포넌트 출력하기 ///////
  ReactDOM.render(<MainComp />, document.querySelector("#root"));
  