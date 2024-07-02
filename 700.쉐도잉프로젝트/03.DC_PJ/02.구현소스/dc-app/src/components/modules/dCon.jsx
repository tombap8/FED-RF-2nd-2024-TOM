import { createContext } from "react";

// 컨텍스트 API를 사용하기 위한 생성자
export const dCon = createContext();
// Root 컴포넌트인 Layout 컴포넌트에서 컨텍스트
// 프로바이더를 셋팅해야 하위 컴포넌트들에서 사용할 수 있다!
// 사용할 곳에서는 useContext(dCon)으로 사용