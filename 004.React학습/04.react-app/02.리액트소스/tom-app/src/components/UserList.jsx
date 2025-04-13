import React, { useState, useEffect } from "react";
import supabase from "../js/supabase";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // 🔹 데이터 가져오기 (SELECT)
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) console.error("Error fetching users:", error);
    else setUsers(data);
  };

  // 🔹 데이터 추가 (INSERT)
  const addUser = async () => {
    if (!name || !age) {
      alert("이름과 나이를 입력해 주세요!");
      return;
    }
  
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, age: parseInt(age) }])
      .select();
  
    console.log("🟢 Supabase Response:", data, error); // 🔥 디버깅용 출력
  
    if (error) {
      console.error("❌ Error adding user:", error);
      return;
    }
  
    if (!data || !Array.isArray(data)) {
      console.warn("⚠ 데이터가 배열이 아님!", data);
      return;
    }
  
    setUsers([...users, ...data || []]); // 🔹 data가 null이면 빈 배열로 대체!
  
    setName("");
    setAge("");
  };
  
  
  // 🔹 처음 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>👥 사용자 목록</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}세
          </li>
        ))}
      </ul>

      <h3>새 사용자 추가</h3>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="나이"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addUser}>추가하기</button>
    </div>
  );
};

export default UserList;
