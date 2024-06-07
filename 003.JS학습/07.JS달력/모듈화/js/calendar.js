// 달력구현 JS - calendar.js ////////////

/*********************************************** 
 * [ 생성자 함수로 변환하여 사용하기 ]
 * 1. 함수명을 첫글자 대문자로 변경
 *  (생성자함수로 사용할 것을 알림)
 * 
 * 2. 호출하는 곳에서 new 키워드로 인스턴스생성
 * -> 이때부터 생성자함수로 사용하는것!
 * 
 * 3. 만약 생성자 함수의 속성/메서드를
 * 인스턴스 코딩구역에서 활용코자 할 경우
 * this키워드로 생성자함수 맴버등록하여 사용함!
 * 
 * -> 인스턴스 코딩구역에서 생성된 인스턴스를
 * 변수에 담아 하위 속성/메서드로 호출이 가능해짐!
 * 
 * 4. 유의사항: 생성자함수 내부에서 this키워드로
 * 등록된 속성/메서드는 내부에서 호출시에도 반드시
 * this키워드를 사용하여 호출해야함!(안쓰면 에러!)

*************************************************/

// DOM 메서드 //////
const dFn = {
    qs : x => document.querySelector(x),
    qsa : x => document.querySelectorAll(x),
    qsEl: (el, x) => el.querySelector(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
    addEvt : (ele,evt,fn) => 
            ele.addEventListener(evt,fn),
    cg : x => console.log(x),
    addZero : x => x < 10 ? '0' + x : x,
    fm : x => `${x.getFullYear()}-${
        dFn.addZero(x.getMonth()+1)}-${
        dFn.addZero(x.getDate())}(${week[x.getDay()]})`
}; ///////// dFn 객체 //////////
    
// 요일변경배열 ////
const week = ["일","월","화","수","목","금","토"];

// 달력함수 호출 -> 이젠 여기서 안함!
// makeDallyeok();

// 함수명을 대문자로 시작하여 생성자함수로 변환함!
function MakeDallyeok(selEl){ 
    // selEl - 달력넣을요소(선택자만 보냄)
    dFn.cg('달력만들어!');

    // [ 생성자함수 속성/메서드 공개 연습하기 ] ////////
    // 요일정보 변환 배열
    this.week = ["일","월","화","수","목","금","토"];
    // 한자릿수 날짜 앞에 0추가 메서드
    this.addZero = x => x < 10 ? '0' + x : x;
    //////////////////////////////////////////////////

    // 0. 달력 컴포넌트 HTML넣기
    dFn.qs(selEl).innerHTML = insertHcode();

    // 1. 변수셋팅 ////////////////////
    // (1) 변경할 현재날짜 객체
    const currDate = new Date();
    // (2) 오늘날짜 객체
    const today = new Date();
    // (3) 년도요소 : .yearTit
    const yearTit = dFn.qs(selEl+' .yearTit');
    // (4) 월요소 : .monthTit
    const monthTit = dFn.qs(selEl+' .monthTit');
    // (5) 날짜요소 : .dates
    const dates = dFn.qs(selEl+' .dates');
    // (6) 날짜넣을 배열변수
    const dateSet = [];
    // (7) html 코드 저장변수
    let hcode = '';
    // (8) 날짜정보 저장히든필드
    const dateInfo = dFn.qs(selEl+' .date-info');

    // dFn.cg(yearTit);
    // dFn.cg(monthTit);
    // dFn.cg(dates);

    // 2. 함수 만들기 ///////////////////
    // (1) 달력 초기화구성 함수 ///////
    const initDallyeok = () => {
        // 변수초기화
        // 날짜 배열 초기화 : splice(시작순번,개수)
        // -> 배열변수.splice(0) 첫배열부터 모두지움!
        dateSet.splice(0);
        // html코드 변수 초기화
        hcode = '';

        // 현재년
        let cYr = currDate.getFullYear();
        // 현재달
        let cMt = currDate.getMonth();

        // [선택달  끝날짜, 첫날짜 알아오기]
        // new Date(년도,월,옵션)
        // (1) 년도
        // (2) 월
        // (3) 옵션 : 0 - 선택달끝날짜 / 1 - 다음달첫날짜

        // 1. 전달 마지막 날짜(옵션:0) 
        // -> 달력처음 전달끝쪽날짜표시
        const prevLast = 
        new Date(cYr,cMt,0);

        dFn.cg('전달끝날짜:'+dFn.fm(prevLast));

        // 2. 현재달 첫째날짜(옵션:1->전달로 셋팅)
        // -> 달력 전달셋팅을 위한 요일 구하기 위해!
        const thisFirst = 
        new Date(cYr,cMt,1);
            
        dFn.cg('현재달 첫째날짜:'+dFn.fm(thisFirst));

        // 3. 현재달 마지막날짜(옵션:0)
        const thisLast = new Date(cYr,cMt+1,0);
        
        dFn.cg('현재달 마지막날짜:'+dFn.fm(thisLast));

        // 4. 년도표시하기
        yearTit.innerHTML = cYr;

        // 5. 월표시하기
        monthTit.innerHTML = cMt + 1;

        // 6. 날짜 데이터 태그 구성하기
        // 6-1. 전달 날짜 앞쪽 채우기
        // 조건: 현재달 첫날짜 요일이 0이 아니면 내용있음!
        // -> 왜0인가? 0은 일요일 이므로 0이면 앞에 내용없음!
        let fDay = thisFirst.getDay();
        dFn.cg('이번달첫날요일:'+fDay);
        if(fDay != 0){
            // 만약 요일번호가 0이 아니면 for문 돌림
            for(let i = 0; i < fDay;i++){
                // 반복횟수 만큼 배열 앞쪽에 추가
                // 앞에 추가 메서드: unshift()
                dateSet.unshift(`
                    <span style="color:#ccc" class="bm">
                        ${prevLast.getDate() - i}
                    </span>
                `)
                // 전달마지막날짜 - for문i값(0,1,2,...)

            } //////// for //////////////

        } //////////// if ///////////////

        
        // 6-2. 현재월 삽입하기 ///////////
        // 반복문 구성: 현재월 1일부터 마지막날짜까지 반복 배열추가
        for(let i = 1; i <= thisLast.getDate(); i++){
            dateSet.push(i);
        } ///////////// for ////////////////////

        // 6-3. 다음달 나머지 칸 삽입하기 ////
        // 다음달은 클래스 'am'으로 구분
        // 반복구성: 1부터 2주분량정도 넣는다!
        for(let i = 1; i <= 14; i++){
            dateSet.push(`
                <span style="color:#ccc" class="am">
                    ${i}
                </span>
            `);

        } //////////// for //////////////
        
        
        // 7. 날짜배열로 날짜태그 구성하기 ///////
        // 7일 * 6주 = 42개
        for(let i = 0; i < 42; i++){

            // 오늘날짜와 같은 경우 클래스"today"넣기
            if(
                // [년,월,일이 모두 일치하는 오늘만 표시]
                // (1) 오늘날짜 == 배열값날짜 AND
                today.getDate() == dateSet[i] &&
                // (2) 현재달 == 선택달 AND
                today.getMonth() == currDate.getMonth() &&
                // (3) 현재년도 == 선택년도
                today.getFullYear() == currDate.getFullYear()
            ){
                hcode += `<div class="date today">${dateSet[i]}</div>`;
            } ///// if //////
            else{
                hcode += `<div class="date">${dateSet[i]}</div>`;
            } ///// else /////



        } /////////// for /////////////////

        // 8. 날짜태그 출력하기 ////////
        dates.innerHTML = hcode;


        // dates.innerHTML = dateSet.map((v,i)=>
        // i<42?`<div class="date">${v}</div>`:'').join('');
        
        // dFn.cg('날짜배열:'+dateSet.map((v,i)=>
        // i<42?`<div class="date">${v}</div>`:'').join(''));

        // dFn.cg(dateSet);
        // dFn.cg(hcode);


        // 9. 날짜정보를 사용하도록 셋팅하기 ////
        // (1) 대상선정 : .date -> 위에서 새로 담겼으므로 새로읽음!
        let newDate = dFn.qsa(selEl+' .date');
        // console.log(newDate);

        // (2) 각 날짜 .date요소에 링크설정하기
        newDate.forEach(ele=>{
            dFn.addEvt(ele,'click',()=>{
                // 1. 년도읽기
                let nowY = yearTit.innerText;
                // 2. 월읽기
                let nowM = monthTit.innerText;
                // 3. 날짜읽기
                let nowD = ele.innerText;                
                
                // 4. 전달/다음달 구분하기
                let isSpan = dFn.qsEl(ele,'span');
                console.log('span있니?',isSpan);
                // span이 있으면 true 처리됨!
                if(isSpan){
                    // span의 클래스가 'bm'/'am' 인지구분하기
                    let isAM = isSpan.classList.contains('am');
                    if(isAM){ // 다음달이므로 1 더함
                        nowM++;
                        if(nowM==13){ 
                            // 13월은 1월로 처리
                            nowM = 1; 
                            // 1월은 다음해로 처리
                            nowY++;
                        } ///// if //////
                    } //// else ////////
                    else{ /// 'bm'일 경우  즉, 전달!
                        nowM--;
                        if(nowM==0){
                            // 0월은 12월로 처리
                            nowM = 12;
                            // 12월은 전해로 처리
                            nowY--;
                        } //// if ////
                    } ////// else //////
                } ////////// if ///////////
                
                // 날짜구성하기 : yyyy-mm-dd
                let setDate = 
                `${nowY}-${dFn.addZero(nowM)
                }-${dFn.addZero(nowD)}`;
                 
                // 요일셋팅하기 : 해당날짜의 요일 getDay()
                let setDay = new Date(setDate).getDay();

                // 날짜요일출력 : yyyy-mm-dd(요일)
                console.log(setDate+`(${week[setDay]})`);

                // 히든필드에 날짜정보 넣기: 날짜정보공개
                // 활용도를 높이기 위해 일반구분자로 정보공개
                // 예) 년도/월/일/요일 -> 2023/10/20/2
                dateInfo.value =
                `${nowY}/${nowM}/${nowD}/${setDay}`;
                // setDate+`(${week[setDay]})`


            }); /////// click 함수 ////////

        }); //////////// forEach /////////////////

        
    }; /////// initDallyeok 함수 ////////



    // (2) 이전/다음달력 출력하기 함수 ////////////////////
    // 이전/다음달 함수는 this키워드로 생성자함수에 등록하여
    // 인스턴스생성시 접근할 수 있도록 한다!!!
    this.chgCalendar = (num) => { 
        // num(1이면 다음, -1이면 이전)
        console.log('달력변경 고고!');
        // 이전/다음달로 변경하여 initDallyeok() 함수호출!
        // getMonth() 월가져오기 / setMonth() 월 셋팅하기!
        currDate.setMonth(currDate.getMonth()+num);
        initDallyeok();
    }; //////// prevCalendar 함수 ///////////////////


    // 3. 이벤트 설정하기 ////////////////////
    // 이전버튼에 함수연결하기 : 달을 빼기위해 -1전달
    dFn.addEvt(dFn.qs(selEl+' .btnL'),'click',
    ()=>this.chgCalendar(-1));
    // 다음버튼에 함수연결하기 : 달을 더하기위해 1전달
    dFn.addEvt(dFn.qs(selEl+' .btnR'),'click',
    ()=>this.chgCalendar(1));
    // this키워드로 등록된 생성자함수 속성/메서드는
    // 반드시 this키워드를 사용하여 호출해야함!


    // 초기셋팅함수 호출!
    initDallyeok();

} /////////////// makeDallyeok함수 ////////////


/*********************************************** 
        함수명 : insertHcode
        기능 : 달력의 HTML 코드 넣기
***********************************************/
function insertHcode(){
    // 달력 html 코드를 리턴함!
    return `
    <!-- 달력전체박스 -->
    <div class="calendar">
      <!-- 달력상단:해당년/월표시 -->
      <header class="header">
        <!-- 달력이동버튼:이전 -->
        <button class="mbtn btnL">〈</button>
        <div class="title">
          <div class="yearTit"></div>
          <div class="monthTit"></div>
        </div>
        <!-- 달력이동버튼:다음 -->
        <button class="mbtn btnR">〉</button>
      </header>
      <!-- 달력날짜표시박스 -->
      <section class="main">
        <!-- 주단위 구분박스 -->
        <div class="week">
          <div class="day">Sun</div>
          <div class="day">Mon</div>
          <div class="day">Tue</div>
          <div class="day">Wed</div>
          <div class="day">Thu</div>
          <div class="day">Fri</div>
          <div class="day">Sat</div>
        </div>
        <!-- 해당월의 달력날짜 구성박스 -->
        <div class="dates"></div>
      </section>
      <!-- 달력날짜 저장용 히든필드 : type="hidden" -->
      <input type="hidden" class="date-info">
    </div>
    `;

} //////////////// insertHcode 함수 ///////////////

// 달력 내보내기 ////////
export default MakeDallyeok;

