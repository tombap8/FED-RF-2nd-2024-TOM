// JS4-4.배열정렬 및 검색 JS

// 나의 함수 불러오기
import mFn from './my_function.js';

console.log(mFn);

/****************************************************** 
    [ JS 배열의 정렬 ]
    -> 용어의 정의: 정렬이란?
    : 배열의 값을 기준으로 순서를 다시 정하는것!
    배열의 정렬은 sort() 메서드 사용!
    sort() 메서드를 사용하여 배열의값을 오른차순,내림차순으로
    정렬할 수 있음!

    [ sort() 메서드의 특징 ]
    1. 기본정렬 :  오름차순(1,2,3,.../a,b,c,...)
        -> 기본 내림차순 메서드 -> reverse()
    2. 원리 : 배열값을 문자열로 캐스팅(형변환)한후
            변환된 문자열을 비교하여 순서를 결정함
    (참고: undefined 값일 경우 배열 맨뒤에 배치함)
    -> 주의: 숫자를 비교해도 문자열로 비교하기 때문에
    "25"와 "100" 중 큰 숫자는 100이지만 25를 더 큰
    데이터로 인식한다! 
    -> sort() 메서드 비교함수로 처리!

    [ sort() 메서드 비교함수 ]
    -> sort() 메서드 내부에 2개의 전달값을 가지는 함수를 쓰면
    sort메서드 자체에서 값을 비교하여 배열값의 순서를 바꾼다!
    -> 숫자일 경우 빼기 연산을 함!

    숫자데이터배열.sort(function(a,b){return a-b;}) => 오름차순
    숫자데이터배열.sort((a,b)=>a-b) => 오름차순

    숫자데이터배열.sort(function(a,b){return b-a;}) => 내림차순
    숫자데이터배열.sort((a,b)=>b-a) => 내림차순

    -> a는 앞 데이터, b는 뒷 데이터

    [-> 기준정렬 : 오름차순]
    배열변수.sort() -> 기본정렬

    [-> 기준정렬 : 내림차순]
    배열변수.reverse() -> 기본정렬

    ++++++++++++++++++++++++++++++++++++++++++++++

    ->>> 숫자형, 문자형에 무관하게 하나로 처리하기!!!
     [ sort() 메서드만 사용하여 정렬잡기 ]

    ((비교함수사용))
    배열변수.sort(function(x,y){
        if(x>y) return 1;
        if(x<y) return -1;
        return 0;
    })
    
    -> 단순화하기(삼항연산자사용!)

    배열변수.sort(function(x,y){
        return x == y ? 0 : x > y ? 1 : -1;
    })

    -> 더 줄이기! (화살표함수 사용!)

    배열변수.sort((x,y)=> x == y ? 0 : x > y ? 1 : -1)


    -> 리턴값의 의미(오름차순)
    1) if(x>y) return 1; -> x가 y뒤에 옴 (리턴값 양수)
    2) if(x<y) return -1; -> x가 y앞에 옴 (리턴값 음수)
    3) return 0; -> x,y 정렬을 유지 (리턴값 0)

    -> 내림차순은 양수/음수만 반대로 써주면 된다!

    [ 정렬시 데이터 유의사항 ]

    1. 문자형일 경우 대소문자가 섞여있으면 대문자나 소문자중
    하나로 통일하여 비교해야함(toUpperCase()/toLowerCase())

    예)
        배열변수.sort((x,y)=>{
            let a = x.toUpperCase(),
                b = y.toUpperCase();
            
            return a == b ? 0 : a > b ? 1 : -1;
        })

    2. 날짜정렬도 숫자와 동일함
    (날짜데이터 자체가 숫자형으로 되어있음)

    3. 특정언어의 특수문자일 경우 
    localeCompare() 메서드로 문자열 비교를 한다!

    예) 특수문자 x변수를 y변수와 변환후 비교 
        x.localeCompare(y)

******************************************************/

// 숫자값 배열
const arrNumber = [4, 5, 8, 10, 2, 1, 9, 3, 7, 6];

// 예를 위한 숫자값 배열
const arrNumber2 = [380,1000,245,2278];

// 문자값 배열
const arrString = ["파", "타", "하", "가", "바", "사", "다", "라", "차"];

// sort()는 기본 문자로 처리하므로 숫자는 내부함수로 빼기 연산처리함!
// console.log('숫자배열:',arrNumber2);
// console.log('숫자배열 오름차순정렬sort():',
// arrNumber2.sort());
// console.log('숫자배열 오름차순정렬sort((a,b)=>a-b):',
// arrNumber2.sort((a,b)=>a-b));
// console.log('숫자배열 내림차순정렬sort((a,b)=>b-a):',
// arrNumber2.sort((a,b)=>b-a));

// console.log('문자배열:',arrString);
// console.log('문자배열 오름차순 sort():',
// arrString.sort());
// console.log('문자배열 내림차순 reverse():',
// arrString.reverse());

///////////////////////////////////
// 배열 데이터 화면 출력하기 ////////

// 1.  숫자로만 된 배열의 화면 뿌리기
// map() 메서드로 배열값을 태그로 감싸서 출력하기!

// (1) 출력대상: .showNum
const showNum = mFn.qs('.showNum');

// (2) map() 메서드 없이 배열값을 이미지태그로 
// 변환하여 코드 만들기 함수
const returnTag = (x) => { // x 는 배열 전달변수
    // 1.태그 저장용 변수
    let hcode = '';
    // 2.배열만큼 순회하여 태그 만들기
    x.forEach(v=>{
        // console.log('나야나!',v);
        hcode += `
        <img 
        src="./images/num/num_0${v}.png" 
        alt="숫자${v}이미지">
        `;

    }); ///// forEach ///////

    // 3.코드리턴하기
    return hcode;

}; ////// returnTag 함수 //////////


// (3) 배열 숫자 데이터 만큼 이미지로 변환하여 화면출력
const showImgNum = () => {
    showNum.innerHTML = 
    arrNumber.map(v=>`
    <img 
    src="./images/num/num_0${v}.png" 
    alt="숫자${v}이미지">
    `).join('');
}; //////// showImgNum 함수 //////////

/*********************************************** 
/////////// [ map() 메서드의 특징 ] /////////////
map((배열값,순번,전체배열)=>{})
1. 메서드를 사용한 자리에 결과가 배열로 리턴됨
2. 원본배열은 그대로 보존됨!
3. 리턴 키워드나 변수, 함수 등 처리방법 불필요
4. 이를 변수에 할당하면 새로운 배열이 생성됨!
5. 문자열로 찍어주려면 변수메서드 join()사용!
-> join('') 빈문자열 결합을 사용하면 배열값이
깨끗하게 문자열 덩어리로 그대로 출력된다!!!
->>> 배열.map().join('') -> 배열 맵쪼잉~!
-> join()을 안쓰면 배열의 기본값이 콤마로 연결되어
할당되는데 콤마를 없애려면 반드시 join()을 써야함! 
***********************************************/
console.log('원본 배열:',arrNumber2);

console.log('원본 배열로 태그작성:',
arrNumber2.map(v=>`<숫자>${v}</숫자>`));

console.log('원본 배열로 태그작성한 배열을 문자열로 변경하기:',
arrNumber2
.map(v=>`<숫자>${v}</숫자>`).join(''));

console.log('원본 배열로 데이터작성:',
arrNumber2.map((v,i)=>
`👓회원번호${i+1}:${v}포인트`));
console.log('원본 배열:',arrNumber2);



// const showImgNum = () => {
//     showNum.innerHTML = returnTag(arrNumber);
// }; //////// showImgNum 함수 //////////


// (4) 최초출력호출
showImgNum();

// (5) 정렬 기준에 선택박스 변경 이벤트 발생시 
// 정렬 변경하기 (오름차순/내림차순)
// (5-1) 대상: #sel 선택박스
const selBox = mFn.qs('#sel');
// (5-2) 이벤트 연결하기 : 이벤트 종류 - change
mFn.addEvt(selBox,'change',changeSort);
// (5-3) 정렬변경함수 만들기
function changeSort(){
    // 1. 선택옵션값 읽어오기
    let optVal = this.value;
    console.log('선택값:',optVal);

    // 2. 정렬변경 분기하기
    // 2-1. 오름차순 : 값 1
    if(optVal==1){
        // sort() 빼기연산처리 : 앞수-뒷수
        // (양수결과일경우 순서바꾸기함!)
        arrNumber.sort((a,b)=>a-b);
    } ///// if //////
    // 2-2. 내림차순 : 값 2
    else if(optVal==2){
        // sort() 빼기연산처리 : 뒷수-앞수
        // (양수결과일경우 순서바꾸기함!)
        arrNumber.sort((a,b)=>b-a);
    } ///// else if //////

    // ((주의!!!)) 원본배열을 정렬후엔 원본배열은
    // 없어진다!!!ㅠ.ㅠ

    // 3. 정렬변경된 배열 화면에 출력하기   
    showImgNum();

    // 원본배열확인하기
    console.log('정렬후 원본배열:',arrNumber);

} ////////// changeSort 함수 /////////////





