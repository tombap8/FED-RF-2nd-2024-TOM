import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../js/firebaseConfig";
import "../css/user_form.scss";

// 사용자 정보를 추가/수정/삭제하는 컴포넌트
const UserFormList = () => {
  const [userName, setUserName] = useState(""); // 사용자 이름
  const [userAge, setUserAge] = useState(""); // 사용자 나이
  const [userAddr, setUserAddr] = useState(""); // 사용자 주소
  const [userList, setUserList] = useState([]); // 사용자 목록
  const [editMode, setEditMode] = useState(false); // 수정 모드 여부
  const [editId, setEditId] = useState(null); // 수정 중인 사용자 ID

  // Firestore에서 사용자 목록을 가져옴
  const getUserList = async () => {
    const allCollection = await getDocs(collection(db, "users"));
    const userListArray = allCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserList(userListArray);
  };

  // 새로운 사용자를 추가하거나, 수정 중인 사용자를 수정
  const addUser = async () => {
    if (userName && userAge) {
      if (editMode && editId) {
        // 수정 모드일 경우 수정
        const userDoc = doc(db, "users", editId);
        await updateDoc(userDoc, {
          name: userName,
          age: Number(userAge),
          addr: userAddr,
        });
      } else {
        // 새 사용자 추가
        await addDoc(collection(db, "users"), {
          name: userName,
          age: Number(userAge),
          addr: userAddr,
        });
      }

      // 입력 필드 초기화 및 목록 업데이트
      setUserName("");
      setUserAge(0);
      setUserAddr("");
      setEditMode(false);
      setEditId(null);
      getUserList();
    }
  };

  // 사용자를 삭제
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUserList();
  };

  // 사용자를 수정 모드로 설정
  const startEditUser = (user) => {
    setUserName(user.name);
    setUserAge(user.age);
    setUserAddr(user.addr);
    setEditMode(true);
    setEditId(user.id);
  };

  // 컴포넌트가 mount 되면 사용자 목록을 가져옴
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="user-form">
      <h2>Firebase Users</h2>
      <label htmlFor="unm">이름:</label>
      <input
        id="unm"
        type="text"
        placeholder="이름을 입력하세요"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="age">나이:</label>
      <input
        id="age"
        type="number"
        placeholder="나이를 입력하세요"
        value={userAge??""}
        onChange={(e) => setUserAge(e.target.value)}
      />
      <label htmlFor="addr">주소:</label>
      <input
        id="addr"
        type="text"
        placeholder="주소를 입력해주세요"
        value={userAddr}
        onChange={(e) => setUserAddr(e.target.value)}
      />

      <button onClick={addUser}>
        {editMode ? "수정 완료" : "사용자 추가"}
      </button>

      <br />
      <br />
      <hr />

      <div className="user-list">
        <h2>사용자 리스트</h2>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              {user.name} ({user.age}세) - {user.addr} &nbsp;
              <button onClick={() => startEditUser(user)}>수정</button>
              <button onClick={() => deleteUser(user.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFormList;

