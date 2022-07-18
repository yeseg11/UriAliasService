const { Console } = require('console');
const fs = require('fs');
const { getSystemErrorMap } = require('util');

function getHebTranslation(word){
    return new Promise((resolve, reject) => {
        fs.readFile('./data/dictionary.json', 'utf8',(err, data) => {
            // console.log('data data: ',data);
          if (err) {
            console.log('data err: ',err);
            reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
            return        // and we don't want to go any further
          }
          var myObject= JSON.parse(data);
          if (myObject[word]){
            resolve('‏'+myObject[word]+'‎');
          }else{
            reject('Error');
          }
        })
      })
}

function getEngTranslation(word){
    return new Promise((resolve, reject) => {
        fs.readFile('./data/dictionary.json', 'utf8',(err, data) => {
            if (err) {
                console.log('data err: ',err);
                reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
                return        // and we don't want to go any further
            }
            var myObject= JSON.parse(data);
            for (var key in myObject) {
                if (word == myObject[key]){
                    console.log('key',key);
                    resolve(key);
                }
            }
            reject('Error: Can not find the English translate');
        });
      });
}


module.exports = { getHebTranslation,getEngTranslation };
