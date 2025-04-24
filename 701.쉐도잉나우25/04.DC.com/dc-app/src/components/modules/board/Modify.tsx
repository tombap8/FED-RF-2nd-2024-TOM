// DC PJ 게시판 수정 모듈 - Modify.jsx

import React from "react";
import { BoardPost } from "../../../types/board";

// 제이쿼리 불러오기 ////
import $ from "jquery";

interface ModifyProps {
  selRecord: BoardPost;
  setMode: (mode: string) => void;
  updateBoardPost: (postId: number, updateData: Partial<BoardPost>) => Promise<void>;
}

function Modify({ selRecord, setMode, updateBoardPost }: ModifyProps) {
  // 선택된 데이터
  const selData = selRecord;

  // 글쓰기 저장 서브밋 함수 //////
  const submitFn = () => {
    // 제목입력항목
    let title = ($(".subject").val() as string)?.trim() || "";
    // 내용입력항목
    let content = ($(".content").val() as string)?.trim() || "";
    // trim()으로 앞뒤공백 제거후 검사!

    // (1) 공통 유효성검사
    // - 제목, 내용 모두 비었으면 리턴!
    if (title === "" || content === "") {
      alert("Insert title and content!");
      return;
    } /// if /////

    // (2) 서브밋 처리하기 //////
    else {
      // 수정할 현재 데이터 idx값(키값)
      let currIdx = selData.idx;

      // 수정 데이터 업데이트
      updateBoardPost(currIdx, {
        tit: title,
        cont: content,
        mdate: new Date().toJSON().substring(0, 10)
      });
    } /// else /////
  }; ////////// submitFn 함수 //////////////

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
                size={20}
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
                size={60}
                defaultValue={selData.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols={60}
                rows={10}
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
