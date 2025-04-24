// DC.com - 게시판 관련 함수 모듈 - board_fn.js

import { db } from "../db/firebaseConfig";
import { collection, getDocs, addDoc, query, where, updateDoc, deleteDoc } from "firebase/firestore";

// [1] 게시판 초기데이터 생성 함수 ///////////
export const initBoardData = async () => {
  try {
    // Firebase에서 board-data 컬렉션 가져오기
    const boardRef = collection(db, "board-data");
    const querySnapshot = await getDocs(boardRef);
    
    // 데이터가 없으면 초기 데이터 추가
    if (querySnapshot.empty) {
      await addDoc(boardRef, {
        idx: 1,
        tit: "Welcome to DC.com",
        cont: "This is the first post.",
        uid: "admin",
        unm: "Administrator",
        date: new Date().toJSON().substring(0, 10),
        cnt: 0,
        createdAt: new Date()
      });
    }
  } catch (error) {
    console.error("Error initializing board data:", error);
  }
};

// [2] 게시글 목록 조회 함수 ///////////
export const getBoardList = async () => {
  try {
    const boardRef = collection(db, "board-data");
    const querySnapshot = await getDocs(boardRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting board list:", error);
    return [];
  }
};

// [3] 게시글 추가 함수 ///////////
export const addBoardPost = async (postData) => {
  try {
    const boardRef = collection(db, "board-data");
    await addDoc(boardRef, {
      ...postData,
      cnt: 0,
      createdAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error adding board post:", error);
    return false;
  }
};

// [4] 게시글 수정 함수 ///////////
export const updateBoardPost = async (postId, updateData) => {
  try {
    const boardRef = collection(db, "board-data");
    const q = query(boardRef, where("idx", "==", postId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await docRef.update({
        ...updateData,
        mdate: new Date().toJSON().substring(0, 10)
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating board post:", error);
    return false;
  }
};

// [5] 게시글 삭제 함수 ///////////
export const deleteBoardPost = async (postId) => {
  try {
    const boardRef = collection(db, "board-data");
    const q = query(boardRef, where("idx", "==", postId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting board post:", error);
    return false;
  }
};

// [6] 조회수 증가 함수 ///////////
export const incrementViewCount = async (postId) => {
  try {
    const boardRef = collection(db, "board-data");
    const q = query(boardRef, where("idx", "==", postId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const currentData = querySnapshot.docs[0].data();
      await docRef.update({
        cnt: (currentData.cnt || 0) + 1
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return false;
  }
};
  