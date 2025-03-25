// DC PJ 게시판 읽기 모드 모듈 - Read.jsx

import React, { useContext, useEffect, useRef, useState } from "react";
import { dCon } from "../dCon";

// 제이쿼리 불러오기 ////
import $ from "jquery";

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

  // ★★★★★★★★★★★★★★★★★★★★★★★ ////
  // ★★★★★★★★★★★★★★★★★★★★★★★ ////
  // [코멘트 구현 관련 코드 구역] ////////////
  // [1] 코멘트 관련 상태변수 및 참조변수
  // (1) 코멘트 정보 객체저장 상태변수
  const [commentData, setCommentData] = useState([]);
  // (2) TextArea 요소용 참조변수
  const textareaRef = useRef([]);
  // (3) 수정중 코멘트 idx 저장변수 : 수정완료시 null값 복원!
  const [isEditing, setIsEditing] = useState(null);
  // (4) 수정중 코멘트 내용 저장변수
  const [editedContent, setEditedContent] = useState("");

  /***************************************** 
      [ 코멘트 데이터 객체 구조 ]
        idx: unique key,
        cont: comment content,
        uid: user id,
        unm: user name,
        bid: board id,
        date: comment date,
        
      [ 로컬스토리지 저장명 : comment-data ]
   *****************************************/

  // [2] 코멘트 관련 함수 만들기 ///////
  // (1) 코멘트 데이터 저장함수 //////
  const saveComment = () => {
    // 1) 코멘트 입력란이 비었으면 메시지와 리턴하기
    if ($(".comment-box").val().trim() === "") {
      alert("Write comment!");
      return;
    } /// if ////

    // 2) 코멘트 데이터 로컬스 확인하기
    // -> 로컬스 코멘트가 없으면 빈배열 있으면 파싱 데이터 할당!
    let comDt = localStorage.getItem("comment-data")
      ? JSON.parse(localStorage.getItem("comment-data"))
      : [];

    console.log(
      "코멘트 저장해~!",
      comDt.map((v) => v.idx)
    );

    // 3) 코멘트 배열 데이터에 새로운 값 넣기
    // 유일값인 idx값 만드는 방법은?
    // -> 기존 idx배열값만 모아서 max함수로 최대값 뽑고 1더함!
    // -> comDt가 빈 배열이면 첫값은 1이 되게함!
    comDt.push({
      idx: comDt.length > 0 ? Math.max(...comDt.map((v) => v.idx)) + 1 : 1, // 유일키
      cont: $(".comment-box").val(), // 코멘트 글
      uid: myCon.loginSts.uid, // 로그인 사용자 아이디
      unm: myCon.loginSts.unm, // 로그인 사용자 이름
      bid: selData.idx, // 코멘트 대상 게시판 글아이디
      date: new Date().toJSON().substring(0, 10), // 입력날짜
    });

    // 4) 로컬스 코멘트 데이터 넣기 ////
    localStorage.setItem("comment-data", JSON.stringify(comDt));

    // 5) 기존 입력 내용 지우기
    $(".comment-box").val("");

    // 6) 코멘트 데이터 생성함수 호출!
    makeCommentData();
  }; //////////// saveComment 함수 /////////////

  // (2) 코멘트 상태 후크변수 업데이트 함수 ////
  const makeCommentData = () => {
    // 로컬스 코멘트 데이터 있을 경우 /////
    if (localStorage.getItem("comment-data")) {
      let temp = localStorage.getItem("comment-data");
      temp = JSON.parse(temp);
      temp = temp
        // 게시글번호와 일치하는 코멘트 글번호만 수집
        .filter((v) => v.bid === selData.idx)
        // 날짜역순 +  idx역순
        .sort((a, b) =>
          a.date > b.date
            ? -1
            : a.date < b.date
            ? 1
            : // 하위조건추가 : 두값이 같지않은가?
            a.date !== b.date
            ? // 같지 않으면 0
              0
            : // 그밖에 두 값이 같은경우는?
            // idx항목으로 오름/내림차순정렬
            a.idx > b.idx
            ? -1
            : a.idx < b.idx
            ? 1
            : 0
        ); /// filter + sort /////////

      // 코멘트 데이터 상태변수 업데이트
      setCommentData(temp);
    } /// if ///
  }; ////////// makeCommentData 함수 ////////

  // (3) 호출시 모든 텍스트 박스의 높이 조정함수! //////
  const adjustHeight = () => {
    // 코멘트로 생성된 textarea 수만큼 돌아서 높이값 셋팅!
    // 지운 데이터 순번처리위해 index값이 확인시 필요함!
    textareaRef.current.forEach((textarea, index) => {
      // index는 순회시 순번리턴
      if (textarea) {
        // console.log("높이:", textarea.scrollHeight);
        // 높이값을 먼저 초기화 해야 높이값 설정이 적용된다!
        textarea.style.height = "auto";
        // 컨텐츠만큼 생긴 높이값을 적용함!
        textarea.style.height = `${textarea.scrollHeight}px`;
      } /// if ///

      /// 지운 경우 else문으로 처리함!(안하면 에러남!!!)///
      else {
        // 코드변경할 일은 없음
        console.log("Textarea 처리안함 순번:", index);
      } ////// else /////
    });
  }; ///// adjustHeight 함수 ///////////////

  // [4] 코멘트 삭제 함수 /////////////////////
  const deleteComment = (idx) => {
    // idx - 지울 코멘트 idx값
    // (1) 삭제여부를 다시한번 확인 후 "취소"시 리턴
    if (!window.confirm("Are you sure you want to delete?")) return;

    // (2) idx값을 비교해서 filter로 제거후 localStrage에 다시 저장
    let comDt = JSON.parse(localStorage.getItem("comment-data"));
    // idx가 지울idx와 같지 않은 것만 다시 담기함!
    comDt = comDt.filter((v) => v.idx !== idx);
    // 로컬스에 다시 저장!
    localStorage.setItem("comment-data", JSON.stringify(comDt));

    // (3) 코멘트 데이터 생성함수 호출!
    makeCommentData();
  }; ////////////// deleteComment 함수 //////////////

  // [5] 코멘트 수정상태 변경 함수 /////////////////////
  const modifyComment = (idx) => {
    // (1) 수정상태모드로 설정
    setIsEditing(idx);
    // (2) idx값이 동일한 코멘트를 선택
    const selData = commentData.find((v) => v.idx === idx);
    // (3) 수정대상 코멘트 컨텐트 데이터를 editedContent에 넣기
    setEditedContent(selData.cont);
    // 왜 넣었나요? 바로 다시 수정저장시 그대로 저장될 수 있게함!
  }; /// modifyComment 함수 //////////////

  // [6] 코멘트 수정저장 함수 /////////////////////
  const saveModifiedComment = (idx) => {
    // (1) 원본 코멘트 로컬스 데이터 불러와서 파싱하기
    let comDt = JSON.parse(localStorage.getItem("comment-data"));

    // (2) 파싱된 배열데이터의 해당 코멘트의 cont값을 변경함!
    comDt = comDt.map((v) =>
      v.idx === idx ? { ...v, cont: editedContent } : v
    );

    // (3) 로컬스에 다시 저장!
    localStorage.setItem("comment-data", JSON.stringify(comDt));

    // (4) 수정이 끝났으므로 수정모드 해제하기!
    setIsEditing(null); // 버튼이 다시 Send -> Modify로 변경

    // (5) 코멘트 데이터 상태변수에 반영하기
    makeCommentData();
  }; /// saveModifiedComment 함수 //////////////

  // [코멘트데이터 변경시에만 높이값 적용함수 호출!] ///
  useEffect(() => {
    adjustHeight();
  }, [commentData]);

  // [최초 로딩시 실행구역] //////////
  useEffect(() => {
    // 코멘트 데이터 셋팅함수 호출
    makeCommentData();
  }, []); ///// useEffect ///////////

  // ★★★★★★★★★★★★★★★★★★★★★★★ ////
  // ★★★★★★★★★★★★★★★★★★★★★★★ ////
  // ★★★★★★★★★★★★★★★★★★★★★★★ ////
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
        </tbody>
      </table>

      <br />
      {/* 버튼 출력박스 */}
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

      {/* 코멘트 입력 박스 */}
      {
        // 로그인한 사용자에게만 코멘트 입력란이 보인다!
        myCon.loginSts && (
          <table className="dtblview">
            <tbody>
              <tr>
                <td>Comments</td>
                <td>
                  <textarea
                    className="comment-box"
                    cols="60"
                    rows="5"
                  ></textarea>
                  <button
                    style={{
                      marginLeft: "10px",
                      height: "80px",
                      verticalAlign: "35px",
                    }}
                    onClick={saveComment}
                  >
                    Send
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      {/* 코멘트 데이터 출력 테이블 */}
      {
        // 코멘트가 있으면 출력 (상태변수로체크!)
        commentData && (
          <table className="dtblview">
            <tbody>
              {
                // 코멘트 테이터 만큼 반복생성하기
                commentData.map((v, i) => (
                  <tr key={i}>
                    {/* (1) 코멘트 쓴이 이름 */}
                    <td style={{ fontSize: "16px", fontWeight: "normal" }}>
                      {v.unm} <br />
                      {
                        // 로그인한 사용자 + 해당코멘트 작성자
                        // 삭제, 수정버튼 출력!
                        myCon.loginSts && myCon.loginSts.uid === v.uid && (
                          <>
                            <button
                              // 클릭시 지울 idx를 삭제함수에 보내줌!
                              onClick={() => deleteComment(v.idx)}
                            >
                              Delete
                            </button>

                            {/* 수정버튼은 수정모드에서 'send'버튼변경 */}
                            {
                              // 수정상태일때는 isEditing값과 v.idx값 일치
                              isEditing === v.idx ? (
                                <button
                                  /* Send버튼 클릭시 해당 코멘트값 수정 */
                                  onClick={() => {
                                    saveModifiedComment(v.idx);
                                  }}
                                >
                                  Send
                                </button>
                              ) : (
                                <button
                                  /* Modify버튼 클릭시 isEditing 값 변경 */
                                  onClick={() => {
                                    modifyComment(v.idx);
                                  }}
                                >
                                  Modify
                                </button>
                              )
                            }
                          </>
                        )
                      }
                    </td>
                    {/* (2) 코멘트 내용
                      -> textarea가 수정모드일때는 입력상태로 변경됨!
                    */}
                    <td>
                      <textarea
                        className="comment-view-box"
                        // 내용에 따른 높이값 정보를 참조변수에 노출
                        // 자기자신을 참조변수 textareaRef에 할당!
                        ref={(el) => (textareaRef.current[i] = el)}
                        value={
                          isEditing === v.idx // 수정해당이면
                            ? editedContent // 수정컨텐트변수넣기
                            : v.cont // 아니면 코멘트 데이터 넣기
                        }
                        // 읽기전용은 수정대상이 아닌경우만 해당함!
                        readOnly={isEditing !== v.idx}
                        // 수정모드시 타이핑 가능하게 onChange설정!
                        onChange={(e) => {
                          // e - 이벤트전달
                          // 수정모드일 경우 값이 변경되게함
                          if (isEditing === v.idx)
                            setEditedContent(e.target.value);
                          // 수정 코멘트 상태변수값이 변경되므로
                          // value속성에 설정된 수정 코멘트가
                          // 변경된 값으로 반영된다!!!
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          // 아웃라인으로 수정표시하기 ///
                          outline:
                            isEditing === v.idx
                              ? "2px solid blue" // 수정모드시 테두리
                              : "none", // 보통은 안보임
                          overflow: "hidden",
                          resize: "none",
                        }}
                      ></textarea>
                    </td>
                    {/* (3) 코멘트 날짜 */}
                    <td
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        width: "20%",
                      }}
                    >
                      {v.date}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      
    </main>
  );
}

export default Read;
