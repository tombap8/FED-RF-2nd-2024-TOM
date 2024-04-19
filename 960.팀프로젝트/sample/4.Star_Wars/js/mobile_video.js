// 스타워즈 비디오 미디어 쿼리 페이지 JS - mobile_video.js\

/*********************************** 
    함수명: playMv
    기능: 영화예고편 화면에 띄우기
***********************************/
const playMv = function (mvcode) {
    // mvcode 예고편아이디

    // 예고편 동영상용 박스
    const mvbx = document.querySelector("#mvbx");
    // console.log(mvbx);

    // 1. 함수호출확인
    console.log("플레이어!", mvcode);

    // 2. 영화박스에 아이프레임 넣기
    // 대상: #mvbx -> mvbx
    mvbx.innerHTML = `
        <div id="mv">
            <!-- 유튜브 아이프레임 -->
            <iframe 
            src="https://secure.disney.com/embed/${mvcode}?domain=www.starwars.com"></iframe>
            <!-- 닫기버튼 --> 
            <button class="cbtn" title="닫기">×</button>
        </div>
    `;

    // 삽입된 동영상박스 (#mv) CSS설정하기
    const mv = mvbx.querySelector("#mv");
    let msy = mv.style;

    msy.position = "fixed";
    msy.top = "50%";
    msy.left = "50%";
    msy.transform = "translate(-50%,-50%)";
    msy.width = "80%";
    msy.aspectRatio = "2/1.2";
    msy.backgroundColor = "#000";
    msy.zIndex = "99999";

    // 삽입된 동영상박스 (#mv) CSS설정하기
    const mifr = mv.querySelector("iframe");
    let mifrsy = mifr.style;

    mifrsy.border = "none";
    mifrsy.width = "100%";
    mifrsy.height = "100%";

    // 닫기버튼 CSS 셋팅하기
    const cbtn = document.querySelector(".cbtn");
    let csy = cbtn.style;

    csy.position = "absolute";
    csy.top = "-50px";
    csy.right = "-15px";
    csy.width = "50px";
    csy.height = "50px";
    csy.border = "none";
    csy.color = "#fff";
    csy.backgroundColor = "transparent";
    csy.fontSize = "40px";
    csy.fontWeight = "lighter";
    csy.cursor = "pointer";
    csy.lineHeight = "50px";

    // body 가상요소로 배경반투명 암전보이기/숨기기
    const bdcont = document.body;
    bdcont.classList.add("on");

    // 닫기버튼 클릭시 #mv 제거하기
    cbtn.onclick = function () {
        mv.remove();
        bdcont.classList.remove("on");
    };
    // remove() 메서드 -> DOM에서 요소를 삭제함
}; /////////////// playMv 함수 ////////

//// 로드구역 //////////////
window.addEventListener("DOMContentLoaded", () => {
    
    const vlist = document.querySelectorAll(".vlist ul > li");


    // 모바일 상태함수
    let mob = 0;
    if (window.innerWidth <= 692) mob = 1;
    console.log("모바일:", mob);
    // 모바일 플레이어 셋팅함수 호출
    setPlayer();
    

    // 리사이즈 함수
    window.addEventListener("resize", () => {
        window.location.reload();

    }); ///////////// resize /////////////

    // 모바일용 플레이어 셋팅함수 ////////
    function setPlayer() {
        console.log("확인");
        if (mob) {
            // 모바일일때 셋팅
            vlist.forEach((ele) => {
                ele.addEventListener("click", ()=>mobPlayer(ele));
            }); ///////// forEach //////////
        } /////////// if ///////////////
        else {
            // 아니면 지우기
            vlist.forEach((ele) => {
                ele.removeEventListener("click", ()=>mobPlayer(ele));
            }); ///////// forEach //////////
        } ///////////// else //////////////
    } ///////// setPlayer 함수 //////////////

    // 모바일용 플레이어호출 함수!
    function mobPlayer(ele) {
        playMv(ele.getAttribute("data-vcd"));
        // console.log(ele.getAttribute("data-vcd"));
    } ////////// mobPlayer /////////
}); ///////////// load ////////////////////////
