// 메인 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import SecIntro from "../modules/SecIntro";

export default function Main(){

    //// 코드 리턴구역 //////////////
    return(
        <>
           {/* 1. 배너 컴포넌트
           "main"이름 뒤의 숫자는 1~3사이 랜덤수 */}
           <Banner catName={"main"+Math.ceil(Math.random()*3)} />

           {/* 2. 섹션소개 컴포넌트 */}
           <SecIntro />

        </>
    );

} /////////// Main /////////////////////