
function sum(a: number, b: number) { // Типізація елементів
  const sumOfNums = a + b;
  return sumOfNums.toString();
}

let sum1 = sum(10, 900);

console.log(sum1);


interface IUser { // Типізація яка буде на виході
  firstName: string,
  lastName: string,
  age: number | boolean, // Тут можна вказувати декілька значень
  car: boolean
}

function createUser(firstName: string, lastName: string, age?: number): IUser { // age? знак питання для необов'язкового
// вводу елемента. IUser для типізації на вихідних елементах
  console.log('was');

  return {
    firstName,
    lastName,
    age,
    car: true
  }
}

let user = createUser('Victor', 'Jora');

console.log(user);


function filterUserBuilder(filterObj: IUser): [IUser]{ // Повинно вернути хоча б якесь значення
  return []
}

function filterUserBuilder(filterObj: IUser): IUser[]{ // Це спрацює нормально без питань
  return []
}
function filterUserBuilder(filterObj: IUser): Array<string>{ // Поверне массив стрічок
  return []
}


function filterUserBuilder(filterObj: Partial<IUser>): Array<string | number> { // Partial дозволяє приймати не весь
                                                                                // класс а тільки його частинку і повертати його частину Array<string | number> - такий синтакс дозволяє вказувати
                                                                                // декілька значень
  return ['Hello', 'World', 1]
}

filterUserBuilder({firstName: 'Victor'})


// enum використовується для переліку чогось що надалі буде використовуватись
enum ESubject {
  JAVA_SCRIPT = 'JavaScript',
  NODE_JS = 'NodeJS'
}

class User {
  name: string; // В классах обов'язково вказувати ці поля, без них не спрацює
  course: number;
  wife: boolean

  constructor(name: string, course: number){
    this.name = name;
    this.course = course;
    this.wife = true;
  }

  public closeSession(): any{
    this.buyKursova(ESubject.JAVA_SCRIPT); // Таким чином вводиться значення з enum
    this.playGames();
  }

  public helpFriend(friendName: string): void{
    console.log(`I have helped ${friendName}`);
    this.playGames();
  }


  public sayCourse(): void{ // По дефолту стоїть public, це можна не вказувати
    console.log(`Hi, I study ${this.course} course`)
  }

  protected playGames(): void { // Протектед можна використовувати в рамках об'єкта де він був створений та в нащадках
    console.log(`${this.name} is playing games`)
  }

  private buyKursova(subject: ESubject): any{ // Може викликатись тільки в межах об'єкта де він був створений
                           // ESubject це enum який був оголешний вище
    return {
      subject,
      done: true
    }
  }
}

class Human extends User{
  constructor(name: string, course: number) {
    super(name, course);
  }

  public walkWithFriends(): void{ // таким чином цією функцією можна викликати protected функцію будучи нащадком
    this.sayCourse();
    this.playGames();
  }
}


const roma = new User('Romchik', 4);
const roman = new Human('Roman Yuriyovich', 10)


// Це тіпа для динамічного взяття ключу але воно чомусь не працює
function getKey(key: keyof IUser): any{
  return user[key]
}

getKey('firstName')

roma.sayCourse();
roman.walkWithFriends();
roman.helpFriend('Nikita');
roma.closeSession();
roman.walkWithFriends();

