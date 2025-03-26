// 클래스와 인터페이스
interface Animal {
  name: string;
  sound(): string;
}

class Dog implements Animal {
  public name: string;
  private breed: string;
  protected age: number;

  constructor(name: string, breed: string, age: number) {
    this.name = name;
    this.breed = breed;
    this.age = age;
  }

  public sound(): string {
    return "Woof!";
  }

  private getBreed(): string {
    return this.breed;
  }

  protected getAge(): number {
    return this.age;
  }
}

const myDog = new Dog("Buddy", "Golden Retriever", 3);
console.log(myDog.sound()); // Woof!