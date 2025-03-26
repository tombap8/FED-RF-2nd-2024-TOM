import { add } from './functions';
import { Dog } from './classes';
import { identity } from './generics';

// Testing the functions and classes
console.log(add(2, 3)); // 5

const myDog = new Dog("Buddy", "Golden Retriever", 3);
console.log(myDog.sound()); // Woof!

console.log(identity<number>(5)); // 5
console.log(identity<string>("hello")); // hello