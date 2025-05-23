import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../js/db/firebaseConfig";
import { collection, getDocs, addDoc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { BoardPost, ReadProps, ModifyProps, WriteProps } from "../../types/board";

// 제이쿼리 불러오기 ///
import $ from "jquery";

// 게시판용 CSS 불러오기 ////
import "../../css/pages/board.scss";

// 로컬스토리지 확용 JS ////
import { initBoardData } from "../../js/func/board_fn";
import List from "../modules/board/List";
import Read from "../modules/board/Read";
import Write from "../modules/board/Write";
import Modify from "../modules/board/Modify";

// 전역 컨텍스트 API 사용하기!!
import { dCon } from "../modules/dCon";

function Board() {
  // 전역 컨텍스트 API 사용하기!!
  const myCon = useContext(dCon);

  // [ 상태관리변수 ] /////////////
  // 1. 페이지번호 상태변수
  const [pageNum, setPageNum] = useState(1);
  // 2. 검색어 상태변수
  const [keyword, setKeyword] = useState<{ cta: string; kw: string }>({ cta: "", kw: "" });
  // 3. 정렬상태 상태변수
  const [sort, setSort] = useState(1);
  // 4. 정렬기준 상태변수
  const [sortCta, setSortCta] = useState("date");
  // 5. 전체 데이터 개수 참조변수
  const totalCount = useRef(0);
  // 6. 선택된 게시글 상태변수
  const [selectedRecord, setSelectedRecord] = useState<BoardPost | null>(null);
  // 7. 페이지당 게시글 수
  const pgPgNum = useRef(5);

  // [ 게시판 데이터 상태변수 ] /////////////
  const [boardData, setBoardData] = useState<BoardPost[]>([]);

  // [ 게시판 모드 상태변수 ] /////////////
  // L: 리스트, W: 쓰기, R: 읽기, M: 수정
  const [mode, setMode] = useState("L");

  // [ 게시판 데이터 가져오기 ] /////////////
  const getBoardData = async () => {
    try {
      const boardRef = collection(db, "board-data");
      const querySnapshot = await getDocs(boardRef);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BoardPost[];
      setBoardData(data);
      totalCount.current = data.length;
    } catch (error) {
      console.error("Error getting board data:", error);
    }
  };

  // [ 게시글 추가 함수 ] /////////////
  const addBoardPost = async (postData: Omit<BoardPost, 'id' | 'cnt'>) => {
    try {
      const boardRef = collection(db, "board-data");
      await addDoc(boardRef, {
        ...postData,
        cnt: 0,
        date: new Date().toJSON().substring(0, 10)
      });
      getBoardData();
      setMode("L");
    } catch (error) {
      console.error("Error adding board post:", error);
    }
  };

  // [ 게시글 수정 함수 ] /////////////
  const updateBoardPost = async (postId: number, updateData: Partial<BoardPost>) => {
    try {
      const boardRef = collection(db, "board-data");
      const q = query(boardRef, where("idx", "==", postId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          ...updateData,
          mdate: new Date().toJSON().substring(0, 10)
        });
        getBoardData();
        setMode("L");
      }
    } catch (error) {
      console.error("Error updating board post:", error);
    }
  };

  // [ 게시글 삭제 함수 ] /////////////
  const deleteBoardPost = async (postId: number) => {
    try {
      const boardRef = collection(db, "board-data");
      const q = query(boardRef, where("idx", "==", postId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        await deleteDoc(querySnapshot.docs[0].ref);
        getBoardData();
        setMode("L");
      }
    } catch (error) {
      console.error("Error deleting board post:", error);
    }
  };

  // [ 최초 로딩시 실행구역 ] //////////
  useEffect(() => {
    getBoardData();
  }, []); ///// useEffect ///////////

  // 리턴 코드구역 ///////////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      {
        // 모드에 따라 다른 컴포넌트 출력
        mode === "L" && (
          <List
            boardData={boardData}
            pageNum={pageNum}
            setPageNum={setPageNum}
            keyword={keyword}
            setKeyword={setKeyword}
            sort={sort}
            setSort={setSort}
            sortCta={sortCta}
            setSortCta={setSortCta}
            totalCount={totalCount}
            selRecord={selectedRecord}
            setSelRecord={setSelectedRecord}
            pgPgNum={pgPgNum}
            setMode={setMode}
          />
        )
      }
      {mode === "W" && <Write addBoardPost={addBoardPost} setMode={setMode} />}
      {mode === "R" && selectedRecord && (
        <Read
          selRecord={selectedRecord}
          setMode={setMode}
          updateBoardPost={updateBoardPost}
          deleteBoardPost={deleteBoardPost}
        />
      )}
      {mode === "M" && selectedRecord && (
        <Modify
          selRecord={selectedRecord}
          setMode={setMode}
          updateBoardPost={updateBoardPost}
        />
      )}
    </main>
  );
}

export default Board;
