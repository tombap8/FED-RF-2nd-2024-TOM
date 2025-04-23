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

const UserFormList = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userList, setUserList] = useState([]);
  const [editMode, setEditMode] = useState(false); // 수정 모드 여부
  const [editId, setEditId] = useState(null); // 수정 중인 사용자 ID

  const getUserList = async () => {
    const allCollection = await getDocs(collection(db, "users"));
    const userListArray = allCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserList(userListArray);
  };

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

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUserList();
  };

  const startEditUser = (user) => {
    setUserName(user.name);
    setUserAge(user.age);
    setUserAddr(user.addr);
    setEditMode(true);
    setEditId(user.id);
  };

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
