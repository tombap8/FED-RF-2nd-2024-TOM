// 제네릭 타입 소개
/********************************************************** 
제네릭 타입(generic type)은 타입을 마치 함수의 인수처럼 취급하여, 
여러 타입에 대해 동작하는 컴포넌트를 작성할 수 있게 해줍니다. 
TypeScript에서 제네릭은 특히 함수, 클래스, 인터페이스에서 많이 사용됩니다.

1. 제네릭 타입의 개념
제네릭 타입을 사용하면, 특정 타입에 종속되지 않는 코드를 작성할 수 있습니다. 
예를 들어, 배열에서 특정 값을 찾는 함수를 작성한다고 할 때, 
그 배열의 요소 타입이 무엇이든 상관없이 작동하도록 할 수 있습니다.

2. 제네릭 함수 예제
다음은 제네릭을 사용한 함수의 예제입니다.

TypeScript
// 제네릭 타입 소개
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<number>(5)); // 5
console.log(identity<string>("hello")); // hello


여기서 identity 함수는 입력값의 타입에 상관없이 동작합니다. 
T는 타입 변수로, 함수가 호출될 때 실제 타입으로 대체됩니다.

3. 제네릭 클래스 예제
다음은 제네릭 클래스를 사용하는 예제입니다.

TypeScript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, addFunction: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFunction;
  }
}

const numberGeneric = new GenericNumber<number>(0, (x, y) => x + y);
console.log(numberGeneric.add(5, 10)); // 15

const stringGeneric = new GenericNumber<string>("", (x, y) => x + y);
console.log(stringGeneric.add("Hello, ", "world!")); // Hello, world!


4. 제네릭의 장점
타입 안전성: 제네릭을 사용하면 컴파일 시 타입 검사를 할 수 있어, 
런타임 에러를 줄일 수 있습니다.
코드 재사용성: 동일한 코드를 여러 타입에 대해 재사용할 수 있습니다.
가독성 향상: 제네릭을 사용하면 코드의 의도를 명확하게 나타낼 수 있습니다.
이와 같은 이유로 제네릭은 TypeScript에서 매우 유용하게 사용됩니다.

**********************************************************/
function identity<T>(arg: T): T {
  // 제네릭 타입 T를 사용하여 입력 인자와 반환 값의 타입을 지정
  return arg; // 입력 인자를 그대로 반환
}

console.log(identity<number>(5)); // 5
// identity 함수에 number 타입을 지정하고, 5를 전달하여 호출

console.log(identity<string>("hello")); // hello
// identity 함수에 string 타입을 지정하고, "hello"를 전달하여 호출

// 제네릭 함수와 클래스
class GenericNumber<T> {
  zeroValue: T; // 제네릭 타입 T를 사용하는 멤버 변수
  add: (x: T, y: T) => T; // 제네릭 타입 T를 사용하는 함수 타입 멤버

  constructor(zeroValue: T, addFunction: (x: T, y: T) => T) {
    this.zeroValue = zeroValue; // 생성자에서 멤버 변수 초기화
    this.add = addFunction; // 생성자에서 함수 타입 멤버 초기화
  }
}

const numberGeneric = new GenericNumber<number>(0, (x, y) => x + y);
// number 타입을 사용하는 GenericNumber 인스턴스를 생성하고, 초기값과 add 함수를 지정

console.log(numberGeneric.add(5, 10)); // 15
// add 함수를 호출하여 두 숫자를 더한 결과를 출력

const stringGeneric = new GenericNumber<string>("", (x, y) => x + y);
// string 타입을 사용하는 GenericNumber 인스턴스를 생성하고, 초기값과 add 함수를 지정

console.log(stringGeneric.add("Hello, ", "world!")); // Hello, world!
// add 함수를 호출하여 두 문자열을 연결한 결과를 출력