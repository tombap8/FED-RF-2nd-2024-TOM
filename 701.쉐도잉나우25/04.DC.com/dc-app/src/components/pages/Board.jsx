import React, { useEffect, useRef, useState } from "react";

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

function Board() {
  // [ 로컬스토리지 게시판 데이터 정보확인 함수호출! ] ////
  initBoardData();

  // [ 로컬스 데이터 변수할당하기! : 원본 배열 데이터 ] //////
  const baseData = JSON.parse(localStorage.getItem("board-data"));

  // [ ★★ 후크 상태관리 변수구역 ★★ ] //////
  // [1] 기능모드 /////
  const [mode, setMode] = useState("L");
  // (1) 리스트 모드(L) : List Mode
  // (2) 글보기 모드(R) : Read Mode
  // (3) 글쓰기 모드(W) : Write Mode
  // (4) 수정 모드(M) : Modify Mode (삭제포함)

  // [2] 페이징을 위한 페이지 번호 ////
  const [pageNum, setPageNum] = useState(1);

  // [3] 검색어 저장변수 : 객체 {cta:기준값,kw:검색어}
  const [keyword, setKeyword] = useState({
    cta: "tit",
    kw: "",
  });
// console.log("{cta:기준값,kw:검색어}", keyword);
  // cta - creteria / kw -  keyword

  // [4] 정렬 기준값 상태변수 : 값(asc(-1) / desc(1))
  const [order, setOrder] = useState(1);

  // [5] 정렬 항목값 상태변수 : 값 -> 정렬할 DB 컬럼명
  const [sortCta, setSortCta] = useState("date");
  // 초기값은 날짜를 기준한 desc정렬임!
  // sortCta는 sort Criteria (정렬기준)의 줄임말!

  // [ ★★ 리액트 참조변수 셋팅구역 ★★ ] //////

  // [1] 게시글 선택 데이터 : 글 내용보기시
  const selRecord = useRef(null);
  // -> 읽기/쓰기시 변수.current 로 사용함!
  // console.log("선택데이터 참조변수값:", selRecord);

  // [2] 전체 레코드 개수(배열데이터 개수)
  // -> 매번 계산하지 않도록 참조변수로 생성한다!
  const totalCount = useRef(baseData.length);
// console.log("전체개수:", totalCount);

  // [3] 페이징의 페이징 번호
  const pgPgNum = useRef(1);
  // -> 상태변수로 만들지 않은 이유는?
  // 페이징의 페이징번호가 변경될때 어차피
  // 상태변수인 페이징번호가 업데이트되어서
  // 전체 리랜더링된다! 따라서 이것은 값만 유지하면 됨!

  // [ 변수 초기화 처리함수 ] //////
  const initVariables = () => {
    setMode("L");
    setPageNum(1);
    setKeyword({ cta: "tit", kw: "" });
    setOrder(1);
    setSortCta("date");
    // selRecord.current = null;
    // totalCount.current = baseData.length;
    pgPgNum.current = 1;
  }; ////////// initVariables 함수 //////

  // [ ★★ 일반변수 셋팅구역 ★★ ] ///////////
  // ->>> 매번 같은 값을 유지해야하는 변수들

  // [1] 페이지당 개수 : 페이지당 레코드수
  const unitSize = 7;
  // [2] 페이징의 페이징 개수 : 한번에 보여줄 페이징 개수
  const pgPgSize = 3;

  // [ 일부 데이터만 선택하기 ]
  // -> 페이징을 하기위해 일정단위수만큼 보이기
  // -> pageNum, unitSize 사용하여 구성

  // 페이지 시작번호 : 단위수 * (페이지번호-1)
  let initNum = unitSize * (pageNum - 1);
  // 한계수 번호 : 단위수 * 페이지번호
  let limitNum = unitSize * pageNum;
  // 샘플계산 (단위수는 5, 1~3)
  // 시작수(5*(1-1)) = 0 / 한계수 (5*1) = 5
  // 시작수(5*(2-1)) = 5 / 한계수 (5*2) = 10
  // 시작수(5*(3-1)) = 10 / 한계수 (5*3) = 15

  // ★★★★★★★★★★★★★★★★★★★★★★★★ //
  // ★★★★★★ [ 데이터 필터링 하기 ] ★★★★★★ //
  // ★★★★★★★★★★★★★★★★★★★★★★★★ //

  // 최종 데이터 담을 변수
  let finalData;

  // [ 전체 데이터 검색 및 정렬 ] /////////////
  // [1] 검색어가 있는 경우 ////////
  if (keyword.kw !== "") {
    finalData = baseData
      // ((기준1))-> sortCta값에 따른 정렬
      // 내림차순은 -1 * order변수값이 1일 경우
      // 오름차순은 -1 * order변수값이 -1일 경우
      //
      .sort((a, b) =>
        a[sortCta] > b[sortCta]
          ? -1 * order
          : a[sortCta] < b[sortCta]
          ? 1 * order
          // 하위조건추가 : 두값이 같지않은가?
          : a[sortCta] !== b[sortCta]
          // 같지 않으면 0
          ? 0
          // 그밖에 두 값이 같은경우는?
          // idx항목으로 오름/내림차순정렬
          : a.idx > b.idx
          ? -1 * order
          : a.idx < b.idx
          ? 1 * order : 0
      )
      // 여기부터 검색어로 리스트 만들기
      .filter((v) => {
        if (
          v[keyword.cta].toLowerCase().indexOf(keyword.kw.toLowerCase()) !== -1
        )
          return true;
      }); ////// filter ////////
  } ///// if : 검색어가 있는 경우 /////////
  
  // [2] 검색어가 없는 경우 ////////
  else {
    finalData = baseData
      // ((기준1))-> sortCta값에 따른 정렬
      // 내림차순은 -1 * order변수값이 1일 경우
      // 오름차순은 -1 * order변수값이 -1일 경우
      //
      .sort((a, b) =>
        a[sortCta] > b[sortCta] 
          ? -1 * order
          : a[sortCta] < b[sortCta]
          ? 1 * order
          // 하위조건추가 : 두값이 같지않은가?
          : a[sortCta] !== b[sortCta]
          // 같지 않으면 0
          ? 0
          // 그밖에 두 값이 같은경우는?
          // idx항목으로 오름/내림차순정렬
          : a.idx > b.idx
          ? -1 * order
          : a.idx < b.idx
          ? 1 * order : 0
      );
  } ///// else : 검색어가 없는 경우 ////////

  // 전체 데이터 개수 업데이트 하기 /////
  totalCount.current = finalData.length;

// console.log("slice를 위한 시작값/끝값", initNum, "/", limitNum);

  // [ slice() 배열 메서드를 이용한 부분값 가져오기 ]
  const selData = finalData.slice(initNum, limitNum);
  // 배열 메서드 slice(시작순번, 끝순번)
  // (1) 시작순번 : 시작할 배열값 첫번째 순번
  // (2) 끝순번 : 출력에 포함되지 않는 마지막째 배열순번
  // (3) slice 중요특징 :
  //    1) 배열원본을 보존하여 새로운 배열생성!
  //    2) 끝순번 배열번호가 실제 배열번호보다 커도 에러나지 않고
  //      자동으로 없는 순번을 빠져나가준다!(내부 break셋팅됨!)

  // [ 선택 데이터 담을 배열변수 : for문을 사용한 경우 ] ///
  // const selData = [];

  // [ ★★ 페이징에 맞게 데이터를 다시 담기 ★★ ] ///
  // for (let i = initNum; i < limitNum; i++) {
  //   // ★★★매우중요함!!! 여분 페이지에서
  //   // (전체레코드수-1)보다 크면 for문을 나가야함!
  //   if (i > totalCount.current - 1) break;

  //   // 데이터 골라담기! ///
  //   selData.push(baseData[i]);
  // } //////////// for : 선택데이터 담기 ///////////

  /********************************************* 
    함수명 : searchFn
    기능 : 검색어 넣고 검색을 실행하도록
      검색어 상태변수값을 업데이트 한다!
    작동조건 : 검색버튼 클릭시(검색어입력후 엔터)
  *********************************************/
  const searchFn = () => {
    // 검색어 조건과 검색문자열을 담은 상태변수를 업데이트함!
    // -> 이것을 변경하면 전체가 변경되어 리랜더링된다!
    setKeyword({
      cta: $("#cta").val(),
      kw: $("#stxt").val(),
    });
  }; /////// searchFn 함수 ////////////////////

  // DOM 랜더링 실행구역 ///////
  useEffect(() => {
    // 스크롤 최상단 이동하기 ///
    window.scrollTo(0, 0);
  }); //// useEffect /////////

  // 리턴 코드구역 /////////////////
  return (
    <>
      {
        // [1] 리스트 모드 출력하기 : mode -> "L" ////
        mode === "L" && (
          <List
            selData={selData} // 선택 리스트 배열데이터
            setMode={setMode} // 모드 상태변수 setter
            selRecord={selRecord} // 선택데이터 참조변수
            // 페이징에 필요한 정보들 /////
            pageNum={pageNum} // 리스트 페이지번호 getter
            setPageNum={setPageNum} // 리스트 페이지번호 setter
            unitSize={unitSize} // 페이지당 레코드수
            totalCount={totalCount} // 전체 개수 참조변수
            pgPgSize={pgPgSize} // 페이징의 페이징 개수
            pgPgNum={pgPgNum} // 페이징의 페이징 번호
            // 검색, 정렬 관련 전달속성 셋팅 /////
            searchFn={searchFn} // 검색함수
            keyword={keyword} // 검색어 상태변수 getter
            setKeyword={setKeyword} // 검색어 상태변수 setter
            order={order} // 정렬 상태변수
            setOrder={setOrder} // 정렬 상태변수 setter
            sortCta={sortCta} // 정렬기준 상태변수 getter
            setSortCta={setSortCta} // 정렬기준 상태변수 setter
            initVariables={initVariables} // 변수초기화함수
          />
        )
      }

      {
        // [2] 보기모드 출력하기 : mode -> "R" ///
        mode === "R" && (
          <Read
            setMode={setMode} // 모드 상태변수 setter
            selRecord={selRecord} // 선택데이터 참조변수
          />
        )
      }

      {
        // [3] 쓰기모드 출력하기 : mode -> "W" ///
        mode === "W" && (
          <Write
            setMode={setMode} // 모드 상태변수 setter
            totalCount={totalCount} // 전체 개수 참조변수
            setPageNum={setPageNum} // 리스트 페이지번호 setter
            pgPgNum={pgPgNum} // 페이징의 페이징 번호
            initVariables={initVariables} // 변수초기화함수
          />
        )
      }

      {
        // [4] 수정모드 출력하기 : mode -> "M" ///
        mode === "M" && (
          <Modify
            setMode={setMode} // 모드 상태변수 setter
            selRecord={selRecord} // 선택데이터 참조변수
            totalCount={totalCount} // 전체 개수 참조변수
            setPageNum={setPageNum} // 리스트 페이지번호 setter
            pgPgNum={pgPgNum} // 페이징의 페이징 번호
          />
        )
      }
    </>
  );
}

export default Board;
