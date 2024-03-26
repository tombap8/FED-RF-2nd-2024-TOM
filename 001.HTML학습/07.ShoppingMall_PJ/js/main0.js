// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// DOM 선택함수
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);

// addEvent 함수
// ele - 요소, evt - 이벤트, fn - 함수
const addEvt = 
(ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window,"DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            계속 클릭시 해당 순번만큼 곱하여
            -400%까지 이동하게 한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 -100%를 기준하여
            앞쪽 위치로 이동하게 한다!

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
    console.log("로딩완료!");
    

    // [대상선정]
    // 이동버튼 대상:  .abtn
    const abtn = qsa('.abtn');
    // 변경대상 : #slide
    const slide = qs('#slide');
    // 블릿대상:
    const indic = 
    document.querySelectorAll('.indic li');
    // console.log(abtn,slide,indic);

    // 왼쪽 버튼 처음에 숨기기
    abtn[0].style.display = 'none';

    // 슬라이드 순번 전역변수
    let snum = 0;

    // 2. 버튼을 모두 이벤트 설정하기
    for(let x of abtn){
        x.onclick = goSlide;
    } /// for of ///

    // 2. 오른쪽 버튼 클릭시 기능구현
    // abtn[1].onclick = ()=>{
    // };

    // 3. 왼쪽 버튼 클릭시 기능구현
    // abtn[0].onclick = ()=>{
    // };
    
    /****************************************** 
     함수명: goSlide
     기능: 슬라이드 이동
     ******************************************/
    function goSlide(){
        // 1.오른쪽 버튼인 .ab2인가?
        let isRbtn = 
        this.classList.contains('ab2');
        // [classList 객체의 contains() 메서드]
        // -> 해당요소의 특정 클래스인지 여부를 리턴함
        // 해당클래스가 있으면 true, 없으면 false


        // 함수호출확인
        console.log('나 슬라이드야~!',this,isRbtn);
        // this는 호출한 버튼 자신
        
        // 2. 오른쪽버튼이면 ++, 아니면 --
        // 슬라이드 순번 증감
        isRbtn? snum++ : snum--;

        // 3. 한계값 설정하기
        // 한계값일때 각 버튼 숨기기
        // 3-1. 오른쪽 버튼일 경우 0보다 작으면 숨기기
        // snum은 0으로 고정!
        if(snum<0){
            snum = 0;
        } /// if ///
        // snum은 4로 고정!
        else if(snum>4){
            snum = 4;
        } /// else if ///
        
        // 4. 마지막 구역에서 버튼 숨기기
        if(snum === 0 || snum === 4){
            // 해당버튼 숨기기
            this.style.display = 'none';            
        } /// if ///
        else{
            // 버튼 다시 보이기
            for(let x of abtn){
                x.style.display = 'block'; 
            } /// for of ///

        } /// else ///
        

       console.log('이동%:',(-100*snum)+'%');
    
       slide.style.left = (-100*snum)+'%';
       slide.style.transition = '.6s ease-in-out';

       // 5. 블릿표시 구현하기
       // 모든 클래스 on지우기+현재 순번 클래스 넣기
       indic.forEach((ele,idx)=>{
        // ele - 각각의 li, idx - 각각의 순번
        if(idx===snum){ // 현재순번 on넣기
            ele.classList.add('on');
        } /// if ///
        else{ // 나머지는 on빼기
            ele.classList.remove('on');
        } /// else ///

       }); ///// forEach /////

   } ///////////// goSlide 함수 ////////////////
   /////////////////////////////////////////////

    
} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
