import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Firebase 설정 정보 (환경 변수 사용 추천)
const firebaseConfig = {
    apiKey: "AIzaSyBUaZoZTzIEyQ-aAb6orcNJ9-qSfWUcREw",
    authDomain: "fed-tom-pj.firebaseapp.com",
    projectId: "fed-tom-pj",
    storageBucket: "fed-tom-pj.firebasestorage.app",
    messagingSenderId: "274424371283",
    appId: "1:274424371283:web:7ccae8d3e19987a2728ea6",
    measurementId: "G-WR8W3KN5PZ"
  };
  
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function UsersForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  // 사용자 추가 함수
  const addUser = async () => {
    if (name && age) {
      await addDoc(collection(db, 'users'), { name, age: Number(age) });
      setName('');
      setAge('');
      fetchUsers(); // 사용자 목록 업데이트
    }
  };

  // Firestore에서 사용자 데이터 가져오기
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Firebase Users</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.age} years old)</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersForm;
