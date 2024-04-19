// 로딩구역 ////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

//////////////로드함수/////////////
function loadFn() {
    console.log("로딩완료!");

    ////////////// 첫장면 글자 날라오기 이벤트/////////////////////

    // 1. 대상선정
    //1-1 대상 선정 : div class=title
    const title = document.querySelector(".title");

    // 1-2 데이터 할당
    const mytxt = "CAR1";

    // 1-3. 데이터 글자 한글자씩 태그 쓰기
    let hcode = "";
    let idx = 0;

    // for of 문 반복한다.
    for (let x of mytxt) {
        // 코드만들어 변수에 대입연산자로 넣기
        hcode += `<span style = "transition-delay:${idx * 1}s"
        ><b>${x}</b></span>`;

        // 순번변수 증가
        idx++;
        // console.log(hcode);
    } //////////for of /////////////

    // 2. 스테이지 박스에 글자 넣기
    title.innerHTML = hcode;

    // 3. 일정시간 후 스테이지박스에 클래스 "on"주고 애니 작동
    setTimeout(() => {
        title.classList.add("on");
    }, 800);

    // 4. 클릭시 글자 날라가게하기

    title.title = `마지막에 글자가 멈추면 클릭하세요`;

    const titSpan = title.querySelectorAll("span b");

    title.onclick = () => {
        console.log("나야나!");
        titSpan.forEach((ele, idx) => {
            ele.style.transform = `translate(-100%, -600%) rotateX(720deg)`;
            ele.style.transition = `.8s cubic-bezier(0.55, 0.09, 0.68, 0.53) ${idx * 0.2}s`;
        });
    };

    //////////////////CASTING 이벤트 주사위 돌리기 ///////////////////////
    // 1-1 이벤트 대상 : 메뉴 .actor a
    const menu = document.querySelectorAll(".actor a");

    // 1-2 변경대상1  : 큐브애니메이션  .squ
    const squ = document.querySelector(".squ");
    const car1 = {
        Start: {
            배우: "Start",
            그림: "https://movie-phinf.pstatic.net/20111223_15/1324587194472ANYeI_JPEG/movie_image.jpg?type=m665_443_2",
        },
        "Lightning McQueen": {
            배우: "Owen Wilson",
            그림: "https://movie-phinf.pstatic.net/20111223_295/13245872115067L0YP_JPEG/movie_image.jpg?type=m665_443_2",
        },
        "Tow Mater": {
            배우: "Larry The Cable Guy",
            그림: "https://movie-phinf.pstatic.net/20111223_269/13245872163772lFmf_JPEG/movie_image.jpg?type=m665_443_2",
        },
        "Doc Hudson": {
            배우: "Paul Newman",
            그림: "https://movie-phinf.pstatic.net/20111223_52/1324587214218kmhhV_JPEG/movie_image.jpg?type=m665_443_2",
        },
        "Sally Carrera": {
            배우: "Bonnie Hunt",
            그림: "https://movie-phinf.pstatic.net/20111223_286/1324587217476XfKzB_JPEG/movie_image.jpg?type=m665_443_2",
        },
        "Chick Hicks": {
            배우: "Michael Keaton",
            그림: "https://movie-phinf.pstatic.net/20111223_97/13245872120488WJk9_JPEG/movie_image.jpg?type=m665_443_2",
        },
    };

    // 1-3 변경대상2  : 배우명 .cname
    const cname = document.querySelector(".cname");

    // 1-4 변경대상3  : 배우 설명 박스  .squbx
    const squbx = document.querySelector(".squbx");

    //1-5 변경대상4 : 캐릭터 이미지 넣기 carchac
    const carchac = document.querySelector(".carchac");

    // 2. 메뉴에 클릭이벤트 설정하기
    //  for of문

    // 초기값
    carchac.innerHTML = `<img src="${car1.Start.배우}" alt="Start의 포스터">`;

    for (let x of menu) {
        // x 는 각각의 요소
        // 1. 클릭이벤트 설정
        x.onclick = (e) => {
            e.preventDefault();
            // 0. 박스 숨기기

            squbx.style.opacity = "0";

            // 단위가 없는 숫자는 문자열이든 숫자든 상관없다.
            squbx.style.transition = "none";

            // 이벤트 대상 :  메뉴 .actor a ->let x of menu
            // 1. 메뉴 텍스트 읽기
            let mtxt = x.innerText;

            //2. 회전값 셋팅하기
            // 회전값 변수
            // 무조건 회전하기 위해 세팅함
            let setval;
            switch (mtxt) {
                case "Start":
                    setval = "rotateX(0deg) rotateY(0deg)";
                    break;
                case "Lightning McQueen":
                    setval = "rotateX(360deg) rotateY(270deg)";
                    break;
                case "Tow Mater":
                    setval = "rotateX(-360deg) rotateY(540deg)";
                    break;
                case "Doc Hudson":
                    setval = "rotateX(720deg) rotateY(90deg)";
                    break;
                case "Sally Carrera":
                    setval = "rotateX(-450deg) rotateY(360deg)";
                    break;
                case "Chick Hicks":
                    setval = "rotateX(450deg) rotateY(360deg)";
                    break;
                default:
                    setval = "rotateX(0deg) rotateY(0deg)";
            } //////swtich case/////////////

            //3. 회전값 적용하기 (transform에 setval 변수값 할당하기)
            squ.style.transform = setval;

            squ.style.transition = "1s cubic-bezier(0.65, 0.05, 0.36, 1)";

            // 4 .캐릭터, 배우 정보 셋팅하기
            // 변경대상1: .cname - 배우 이름

            // 배우이름 넣기
            // mtxt  자동차 캐릭터, 메뉴의 a 태그 이름
            // mtxt 는 캐릭터 이름

            let data = car1[mtxt];

            carchac.innerHTML = `<img src="${data.그림}" alt="${mtxt}의 포스터">`;
            cname.innerText = data.배우;

            // 5. 배우 이름  보이기
            // 대상:.squbx

            setTimeout(() => {
                squbx.style.opacity = "1";
                squbx.style.transition = "opacity 0.4s cubic-bezier(0.29,-0.18, 0.57, 1)";
            }, 1000); ///////////////타임아웃
        }; /////click 이벤트 함수 //////////////
    } ///  for of 문//////////////

    // 처음에 "Start"버튼 나와있기
    menu[0].click();
} ////////////////로드함수///////
////loadFn 함수/////////////////
