// DOM 요소 선택
// - HTML 문서에서 id가 'output'인 div 요소를 선택
// - as HTMLDivElement: 타입 단언(type assertion)을 사용하여 타입 지정
const outputElement = document.getElementById('output') as HTMLDivElement;

// 화면에 텍스트를 출력하는 함수
// - 매개변수 text는 string 타입으로 지정
// - 반환값이 없는 함수이므로 void 타입 (생략 가능)
function printToScreen(text: string): void {
    // 새로운 p 요소 생성
    const p = document.createElement('p');
    // p 요소의 텍스트 내용 설정
    p.textContent = text;
    // output div에 p 요소 추가
    outputElement.appendChild(p);
}

// 1. 기본 타입 예제
// - string: 문자열 타입
let typeName: string = "TypeScript";
// - number: 숫자 타입 (정수, 실수 모두 포함)
let age: number = 10;
// - boolean: 참/거짓 타입
let isActive: boolean = true;

// 기본 타입 출력
printToScreen(`이름: ${typeName}, 나이: ${age}, 활성화: ${isActive}`);

// 2. 배열 타입 예제
// - number[]: 숫자 배열 타입
let numbers: number[] = [1, 2, 3, 4, 5];
// - string[]: 문자열 배열 타입
let names: string[] = ["Alice", "Bob", "Charlie"];

// 배열 출력
printToScreen(`숫자 배열: ${numbers.join(', ')}`);
printToScreen(`이름 배열: ${names.join(', ')}`);

// 3. 튜플 타입 예제
// - [string, number]: 첫 번째는 문자열, 두 번째는 숫자인 고정 길이 배열
let tuple: [string, number] = ["hello", 10];
printToScreen(`튜플: ${tuple[0]}, ${tuple[1]}`);

// 4. 객체 타입 예제 (인터페이스)
// - interface: 객체의 구조를 정의하는 타입
interface Person {
    // 필수 속성
    name: string;
    age: number;
    // 선택적 속성 (물음표로 표시)
    isActive?: boolean;
}

// Person 인터페이스를 따르는 객체 생성
let person: Person = {
    name: "John",
    age: 30
};

printToScreen(`사람 정보: ${person.name}, ${person.age}세`);

// 5. 함수 타입 예제
// - 매개변수와 반환값의 타입을 명시적으로 지정
function greet(name: string): string {
    return `Hello, ${name}!`;
}

printToScreen(greet("TypeScript"));

// 6. 클래스 예제
class Animal {
    // 생성자 매개변수에 접근 제한자(public)를 사용하면
    // 자동으로 해당 이름의 속성이 생성됨
    constructor(public name: string) {}
    
    // 메서드 정의
    // - 매개변수에 기본값 지정 가능
    move(distance: number = 0): string {
        return `${this.name} moved ${distance}m.`;
    }
}

// 클래스 인스턴스 생성
const dog = new Animal("Dog");
printToScreen(dog.move(10));

// 7. 타입 추론 예제
// - 타입을 명시하지 않아도 값에 따라 타입이 자동으로 추론됨
let inferredString = "This is a string"; // string 타입으로 추론
let inferredNumber = 42; // number 타입으로 추론

printToScreen(`추론된 문자열: ${inferredString}`);
printToScreen(`추론된 숫자: ${inferredNumber}`);

// 시작 메시지 출력
printToScreen("타입스크립트 기본 사용 연습을 시작합니다!"); 