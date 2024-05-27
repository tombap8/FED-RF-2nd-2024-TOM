// 산너머산 메인 컴포넌트

/********************************************** 
    1. props로 데이터를 전달하여 제목출력하기 
    -> props Down으로 데이터를 하위 컴포넌트에 전달
**********************************************/

// 스타일 객체
const cssObj = {
    padding: '20px',
    borderRadius:'10px',
    width:'60%',
    margin:'20px auto',
    textAlign:'center',
    fontSize:'40px',
    color:'#fff',
    backgroundImage:'linear-gradient(to bottom,skyblue,navy)'
};

// 메인 컴포넌트 ////////////
function MyHome(){
    return <MyRoom aa="세계의 산" bb="🌄" cdata={cssObj} />;
} /////// MyHome 컴포넌트 ///////////////

function MyRoom({aa,bb,cdata}){
    return <MyBag cc={aa} dd={bb} cdata={cdata} />;
} /////// MyRoom 컴포넌트 ///////////////

function MyBag({cc,dd,cdata}){
    return <MyEnd ee={cc} ff={dd} cdata={cdata} />;
} /////// MyBag 컴포넌트 ///////////////

function MyEnd({ee,ff,cdata}){
    return <div
    style={cdata}
    >🌞{ee + ff}</div>;
} /////// MyEnd 컴포넌트 ///////////////

// 화면출력 ///////////
ReactDOM.render(<MyHome />,
document.querySelector("#root1"));

