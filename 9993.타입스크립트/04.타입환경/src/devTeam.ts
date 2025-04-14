// 역할을 나타내는 타입 정의
// 'Frontend', 'Backend', 'Fullstack' 만 가능
export type Role = "Frontend" | "Backend" | "Fullstack";

// 개발자 정보를 나타내는 타입 정의
// 각 개발자는 이름(name), 나이(age), 역할(role), 기술(skills), 활동 상태(isActive)를 가짐
export type Developer = {
  name: string;    // 개발자 이름
  age: number;     // 개발자 나이
  role: Role;      // 개발자 역할 (Frontend, Backend, Fullstack 중 하나)
  skills: string[]; // 개발자가 가진 기술들 (예: React, TypeScript)
  isActive: boolean; // 활동 중인지 여부 (true or false)
};

// 개발자 배열 (팀원들)
export const devTeam: Developer[] = [
  {
    name: "Alice",          // 이름
    age: 29,                // 나이
    role: "Frontend",       // 역할 (프론트엔드 개발자)
    skills: ["React", "TypeScript", "CSS"], // 기술들
    isActive: true,         // 현재 활동 중인 개발자
  },
  {
    name: "Bob",            // 이름
    age: 35,                // 나이
    role: "Backend",        // 역할 (백엔드 개발자)
    skills: ["Node.js", "Express", "PostgreSQL"], // 기술들
    isActive: false,        // 현재 비활동 중인 개발자
  },
  {
    name: "Charlie",        // 이름
    age: 31,                // 나이
    role: "Fullstack",      // 역할 (풀스택 개발자)
    skills: ["Vue", "Firebase", "TailwindCSS"], // 기술들
    isActive: true,         // 현재 활동 중인 개발자
  },
  {
    name: "David",          // 이름
    age: 27,                // 나이
    role: "Frontend",       // 역할 (프론트엔드 개발자)
    skills: ["React", "TypeScript", "CSS"], // 기술들
    isActive: true,         // 현재 활동 중인 개발자
  },
  {
    name: "Eve",            // 이름
    age: 33,                // 나이
    role: "Backend",        // 역할 (백엔드 개발자)
    skills: ["Node.js", "Express", "PostgreSQL"], // 기술들
    isActive: false,        // 현재 비활동 중인 개발자
  },
];

// 활동 중인 개발자만 필터링하는 함수
// team 배열을 받아서 isActive가 true인 개발자들만 반환
export function getActiveDevelopers(team: Developer[]): Developer[] {
  return team.filter((dev) => dev.isActive); // isActive가 true인 개발자들만 추출
}

// 특정 기술(skill)을 가진 개발자를 찾는 함수
// team 배열을 받아서 skills 배열에 해당 기술이 포함된 개발자들만 반환
export function findBySkill(team: Developer[], skill: string): Developer[] {
  return team.filter((dev) => dev.skills.includes(skill)); // skills 배열에서 skill이 포함된 개발자들만 추출
}


/*************************************** 
📖 데이터 및 함수 정의
Role: 개발자의 역할을 정의한 타입으로, 
"Frontend", "Backend", "Fullstack" 중 
하나만 가능합니다. 
이 타입은 개발자 객체에서 role에 사용됩니다.

Developer: 개발자에 대한 정보를 
나타내는 타입으로, 
이름, 나이, 역할, 기술, 활동 여부 등의 
속성을 가집니다.

devTeam: 개발자 배열로, 여러 명의 개발자 
정보를 포함하고 있습니다. 
각 개발자는 Developer 타입을 따릅니다.

getActiveDevelopers: 활동 중인 개발자만 
추출하는 함수로, 
isActive 속성이 true인 개발자들만 반환합니다.

findBySkill: 특정 기술(skill)을 가진 
개발자들만 추출하는 함수로, 
각 개발자의 skills 배열에 주어진 기술이 
포함된 경우만 반환합니다.
***************************************/


// 특정 역할에 속하는 개발자들의 평균 나이를 계산하는 함수
// 역할(role)을 인자로 받아서 해당 역할을 가진 개발자들의 평균 나이를 계산하여 반환
export function getAverageAgeByRole(team: Developer[], role: Role): number {
    // 해당 역할을 가진 개발자들을 필터링
    const filteredDevelopers = team.filter((dev) => dev.role === role);
    
    // 필터링된 개발자들이 없으면 NaN을 반환 (예외 처리)
    if (filteredDevelopers.length === 0) {
      return NaN;
    }
    
    // 평균 나이 계산
    const totalAge = filteredDevelopers.reduce((sum, dev) => sum + dev.age, 0);
    return totalAge / filteredDevelopers.length; // 평균 나이 반환
  }

  /* 
  👨‍💻 새로운 함수 설명
getAverageAgeByRole
매개변수:

team: 개발자들의 배열.

role: 역할을 나타내는 값(예: "Frontend", "Backend", "Fullstack")을 받아서 해당 역할에 속하는 개발자들의 평균 나이를 계산.

동작:

team.filter()로 전달된 역할(role)에 맞는 개발자들만 필터링.

필터링된 개발자들의 나이를 합산(reduce 함수 사용).

개발자 수로 나눠서 평균을 구하고, 이를 반환.

만약 해당 역할에 개발자가 없다면 NaN을 반환.
  */
