
const fs = require('fs/promises');
const path = require('path');


const pathFile = path.join(__dirname, 'files', 'test.txd')
const pathDir = path.join(__dirname, 'files')




const boysPath = path.join(__dirname, 'files', 'boys');
const girlsPath = path.join(__dirname, 'files', 'girls');

fs.readdir(pathDir).then(files => {

  for (const file of files) {
    const currentDir = path.join(pathDir, file);

    fs.stat(currentDir).then(
      info => {

        if(info.isDirectory()){
          fs.readdir(currentDir).then(
            currentFile => {

              for (const obj of currentFile) {
                fs.readFile(path.join(currentDir, obj)).then(
                  value => {
                    const parsedObj = JSON.parse(value.toString());

                    if (parsedObj.gender === 'male'){
                      fs.rename(path.join(girlsPath, obj), path.join(boysPath, obj)).then()
                    } if(parsedObj.gender === 'female') {
                      fs.rename(path.join(boysPath, obj), path.join(girlsPath, obj)).then()
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
  }

  })

