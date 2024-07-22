// 보그 PJ 카테고리 페이지 JS - category.js

// 카테고리 데이터 불러오기 : 어서써 타입 제이슨
import catData from './data/category_data.json' assert {type:'json'};

///////////////////////////////////////////
// 카테고리 페이지 기능구현하기 /////////////
// 요구사항: url로 전달된 키값을 읽어서
// 페이지의 데이터를 셋팅한다!
///////////////////////////////////////////

// 1. 전체 url 읽기
let pm = location.href;
console.log(pm);

// 값처리함수 호출하기
setValue();

// 값셋팅하기 함수 ////////
function setValue(){
    // 2. url에서 키값분리하기
    // ?(물음표)가 Get방식의 시그널이므로
    // 이것의 존재여부로 문자자르기를 실행한다!
    // =(이퀄)기호도 같이 확인함
    try{
        if(pm.indexOf('?')==-1||
            pm.indexOf('=')==-1){
            throw '잘못된 접근입니다!';
        } ///// if //////
    
    } //////// try ////////////
    catch(err){ // err 메시지 받기
        // 에러메시지 띄우기
        alert(err);
        // 메인 페이지로 보내기
        location.href='index.html';        
    } ///////// catch //////////

    // 3. url키값 추출하기
    pm = pm.split('?')[1].split('=')[1];
    // 특수문자 변환하기 : time & gem 때문
    pm = decodeURIComponent(pm);
    console.log('최종키값:',pm);

    // 4. 카테고리 데이터 매칭하기
    // 제이슨 파일 객체 데이터에서 속성으로 선택함
    const selData = catData[pm];
    console.log('선택데이터:',selData);

    // 5. 데이터 바인딩하기
    // 5-1. 배경이미지 셋팅을 위한 main요소에 클래스넣기
    // pm에 담아놓은 이름으로 넣어준다!
    // 대상: .main-area
    // ' & ' -> '-'로 변경하기 : time-gem 로 변경
    $('.main-area').addClass(pm.replace(' & ','-'));

    // 5-2. 카테고리 타이틀 변경하기
    $('.cat-tit').text(selData.제목);

    // 5-3. 메뉴 변경하기
    // 5-3-1.대상: .lnb
    let lnb = $('.lnb');
    // 5-3-2.메뉴데이터: selData.메뉴
    let mData = selData.메뉴;
    // 5-3-3.메뉴리턴함수
    const retMenu = () => 
    mData.map(v=>`<li><a href="#">${v}</a></li>`).join('');

    // 5-3-4.메뉴 없음에 따라 분기하기 ////
    if(mData=='없음'){ // lnb없애기
        lnb.remove();
    } /////// if //////
    else{ // 메뉴 만들기
        lnb.html(`<ul>${retMenu()}</ul>`);
    } ///// else //////

    // 5-4. 서브 섹션 타이틀 넣기 
    // $(선택자).each((순번,요소)=>{구현부})
    // 대상: .cat-cont-area h2
    $('.cat-cont-area h2').each((idx,ele)=>{
        $(ele).html(selData.타이틀[idx]);
    }); ////////////// each /////////////

    //5-5. 탭메뉴 타이틀 변경하기
    // 형식: 카테고리명 | 보그 코리아 (Vogue Korea) 2023
    // 제이쿼리 prepend() 메서드 사용!
    // -> 자식요소 또는 내용의 맨앞에 넣기!
    $('title').prepend(pm.toUpperCase() + ' | ');
    // toUpperCase() - 대문자로 변경
} ////////////// setValue 함수 ///////////