let isBool: boolean = true;
let num: number = 10;
let str: string = 'str';
let n: null = null;
let u: undefined = undefined;

// Функція нічого не повертає, це і є тип функції void - без повертання
const sayHello = (user: string): void => {
  console.log('Hello', user);
}

// Array type - ми говоримо що тип даних будуть числа, і ці числа будуть находитись в масиві
let list: number[] = [1, 2, 3];

// Generic type - за допомогою ключового слова Array ми задаємо тип даних і після цього
// За допомогою <number> описуємо тип даних які будуть в масиві
let list1: Array<number> = [1, 2, 3];

// Tuple type - якщо ми хочемо, щоб в масиві були декілька типів даних,
// Але в тому порядку в якому записані типи даних
let x: [number, string] = [15, 'hi'];

// Any type - він приймає будь-які типи даних
let y: any[] = [902, 'mouse'];
let ex: Array<any> = ['keyboard', 51];

let notSure: any = true;
notSure = 85;
notSure = 'changed';
notSure = undefined;



// never type - коли функція нескінчена або видає помилку,
// never не повертає результат
const err = (): never => {
  throw new Error()
}

// тип type який по суті створює кастомний тип
type Name = string;
let a: Name = 42 // Error

// enum
enum partsOfBody {
  rightHand = 2,
  leftHand = 4,
  rightLeg = 6,
  leftLeg = 8
}

// таким чином можемо доступатись до енамки по індексу та отримати ключ
// partsOfBody[2]
// partsOfBody[4]
// partsOfBody.rightLeg
// partsOfBody.leftLeg

// Argument type
const createPassword = (name: string, age: number | boolean) => {
  return `${name}${age}`;
}

// Default value
const createPassword = (name: string = 'User', age: number | boolean = 24) => {
  return `${name}${age}`;
}

// Optional argument age? - тобто не обов'язкове поле для заповнення
const createPassword = (name: string = 'User', age?: number) => {
  return `${name}${age}`;
}

// Створення кастомного типа на практиці, щоб не повторювати код
// І в user є поле company а в admin замість цього поля функція, тому
// Записуємо таким чином в type smth?: type
type Human = {
  name: string,
  age: number,
  company?: boolean,
  sayHello?: () => string
}

// Описування типів даних в об'єкті
const user: Human = {
  name: 'Nick',
  age: 4,
  company: false
};

const admin: Human = {
  name: 'Petro',
  age: 22,

  sayHello(): string {
    return `Hello ${ this.name }`;
  }
}

class User {
  // Тут ми описуємо властивості класа
  public name: string // public стоїть по дефолту. Це означає що до цієї властивості можна отримати свободний доступ
  private age: number // private не може бути доступний за межами класа
  protected company: boolean // protected доступ до елементів з цим модифікатором можуть отримати тільки спадкоємці
  readonly pass: string // readonly тільки доступний для прочитання

  // Тут ми добавляємо можливість приймати ці властивості при ініціалізації
  constructor(name: string, age: number, company: boolean, pass: string) {
    this.name = name;
    this.age = age;
    this.company = company;
    this.pass = pass;
  }
}

class User {

  // Для оптимізації кода можна записувати таким чином, тільки треба обов'язково
  // вказувати модифікатор, типу public, private тощо
  constructor(
    public name: string,
    public age: number,
    public company: boolean,
    public pass: string) {}
}

class User {
  private age: number = 9;

  constructor(public name: string ) {}

  // Функція яка змінює значення елемента в якого private модифікатор
  myAge(age: number) {
    this.age = age;
  }
}

class User {

  static secret = 12345; // static property, тобто його видно в класі без створення екземпляру

  constructor(public name: string, public age: number) {
  }

  createPass(): string {
    return `${ this.name }${ User.secret }`;
  }
}

// Це оболочка в якій зберігаються ці змінні
namespace Util {
  export const password: number = 50194;
  const name: string = 'gsneam';

  export const getHardPass = (): string => {
    return `${name}${password}`
  }
}

// interface це сутність типу type, але з більшими можливостями
interface User {
  readonly name: string, // readonly - тобто ми не можемо змінювати name
  age: number,
  company?: boolean,
  [propName: string]: any; // На той випадок якщо об'єкт буде розширятись
}

// Використання інтерфейсу в об'єкті
const worker: User = {
  name: 'Tolyan',
  age: 44,
}

// Інтерфейси також можуть наслідуватись
interface Admin extends User {
  getPass(): string
}

// Використання інтерфейсу в класі
class Tolik implements Admin{
  name: 'Tolik';
  age: 29;

  getPass(): string {
    return `${this.name}${this.age}`
  }
}

// Generic type - синтаксис за допомогою якого тип змінної замість T підставиться автоматично
const getter = <T>(data: T): T => data;

// Тут замість Т буде string і таким чином ми можем взяти s.length
const s = getter('fsfsrs');
console.log(s.length)

// А тут замість Т буде тип number і синтаксис JS не дає нам взяти length
// тим самим запобігає появи помилки
const x = getter(15001);
console.log(x)

interface User {
  name: string
}

// Utility Readonly
const user : Readonly<User> = {
  name: 'Gerax'
}

interface Props {
  a?: number
  b?: number
}

const obj: Props = { a: 10 } // Ok
const obj1: Required<Props> = { a: 10, b: 510 } // А тут обов'язково стають всі поля