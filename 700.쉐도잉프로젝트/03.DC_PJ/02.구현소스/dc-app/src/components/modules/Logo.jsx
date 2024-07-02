// DC.com 로고 컴포넌트
import React from "react";

// 이미지 경로 데이터 불러오기
import { isrc } from "../data/img_src";

export default function Logo({logoStyle}){
    // logoStyle : 상단, 하단 로고 구분코드
    // 코드 값 : top(상단), bottom(하단)
    // console.log(isrc.logo, logoStyle);

    // 객체형 스타일 적용
    const myStyle = {
        top:{
            width:"45px",
            height:"45px",
            marginRight:"30px",
            borderRadius:"50%",
            cursor:"pointer"
        },

        bottom:{
            height: "80px"
        }
    };

    // 로고 이미지 스타일 객체
    const imgStyle = {
        top: {width:"45px"},
        bottom: {width:"80px"},
    };


    // 코드 리턴 구역 ////////
    return (        
        <h1 style={myStyle[logoStyle]}>
            <img
            style={imgStyle[logoStyle]}
            src={process.env.PUBLIC_URL+isrc.logo} 
            alt="DC Logo" />
        </h1>
    );
} ///////////// Logo ///////////////