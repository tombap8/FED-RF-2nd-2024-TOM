window.addEventListener("DOMContentLoaded", ()=>{
    /** 메인 이미지 */
    const wrapImg = document.querySelectorAll(".img_wrap>li img");
    /** 썸네일 이미지 */
    const miniImg = document.querySelectorAll(".thumbnail img");
    
    /** 썸네일 미니이미지 클릭시 메인 이미지 변경 */
    miniImg.forEach((ele,idx)=>{
        ele.onclick = ()=>{
            initMenu()
            wrapImg[idx].classList.add("on");
        }
    })
    /** 이미지 전환 변수 */
    let imgSeq = 0;
    
    /** 이미지 클래스 초기화 함수 */
    function initMenu(){
        wrapImg.forEach((ele)=>{
            ele.classList.remove("on");
        });
    }

    /** 시작 이미지 순번 변수 */
    let imgNum = 0;

    /** 2초마다 이미지 자동 순환 */
    setInterval(()=>{
        autoPresent(imgNum)
    }, 2000)

    /** 이미지 순환 함수 */
    function autoPresent(idx){
        initMenu();
        wrapImg[idx].classList.add("on");
        imgNum++;
        if(imgNum === 4) imgNum = 0;
    }



    /** 중간 박스 슬라이드 효과 */
    /** 슬라이드 버튼 */
    const slideBtn = document.querySelectorAll(".campaign>a");
    /** 슬라이드 전체 박스 */
    const slideBx = document.querySelector(".slide");
    
    /** 슬라이드 박스 변수 */
    let scnt = 0;

    /** 윈도우 사이즈 변수 */
    let winWid = window.innerWidth;
    /** 로딩된 윈도우 사이즈에 따라 슬라이드 버튼 눌렀을 때 이동하는 이벤트 */
    if(winWid >= 768){
        slideBtn.forEach((ele,idx)=>{
            ele.onclick = (e)=>{
                goSlide(idx);
                e.preventDefault();
            }
        })
    }else{
        slideBtn.forEach((ele,idx)=>{
            ele.onclick = (e)=>{
                goSlideMed(idx);
                e.preventDefault();
            }
        })
    }
    /** 슬라이드 버튼 변수 */
    let seq;
    let prot = 0;
    /** max-width>767px 일때 슬라이드 함수 */
    function goSlide(seq){
        if(prot) return;
        prot++;
        /** 슬라이드 박스 */
        let slideList = document.querySelectorAll(".slide li");
        if(seq===1){
            slideBx.style.transition = "left .4s ease-in-out"
            slideBx.style.left = "-369px"
            setTimeout(() => {
                slideBx.appendChild(slideList[0]);
                slideBx.style.left = "0"
                slideBx.style.transition = "none";
            }, 400);
        }else{
            slideBx.insertBefore(slideList[slideList.length-1], slideList[0]);
            slideBx.style.left = "-369px";
            slideBx.style.transition = "none";
            setTimeout(() => {
                slideBx.style.left = "0";
                slideBx.style.transition = "left .4s ease-in-out";
            }, 10);
        }
        setTimeout(() => {
            prot = 0;
        }, 400);
    }
    /**  max-width<=767px 일때 슬라이드 함수 */
    function goSlideMed(seq){
        if(prot) return;
        prot++;
        /** 슬라이드 박스 */
        let slideList = document.querySelectorAll(".slide li");
        if(seq===1){
            slideBx.style.transition = "left .4s ease-in-out"
            slideBx.style.left = "-100%"
            setTimeout(() => {
                slideBx.appendChild(slideList[0]);
                slideBx.style.left = "0"
                slideBx.style.transition = "none";
            }, 400);
        }else{
            slideBx.insertBefore(slideList[slideList.length-1], slideList[0]);
            slideBx.style.left = "-100%";
            slideBx.style.transition = "none";
            setTimeout(() => {
                slideBx.style.left = "0";
                slideBx.style.transition = "left .4s ease-in-out";
            }, 10);
        }
        setTimeout(() => {
            prot = 0;
        }, 400);
    }

    /** 이미지에 마우스 올렸을 때 설명 이미지 등장 */
    /** 이미지 변수 */
    const slideImg = document.querySelectorAll(".slidebx")
    console.log('slideImg: ', slideImg);
    slideImg.forEach(ele=>{
        let hiddenImg = ele.querySelector("a");
        ele.addEventListener("mouseenter", ()=>{
            hiddenImg.style.opacity = "1";
        })
        ele.addEventListener("mouseleave", ()=>{
            hiddenImg.style.opacity = "0";
        })
        hiddenImg.onclick = (e)=>{
            e.preventDefault();
        }
    })

    /* 미드 슬라이드 박스 */
    const midWrap = document.querySelector(".mid_wrap");
    /* 탑 이미지 박스 */
    const topBx = document.querySelector(".top");

    /** 윈도우 사이즈 줄이는 이벤트 */
    window.addEventListener("resize",()=>{
        
        winWid = window.innerWidth;
        /** 윈도우 사이즈 줄어들고 슬라이드 버튼 눌렀을 때 이동하는 이벤트 */
        if(winWid >= 768){
            topBx.style.paddingBottom = "0";
            slideBtn.forEach((ele,idx)=>{
                ele.onclick = (e)=>{
                    goSlide(idx);
                    e.preventDefault();
                }
            })
        }else{
            topBx.style.paddingBottom = (wrapImg[0].clientHeight - 700) + "px";
            slideBtn.forEach((ele,idx)=>{
                ele.onclick = (e)=>{
                    goSlideMed(idx);
                    e.preventDefault();
                }
            })
        }

    })
    /** 이미지 클릭시 유튜브 박스 등장 */
    /** 유튜브 이미지 */
    const youImg = document.querySelector(".video_wrap button");
    /** 유튜브 박스 */
    const youVid = document.querySelector(".vidbx");
    youImg.addEventListener("click",()=>{
        youVid.classList.add("on");      
    })
    const closeBtn = document.querySelector(".close_vid");
    closeBtn.addEventListener("click", ()=>{
        youVid.classList.remove("on");
    })


});