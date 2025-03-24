// DC PJ 게시판 수정 모드 모듈 - Modify.jsx

import React from "react";

// 제이쿼리 불러오기 ////
import $ from "jquery";

function Modify({ setMode, selRecord, totalCount, setPageNum, pgPgNum }) {
  // setMode - 모든 변경 상태변수 setter
  // selRecord - 선택데이터 참조변수
  // totalCount - 전체 개수 참조변수 (글삭제시 카운트 1감소!)
  // setPageNum - 리스트 페이지번호 setter (글삭제시 첫페이지 이동)
  // pgPgNum - 페이징의 페이징 번호 (글삭제시 페이징구역도 1)


  // 선택된 참조변수 데이터 넣기
  const selData = selRecord.current;

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
      // 1) 로컬스 읽어와서 객체화하기 ////////////
      // 1-1) 로컬스토리지 게시판 데이터 불러오기
      let localData = localStorage.getItem("board-data");

      // 1-2) JSON.parse()로 배열객체로 변환
      localData = JSON.parse(localData);

      // 2) 수정할 현재 데이터 idx값(키값)
      let currIdx = selData.idx;
    // console.log("수정할idx:", currIdx);

      // 3) 로컬스 객체화 데이터 배열을 find로 순회하여
      // 해당 idx만 찾아서 제목과 내용 변경하기
      localData.find((v) => {
        if (v.idx === currIdx) {
          // 제목, 내용변경
          v.tit = title;
          v.cont = content;
          // 원래 DB 스키마에 따라 입력해야하지만
          // 우리가 사용하는 로컬스토리지 데이터는 배열객체
          // 이기 때문에 추가 데이터를 넣을 수 있다!
          // 그래서 수정날짜를 넣어보자!
          v.mdate = new Date().toJSON().substr(0, 10);

          // 해당 데이터를 만나면 빠져나감!
          return true;
        } /// if ///
      }); /// find ///

      // 4) 입력객체를 문자형변환하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(localData));

      // 5) 리스트 이동을 위해 모드 변경하기
      setMode("L");
    } /// else /////
  }; ////////// submitFn 함수 //////////////

  // [ 삭제하는 함수 ] /////
  const deleteFn = () => {
    // 삭제여부 확인 /////
    if (window.confirm("Are you sure you want to delete?")) {
      // "확인" 클릭시 true처리되어 여기 들어옴!
      // console.log('지운다~!');

      // 1) 로컬스 읽어와서 객체화하기 ////////////
      // 1-1) 로컬스토리지 게시판 데이터 불러오기
      let localData = localStorage.getItem("board-data");

      // 1-2) JSON.parse()로 배열객체로 변환
      localData = JSON.parse(localData);

      // 2) 수정할 현재 데이터 idx값(키값)
      let currIdx = selData.idx;
    // console.log("삭제할idx:", currIdx);

      // 3) 로컬스 객체화 데이터 배열을 some()으로 순회하여
      // 해당 idx만 삭제 처리한다!
      // find()와 달리 some()은 결과값을 boolean값으로 리턴함
      // 어째든 find()나 some()은 return true하면 순회를 멈춘다!
      localData.some((v, i) => {
        if (v.idx === currIdx) {
          // 삭제 처리 : i는 해당 배열순번
          localData.splice(i, 1);

          // 리턴 true할 경우 종료!
          return true;
        } /// if ///
      }); ////// some ///////

      // 4) 입력객체를 문자형변환하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(localData));

      // 5) 전체 개수 1감소하기 ////
      totalCount.current--;      

      // 6) 페이지 번호 초기화
      setPageNum(1);

      // 7) 페이징 구역 번호 초기화
      pgPgNum.current = 1;

      // 8) 리스트 이동을 위해 모드 변경하기
      setMode("L");
    } /// if : confirm창 true처리 ///
  }; ///////// deleteFn 함수 ////////////////

  // 리턴 코드구역 /////////////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      <table className="dtblview readone">
        <caption>OPINION : Modify</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly={true}
                defaultValue={selData.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                defaultValue={selData.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                defaultValue={selData.cont}
              ></textarea>
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
              <button onClick={deleteFn}>Delete</button>
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

export default Modify;
