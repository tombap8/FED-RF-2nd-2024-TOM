// DC PJ 게시판 쓰기 모드 모듈 - Write.jsx

import React, { useContext } from "react";
import { dCon } from "../dCon";

// 제이쿼리 불러오기 ////
import $ from "jquery";

function Write({
  setMode,
  totalCount,
  setPageNum,
  pgPgNum,
  initVariables, // 변수초기화함수
}) {
  // setMode - 모든 변경 상태변수 setter
  // totalCount - 전체 개수 참조변수 (글쓰기시 카운트 1증가!)
  // setPageNum - 리스트 페이지번호 setter (글쓴 후 첫페이지 이동)
  // pgPgNum - 페이징의 페이징 번호 (글쓴 후 페이징구역도 1)

  // 전역 컨텍스트 API 사용하기!!
  const myCon = useContext(dCon);
  // // console.log("Write에서 loginSts:", myCon.loginSts);

  // 글쓰기 저장 서브밋 함수 //////
  const submitFn = () => {
    // 제목입력항목
    let title = $(".subject").val().trim();
    // 내용입력항목
    let content = $(".content").val().trim();
    // trim()으로 앞뒤공백 제거후 검사!

    // (1) 공통 유효성검사
    // - 제목, 내용 모두 비었으면 리턴!
    if (title === "" || content === "") {
      alert("Insert title and content!");
      return;
    } /// if /////

    // (2) 서브밋 처리하기 //////
    else {
      // 1) 글번호 만들기 ////////////
      // 1-1) 로컬스토리지 게시판 데이터 불러오기
      let localData = localStorage.getItem("board-data");

      // 1-2) JSON.parse()로 배열객체로 변환
      localData = JSON.parse(localData);

      // 1-3) 배열 데이터 idx값 읽어오기
      let totalIdx = localData.map((v) => v.idx);
      // // console.log("idx만 배열:", totalIdx);

      // 1-4) idx값 중 최대값 구하기 :
      // 스프레드 연산자로 ...totalIdx -> 배열값만 max에 넣기
      let maxIdx = Math.max(...totalIdx);
      // // console.log("idx중 최대값:", maxIdx);

      // 2) 오늘날짜 만들기 ///////////
      let today = new Date();
      // // console.log(today);
      // toJSON()은 제이슨 날짜형식변환(yyyy-MM-dd)
      // -> 앞의 10자리만 사용 : substr(시작순번,개수)
      today = today.toJSON().substr(0, 10);
      // // console.log(today);

      // [ idx 고유번호 만드는 방법 ] ///
      // idx는 최대값 idx에 1을 더함
      // 만약 문자형숫자일 경우를 대비하여
      // Number() 숫자형변환함!

      // 3) 입력할 객체 데이터 만들기
      let data = {
        idx: Number(maxIdx) + 1,
        tit: title,
        cont: content,
        att: "",
        date: today,
        uid: myCon.loginSts.uid,
        unm: myCon.loginSts.unm,
        cnt: 0,
      };
      // console.log("입력데이터:", data);

      // 4) 입력 객체를 기존 로컬스 변환 객체에 추가하기
      localData.push(data);

      // 5) 입력객체를 문자형변환하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(localData));

      // 6) 전체 개수 참조변수 1증가하기
      totalCount.current++;

      // 7) 초기화 함수호출
      initVariables();

      // 8) 리스트 이동을 위해 모드 변경하기
      setMode("L");
    } /// else /////
  }; ////////// submitFn 함수 //////////////

  // 리턴 코드구역 ///////////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      <table className="dtblview readone">
        <caption>OPINION : Write</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly={true}
                // 로그인한 사람이름
                defaultValue={myCon.loginSts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input type="text" className="subject" size="60" />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea className="content" cols="60" rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              <button onClick={submitFn}>Submit</button>
              <button
                onClick={() => {
                  // 리스트 모드('L')로 변경하기
                  setMode("L");
                }}
              >
                List
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default Write;
