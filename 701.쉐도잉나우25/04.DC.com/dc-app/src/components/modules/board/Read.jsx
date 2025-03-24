// DC PJ 게시판 읽기 모드 모듈 - Read.jsx

import React, { useContext } from "react";
import { dCon } from "../dCon";

function Read({ setMode, selRecord }) {
  // setMode - 모든 변경 상태변수 setter
  // selRecord - 선택데이터 참조변수

  // 선택된 참조변수 데이터 넣기
  const selData = selRecord.current;

  // 전역 컨텍스트 API 사용하기!!
  const myCon = useContext(dCon);
  // console.log('Read에서 loginSts:',myCon.loginSts);

  // [ 조회수 증가하기 ] ////
  // 규칙1 : 자신의 글은 증가하지 않는다!
  // 규칙2 : 타인의 글은 증가한다!
  // 규칙3 : 로그인한 상태에서 한번만 증가한다!

  // ((이미 읽은 글인지 판단하기위해 조회된글 저장하기))
  // -> 세션스토리지는 적합! 창을 닫으면 사라지니까!
  // -> 쿠키는 삭제방법이 즉각적이지 못하므로 제외!
  // -> 참조변수는 새로고침하면 초기화되므로 제외!

  // 1. 세션스 없으면 세션스 만들기 ///
  // bd-rec은 board-record 를 줄임말
  if (!sessionStorage.getItem("bd-rec")) {
    sessionStorage.setItem("bd-rec", "[]");
  } //// if ////

  // 2. 세션스 글번호 저장하기 ////

  // (1) 세션스 파싱하여 변수할당 ///
  let rec = JSON.parse(sessionStorage.getItem("bd-rec"));

  // (2) 기존 배열값에 현재글번호 존재 여부 검사하기
  // 결과가 true이면 조회수를 증가하지 않는다!
  // 배열.includes(검사할값) -> 배열에 있으면 true
  let isRec = rec.includes(selData.idx);
  // console.log('현재글번호:',selData.idx);
  // console.log('현재읽은글:',rec);
  // console.log('이미있나?',isRec);

  // (3) 로그인한 사용자의 글이면 isRec값을 true처리!
  // 현재 로그인한 사용자는 myCon.loginSts으로 판별!
  if (myCon.loginSts) {
    // 로그인한 사용자정보가 할당된 경우 true가 됨!
    // console.log(
    //   '선택글 아이디:', selData.uid,
    //   '로그인사용자 아이디:', myCon.loginSts.uid
    // );
    // 글쓴이 아이디와 로그인사용자 아이디가 같은가?
    if (selData.uid === myCon.loginSts.uid) {
      // 글번호저장과 조회수증가를 하지 않도록 isRec값을
      // true로 변경함
      isRec = true;
    } //// if ////
  } //// if /////

  // (4) 배열에 값 추가하기 : 기존값에 없으면 넣기!
  if (!isRec) rec.push(selData.idx);
  // -> 현재읽은 글번호를 배열에 추가함!

  // (5) 다시 세션스에 저장하기 ////
  sessionStorage.setItem("bd-rec", JSON.stringify(rec));

  // 3. 글번호 증가하기 ///////////////
  // -> 게시판 원본 데이터 조회수 업데이트하기
  if (!isRec) {
    // (1) 게시판 로컬스 데이터 파싱
    let bdData = JSON.parse(localStorage.getItem("board-data"));
    // console.log('조증구역!',bdData);

    // (2) 게시판 해당 데이터 cnt값 증가
    // 조건 : isRec값이 false일때(여기 if문내부에 코딩!)
    bdData.some((v) => {
      if (v.idx === selData.idx) {
        // console.log('당첨!',v.cnt);
        // 기존값에 1증가하여 넣기
        v.cnt = Number(v.cnt) + 1;
        // 끝내려면 true를 리턴
        return true;
      } /// if ///
    }); ///// some /////

    // (3) 다시 로컬스에 저장하기 ///
    localStorage.setItem("board-data", JSON.stringify(bdData));
  } ///// if ///////

  // 리턴 코드구역 ///////////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      <table className="dtblview readone">
        <caption>OPINION : Read</caption>
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
                readOnly={true}
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
                readOnly={true}
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
              <button
                onClick={() => {
                  // 리스트 모드('L')로 변경하기
                  setMode("L");
                }}
              >
                List
              </button>
              {
                // 로그인한 사용자가 글쓴이와 같은 아이디일 경우
                // 수정버튼 보이기
                myCon.loginSts && myCon.loginSts.uid === selData.uid && (
                  <button
                    onClick={() => {
                      // 수정모드로 변경하기
                      setMode("M");
                    }}
                  >
                    Modify
                  </button>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default Read;
