// DC PJ 게시판 읽기 모드 모듈 - Read.jsx

import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { dCon } from "../dCon";

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

    // [ TextArea 전용 셋팅 ] ///////////////////////
    // Read모듈에서만 사용되는 상태변수 및 참조변수 ///

    /// 코멘트가 있으면 변수에 할당함 ///
    const [commentData, setCommentData] = useState([]);
    const textareaRefs = useRef([]);

    // 호출시 모든 텍스트 박스의 높이를 조정함!
    const adjustHeight = () => {
      textareaRefs.current.forEach((textarea) => {
        console.log('높이:',textarea.scrollHeight);
          if (textarea) {
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
          }
      });
  };

  useEffect(() => {
        adjustHeight();
}, [commentData]);

    const makeCommentData = () => {
        if (localStorage.getItem("comment-data")) {
            let temp = localStorage.getItem("comment-data");
            temp = JSON.parse(temp);
            temp = temp
                .filter((v) => v.bid === selData.idx)
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
                );
            setCommentData(temp);
        }
    }; ///////// setCommentData 함수 //////////////

    useEffect(() => {
        makeCommentData();
    }, []);

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
                            <input type="text" className="name" size="20" readOnly={true} defaultValue={selData.unm} />
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input type="text" className="subject" size="60" readOnly={true} defaultValue={selData.tit} />
                        </td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea className="content" cols="60" rows="10" readOnly={true} defaultValue={selData.cont}></textarea>
                        </td>
                    </tr>
                    {
                        // 로그인한 사용자에게만 코멘트 쓰기란이 보인다!
                        myCon.loginSts && (
                            <tr>
                                <td>Comments</td>
                                <td>
                                    <textarea className="comment-box" cols="60" rows="5"></textarea>
                                    <button
                                        style={{
                                            marginLeft: "10px",
                                            height: "80px",
                                            verticalAlign: "35px",
                                        }}
                                        onClick={() => {
                                          // 빈 코멘트면 메시지와 돌아가기 ///
                                            if ($(".comment-box").val().trim() === "") {
                                                alert("Write comment");
                                                return;
                                            }

                                            // 로컬스 코멘트가 없으면 빈배열 있으면 파싱 데이터 할당당
                                            let comDt = localStorage.getItem("comment-data") ? JSON.parse(localStorage.getItem("comment-data")) : [];

                                            // idx값을 최대값구하기로 하여 unique key로 사용
                                            comDt.push({
                                                idx: Math.max(...comDt.map((v) => v.idx)) + 1,
                                                cont: $(".comment-box").val(),
                                                uid: myCon.loginSts.uid,
                                                unm: myCon.loginSts.unm,
                                                bid: selData.idx,
                                                date: new Date().toJSON().substring(0, 10),
                                            });

                                            localStorage.setItem("comment-data", JSON.stringify(comDt));

                                            // 내용지우기
                                            $(".comment-box").val("");
                                            // 코멘트 데이터 생성함수 호출
                                            makeCommentData();
                                        }}
                                    >
                                        Send
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <br />
            {
                // 코멘트 데이터가 있으면 출력
                commentData && (
                    <table className="dtblview">
                        <tbody>
                            {commentData.map((v, i) => (
                                <tr key={i}>
                                    <td style={{ fontSize: "16px", fontWeight: "normal" }}>
                                        {v.unm} <br />
                                        {myCon.loginSts && myCon.loginSts.uid === v.uid && (
                                            <>
                                                <button>delete</button>
                                                <button>Modify</button>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <textarea
                                            className="comment-box"
                                            ref={(el) => (textareaRefs.current[i] = el)}
                                            value={v.cont}
                                            readOnly
                                            rows={1}
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                outline: "none",
                                                overflow: "hidden",
                                                resize: "none",
                                            }}
                                        ></textarea>
                                    </td>
                                    <td style={{ fontSize: "16px", fontWeight: "normal", width: "20%" }}>{v.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
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
