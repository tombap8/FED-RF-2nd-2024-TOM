// 파일럿PJ 공통 함수 //////

// [1] 숫자 세자리마다 콤마추가함수
function addComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 내보내기
export {addComma};
