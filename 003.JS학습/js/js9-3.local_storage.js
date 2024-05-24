// JS9-3. 로컬 스토리지 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

/*************************************************************** 
    [ JS 로컬스토리지 : localStorage ]
    - window하위객체 window.localStorage
    -> window는 주로 생략함!
    -> 개발자 모드 'Application' 탭에서 확인가능!!

    1. 정의 : 
        브라우저별 로컬 어플리케이션 영역에 저장되는 
        스트링데이터 저장소(JS API)
    2. 유지 : 같은 PC, 같은 브라우저(재설치없이사용) 일 경우 계속유지됨
        (단, 같은파일일 지라도 여는 경로에 따라 같은 변수도
        따로 관리된다! - 기준이 도메인경로/주소)
    3. 특징 : 모드 데이터는 키,값 쌍으로 구성되며 
        데이터값은 반드시 문자형으로 사용됨
    4. 응용 : 데이터로 배열/객체를 사용할 경우 문자형 변환하여 넣고
                다시 객체형으로 파싱하여 사용한다!
            (1) 입력시 : JSON.stringify(배열/객체)
            (2) 사용시 : JSON.parse(문자형배열/객체)
            -> JS의 제이슨 데이터 파싱 메서드 : 
                JSON.parse()
            -> JS의 제이슨 형식 데이터를 문자열로 변환하는 메서드:   
                JSON.stringify()
    5. 사용메서드 : 
        (1) 값설정 : setItem(키명,값)
        (2) 값읽기 : getItem(키명)
        (3) 전체지우기 : clear()
        (4) 키번호읽기 : key(순번) -> 0부터 (키이름리턴)
        (5) 개별항목삭제 : removeItem(키명)
        (6) 개수 : length

    [ JS 세션 스토리지 : sessionStorage ]
    -> 로컬스토리지와 세션 스토리지의 메서드는 동일함!
    -> 로컬스토리지와 차이점은?
    -> 브라우저가 닫히면 데이터가 사라진다!
    (로컬세션의 개념은 서버세션과 달리 하나의 브라우저탭을
    단위로 한다!)
    -> 서버세션은 접속된 로그인정보세션을 서버에서 관리하는 단위임

    [ JS 로컬 스토리지 / 세션 스토리지 장단점 ]
    (1) 장점: 간단한 프론트엔드 데이터를 DB없이 테스트해보는데 탁월함
    (2) 단점: 데이터의 지속 보장이 없다!
        (그나마 로컬 스토리지는 브라우저 경로가 같고 PC가 같고
        브라우저종류가 같다면 지우기 전까지는 데이터를 유지한다!)


    -> w3 schools 참고
    https://www.w3schools.com/js/js_api_web_storage.asp
***************************************************************/

// [ 1. 로컬 스토리지 연습 ] ////////////////////
// 1. 버튼 기능 이벤트 대상 : .local-box button
const btnLocal = mFn.qsa(".local-box button");
console.log("대상:", btnLocal);

// 2. 버튼에 이벤트 설정하기
btnLocal.forEach((ele) => mFn.addEvt(ele, "click", localsFn));

// 3. 로컬쓰 처리 함수 만들기 ///////
function localsFn() {
  // 1. 버튼 텍스트 읽기
  let btxt = this.innerText;
  console.log("로컬쓰~!", btxt);

  // 2. 버튼별 기능 분기하기 //////
  if (btxt == "처음") {
    // (1) 로컬 스토리지 셋팅하기
    // -> localStorage.setItem(키,값)
    localStorage.setItem("actor-name", "이정재");
    localStorage.setItem("actor-role", "박평호역");
    localStorage.setItem(
      "actor-cat",
      "조직내 스파이를 색출하는 해외팀 안기부장"
    );
  } /// if ////
  else if (btxt == "보여줘") {
    // 배우이름 출력
    mFn.qs(".local .nm").innerText = localStorage.getItem("actor-name");
    // 역할이름 출력
    mFn.qs(".local .role").innerText = localStorage.getItem("actor-role");
    // 캐릭터소개 출력
    mFn.qs(".local .cat").innerText = localStorage.getItem("actor-cat");
  } /// else if ////
  else if (btxt == "전체삭제") {
    // 로컬스토리지 전체 삭제
    // 해당 url 스토리지만 대상으로 모두 지움
    localStorage.clear();

    // 개별삭제는 removeItem(키)
    // localStorage.removeItem("actor-name");
  } //// else if ////
  else if (btxt == "처리") {
    // 배열/객체 만들기
    // 1. 로컬쓰에 "minfo"키가 없으면 새로만들기
    // 만약 키가 없으면 null값을 리턴함
    // 이것은 if문에서 false처리됨!
    // false일때 처리해야하므로 NOT(!)연산자사용
    // 또는 빈 배열값일 경우도 생성함수호출 처리
    if (
      !localStorage.getItem("minfo") ||
      localStorage.getItem("minfo") == "[]"
    ) {
      // 최초 객체데이터 만들기 함수 호출
      makeObj();
    } /// if ///
    console.log(localStorage.getItem("minfo"));

    // 2. 화면에 출력하기 : 데이터 바인딩하기
    bindData();
  } //// else if ////
} /////////// localsFn //////////

// "minfo" 로컬쓰 키가 없으면 객체를 만들어 넣기 함수 //
function makeObj() {
  console.log("minfo만들기!");

  // 1. 게시판 형식의 객체 생성하기 ///
  // 배열안에 객체데이터 한개 넣기 [{},]
  let obj = [
    {
      idx: 1,
      tit: "내가 왕이될 상인가?",
      cont: "이정재형님은 진정한 왕이십니다!",
    },
  ];

  // 2. 로컬 스토리지에 배열/객체데이터 넣기
  // 만약 배열데이터를 직접 넣으려고하면
  // 로컬쓰는 문자형만 받기때문에 데이터형이름만
  // 문자형으로 데이터를 대신 넣게된다!
  // 즉, 배열데이터는 못들어간다! ㅠ.ㅠ
  // 그러므로 배열데이터는 문자형으로 변환하여
  // 넣어야 로컬쓰에 들어간다!
  // -> JSON.stringify(배열/객체)
  localStorage.setItem("minfo", JSON.stringify(obj));
} ///////// makeObj //////

//// 화면에 게시판을 뿌려주는 바인딩함수 ///////
function bindData() {
  // 1. 로컬쓰 데이터 읽어오기 : minfo
  let localData = localStorage.getItem("minfo");
  // 2. 로컬쓰 데이터 파싱하기 : JSON.parse()
  localData = JSON.parse(localData);

  console.log("게시판 화면 뿌리기!", localData);

  // 출력대상 : .board
  // 3. 화면에 출력하기 ////////
  mFn.qs(".board").innerHTML = `
        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>삭제</th>
            </tr>
            <!-- 데이터에 따른 반복바인딩 -->
            ${localData
              .map(
                (v, i) => `
                <tr>
                    <td>${v.idx}</td>
                    <td>${v.tit}</td>
                    <td>${v.cont}</td>
                    <td class="del-link">
                        <a href="#" data-idx="${i}">×</a>
                    </td>
                </tr>
            `
              )
              .join("")}
        </table>
    `;

  // 4. 지우기 버튼 셋팅하기
  mFn.qsa(".del-link a").forEach((ele) => {
    ele.onclick = (e) => {
      // 1.기본이동막기
      e.preventDefault();

      // 2. 지울지 여부 확인하기(confirm대화창 사용)
      if (!confirm("정말정말정말정말로 지우시게요?")) return;
      // confirm(메시지) -> 확인(true)/취소(false)
      // confirm() 앞에 Not연산자를 써서 false 일때 리턴한다!

      // 3.지울순번속성(data-idx)읽어오기
      let idx = ele.getAttribute("data-idx");

      // 4. 로컬쓰 읽어와서 파싱하기
      let localData = JSON.parse(localStorage.getItem("minfo"));

      console.log("지울순번:", idx, localData);

      // 5. 메모리에 있는 배열값 지우기
      // 배열.splice(순번,개수)
      // 1개삭제이므로 splice(순번,1)
      localData.splice(idx, 1);

      // 6. 배열값 로컬쓰에 반영하기
      localStorage.setItem("minfo", JSON.stringify(localData));

      // 7. 화면출력함수호출
      bindData();

      // 8. 수정선택박스 업데이트하기
      updateItemList();
    }; ///// click /////
  }); /////// forEach ////////
} ////////////// bindData //////////////////

// 게시판 최초호출 : 로컬쓰 minfo 존재여부에 따라 처리
if (localStorage.getItem("minfo")) bindData();
else makeObj();

///// 게시판 입력 버튼 클릭시 구현하기 //////
mFn.qs("#sbtn").onclick = () => {
  // 어디에 무엇을 입력해야하나?
  // 로컬쓰에 제목,내용을 입력한다!

  // 1. 로컬쓰 데이터 읽어와서 배열로 변환
  const localData = JSON.parse(localStorage.getItem("minfo"));

  console.log("입력!!!", localData);

  // 2. 입력값이 비었으면 돌려보내기!
  // trim() - 앞뒤공백 제거 메서드
  if (mFn.qs("#tit").value.trim() == "" || mFn.qs("#cont").value.trim() == "") {
    alert("제목과 내용입력은 필수입니다!");
    return;
  } ////// if //////

  console.log(
    "idx값배열:",
    localData.map((v) => v.idx)
  );

  // 3. 입력할 데이터 객체형식으로 배열에 넣기
  // 배열.push({객체})
  localData.push({
    // 순번은 배열객체 idx값중 최대값을 구하여 1더한다!
    // apply(보낼객체,배열) -> 보낼객체가 여기서는 null
    idx:
      Math.max.apply(
        null,
        localData.map((v) => v.idx)
      ) + 1,
    tit: mFn.qs("#tit").value,
    cont: mFn.qs("#cont").value,
  });

  // 4. 배열 데이터를 문자화하여 로컬쓰에 입력
  localStorage.setItem("minfo", JSON.stringify(localData));

  // 5. 화면출력 함수 호출하기
  bindData();

  // 6. 기존 입력데이터 지워주기
  mFn.qs("#tit").value = "";
  mFn.qs("#cont").value = "";

  // 7. 수정선택박스 업데이트하기
  updateItemList();
}; /////// click 함수 ///////////

// CRUD 크루드!!!
// Create(만들기) / Read(읽기) / Update(수정) / Delete(삭제)

///////// 수정기능 구현하기 //////////////

// ♣ 수정선택박스 - #sel
const selBox = mFn.qs("#sel");

// ♣ 수정항목 선택박스 업데이트함수 호출
updateItemList();

// ♣ 수정선택박스 선택변경시 이벤트 설정하기
mFn.addEvt(selBox, "change", (e) => {
  // 1. 옵션값 읽어오기
  let optVal = e.target.value;
  console.log("선택값:", optVal);

  // 2. 선택항목이 아닌 경우 걸러내기
  if (optVal == "opt") {
    alert("수정할 항목을 선택하세요!");
    // 입력창 초기화
    mFn.qs("#tit2").value = "";
    mFn.qs("#cont2").value = "";
    return; // 여기서나감!
  } /// if ///

  // 3. 로컬쓰 데이터 읽어와서 배열로 변환
  const localData = JSON.parse(localStorage.getItem("minfo"));

  console.log(localData);

  // 4. 배열데이터에서 읽어온 옵션값 idx와 비교하여
  // 데이터 선택하기
  // -> 변수 = 배열.find(v=>{if(조건){return true}})
  let selRec = localData.find((v) => {
    console.log(v.idx);
    if (v.idx == optVal) return true;
    // 선택idx와 순회하는 배열idx와 일치할 경우
    // 이것을 저장하는 시그널은 return true다!
  }); //// find ////

  console.log("선택data:", selRec);

  // 5. 선택 데이터로 수정창에 기존데이터 넣기
  mFn.qs("#tit2").value = selRec.tit;
  mFn.qs("#cont2").value = selRec.cont;
}); ///////////// change ////////////

// ♣ 수정버튼 클릭시 이벤트 설정하기
mFn.qs("#mobtn").onclick = () => {    

  // 1. 선택박스 선택값 읽어오기
  let optVal = selBox.value;
  console.log("수정해라~!", optVal);

  // 2. 선택항목이 아닌 경우 걸러내기
  if (optVal == "opt") {
    alert("수정할 항목을 선택하세요!");
    // 입력창 초기화
    mFn.qs("#tit2").value = "";
    mFn.qs("#cont2").value = "";
    return; // 여기서나감!
  } /// if ///

  // 3. 입력값이 비었으면 돌려보내기!
  // trim() - 앞뒤공백 제거 메서드
  if (mFn.qs("#tit2").value.trim() == "" || 
  mFn.qs("#cont2").value.trim() == "") {
    alert("제목과 내용입력은 필수입니다!");
    return;
  } ////// if //////

  // 4. 로컬쓰 데이터 읽어와서 배열로 변환
  const localData = JSON.parse(localStorage.getItem("minfo"));

  console.log(localData);

  // 5. 배열데이터에서 읽어온 옵션값 idx와 비교하여
  // 데이터 업데이트 하기
  // -> 배열.find(v=>{if(조건){변경코드;return true}})
  localData.find((v) => {
    console.log(v.idx);
    if (v.idx == optVal) {
      // 해당항목값 업데이트 하기
      v.tit = mFn.qs("#tit2").value;
      v.cont = mFn.qs("#cont2").value;
      // 변수에 find()할당시 저장하거나
      // 여기서 순회를 끝낸다는 의미임!
      return true;
    }
  }); //// find ////

  console.log("변경후 배열:", localData);

  // 6. 변경된 배열 로컬쓰에 저장하기!
  localStorage.setItem("minfo", JSON.stringify(localData));

  // 7. 데이터 바인딩 함수호출
  bindData();

  // 8. 선택박스 초기화
  selBox.value = "opt";

  // 9. 입력창 초기화
  mFn.qs("#tit2").value = "";
  mFn.qs("#cont2").value = "";
}; //////////// click //////////////

//////////////////////////////////
// ♣ 수정할 항목 업데이트 함수 /////
//////////////////////////////////
function updateItemList() {
  // 1. 대상선정 : 수정선택박스 - #sel -> selBox변수

  // 2. 로컬쓰 데이터 읽어와서 배열로 변환
  const localData = JSON.parse(localStorage.getItem("minfo"));

  // 2. 데이터의 idx를 순회하며 option만들기
  selBox.innerHTML =
    `<option value="opt">수정항목선택</option>` +
    localData
      .map(
        (v) => `
            <option value="${v.idx}">
                ${v.idx}</option>
        `
      )
      .join("");
} //////////// updateItemList 함수 ///////////

//******************************************** */
///////////////////////////////////////////////
// [ 2. 세션 스토리지 연습 ] ////////////////////
// 1. 버튼 기능 이벤트 대상 : .session-box button
const btnSession = mFn.qsa(".session-box button");
console.log("대상:", btnSession);

// 2. 버튼에 이벤트 설정하기
btnSession.forEach((ele) => mFn.addEvt(ele, "click", sessionsFn));

// 3. 세션쓰 처리 함수 만들기 ///////
function sessionsFn() {
  // 1. 버튼 텍스트 읽기
  let btxt = this.innerText;
  console.log("세션쓰~!", btxt);

  // 2. 버튼별 기능 분기하기 //////
  if (btxt == "처음") {
    // (1) 세션 스토리지 셋팅하기
    // -> sessionStorage.setItem(키,값)
    sessionStorage.setItem("actor-name", "정우성");
    sessionStorage.setItem("actor-role", "김정도역");
    sessionStorage.setItem(
      "actor-cat",
      "국내팀 안기부팀장, 박평호랑 사이나쁨"
    );
  } /// if ////
  else if (btxt == "보여줘") {
    // 배우이름 출력
    mFn.qs(".session .nm").innerText = 
    sessionStorage.getItem("actor-name");
    // 역할이름 출력
    mFn.qs(".session .role").innerText = 
    sessionStorage.getItem("actor-role");
    // 캐릭터소개 출력
    mFn.qs(".session .cat").innerText = 
    sessionStorage.getItem("actor-cat");
  } /// else if ////
  else if (btxt == "전체삭제") {
    // 로컬스토리지 전체 삭제
    // 해당 url 스토리지만 대상으로 모두 지움
    sessionStorage.clear();

    // 개별삭제는 removeItem(키)
    // sessionStorage.removeItem("actor-name");
  } //// else if ////
} /////////// sessionsFn //////////




