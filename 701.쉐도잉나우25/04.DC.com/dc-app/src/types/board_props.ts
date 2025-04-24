// 게시판 관련 타입 정의

// 게시글 데이터 타입
export interface IBoardData {
  idx: number;
  title: string;
  content: string;
  writer: string;
  date: string;
  hit: number;
  current?: any;
  // 추가된 속성들
  uid: string;    // 사용자 ID
  unm: string;    // 사용자 이름
  tit: string;    // 게시글 제목
  cont: string;   // 게시글 내용
}

// 게시판 모드 타입
export type BoardMode = 'list' | 'write' | 'read' | 'edit' | 'L' | 'M';

// 게시판 Props 타입
export interface IBoardProps {
  setMode: (mode: BoardMode) => void;
  selRecord?: IBoardData;
}

// 읽기 모드 Props 타입
export interface IReadProps {
  setMode: (mode: BoardMode) => void;
  selRecord: IBoardData;
}

// 쓰기 모드 Props 타입
export interface IWriteProps {
  setMode: (mode: BoardMode) => void;
  selRecord?: IBoardData;
}

// 수정 모드 Props 타입
export interface IEditProps {
  setMode: (mode: BoardMode) => void;
  selRecord: IBoardData;
} 