const helperFunc = require('./helper/create-user') // Імпорт, приймаємо щось з другого файла
// // ./ це поточний рівень вложеності
// // ../ це на один рівень вложеності назад
// // ../../ це на два рівня вложеності назад, і так далі
console.log(__dirname); // Папка з якої я запускаю цей код
console.log(__filename); // Файл з якого я запускаю цей код

console.log(__dirname + `\\image\\home`); // Таким чином можна додавати шляхи

const nick = helperFunc.createUser('Nick', 'Bogach'); // Таким чином можна використовувати
// функцію з другого файла

console.log(nick);


const fs = require('fs'); // виклик бібліотеки fs
const fs = require('fs'); // Новий варіант який зразу йде з промісами а не з колбеками
const path = require('path');
const util = require('util');

const appendFilePromise = util.promisify(fs.appendFile); // Проміфісикує файл, робить проміси

fs.mkdir(__dirname + '\\files', (err) => {
  if(err){
    console.log(err)
  }
});

const ttxPath = path.join(__dirname, 'files', 'data.txd'); // Це для того щоб писати шлях, воно автоматично
// прокладе шлях з // в правильну сторону, відносно до Операційної Системи


appendFilePromise(ttxPath, 'God saved us from death \n') // Створило
  // в папці files текстовий документ data.txd, написало God saved us from death в data.txd
  // і перекинуло на новий рядок;
  .then(value => {
    console.log(value)
  })
  .catch(err => {
    console.log(err)
  })

fs.readFile(ttxPath).then(value => { // Прочитати файл
  console.log(value); // Значення верне бафером
  console.log(value.toString()); // Значення верне стрічкою
})

const filePath = path.join(__dirname, 'files');



fs.readdir(filePath).then(files => { // Читати директорію
  console.log(files);

  for (const file of files) {
    const currentFilePath = path.join(filePath, file)

    fs.stat(currentFilePath)
      .then(info => { // Інформація про файл
        // console.log(info.isFile()) // Чи є це значення  файлом
        // console.log(info.isDirectory()) // Чи є це значення директорією


        if (!info.isDirectory()) {
          fs.readFile(currentFilePath)
            .then(data => {
              console.log(data.toString())
            })
        }
      })
  }
})

const boysPath = path.join(__dirname, 'files', 'boys');
const girlsPath = path.join(__dirname, 'files', 'girls');
fs.rename(path.join(boysPath, 'julia.json'), path.join(girlsPath, 'julia.json')).then()


const ttxPath = path.join(__dirname, 'files', 'data.txd');
const ttxPathCopy = path.join(__dirname, 'files', 'copy1');

const readStream = fs.createReadStream(ttxPath);
const writeStream = fs.createWriteStream(ttxPathCopy); // таким чином можна створити копію якогось
// документа

readStream.on("data", (chunk) => { // Проходиться по чанкам
  console.log(chunk);
  console.log('---------chunk-----');

  writeStream.write(chunk);
})

readStream.pipe(writeStream); // readstream буде автоматично читати та перенаправляти на writestream
// таким чином це буде відбуватись рівномірно

readStream.on('end', () => { // В кінці стріма спрацює цей код
  console.log('End')
})

