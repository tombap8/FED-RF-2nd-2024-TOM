// React와 필요한 훅(useState, useEffect) 가져오기
import React, { useState, useEffect } from 'react';

// Firebase 설정 파일에서 Firestore 데이터베이스 가져오기
import { db } from "../js/firebaseConfig";

// Firestore에서 필요한 함수(collection, addDoc, getDocs) 가져오기
import { collection, addDoc, getDocs } from 'firebase/firestore';

// UsersForm 컴포넌트 정의
function UsersForm() {
  // [1] 상태 변수 정의
  // name: 사용자 이름을 저장하는 상태
  const [name, setName] = useState('');
  // age: 사용자 나이를 저장하는 상태
  const [age, setAge] = useState('');
  const [addr, setAddr] = useState('');
  // users: Firestore에서 가져온 사용자 목록을 저장하는 상태
  const [users, setUsers] = useState([]);

  // [2] 사용자 추가 함수
  // Firestore에 새로운 사용자 데이터를 추가하는 함수
  const addUser = async () => {
    // 이름과 나이가 입력되었는지 확인
    if (name && age) {
      // Firestore의 'users' 컬렉션에 새로운 문서 추가
      await addDoc(collection(db, 'users'), { name, age: Number(age), addr });
      // addDoc 함수는 Firestore의 컬렉션에 새로운 문서를 추가하는 함수입니다.
      // collection(db, 'users')는 'users'라는 이름의 컬렉션을 참조합니다.
      // { name, age: Number(age) }는 추가할 문서의 데이터입니다.
      // 여기서 age는 숫자형으로 변환하여 저장합니다.

      // 입력 필드 초기화
      setName('');
      setAge('');
      setAddr('');

      // 사용자 목록 업데이트
      fetchUsers();
      // Firestore에 새로운 사용자 데이터를 추가한 후,
      // 입력 필드를 초기화하고 사용자 목록을 다시 가져옵니다.
      // 이때, fetchUsers() 함수는 Firestore에서 사용자 데이터를 가져오는 함수입니다.
    }
  };

  // [3] Firestore에서 사용자 데이터 가져오기
  // Firestore의 'users' 컬렉션에서 데이터를 가져와 상태에 저장
  const fetchUsers = async () => {
    // Firestore에서 'users' 컬렉션의 모든 문서 가져오기
    const querySnapshot = await getDocs(collection(db, 'users'));
    // getDocs 함수는 Firestore의 컬렉션에서 모든 문서를 가져오는 함수입니다.
    // querySnapshot은 가져온 문서의 스냅샷을 포함하는 객체입니다.

    // 문서 데이터를 배열로 변환 (id와 데이터 포함)
    const usersList = querySnapshot.docs.map((doc) => {
      console.log(doc.id, " => ", doc.data()); // 문서 ID와 데이터 출력
      return ({ id: doc.id, ...doc.data() })
    });
    // map 함수는 querySnapshot.docs 배열의 각 문서에 대해 함수를 실행하여 
    // 새로운 배열을 생성합니다.
    // 각 문서에 대해 doc.id와 doc.data()를 사용하여 문서 ID와 데이터를 가져옵니다.

    // 상태에 사용자 목록 저장
    setUsers(usersList);
    // setUsers메서드는 상태를 업데이트하는 메서드로, 
    // usersList를 인자로 받아 상태를 업데이트합니다.
    // 이때, usersList는 Firestore에서 가져온 사용자 데이터 배열입니다.
  };

  // [4] 컴포넌트가 처음 렌더링될 때 사용자 데이터를 가져오기
  useEffect(() => {
    fetchUsers(); // Firestore에서 사용자 데이터 가져오기
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  // [5] 렌더링 코드
  return (
    <div>
      {/* 제목 */}
      <h2>Firebase Users</h2>
      
      {/* 이름 입력 필드 */}
      <input
        type="text" // 입력 타입: 텍스트
        placeholder="Name" // 입력 필드에 표시되는 힌트 텍스트
        value={name} // 상태 변수 name과 연결
        onChange={(e) => setName(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      
      {/* 나이 입력 필드 */}
      <input
        type="number" // 입력 타입: 숫자
        placeholder="Age" // 입력 필드에 표시되는 힌트 텍스트
        value={age} // 상태 변수 age와 연결
        onChange={(e) => setAge(e.target.value)} // 입력값 변경 시 상태 업데이트
      />

      {/* 주소소 입력 필드 */}
      <input
        type="test" // 입력 타입: 숫자
        placeholder="Address" // 입력 필드에 표시되는 힌트 텍스트
        value={addr} // 상태 변수 age와 연결
        onChange={(e) => setAddr(e.target.value)} // 입력값 변경 시 상태 업데이트
      />
      
      {/* 사용자 추가 버튼 */}
      <button onClick={addUser}>Add User</button>
      
      {/* 사용자 목록 출력 */}
      <ul>
        {users.map((user) => (
          // 사용자 데이터를 리스트 항목으로 출력
          <li key={user.id}>
            {user.name} ({user.age} years old) 주소: {user.addr}
          </li>
        ))}
      </ul>
    </div>
  );
}

// UsersForm 컴포넌트 내보내기
export default UsersForm;