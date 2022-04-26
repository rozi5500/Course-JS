
console.log(__dirname);


function createUser(name, lastName) {

    return{
        name: name,
        lastName,
        email: `${name}.${lastName}@gmail.com`.toLowerCase().trim()
    }
}

module.exports = { // модуль це наш файл, кожний файл це модуль
    createUser
}
