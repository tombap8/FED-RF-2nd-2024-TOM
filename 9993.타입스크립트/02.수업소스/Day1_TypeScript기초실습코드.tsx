/*
 * Day 1: TypeScript 기초 실습 코드

  아래는 **Day 1: TypeScript 기초**를 위한 실습 코드야.  
  기본 개념부터 환경 설정, 간단한 프로젝트까지 따라 할 수 있도록 준비했어! 🚀

  이 코드에는 TypeScript의 기초적인 개념을 직접 실습할 수 있는 예제들이 포함되어 있어!  
  📌 **진행 방법:**  
  1. TypeScript 설치: `npm install -g typescript`  
  2. 파일을 `.ts`로 저장하고 실행: `tsc filename.ts` → `node filename.js`  
  3. 직접 수정하고 실험하면서 익숙해지기!  

    더 심화된 실습이 필요하면 알려줘! 🚀
 */

// 1. 기본 타입 (number, string, boolean, array, tuple, enum)
let age: number = 25;
let name2: string = "John";
let isStudent: boolean = false;
let hobbies: string[] = ["Reading", "Gaming", "Cooking"];
let tupleExample: [string, number] = ["Alice", 30];

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
let favoriteColor: Color = Color.Blue;

console.log(age, name2, isStudent, hobbies, tupleExample, favoriteColor);

// 2. 인터페이스와 유니온 타입
interface Person {
  name: string;
  age: number;
  isStudent?: boolean;
}

let person1: Person = {
  name: "Alice",
  age: 28,
  isStudent: true,
};

let person2: Person = {
  name: "Bob",
  age: 35,
};

console.log(person1, person2);

// 유니온 타입 예제
let value: string | number;
value = "Hello";
console.log(value);
value = 42;
console.log(value);

// 3. TypeScript 환경 설정 및 설치
// 실행하려면 Node.js와 TypeScript가 설치되어 있어야 함
// 설치 명령어: npm install -g typescript
// tsconfig.json 설정 후 컴파일: tsc

// 4. 간단한 TypeScript 프로젝트 시작하기
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
