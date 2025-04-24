// Board Types

export interface BoardPost {
  id?: string;
  idx: number;
  tit: string;
  cont: string;
  uid: string;
  unm: string;
  date: string;
  mdate?: string;
  cnt: number;
}

export interface ListProps {
  boardData: BoardPost[];
  pageNum: number;
  setPageNum: (num: number) => void;
  keyword: { cta: string; kw: string };
  setKeyword: (keyword: { cta: string; kw: string }) => void;
  sort: number;
  setSort: (sort: number) => void;
  sortCta: string;
  setSortCta: (cta: string) => void;
  totalCount: React.MutableRefObject<number>;
  selRecord: BoardPost | null;
  setSelRecord: (record: BoardPost | null) => void;
  pgPgNum: React.MutableRefObject<number>;
  setMode: (mode: string) => void;
}

export interface ReadProps {
  selRecord: BoardPost;
  setMode: (mode: string) => void;
  updateBoardPost: (postId: number, updateData: Partial<BoardPost>) => Promise<void>;
  deleteBoardPost: (postId: number) => Promise<void>;
}

export interface ModifyProps {
  selRecord: BoardPost;
  setMode: (mode: string) => void;
  updateBoardPost: (postId: number, updateData: Partial<BoardPost>) => Promise<void>;
}

export interface WriteProps {
  addBoardPost: (postData: Omit<BoardPost, 'id' | 'cnt'>) => Promise<void>;
  setMode: (mode: string) => void;
} 