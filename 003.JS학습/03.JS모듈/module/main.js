// 모듈 연습 메인 JS - main.js

// 공통함수 불러오기
import myFn from './my_function.js';

// 텍스트 데이터 불러오기
import { mTitle,sTitle,personInfo,mvData } from './text_data.js';

// 불러온 값확인
console.log(myFn,mTitle,sTitle,personInfo,mvData);




/**********************************************     
    [ import 형식 ]
    import 전달변수 from 파일경로;

    1. import문법을 쓰려면 호출하는 html script요소에
    type="module" 속성을 반드시 셋팅해야한다!

    2. 반드시 가져올 모듈JS에서 export를 해줘야함!

    3. from 뒤에 경로는 반드시 상대경로일 경우
    같은 위치일 지라도 ./ 표시를 꼭해야함!(없으면 안나옴!) (/,./,../ 표시필수)

    4. 모듈구성은 반드시 서버형식으로 열어야 작동한다!
    (http://...) Live Server로 열기때문에 볼 수 있음!
    -> 로컬파일로 열면 작동안됨!

    [ import의 사용방법 ]
    1. export default인 경우
        -> import 변수 from 경로
        ->>> 변수는 내가 지을 수 있음

    2. export {} 인 경우
        -> import {보내준변수명,...} from 경로

    [ import 시 변수명 변경하기 : 별칭사용하기 ]

    import {전달변수 as 별칭} from 파일경로;
    예) import {mymymy as m} from 파일경로;
    -> 별칭 사용이유:  단순변경요구, 같은이름 변수 피하기

    ____________________________________________

    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기 위한 JS
    -> text_data.js
    2. 구체적인 데이터 구성처리를 위한 JS
    -> msg_format.js
***************************************************/


// DOM선택함수 객체 불러오기
