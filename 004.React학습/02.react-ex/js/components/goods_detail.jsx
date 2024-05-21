/// [ 상품 상세보기 서브컴포넌트 : GoodsDetail ] ///

// 공유신발 데이터 불러오기
import guData from "../data/gu_data";
// 효진드레스 데이터 불러오기
import hjData from "../data/hj_data";
// console.log(guData);

export default function GoodsDetail({ backList, gNo, selItem }) {
  // (1) backList - 부모컴포넌트가 전달해준 상태변수
  // (viewList를 업데이트하는 setViewList메서드임!)
  // (2) gNo - 상품 데이터 배열순번
  // (idx 상태관리변수가 전달됨 - 이 값 변경시 컴포넌트 변경됨)
  // (3) selItem은 부모컴포넌트에서 "공유"/"효진" 선택코드값
  // selItem 값으로 데이터를 선택해 준다!
  // "공유"는 guData , "효진"은 hjData

  // 선택코드에 따른 데이터 선택하기
  const selData = 
  selItem == "공유" 
  ? guData 
  : selItem == "효진" 
  ? hjData 
  : [];

  //  useEffect구역 : 화면업데이트 후 실행구역
  React.useEffect(()=>{
    console.log("나는 디데일 컴포넌트다!");

    // useEffect 함수구역에 return함수코드를 쓰면
    // 컴포넌트 소멸시 실행된다!
    return(()=>{
      console.log("디테일 컴포넌트 소멸!");
    });

  }); ///////// useEffect ////////

  // 코드리턴구역 ///////////
  return (
    <ol
      style={{
        display: "flex",
        listStyle: "none",
        justifyContent: "center",
      }}
    >
      <li>
        <img
          src={
            (selItem=="공유"?"./images/vans/vans_":
            selItem=="효진"?"./images/gallery/":"") + 
            selData[gNo].idx + ".jpg"}
          alt="반스신발"
          style={{ width: "100%" }}
        />
      </li>
      <li
        style={{
          lineHeight: "2",
          padding: "10px",
          textAlign: "left",
        }}
      >
        상품명 : {selData[gNo].gname}
        <br />
        가격 : {selData[gNo].gprice}
        <br />
        {
        // [ 리액트 조건 출력하기 ]
        selItem=="공유" &&
        // 코드를 가져올때 최상위를 만들어서
        // 가져오면 쉽게 셋팅할 수 있다!!!
        <div>
          소재 : {selData[gNo].소재}
          <br />
          색상 : {selData[gNo].색상}
          <br />
          치수 : {selData[gNo].치수}
          <br />
          제조자/수입자 :{selData[gNo]["제조자/수입자"]}
          <br />
          제조국 : {selData[gNo].제조국}
          <br />
          제조연월 : {selData[gNo].제조연월}
          <br />
          A/S 책임자와 전화번호 : <br />
          {selData[gNo]["A/S 책임자와 전화번호"]}
          <br />
          Model : {selData[gNo].Model}
          <br />
        </div>
        }
        <div
          className="btnbx"
          style={{
            textAlign: "right",
            padding: "15px",
          }}
        >
          <button
            onClick={() => backList(true)}
            style={{
              fontSize: "24px",
            }}
          >
            리스트로 가기
          </button>
        </div>
      </li>
    </ol>
  );
} ////////// GoodsDetail 컴포넌트 //////////
