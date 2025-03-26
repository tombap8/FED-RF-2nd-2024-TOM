// 타입 추론과 타입 단언
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
console.log(strLength); // 16

let anotherValue: unknown = "hello world";

// 타입 단언을 사용하여 타입을 명시적으로 지정
let anotherStrLength: number = (anotherValue as string).length;
console.log(anotherStrLength); // 11