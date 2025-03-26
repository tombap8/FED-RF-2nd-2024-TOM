// 제네릭 타입 소개
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<number>(5)); // 5
console.log(identity<string>("hello")); // hello

// 제네릭 함수와 클래스
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