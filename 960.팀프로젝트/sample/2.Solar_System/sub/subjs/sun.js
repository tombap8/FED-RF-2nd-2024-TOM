// SUN 서브페이지 JS - sun.js


window.addEventListener("DOMContentLoaded", loadFn);

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

function loadFn(){

    /***************************************************
        SUN PAGE 전체 스크롤 위치이동시 액션
    ***************************************************/
   
    






    /***************************************************
        section03 - 동영상보이기/숨기기
    ***************************************************/
    // 햄버거버튼요소
    const viewBtn = document.querySelector(".sun03 .view_btn");
    const closeBtn = document.querySelector(".sun03 .close_btn");
    const html00 = document.querySelector("html");
    // console.log("버튼있니?",viewBtn);

    // 이벤트 설정하기 //////
    viewBtn.onclick = videoView;
    function videoView(){
        // 1. 호출확인
        console.log("나야나!");
        
        // 2. 대상선정 : .sou03 .sun03_video 요소
        var videoBox = document.querySelector(".sun03 .sun03_video");
        
        // 3. 변경내용 : 화면에 보이기
        videoBox.style.display = "block";
        html00.style.overflowY = "hidden";
        
        
    } /////////////////// videoView 함수 ///////////////

    // 이벤트 설정하기 //////
    closeBtn.onclick = videoClose;
    function videoClose(){
        // 1. 호출확인
        console.log("나야나!");
        
        // 2. 대상선정 : .sou03 .sun03_video 요소
        var videoBox = document.querySelector(".sun03 .sun03_video");
        
        // 3. 변경내용 : 화면에 보이기
        videoBox.style.display = "none";
        html00.style.overflowY = "inherit";
        
    } /////////////////// videoView 함수 ///////////////
   





    /***************************************************
        section04 - Explor heliophysics
        오버시 움직이는 배경
    ***************************************************/
    // 1.대상 선정
    // (1)이벤트 대상 : .sun04 li
    const exploreTable = document.querySelectorAll(".sun04 .explorelist");
    // (2)변경 대상 : .movebox
    const moveBox = document.querySelector(".sun04 .movebox");
    console.log(exploreTable, moveBox);

    // 2.이벤트 설정하기 : mouseenter 이벤트
    exploreTable.forEach((ele)=>{
        ele.onmouseenter = (e)=>{
            // 1.요소정보 알아내기
            // (1)top 위치값
            let etop = ele.offsetTop;
            // : ele(대상요소)의 정보값을 알아오면 됨
            // (2)Height값
            let eHeight = ele.offsetHeight;

            // 확인
            // console.log("top: ", etop, "\n Height: ", eHeight);


            // 2.움직이는 배경박스 변경하기
            moveBox.style.top = etop+"px";
            moveBox.style.height = eHeight+"px";
            moveBox.style.opacity = 1;


        }; //////////////////// mouseenter 끝 //////////////////////////

        // 마우스가 나갈때 투명도 0으로 사라짐
        ele.onmouseleave = e => {
            // 변경대상: .movebox = moveBox변수
            // 변경내용: opacity -> 0
            moveBox.style.opacity = 0;
        }; ////////////// mouseleave ////////////


    }); /////////////////////////////// forEach() 끝 


    






}; ////////////// loadFn 함수 끝! ///////////