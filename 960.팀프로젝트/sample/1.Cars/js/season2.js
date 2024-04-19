// 로드구역
window.addEventListener("DOMContentLoaded", loadFn_car2);

// 로드함수
function loadFn_car2() {

    /************* 공통함수 *************/
    // 대상선정 함수
    const qsa = (x) => document.querySelectorAll(x);

    // 클래스 추가/제거함수
    const addCls = (x, y) => x.classList.add(y);
    const removeCls = (x, y) => x.classList.remove(y);


    /************* 2번 컨텐츠 *************/

    // 1. 대상선정
    const slide2 = qsa(".slide2 li");

    // 슬라이드번호 변수
    let snum = 0;
    // 슬라이드 개수
    let scnt = slide2.length;

    // 2. 함수생성
    const fadeSlide = () => {
        // 클래스초기화
        for (let x of slide2) removeCls(x, "on");
        // 클래스 주기
        addCls(slide2[snum], "on");
        // 슬라이드번호 증감
        snum++;
        // 한계값
        if (snum === scnt) snum = 0;
    }; // fadeSlide()

    // 3. 함수호출
    // 함수최초호출
    fadeSlide();

    // 5초간격으로 함수호출
    setInterval(fadeSlide, 5000);


    /************* 3번 컨텐츠 *************/

    // 1. 대상선정
    // div버튼
    const btns = qsa(".btns div");
    // 슬라이드
    const slide3 = qsa(".slide3 li");
    // 화살표버튼 -> 미디어쿼리용
    const abtn = qsa(".slidebx .sbtn");

    // 슬라이드번호 변수
    let nums = 0;
    // 슬라이드개수
    scnt = slide3.length;

    // 2. 이벤트설정
    // div버튼 이벤트
    btns.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAll();
            // 셋팅
            addCls(slide3[idx],"op1");
            addCls(ele,"op1");
        }; // click
    }); // forEach

    // 화살표버튼 이벤트
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAll();
            // idx - 방향분기
            if (idx) {
                if(nums === slide3.length-1) nums = -1;
                addCls(slide3[nums+1],"op1");
                nums++;
            } // if
            else {
                if(nums===0) nums = 5;
                addCls(slide3[nums-1],"op1");
                nums--;
            } // else
        }; // click
    }); // forEach

    // 3. 함수생성
    // 클래스 초기화 함수
    function clearAll() {
        for(let x of slide3) removeCls(x,"op1");
        for(let x of btns) removeCls(x,"op1");
        
    } // clearAll()


    /************* 4번 컨텐츠 *************/

    // 1. 대상선정
    // 슬라이드
    let slist = document.querySelectorAll(".slide4 li");
    let slide4 = document.querySelector(".slide4");
    // 화살표버튼
    const sbtn = document.querySelectorAll(".sbx .sbtn");
    const indic = document.querySelectorAll(".indic li");
    // 광클금지변수
    let prot = 0;

    // li 순번 지정해서 속성에 순번넣기
    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    }); // forEach

    const btnSlide2 = (idx) => {
        // 광클금지 설정
        if (prot) return;
        prot = 1;

        setTimeout(() => {
            prot = 0;
        }, 400);

        // 현재 슬라이드리스트
        let clist = slide4.querySelectorAll("li");
        // 현재 슬라이드 번호
        let cseq = clist[0].getAttribute("data-seq");
        // gap = 클릭한 슬라이드 순번 - 현재 슬라이드 순번
        let gap = idx - cseq;

        // 현재슬라이드 클릭시 리턴
        if (gap === 0) return;
        // 오른쪽방향
        else if (gap > 0 || gap === -2) {
            // gap === -2 : 마지막슬라이드에서 첫번째슬라이드로 이동시
            if (gap === -2) gap = 1;
            // 슬라이드 이동
            slide4.style.left = -100 * gap + "%";
            slide4.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후
            setTimeout(() => {
                // 이동한 슬라이드만큼 첫번째 li 잘라 맨뒤로 보내기
                for (i = 0; i < gap; i++) {
                    clist = slide4.querySelectorAll("li");
                    slide4.appendChild(clist[0]);
                }
                slide4.style.left = 0;
                slide4.style.transition = "none";

            }, 400); // setTimeout

        } else {
            gap = -gap;
            // 슬라이드 이동전
            // 이동할 슬라이드만큼 마지막 li잘라 맨앞으로 보내기
            for (i = 0; i < gap; i++) {
                clist = slide4.querySelectorAll("li");
                slide4.insertBefore(clist[clist.length - 1], clist[0]);
            }

            // 슬라이드 이동
            slide4.style.left = -100 * gap + "%";
            slide4.style.transition = "none";

            setTimeout(() => {
                slide4.style.left = "0";
                slide4.style.transition = "left .4s ease-in-out";
            }, 0);
        }

        // 현재 슬라이드순번과 같은 인디케이터에 클래스 주기 //

        // 현재 슬라이드 업데이트
        clist = slide4.querySelectorAll("li");

        // 인디케이터 초기화
        for (let x of indic) x.classList.remove("on4");

        // 클래스 주기
        indic[idx].classList.add("on4");
    }; // btnSlide2()

    // 2. 함수생성
    const arrowSlide2 = (seq) => {
        // 광클금지 설정
        if (prot) return;
        prot = 1;

        setTimeout(() => {
            prot = 0;
        }, 400);

        // 현재 슬라이드리스트
        let clist = slide4.querySelectorAll("li");

        // 방향에 따른 분기
        if (seq) {
            // 슬라이드 이동
            slide4.style.left = "-100%";
            slide4.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후
            setTimeout(() => {
                // 첫번째 li 잘라 맨뒤로 보내기
                slide4.appendChild(clist[0]);
                slide4.style.left = 0;
                slide4.style.transition = "none";
            }, 400); // setTimeout
        } // if
        else {
            // 슬라이드 이동전
            // 마지막li를 첫번째li 앞으로 이동시키기
            slide4.insertBefore(clist[clist.length - 1], clist[0]);
            slide4.style.left = "-100%";
            slide4.style.transition = "none";

            // 그 이후 슬라이드 이동
            setTimeout(() => {
                slide4.style.left = "0";
                slide4.style.transition = "left .4s ease-in-out";
            }, 0);
        } // else

        // 현재 슬라이드순번과 같은 인디케이터에 클래스 주기 //

        // 현재 슬라이드 업데이트
        clist = slide4.querySelectorAll("li");

        // 현재 슬라이드 번호
        let cseq = clist[seq].getAttribute("data-seq");

        // 인디케이터 초기화
        for (let x of indic) x.classList.remove("on4");

        // 클래스 주기
        indic[cseq].classList.add("on4");
    }; // arrowSlide2()

    // 3. 이벤트 설정
    // 화살표버튼 이벤트
    sbtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            arrowSlide2(idx);
        }; // click
    }); // forEach

    // 인디케이터 이벤트
    indic.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            btnSlide2(idx);
        };
    });

    // 4. 오토슬라이드 함수
    // 인터발 제거
    let autoI;
    // 타임아웃 제거
    let autoT;

    // 1. 슬라이드 자동넘김 함수
    function autoSlide() {
        autoI = setInterval(() => arrowSlide2(1), 3000);
    } // autoSlide()
    // 슬라이드 자동넘김 호출
    autoSlide();

    // 2. 자동넘김 제거후 다시셋팅
    function clearAuto() {
        // 인터발 제거
        clearInterval(autoI);
        // 타임아웃
        clearTimeout(autoT);
        // 다시 작동하도록 호출
        autoT = setTimeout(autoSlide, 5000);
    } // clearAuto()
    
} // loadFn()
