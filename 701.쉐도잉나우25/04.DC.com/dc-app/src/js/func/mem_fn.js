// DC.com - 회원가입 관련 함수 모듈 - mem_fn.js

import { db } from "../db/firebaseConfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// [1] 회원가입 초기데이터 생성 함수 ///////////
export const initData = async () => {
  try {
    // Firebase에서 mem-data 컬렉션 가져오기
    const memRef = collection(db, "mem-data");
    const querySnapshot = await getDocs(memRef);
    
    // 데이터가 없으면 초기 데이터 추가
    if (querySnapshot.empty) {
      await addDoc(memRef, {
        idx: 1,
        uid: "admin",
        pwd: "1111",
        unm: "Administrator",
        eml: "admin@dc.com",
        zcode: "",
        addr: "",
        createdAt: new Date()
      });
    }
  } catch (error) {
    console.error("Error initializing member data:", error);
  }
};

// [2] 회원정보 조회 함수 ///////////
export const getMemberData = async () => {
  try {
    const memRef = collection(db, "mem-data");
    const querySnapshot = await getDocs(memRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting member data:", error);
    return [];
  }
};

// [3] 회원정보 추가 함수 ///////////
export const addMemberData = async (memberData) => {
  try {
    const memRef = collection(db, "mem-data");
    await addDoc(memRef, {
      ...memberData,
      createdAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error adding member data:", error);
    return false;
  }
};

// [4] 회원정보 수정 함수 ///////////
export const updateMemberData = async (memberId, updateData) => {
  try {
    const memRef = collection(db, "mem-data");
    const q = query(memRef, where("uid", "==", memberId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await docRef.update(updateData);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating member data:", error);
    return false;
  }
};
