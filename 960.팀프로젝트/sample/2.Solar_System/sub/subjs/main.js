window.addEventListener("DOMContentLoaded", loadFn);

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

function loadFn(){

    console.log("로딩완료!");


    // header 영역 스크롤시 배경색, 찾기버튼 색변경 변수
    const searchbx = document.querySelector(".searchbx");
    const sbx = document.querySelector(".sbx");
    const sicon = document.querySelector(".sicon");


    /****************************************************
     [ GNB메뉴 스크롤 시 색변경 ]
     ******************************************************/
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            document.querySelector('.top').classList.add("on");
            // document.querySelector('.active').classList.remove("on");
            searchbx.style=('background-color: #506a7e;');
            sicon.style=('background-color: #506a7e');
        } else {
            document.querySelector('.top').classList.remove("on");
            searchbx.style=('background-color: #575a5ecb;');
            sicon.style=('background-color: #575a5ecb;');
        }
    });
    
    
    
    
    /****************************************************
     [ 검색창 클릭시 열고 닫기 ]
     ******************************************************/
    sicon.onclick = ()=>{
        sbx.classList.toggle("on");
    };
    
    
    /************************************************* 
     함수명: chgMenu
     기능: 전체메뉴 보이기/숨기기
     *************************************************/
    // 햄버거버튼요소
    const ham = document.querySelector(".ham");
    console.log("햄버거있니?",ham);

    // 햄버거요소에 이벤트 설정하기 //////
    ham.onclick = chgMenu;
    function chgMenu(){
        // 1. 호출확인
        console.log("나야나!");
        
        // 2. 대상선정 : .top 요소
        var tg = document.querySelector(".top");
        
        // 3. 변경내용 : 대상에 클래스 "on"넣기
        tg.classList.toggle("active");
        
    } /////////////////// chgMenu 함수 ///////////////
    ////////////////////////////////////////////////// 



    /****************************************************
     [ 메인화면 슬라이드 ]
    ******************************************************/
     const swiper = new Swiper('.swiper1', {
    //기본 셋팅
    //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
    direction: 'horizontal',
    //한번에 보여지는 페이지 숫자
    slidesPerView: 1,
    //페이지와 페이지 사이의 간격
    spaceBetween: 0,
    //드레그 기능 true 사용가능 false 사용불가
    debugger: true,
    //마우스 휠기능 true 사용가능 false 사용불가
    mousewheel: false,
    //반복 기능 true 사용가능 false 사용불가
    loop: true,
    //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
    centeredSlides: true,
    // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
    // effect: 'fade',
    speed: 1000,
    //자동 스크를링
    autoplay: {
        //시간 1000 이 1초
        delay: 3500,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
    });




    /****************************************************
     [ footer 행성화면 슬라이드 ]
    ******************************************************/
    const swiper2 = new Swiper('.swiper2', {
        //기본 셋팅
        //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
        direction: 'horizontal',
        //한번에 보여지는 페이지 숫자
        slidesPerView: 3,
        //페이지와 페이지 사이의 간격
        spaceBetween: 0,
        breakpoints: { //반응형 조건 속성
            0: {
                slidesPerView: 1,
            },
            500: {
              slidesPerView: 1,
            },
            800: {
                slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            }
          },
        //드레그 기능 true 사용가능 false 사용불가
        debugger: true,
        //마우스 휠기능 true 사용가능 false 사용불가
        mousewheel: false,
        //반복 기능 true 사용가능 false 사용불가
        loop: true,
        //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
        centeredSlides: false,
        // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
        // effect: 'fade',
        speed: 1000,
        //자동 스크를링
        autoplay: {
            //시간 1000 이 1초
            delay: 3500,
            disableOnInteraction: false,
        },
       // Navigation arrows
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
    });




    
} ////////////////// loadFn 함수 //////////////

 //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////