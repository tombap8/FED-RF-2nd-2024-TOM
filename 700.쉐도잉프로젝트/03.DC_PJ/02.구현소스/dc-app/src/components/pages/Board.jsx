// 오피니언 페이지 컴포넌트 ///
import { Fragment, useContext, useReducer, useRef, useState } from "react";

// 사용자 기본정보 생성 함수
// import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본데이터 제이슨 -> 로컬쓰로 대체!!!
// import baseData from "../data/board.json";
// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면된다!
// 제이슨 파일 처리는 다르므로 확장자는 반드시 씀!

// 제이쿼리
import $ from "jquery";

// 게시판용 CSS
import "../../css/board.scss";
import "../../css/board_file.scss";

// 로컬스토리지 확인 JS
import { initBoardData } from "../func/board_fn";
import { dCon } from "../modules/dCon";

// 엑시오스 가져오기 : 파일전송 요청용
import axios from "axios";

export default function Board() {
  // 컨텍스트 사용하기
  const myCon = useContext(dCon);
  // 전역 로그인 상태 변수 확인(변수할당!)
  const sts = myCon.loginSts;
  // console.log("로그인상태:", sts);

  // 로컬스토리지 게시판 데이터 정보확인! //
  initBoardData();

  // 로컬스 데이터 변수할당하기!
  const baseData = JSON.parse(localStorage.getItem("board-data"));

  // 원본 데이터에 정렬 적용하기 : 내림차순
  baseData.sort((a, b) =>
    Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
  );

  ///////// [ 상태관리 변수 ] //////////////
  // [1] 페이지 번호
  const [pageNum, setPageNum] = useState(1);

  // [2] 기능모드
  const [mode, setMode] = useState("L");
  // (1) 리스트 모드(L) : List Mode
  // (2) 글보기 모드(R) : Read Mode
  // (3) 글쓰기 모드(W) : Write Mode
  // (4) 수정 모드(M) : Modify Mode (삭제포함)

  // [3] 검색어 저장변수 : 배열 [기준,검색어]
  const [keyword, setKeyword] = useState(["", ""]);
  console.log("[기준,키워드]", keyword);

  // [4] 정렬 기준값 상태변수 : 값 (asc(-1) / desc(1))
  const [sort, setSort] = useState(1);
  // -> 기존 셋팅값에 1을 곱하면 원래값, -1을 곱하면 반대값셋팅

  // [5] 정렬 항목값 상태변수 : 값 - idx / tit
  const [sortCta, setSortCta] = useState("idx");

  // [ 참조변수 ] ///
  // [1] 전체 개수 - 매번 계산하지 않도록 참조변수로!
  const totalCount = useRef(baseData.length);
  // console.log("전체개수:", totalCount);
  // [2] 선택 데이터 저장
  const selRecord = useRef(null);
  // -> 특정리스트 글 제목 클릭시 데이터 저장함!
  // [3] 페이징의 페이징 번호
  const pgPgNum = useRef(1);
  // [4] 파일저장 참조변수
  const uploadFile = useRef(null);

  // 파일저장변수 업데이트 함수
  const updateFileInfo = (x) => (uploadFile.current = x);

  // [ 일반 변수로 매번 같은값을 유지하면 되는 변수 ]
  // 페이지당 개수 : 페이지당 레코드수
  const unitSize = 4;
  // 페이징의 페이징 개수 : 한번에 보여줄 페이징개수
  const pgPgSize = 3;

  // [ 리듀서함수에서 쓸 리턴값 만들기 함수 ] ///
  const retVal = (gval, txt) => {
    return (
      // 1. 별구분자가 있는가?
      gval.indexOf("*") !== -1
        ? // 2. true면 split으로 잘라서 배열값 검사하기
          gval.split("*").includes(txt)
          ? // 2-1. 배열값에 있으면 true이므로 gval추가안함
            gval
          : // 2-2. false면 gval에 현재값 별 넣고 추가
            gval + (gval != "" ? "*" : "") + txt
        : // 3. 전체 false이면 빈값이 아니면 문자열검사하기
        gval == txt
        ? // 3-1. 값이 서로 같으면 추가하지 말기
          gval
        : // 3-2. 그밖의 경우엔 추가하기
          gval + (gval != "" ? "*" : "") + txt
    );
  }; ////// retVal함수 ///////////////

  // 검색 기능을 위한 리듀서 함수 ////
  const reducerFn = (gval, action) => {
    // gval - 지가 벨류레...의 줄임말...
    // -> 리듀서변수가 들어옴 (왜 들어와???)
    // 기존값을 활용하여 업데이트 하기 위해 들어옴!
    console.log("지발:", gval);

    // 1. 구조분해 할당으로 객체의 배열값 받기
    const [key, ele] = action.type;
    // 배열값 구조 : [구분문자열, 이벤트발생대상요소]
    // action.type은 리듀서 호출시 보낸 객체값(배열임!)
    console.log("key:", key, "\nele:", ele);
    // 2. key값에 따라 분기하기
    switch (key) {
      // (1) 검색일 경우 실행코드
      case "search": {
        // 검색기준값 읽어오기
        let creteria = $(ele).siblings(".cta").val();
        console.log("기준값:", creteria);
        // 검색어 읽어오기
        let txt = $(ele).prev().val();
        console.log(typeof txt, "/검색어:", txt);
        // input값은 안쓰면 빈스트링이 넘어옴!
        if (txt != "") {
          console.log("검색해!");
          // [검색기준,검색어] -> setKeyword 업데이트
          setKeyword([creteria, txt]);
          // 검색후엔 첫페이지로 보내기
          setPageNum(1);
          // 검색후엔 페이지의 페이징 번호 초기화(1)
          pgPgNum.current = 1;
        }
        // 빈값일 경우
        else {
          alert("Please enter a keyword!");
        }
        // 리턴코드값은 리듀서 변수에 할당!
        return retVal(gval, txt);
      }
      // (2) 전체리스트 돌아기기 실행코드
      case "back":
        {
          // 검색어 초기화
          setKeyword(["", ""]);
          // 검색어삭제(input이니까 val())
          $(ele).siblings("#stxt").val("");
          // 검색항목초기화
          $(ele).siblings("#cta").val("tit");
          // 정렬초기화
          setSort(1);
          // 정렬항목초기화
          setSortCta("idx");
          // 첫페이지번호변경
          setPageNum(1);
        }
        // 리턴코드값은 리듀서 변수에 할당!
        return gval;

      // (3) 기존 키워드 재검색일 경우 실행코드
      case "again": {
        // 검색기준값 읽어오기
        let creteria = $("#cta").val();
        console.log("기준값:", creteria);
        // 검색어 읽어오기
        let txt = $(ele).text();
        console.log(typeof txt, "/검색어:", txt);
        // 검색어 input 검색어 존에 넣기
        $("#stxt").val(txt);
        // input값은 안쓰면 빈스트링이 넘어옴!
        if (txt != "") {
          console.log("검색해!");
          // [검색기준,검색어] -> setKeyword 업데이트
          setKeyword([creteria, txt]);
          // 검색후엔 첫페이지로 보내기
          setPageNum(1);
          // 검색후엔 페이지의 페이징 번호 초기화(1)
          pgPgNum.current = 1;
        }
        // 빈값일 경우
        else {
          alert("Please enter a keyword!");
        }
        // 리턴코드값은 리듀서 변수에 할당!
        return retVal(gval, txt);
      }
    }
  };

  // 검색기능 지원 후크 리듀서 : useReducer
  const [memory, dispach] = useReducer(reducerFn, "");

  /*********************************************** 
 * [ 리듀서 후크 : useReducer ]
 * 복잡한 리액트 변수값/코드 처리를 해주는 후크
 *******************************************
function 리듀서함수(리듀서변수, 호출때보낸객체) {
  switch (호출때보낸객체.type) {
    case 값1:
      처리코드;
      return 처리값;
    case 값2:
      처리코드;
      return 처리값;
    default:
      처리코드;
      return 처리값;
  }
}

function 컴포넌트() {
  const [리듀서변수, 호출메서드] = 
  useReducer(리듀서함수, 리듀서변수초기값);

  return(
    <요소 on이벤트={()=>{
      호출메서드({ type: 값 });      
    } />
  );
} ///// 컴포넌트끝 ///////





  /********************************************** 
        함수명: bindList
        기능 : 페이지별 리스트를 생성하여 바인딩함
  **********************************************/
  const bindList = () => {
    // console.log(baseData);

    // 1. 전체 원본데이터 선택
    let orgData;

    // 1-1.검색어가 있는경우 필터하기
    // keyword[0] : 검색기준 / keyword[1] : 검색어
    if (keyword[1] != "") {
      orgData = baseData.filter((v) => {
        // 1. 소문자 처리하기
        // (1) 검색원본 데이터
        let orgTxt = v[keyword[0]].toLowerCase();
        // (2) 검색어 데이터
        let txt = keyword[1].toLowerCase();

        // console.log(v[keyword[0]].indexOf(keyword[1]));
        // 2. 필터 검색조건에 맞는 데이터 수집하기
        if (orgTxt.indexOf(txt) != -1) return true;
      });
    } /////// if //////////
    // 1-2.검색어가 없는경우 전체넣기
    else {
      orgData = baseData;
    } //////// else ///////

    // 1-3. 새로 데이터를 담은 후 바로 전체개수 업데이트 필수!
    totalCount.current = orgData.length;

    // 2. 정렬 적용하기 : 내림차순
    // sort값이 1이면 desc(현재상태유지)
    // sort값이 -1이면 asc(부호반대변경)
    // 정렬항목은 sortCta값에 따름("idx"/"tit")

    // "idx"정렬항목일 경우만 Number()처리함수
    const chgVal = (x) =>
      sortCta == "idx"
        ? // idx는 숫자형으로 정렬
          Number(x[sortCta])
        : // "tit"는 문자형이고 소문자로 비교
          x[sortCta].toLowerCase();

    orgData.sort((a, b) =>
      chgVal(a) > chgVal(b) ? -1 * sort : chgVal(a) < chgVal(b) ? 1 * sort : 0
    );

    // 3. 일부 데이터만 선택
    // 예시로 0번부터 9번까지만 선택
    // 한페이지당 10개라면...
    // 페이지 번호와 연관시켜 본다!
    // 1,2,3,4,...

    // 시작번호 = (페이지번호-1)*단위수
    let sNum = (pageNum - 1) * unitSize;
    // 끝번호 = 페이지번호*단위수
    let eNum = pageNum * unitSize;
    // console.log("첫번호:", sNum, "/끝번호:", eNum);
    // 결과배열
    const selData = [];

    // for문으로 배열 만들기
    for (let i = sNum; i < eNum; i++) {
      // console.log(i);
      // 끝번호가 전체 개수보다 크면 나가라!
      if (i >= totalCount.current) break;
      // 대상배열값 추가
      selData.push(orgData[i]);
    } ///// for //////

    console.log("일부데이터:", selData);
    console.log("여기:", selData.length);

    // if (selData.length == 0) setPageNum(pageNum - 1);
    // -> ListMode컴포넌트가 업데이트 되는동안에
    // 리스트 관련 상태변수를 업데이트하면
    // 업데이트 불가 에러 메시지가 발생한다!
    // 따라서 이런 코드는 다른 방식으로 변경해야함!

    return (
      // 전체 데이터 개수가 0 초과일 경우 출력
      // 0초과 ? map돌기코드 : 없음코드
      totalCount.current > 0 ? (
        selData.map((v, i) => (
          <tr key={i}>
            {/* 시작번호를 더하여 페이지별 순번을 변경 */}
            <td>{i + 1 + sNum}</td>
            <td>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // 읽기모드로 변경!
                  setMode("R");
                  // 해당 데이터 저장하기
                  selRecord.current = v;
                }}
              >
                {v.tit}
              </a>
            </td>
            <td>{v.unm}</td>
            <td>{v.date}</td>
            <td>{v.cnt}</td>
          </tr>
        ))
      ) : (
        // 데이터가 없을 때 출력 /////////
        <tr>
          <td colSpan="5">There is no data.</td>
        </tr>
      )
    ); //// return /////
  }; /////////// bindList 함수 /////////////////

  // 버튼 클릭시 변경함수 ////////
  const clickButton = (e) => {
    // 버튼글자 읽기
    let btnText = e.target.innerText;
    // console.log(btnText);
    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "Write":
        setMode("W");
        break;
      // 리스트모드로 변경
      case "List":
        setMode("L");
        // 검색시에도 전체 데이터나오게 함
        setKeyword(["", ""]);
        break;
      // 서브밋일 경우 함수호출!
      case "Submit":
        submitFn();
        break;
      // 수정일 경우 수정모드로 변경
      case "Modify":
        setMode("M");
        break;
      // 삭제일 경우 삭제함수 호출
      case "Delete":
        deleteFn();
        break;
    }
  }; ////////// clickButton //////////

  // 삭제 처리함수 //////////////
  const deleteFn = () => {
    // 삭제여부확인
    if (window.confirm("Are you sure you want to delete?")) {
      // 1. 해당항목 idx담기
      let currIdx = selRecord.current.idx;
      // 2. some()로 순회하여 해당항목 삭제하기
      // find()와 달리 some()은 결과값을 boolean값으로
      // 리턴하여 처리한다! 이것을 이용하여 코드처리해보자!
      baseData.some((v, i) => {
        if (v.idx == currIdx) {
          // 해당순번 배열값을 삭제하자!
          // 배열삭제는  splice(순번,1)
          baseData.splice(i, 1);

          // 리턴true할 경우 종료!
          return true;
        } ///// if ////
      }); ///// some ///////

      // 3. 로컬스에 업데이트하기 //////
      localStorage.setItem("board-data", JSON.stringify(baseData));

      // 4. 삭제후 리스트 리랜더링시 리스트 불일치로 인한
      // 에러를 방지하기 위하여 전체 개수를 바로 업데이트한다!
      totalCount.current = baseData.length;

      // 4. 리스트로 돌아가기 -> 리랜더링 /////
      // -> 모드변경! "L"
      setMode("L");
      // -> 삭제후 첫페이지로 이동!
      setPageNum(1);
    } ///////// if ///////////////
  }; //////// deleteFn ///////////////

  // 서브밋 처리함수 //////////////
  const submitFn = () => {
    // 제목입력항목
    let title = $(".subject").val().trim();
    // 내용입력항목
    let cont = $(".content").val().trim();
    // trim()으로 앞뒤공백 제거후 검사!

    // 1. 공통 유효성검사
    // 제목,내용 모두 비었으면 리턴!
    if (title == "" || cont == "") {
      alert("Insert title or content!");
      return; // 서브밋없이 함수나가기!
    } ////// if ////

    // 2. 글쓰기 서브밋 (mode=="W")
    if (mode == "W") {
      // 0.현재 로그인 사용자 정보 파싱하기
      let person = JSON.parse(sts);

      // 1. 오늘날짜 생성하기 /////
      let today = new Date();
      // yy-mm-dd 형식으로 구하기
      // 제이슨 날짜형식 : toJSON()
      // ISO 표준형식 : toISOString()
      // 시간까지 나오므로 앞에 10자리만 가져감!
      // 문자열.substr(0,10)

      // 2. 글번호 만들기 /////
      // 전체 데이터중 idx 만 모아서 배열만들기
      let arrIdx = baseData.map((v) => parseInt(v.idx));
      // console.log(arrIdx);
      // 최대값 찾기 : 스프레드 연산자로 배열값만 넣음!
      let maxNum = Math.max(...arrIdx);
      // console.log(maxNum);

      // 파일업데이트 정보찍기
      console.log(uploadFile.current);

      // 3. 입력 데이터 객체형식으로 구성하기 ////
      let data = {
        idx: maxNum + 1,
        tit: title,
        cont: cont,
        att: uploadFile.current ? uploadFile.current.name : "",
        date: today.toJSON().substr(0, 10),
        uid: person.uid,
        unm: person.unm,
        cnt: "0",
      };
      // console.log("글쓰기 서브밋:",data);

      // 파일전송 실패상태변수
      let isFail = false;

      // [선택파일 서버전송]
      // 파일이 있을 때만 전송
      if (uploadFile.current) {
        // 원래는 form 태그로 싸여있어서 서버전송을 하지만
        // 없어도 form 전송을 서버에 할 수 있는 객체가 있다!
        // FormData() 클래스 객체임!
        const formData = new FormData();
        // 전송할 데이터 추가하기
        formData.append("file", uploadFile.current);

        // 폼데이터에는 키값이 있음 확인하자!
        for (const key of formData) console.log(key);

        // 서버전송은 엑시오스로 하자!
        // server.js에 서버에서 post방식으로 전송받는
        // 셋팅이 익스프레스에서 되어 있어야함!
        // 첫번째 셋팅값 전송url에는 서버에 셋팅된
        // 포스트 방식 전송명인 /xxx를 하위경로에 써준다!
        axios
          .post(
            "https://express-server-r4ufitp63-tombap8s-projects.vercel.app/xxx",
            formData
          )
          .then((res) => {
            // res는 성공결과 리턴값 변수
            const { fileName } = res.data;
            console.log("전송성공!!!", fileName);
          })
          .catch((err) => {
            // err은 에러발생시 에러정보 변수
            console.log("에러발생:", err);
            // 실패 했으므로 업로드 실패상태 변수업데이트
            isFail = true;
          });

        // 파일참조변수 초기화필수!!!
        uploadFile.current = null;
      } ///////////////// if ///////////////

      // 파일업로드 실패시 아래 코드는 실행하지 않음!
      // 즉, DB 에 입력하지 않는다!
      if (isFail) {
        alert("파일전송에 실패하였습니다~!!!");
        return;
      } /////// if //////////

      // 4. 로컬스에 입력하기 //////
      // (1) 로컬스 파싱
      let locals = localStorage.getItem("board-data");
      locals = JSON.parse(locals);
      // (2) 파싱배열에 push
      locals.push(data);
      // (3) 새배열을 문자화하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(locals));

      // 로컬스 확인!
      // console.log(localStorage.getItem("board-data"));

      // 5. 추가후 리스트 리랜더링시 리스트 불일치로 인한
      // 에러를 방지하기 위하여 전체 개수를 바로 업데이트한다!
      // 이때 실제로 업데이트된 locals 배열객체의 개수를 센다!
      totalCount.current = locals.length;

      // 6. 리스트로 돌아가기 -> 리랜더링 /////
      // -> 모드변경! "L"
      setMode("L");
      // -> 추가후 첫페이지로 이동!
      setPageNum(1);
    } /// if ///

    // 3. 수정모드 서브밋 (mode=="M")
    else if (mode == "M") {
      // 1. 오늘날짜 생성하기 /////
      // -> 수정시 수정날짜 항목을 새로 만들고 입력함!
      let today = new Date();
      // yy-mm-dd 형식으로 구하기
      // 제이슨 날짜형식 : toJSON()
      // ISO 표준형식 : toISOString()
      // 시간까지 나오므로 앞에 10자리만 가져감!
      // 문자열.substr(0,10)

      // 2. 현재 데이터 idx값
      let currIdx = selRecord.current.idx;

      // 3. 기존 데이터로 찾아서 변경하기
      // : 로컬스 데이터 -> baseData
      // find()는 특정항목을 찾아서 리턴하여 데이터를 가져
      // 오기도 하지만 업데이트 등 작업도 가능함!
      baseData.find((v) => {
        // console.log(v,selRecord);
        if (v.idx == currIdx) {
          // [ 업데이트 작업하기 ]
          // 기존항목변경 : tit, cont
          // 이미 선택된 selRecord 참조변수의 글번호인 idx로
          // 원본 데이터를 조회하여 기존 데이터를 업데이트함!

          // (1) 글제목 : tit
          v.tit = title;
          // (2) 글내용 : cont
          v.cont = cont;
          // 추가항목
          // (원래는 확정된 DB스키마에 따라 입력해야하지만
          // 우리가 사용하는 로컬스토리지의 확장성에 따라 필요한
          // 항목을 추가하여 넣는다!)
          // (3) 수정일 : mdate
          v.mdate = today.toJSON().substr(0, 10);

          // 해당항목을 만나면 끝남!
          return true;
        } /// if ///
      }); /////// find 메서드 /////////

      // 4. 로컬스에 업데이트하기 //////
      localStorage.setItem("board-data", JSON.stringify(baseData));

      // 로컬스 확인!
      // console.log(localStorage.getItem("board-data"));

      // 5. 리스트로 돌아가기 /////
      // -> 모드변경! "L"
      setMode("L");
    }
  }; ////////// submitFn //////////////

  //// 코드 리턴구역 //////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      {
        // 1. 리스트 모드일 경우 리스트 출력하기
        mode == "L" && (
          <ListMode
            bindList={bindList}
            totalCount={totalCount}
            unitSize={unitSize}
            pageNum={pageNum}
            setPageNum={setPageNum}
            pgPgNum={pgPgNum}
            pgPgSize={pgPgSize}
            setKeyword={setKeyword}
            keyword={keyword}
            sort={sort}
            setSort={setSort}
            sortCta={sortCta}
            setSortCta={setSortCta}
            dispach={dispach}
            memory={memory}
          />
        )
      }
      {
        // 2. 읽기 모드일 경우 상세보기 출력하기
        mode == "R" && <ReadMode selRecord={selRecord} sts={sts} />
      }
      {
        // 3. 쓰기 모드일 경우 로그인 정보 보내기
        // sts값은 문자열이므로 파싱하여 객체로 보냄
        mode == "W" && (
          <WriteMode sts={JSON.parse(sts)} updateFileInfo={updateFileInfo} />
        )
      }
      {
        // 4. 수정 모드일 경우 상세보기 출력하기
        mode == "M" && <ModifyMode selRecord={selRecord} />
      }
      <br />
      {/* 모드별 버튼출력 박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                // 1. 글쓰기 버튼은 로그인상태이고 "L"이면출력
                mode == "L" && sts && (
                  <button onClick={clickButton}>Write</button>
                )
              }
              {
                // 2. 읽기상태 "R" 일 경우
                <>
                  {mode == "R" && <button onClick={clickButton}>List</button>}

                  {
                    // console.log("비교:",
                    // JSON.parse(sts).uid,
                    // "==?",
                    // selRecord.current.uid)
                  }

                  {
                    // 로그인한 상태이고 글쓴이와 일치할때
                    // 수정보드 이동버튼이 노출됨!
                    // 현재글은 selRecord 참조변수에 저장됨
                    // 글정보 항목중 uid 가 사용자 아이디임!
                    // 로그인 상태정보하위의 sts.uid와 비교함
                    mode == "R" &&
                      sts &&
                      JSON.parse(sts).uid == selRecord.current.uid && (
                        <button onClick={clickButton}>Modify</button>
                      )
                  }
                </>
              }
              {
                // 3. 쓰기상태 "W" 일 경우
                mode == "W" && (
                  <>
                    <button onClick={clickButton}>Submit</button>
                    <button onClick={clickButton}>List</button>
                  </>
                )
              }
              {
                // 4. 수정상태 "M" 일 경우
                mode == "M" && (
                  <>
                    <button onClick={clickButton}>Submit</button>
                    <button onClick={clickButton}>Delete</button>
                    <button onClick={clickButton}>List</button>
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
} /////////// Board /////////////////////

/****************************************** 
        리스트 모드 서브 컴포넌트
******************************************/
const ListMode = ({
  bindList,
  totalCount,
  unitSize,
  pageNum,
  setPageNum,
  pgPgNum,
  pgPgSize,
  keyword,
  setKeyword,
  sort,
  setSort,
  sortCta,
  setSortCta,
  dispach,
  memory,
}) => {
  /******************************************* 
    [ 전달변수 ] - 2~5까지 4개는 페이징전달변수
    1. bindList : 리스트 결과 요소
    2. totalCount : 전체 레코드 개수
    3. unitSize : 게시판 리스트 당 레코드 개수
    4. pageNum : 현재 페이지번호
    5. setPageNum : 현재 페이지번호 변경 메서드
    6. pgPgNum : 페이지번호
    7. pgPgSize : 페이징의 페이지 크기
    8. keyword : 검색어
    9. setKeyword : 검색어셋팅
    10. sort : 정렬기준
    11. setSort : 정렬기준셋팅
    12. sortCta : 정렬항목
    13. setSortCta : 정렬항목셋팅
  *******************************************/

  // 코드리턴구역 //////////////////////
  return (
    <>
      <div className="selbx">
        <select name="cta" id="cta" className="cta">
          <option value="tit">Title</option>
          <option value="cont">Contents</option>
          <option value="unm">Writer</option>
        </select>

        <select
          name="sel"
          id="sel"
          className="sel"
          onChange={() => setSort(sort * -1)}
          value={sort == 1 ? "0" : "1"}
        >
          <option value="0">Descending</option>
          <option value="1">Ascending</option>
        </select>
        <input
          id="stxt"
          type="text"
          maxLength="50"
          onKeyUp={(e) => {
            // e.keyCode는 번호로 13이 엔터
            // e.key 는 문자로 "Enter"가 엔터
            // console.log(e.key,e.keyCode);
            if (e.key == "Enter") {
              $(e.currentTarget).next().trigger("click");
            }
          }}
        />
        <button
          className="sbtn"
          onClick={(e) => {
            // 리듀서 메서드 호출
            dispach({ type: ["search", e.target] });
            // 보낼값구성 : [구분문자열, 이벤트발생요소]
          }}
        >
          Search
        </button>
        {
          // 키워드가 있는 경우에 전체 리스트 돌아가기 버튼출력
          keyword[0] !== "" && (
            <button
              className="back-total-list"
              onClick={(e) => {
                // 리듀서 메서드 호출
                dispach({ type: ["back", e.target] });
                // 보낼값구성 : [구분문자열, 이벤트발생요소]
              }}
            >
              Back to Total List
            </button>
          )
        }

        {/* 정렬기준선택박스 */}
        <select
          name="sort_cta"
          id="sort_cta"
          className="sort_cta"
          onChange={(e) => setSortCta(e.currentTarget.value)}
          style={{ float: "right", translate: "0 5px" }}
          value={sortCta}
        >
          <option value="idx">Recent</option>
          <option value="tit">Title</option>
        </select>
        <button
          style={{ position: "relative" }}
          onClick={(e) => {
            // 클릭시 하위 ol 보이기
            $(e.currentTarget).find("ol").show();
          }}
        >
          History
          <ol
            style={{
              position: "absolute",
              lineHeight: "1.7",
              padding: "5px 15px",
              border: "1px solid gray",
              borderRadius: "10px",
              backgroundColor: "#f8f8ffcc",
              display: "none",
            }}
            onMouseLeave={(e) => {
              // 아웃시 숨기기
              $(e.currentTarget).hide();
            }}
          >
            {memory.indexOf("*") !== -1 &&
              memory.split("*").map((v) => (
                <li>
                  <b
                    onClick={(e) => {
                      // 리듀서 메서드 호출
                      dispach({ type: ["again", e.target] });
                      // 보낼값구성 : [구분문자열, 이벤트발생요소]
                    }}
                  >
                    {v}
                  </b>
                </li>
              ))}
          </ol>
        </button>
      </div>
      <table className="dtbl" id="board">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>{bindList()}</tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="paging">
              {
                // 데이터 개수가 0이상일때만 출력
                totalCount.current > 0 && (
                  <PagingList
                    totalCount={totalCount}
                    unitSize={unitSize}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    pgPgNum={pgPgNum}
                    pgPgSize={pgPgSize}
                  />
                )
              }
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}; //////////// ListMode ///////////////////

/****************************************** 
        읽기 모드 서브 컴포넌트
******************************************/
const ReadMode = ({ selRecord, sts }) => {
  // selRecord - 현재글정보 / sts - 로그인 사용자정보
  // 읽기 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  // [ 조회수 증가하기 ]
  // 규칙1 : 자신의 글은 증가하지 않는다!
  // 규칙2 : 타인의 글은 증가한다!
  // 규칙3 : 로그인한 상태에서 한번만 증가한다!

  // ((조회된 글 저장방법))
  // -> 세션스토리지는 적합! 창을 닫으면 사라지니까!
  // -> 쿠키는 삭제방법이 즉각적이지 못하므로 제외!
  // -> 참조변수는 새로고침하면 초기화 되므로 제외!

  // 1.세션스 없으면 세션스 만들기
  if (!sessionStorage.getItem("bd-rec")) {
    sessionStorage.setItem("bd-rec", "[]");
  }
  // 2.세션스에 글번호 저장하기

  // (1) 세션스 파싱하여 변수할당
  let rec = JSON.parse(sessionStorage.getItem("bd-rec"));

  // (2) 기존 배열값에 현재글번호 존재여부검사하기
  // 결과가 true이면 조회수를 증가하지 않는다!
  let isRec = rec.includes(data.idx);
  console.log("이미있니?", isRec);

  // (3) 로그인한 사용자의 글이면 isRec값을 true처리
  // sts가 true이면 즉, 로그인한 사용자이면 처리
  if (sts) {
    console.log(
      "선택글 아이디:",
      data.uid,
      "로그인사용자 아이디:",
      JSON.parse(sts).uid
    );
    // 글쓴이 아이디와 로그인사용자 아이디가 같은가?
    if (data.uid == JSON.parse(sts).uid) {
      // 글번호저장과 조회수증가를 하지 않도록 isRec값을
      // true로 변경한다!
      isRec = true;
    } //// if ///
  } /// if ///

  // (4) 배열에 값 추가하기 : 기존값에 없으면 넣기!
  if (!isRec) rec.push(data.idx);

  // (5) 다시 세션스에 저장하기
  sessionStorage.setItem("bd-rec", JSON.stringify(rec));

  // 3. 글번호 증가하기
  // -> 게시판 원본 데이터에 조회수 업데이트하기
  if (!isRec) {
    // (1) 게시판 로컬스 데이터 파싱
    let bdData = JSON.parse(localStorage.getItem("board-data"));

    // (2) 게시판 해당데이터 cnt값 증가
    // 조건: isRec값이 false일때
    bdData.some((v) => {
      if (v.idx == data.idx) {
        // 기존값에 1증가하여 넣기
        v.cnt = Number(v.cnt) + 1;
        return true;
      } /// if ///
    }); /// some ////

    // (3) 다시 로컬스에 저장하기
    localStorage.setItem("board-data", JSON.stringify(bdData));
  } /// if : (!isRec) ///

  // 이미지 미리보기 대상 이미지 확장자 배열변수
  const imgExt = ["jpg", "png", "gif"];

  /////// 코드리턴 구역 ///////////
  return (
    <>
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
                readOnly
                value={data.unm}
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
                readOnly
                value={data.tit}
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
                readOnly
                value={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td>
              {
                // 첨부파일 데이터가 빈값이 아닐때만 출력!
                data.att != "" && (
                  <>
                    <a
                      href={process.env.PUBLIC_URL + "/uploads/" + data.att}
                      download={data.att}
                    >
                      {data.att}
                    </a>
                    {imgExt.includes(data.att.split(".")[1]) && (
                      <div>
                        <img
                          src={process.env.PUBLIC_URL + "/uploads/" + data.att}
                          alt="image"
                          style={{ width: "100%" }}
                        />
                      </div>
                    )}
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ReadMode //////////////////

/****************************************** 
        쓰기 모드 서브 컴포넌트
******************************************/
const WriteMode = ({ sts, updateFileInfo }) => {
  // sts - 로그인 상태정보
  // updateFileInfo - 업로드파일 정보 업데이트 함수
  // 로그인한 사람만 글쓰기 가능!
  // console.log(sts);

  return (
    <>
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
                readOnly
                // 로그인한 사람이름
                value={sts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="text"
                className="email"
                size="40"
                readOnly
                // 로그인한 사람이메일
                value={sts.eml}
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
            <td>
              {/* 파일정보를 하위 컴포넌트에서 상위컴포넌트
              변수인 uploadFild에 저장한다! */}
              <AttachBox saveFile={updateFileInfo} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// WriteMode //////////////////

/****************************************** 
        수정 모드 서브 컴포넌트
******************************************/
const ModifyMode = ({ selRecord }) => {
  // 읽기 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  // 이미지 미리보기 대상 이미지 확장자 배열변수
  const imgExt = ["jpg", "png", "gif"];

  return (
    <>
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
                readOnly
                value={data.unm}
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
                defaultValue={data.tit}
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
                defaultValue={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td>
              {
                // 첨부파일 데이터가 빈값이 아닐때만 출력!
                data.att != "" && (
                  <>
                    <a
                      href={process.env.PUBLIC_URL + "/uploads/" + data.att}
                      download={data.att}
                    >
                      {data.att}
                    </a>
                    {imgExt.includes(data.att.split(".")[1]) && (
                      <div>
                        <img
                          src={process.env.PUBLIC_URL + "/uploads/" + data.att}
                          alt="image"
                          style={{ width: "100%" }}
                        />
                      </div>
                    )}
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ModifyMode //////////////////

/****************************************** 
    PagingList : 페이징 기능 컴포넌트
******************************************/
const PagingList = ({
  totalCount,
  unitSize,
  pageNum,
  setPageNum,
  pgPgNum,
  pgPgSize,
}) => {
  /******************************************* 
    [ 전달변수 ]
    1. totalCount : 전체 레코드 개수
    2. unitSize : 게시판 리스트 당 레코드 개수
    3. pageNum : 현재 페이지번호
    4. setPageNum : 현재 페이지번호 변경 메서드
  *******************************************/
  // 전체 페이징 개수 : 전체레코드수 / 페이지당개수
  // 유의점: 나머지가 있는지 검사해서 있으면 +1

  // 1. 페이징 개수
  let pagingCount = Math.floor(totalCount.current / unitSize);

  // 나머지가 있으면 다음 페이지가 필요함!
  // 나머지가 0이 아니면 1더하기
  if (totalCount.current % unitSize > 0) {
    pagingCount++;
  }

  console.log(
    "페이징개수:",
    pagingCount,
    "전체레코드수:",
    totalCount.current,
    "나머지개수:",
    totalCount.current % unitSize
  );

  // [ 페이징의 페이징 하기 ]
  // [1] 페이징 블록
  // - 한 페이징블록수 : pgPgSize 변수(4개)
  // [2] 페이징의 페이징 현재번호
  // - pgPgNum 변수(기본값1)

  // 2. 페이지의 페이징 한계수 구하기
  // (1) 페이징의 페이징 개수
  // 전체 페이징 개수 / 페이징의 페이징 단위수
  let pgPgCount = Math.floor(pagingCount / pgPgSize);

  // 페이징 개수를 페이징의 페이징 단위수로
  // 나눈 나머지가 있으면 다음 페이징의 번호가 필요함!
  // 나머지가 0이 아니면 1더하기
  if (pagingCount % pgPgSize > 0) {
    pgPgCount++;
  } /// if ////

  console.log("페이징의 페이징개수:", pgPgCount);
  console.log("페이징의 페이징번호:", pgPgNum.current);
  // 검색시 페이징번호 초기화필요!

  // (2) 리스트 시작값 / 한계값 구하기
  // 시작값 : (페페넘-1)*페페단
  let initNum = (pgPgNum.current - 1) * pgPgSize;
  // 한계값 : 페페넘*페페단
  let limitNum = pgPgNum.current * pgPgSize;

  console.log("시작값:", initNum, "/한계값:", limitNum);

  ///// [ 링크코드 만들기 ] /////////////////
  const pgCode = [];

  // [ 페이징의 페이징에 맞게 돌면서 코드만들기 ]
  // 계산된 시작값, 한계값을 기준으로 코드를 생성!
  // [1] for : 페이징 리스트 출력 시작 ///////////
  for (let i = initNum; i < limitNum; i++) {
    // 전체 페이징 번호를 만드는 i가 페이징 전체개수보다
    // 클 경우 나가야함!
    if (i >= pagingCount) break;

    pgCode.push(
      <Fragment key={i}>
        {
          // 페이징번호와 현재페이지번호 일치시 b요소
          i + 1 === pageNum ? (
            <b>{i + 1}</b>
          ) : (
            // 불일치시에 모드 링크코드
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPageNum(i + 1);
              }}
            >
              {i + 1}
            </a>
          )
        }
        {/* 사이에 바넣기 */}
        {i + 1 !== limitNum && i + 1 < pagingCount && " | "}
      </Fragment>
    );
  } ////// [1] for : 페이징 리스트 출력 끝 /////

  {
    // [2] 페이징 이전블록 이동버튼 만들기
    // 기준: 1페이지가 아니면 보여라!
    // 배열 맨앞추가는 unshift()
    pgCode.unshift(
      pgPgNum.current === 1 ? (
        ""
      ) : (
        // for문으로 만든 리스트에 추가하는 것이므로
        // key 값이 있어야함! 단, 중복되면 안됨!
        // 중복안되는 수인 마이너스로 셋팅한다!
        <Fragment key={-1}>
          &nbsp;&nbsp;
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(-1, false);
            }}
            title="move previous end"
            style={{ marginLeft: "10px" }}
          >
            «
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(-1, true);
            }}
            title="move previous"
            style={{ marginLeft: "10px" }}
          >
            ◀
          </a>
          &nbsp;&nbsp;
        </Fragment>
      )
    );
  }
  {
    // [3] 페이징 다음블록 이동버튼 만들기
    // 기준: 끝페이지가 아니면 보여라!
    // 배열 맨뒤추가는 push()
    pgCode.push(
      pgPgNum.current === pgPgCount ? (
        ""
      ) : (
        // for문으로 만든 리스트에 추가하는 것이므로
        // key 값이 있어야함! 단, 중복되면 안됨!
        // 중복안되는 수인 마이너스로 셋팅한다!
        <Fragment key={-2}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(1, true);
            }}
            title="move next"
            style={{ marginLeft: "10px" }}
          >
            ▶
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(1, false);
            }}
            title="move next end"
            style={{ marginLeft: "10px" }}
          >
            »
          </a>
        </Fragment>
      )
    );
  }

  // [ 블록이동함수 ] //////
  const goPaging = (dir, opt) => {
    // dir - 이동방향(오른쪽:+1, 왼쪽:-1)
    // opt - 일반이동(true), 끝이동(false)
    console.log("방향:", dir, "/옵션:", opt);

    // 새 페이징의 페이징번호
    let newPgPgNum;

    // 1. opt 옵션에 따라 페이징의 페이징이동번호 만들기
    // (1) 일반 페이징이동은 현재페이징번호에 증감
    if (opt) newPgPgNum = pgPgNum.current + dir;
    // (2) 끝 페이징이동은
    // 오른쪽(1)일 경우 맨끝 페이징번호로 이동(pgPgCount)
    // 왼쪽(-1)일 경우 맨앞 페이징번호로 이동(1)
    else newPgPgNum = dir == 1 ? pgPgCount : 1;

    // 2.페이징의 페이징 번호 업데이트하기
    pgPgNum.current = newPgPgNum;

    // 3. 새로운 페이지의 페이징 구역의
    // 첫번째 페이지번호 업데이트하기
    // -> 항상 이전블록의 마지막번호 + 1 이 다음페이지 첫번호임!
    // 이동할 페이지번호
    let landingPage = (pgPgNum.current - 1) * pgPgSize + 1;
    console.log("도착페이지번호:", landingPage);
    // 페이지번호 상태변수 업데이트로 전체 리랜더링!!!
    setPageNum(landingPage);
  }; //////////// goPaging /////////////

  // 코드리턴
  return pgCode;
}; ////////// pagingList 함수 //////////////

/////////////////////////////////////////////
// 업로드 기능 서브 컴포넌트 및 메서드 만들기 ///
//////////////////////////////////////////////

// 업로드 모듈을 리턴하는 서브컴포넌트 ////////
const AttachBox = ({ saveFile }) => {
  // saveFile 프롭스펑션다운!
  // [상태관리변수] //////////////
  // 1.드래그 또는 파일을 첨부할때 활성화 여부관리 변수
  // 값: true 이면 활성화, false이면 비활성화
  const [isOn, setIsOn] = useState(false);
  // 2. 업로드파일 정보 관리변수
  const [uploadedInfo, setUploadedInfo] = useState(null);

  // [ 이벤트 처리 메서드 ]
  // 드래그 대상영역을 들어가고 나갈때 isOn 상태값 업데이트하기
  const controlDragEnter = () => setIsOn(true);
  const controlDragLeave = () => setIsOn(false);
  // 드래그를 할때 dragOver 이벤트는 비활성화함!(필요가 없어서!)
  const controlDragOver = (e) => e.preventDefault();

  // 드롭이벤트 발생시 처리 메서드
  const controlDrop = (e) => {
    // 기본 드롭기능 막기
    e.preventDefault();
    // 드롭했으므로 비활성화 전환!
    setIsOn(false);

    // 파일정보 읽어오기
    // 드롭된 파일로 부터 전송된 파일정보는 아래와 같이 읽어온다!
    const fileInfo = e.dataTransfer.files[0];
    console.log(fileInfo);

    // 파일정보셋팅 메서드 호출!
    setFileInfo(fileInfo);

    // 서브밋 저장구역에서 파일정보를 사용하도록
    // 상위 컴포넌트 변수인 uploadFile에 저장하는
    // 함수인 updateFileInfo() 를 호출하는 속성인
    // saveFile() 속성 함수를 사용하여 업데이트한다!
    saveFile(fileInfo);

    // 서버전송은 서브밋 버튼 클릭후 실행!!!
  }; ///////// controlDrop 메서드 ////////

  // 드롭된 파일 정보를 화면 뿌려주는 메서드 //////
  const setFileInfo = (fileInfo) => {
    // 전달된 객체값을 한번에 할당하는 방법(객체 구조분해법)
    // 구조분해 할당을 하면 객체의 값이 담긴다!
    const { name, size: byteSize, type } = fileInfo;
    // 바이트 단위의 파일크기를 mb단위로 변환한다!
    const size = (byteSize / (1024 * 1024)).toFixed(2) + "mb";
    // console.log('전체값:',fileInfo);
    // console.log('name:',name);
    // console.log('size:',size);
    // console.log('type:',type);

    // 파일정보 상태관리 변수에 업데이트함!
    setUploadedInfo({ name, size, type });
    // -> 변경시 리랜더링으로 업로드구역에 반영됨!
  }; //////////// setFileInfo 메서드 //////////

  // 파일선택 입력창 클릭시 파일선택으로 상태가 변경될때
  // 파일정보 업데이트하기 함수 ///
  const changeUpload = ({ target }) => {
    // target은 이벤트타겟!
    // 파일정보 읽어오기
    const fileInfo = target.files[0];
    console.log("클릭파일:", fileInfo);

    // 파일정보셋팅 메서드 호출!
    setFileInfo(fileInfo);

    // 서브밋 저장구역에서 파일정보를 사용하도록
    // 상위 컴포넌트 변수인 uploadFile에 저장하는
    // 함수인 updateFileInfo() 를 호출하는 속성인
    // saveFile() 속성 함수를 사용하여 업데이트한다!
    saveFile(fileInfo);
  }; /////////// changeUpload 함수 ///////////

  /* 
    [드래그 관련이벤트 구분]
      onDragEnter : 드래그 대상 영역 안으로 들어갈때
      onDragLeave : 드래그 대상 영역 밖으로 나갈때
      onDragOver : 드래그 대상 영역 위에 있을때
      onDrop : 드래그 대상 영역 안에 드롭될때
  */
  // 리턴 코드 //////////////////////
  return (
    <label
      className="info-view"
      onDragEnter={controlDragEnter}
      onDragLeave={controlDragLeave}
      onDragOver={controlDragOver}
      onDrop={controlDrop}
    >
      {/* 파일을 클릭하여 선택창이 뜰때 파일을 선택하면
      현재 상태가 변경되기때문에 onChange이벤트 속성을씀! */}
      <input type="file" className="file" onChange={changeUpload} />
      {
        // 업로드 정보가 null이 아니면 파일정보 출력
        uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />
      }
      {
        // 업로드 정보가 null이면 안내문자 출력
        !uploadedInfo && (
          <>
            {/* 업로드안내 아이콘 */}
            <UpIcon />
            <p className="info-view-msg">Click or drop the file here.</p>
            <p className="info-view-desc">Up to 3MB per file</p>
          </>
        )
      }
    </label>
  );
}; ///////////// AttachBox 컴포넌트 //////////

/* 
Object.keys(obj) – 객체의 키만 담은 배열을 반환합니다.
Object.values(obj) – 객체의 값만 담은 배열을 반환합니다.
Object.entries(obj) – [키, 값] 쌍을 담은 배열을 반환합니다.
*/

// 파일정보를 보여주는 파일정보 컴포넌트 ////////
const FileInfo = ({ uploadedInfo }) => (
  <ul className="info-view-info">
    {console.log(Object.entries(uploadedInfo))}
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info-key">😊 {key} : </span>
        <span className="info-value">{value}</span>
      </li>
    ))}
  </ul>
); ////////////// FileInfo 컴포넌트 ///////////

// 업로드 표시 아이콘 SVG 태그 리턴 컴포넌트 ////
// 화살표함수에 중괄호 안쓰고 JSX태그를 바로 쓰면 리턴키워드 생략
const UpIcon = () => (
  <svg className="icon" x="0px" y="0px" viewBox="0 0 99.09 122.88">
    <path
      fill="#000"
      d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"
    />
  </svg>
); //////////// UpIcon 컴포넌트 ////////
