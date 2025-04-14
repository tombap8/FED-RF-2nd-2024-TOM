// src/index.ts

import { devTeam, getActiveDevelopers, findBySkill, getAverageAgeByRole } from "./devTeam";

// 1. 기본 타입 선언
const username: string = "개발자 찐친";
const age: number = 28;
const isActive: boolean = true;

console.log("✅ 기본 타입");
console.log(username, age, isActive);

// 2. 배열 타입
const numbers: number[] = [1, 2, 3, 4];
const names: string[] = ["Tom", "Jerry"];

console.log("✅ 배열 타입");
console.log(numbers, names);

// 3. 튜플 (Tuple)
const userInfo: [string, number] = ["홍길동", 30];

console.log("✅ 튜플");
console.log(userInfo);

// 4. 유니온 타입
let unionType: "loading" | "success" | "error" = "loading";
unionType = "success";

console.log("✅ 유니온 타입");
console.log(unionType);

// 5. 객체 타입 선언
type User = {
    name: string;
    age: number;
    isAdmin?: boolean; // 선택적 프로퍼티
};

const user1: User = {
    name: "Alice",
    age: 25,
};

console.log("✅ 객체 타입");
console.log(user1);

// 6. 함수에 타입 선언
function greet(name: string): string {
    return `안녕하세요, ${name}님!`;
}

const message = greet("타입스크립트");
console.log("✅ 함수 타입");
console.log(message);

// 7. void 함수
function logMessage(msg: string): void {
    console.log("📢", msg);
}

logMessage("이건 void 함수");

// 8. 인터섹션 타입
type Employee = { name: string; company: string };

const e1: Employee = {
    name: "철수",
    company: "네카라쿠배",
};
console.log("✅ 인터섹션 타입");
console.log(e1);

// 개발자 회사 샘플 찍어보기 ////////
console.log("✅ 전체 개발자 리스트");
console.log(devTeam);

console.log("✅ 현재 활동 중인 개발자");
console.log(getActiveDevelopers(devTeam));

console.log("✅ 'TypeScript' 기술을 가진 개발자");
console.log(findBySkill(devTeam, "TypeScript"));

console.log("✅ 'Frontend' 개발자 평균 나이");
console.log(getAverageAgeByRole(devTeam, "Frontend"));

console.log("✅ 'Backend' 개발자 평균 나이");
console.log(getAverageAgeByRole(devTeam, "Backend"));

console.log("✅ 'Fullstack' 개발자 평균 나이");
console.log(getAverageAgeByRole(devTeam, "Fullstack"));

devTeam.map((dev) => {
  console.log(`
  ================================
  🚀 Developer: ${dev.name}
  👤 Role: ${dev.role}
  🏆 Age: ${dev.age}
  📚 Skills: ${dev.skills.join(", ")}
  ================================
  `);
});



// HTML 요소에 출력할 컨테이너 선택
const devListContainer = document.getElementById('dev-list') as HTMLElement;

// 개발자 목록을 출력
devTeam.map((dev) => {
  const devInfo = document.createElement('div');
  devInfo.classList.add('dev-info');
  devInfo.innerHTML = `
    <h3>🚀 Developer: ${dev.name}</h3>
    <p>👤 Role: ${dev.role}</p>
    <p>🏆 Age: ${dev.age}</p>
    <p>📚 Skills: ${dev.skills.join(', ')}</p>
    <hr />
  `;
  devListContainer.appendChild(devInfo);
});
