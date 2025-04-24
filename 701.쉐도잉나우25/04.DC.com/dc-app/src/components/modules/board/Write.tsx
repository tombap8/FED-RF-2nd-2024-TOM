// DC PJ 게시판 쓰기 컴포넌트 - Write.tsx

import React, { useState } from "react";

// 게시판 데이터 타입
interface BoardPost {
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

// Write 컴포넌트 Props 타입
interface WriteProps {
  addBoardPost: (postData: Omit<BoardPost, 'id' | 'cnt'>) => Promise<void>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export default function Write({ addBoardPost, setMode }: WriteProps) {
  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    tit: "",
    cont: "",
    uid: "admin", // 임시 사용자 ID
    unm: "관리자", // 임시 사용자 이름
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 입력값 검사
    if (!formData.tit.trim() || !formData.cont.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    try {
      await addBoardPost({
        ...formData,
        idx: Date.now(), // 임시 인덱스 생성
        date: new Date().toJSON().substring(0, 10)
      });
      setMode("L");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="board-write">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tit">제목</label>
          <input
            type="text"
            id="tit"
            name="tit"
            value={formData.tit}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cont">내용</label>
          <textarea
            id="cont"
            name="cont"
            value={formData.cont}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            rows={10}
          />
        </div>
        <div className="button-group">
          <button type="submit">작성완료</button>
          <button type="button" onClick={() => setMode("L")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
