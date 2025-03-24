import { createContext } from "react";

// 컨텍스트 API 사용하기 위한 생성자파일
export const dCon = createContext();
// Root 컴포넌트인 Layout 컴포넌트에서 컨텍스트
// 프로바이더를 셋팅해야 하위 컴포넌트에서 사용할 수 있다!
// 사용할 곳에서는 useContext(dCon)을 변수에 할당하여
// 사용한다!