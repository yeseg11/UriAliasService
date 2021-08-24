const fs = require('fs');
const { getSystemErrorMap } = require('util');






const hebDictionary = new Map();
hebDictionary.set('law',"\u200Fחוק\u200E");
hebDictionary.set('basic_law',"\u200Fחוק_יסוד\u200E");
hebDictionary.set('StatuteBook',"\u200Fספר_החוקים\u200E");
hebDictionary.set('LawBook',"\u200Fספר_החוקים\u200E");

function getHebTranslation(word){
    console.log(hebDictionary.get(word));
    let utf8decoder = new TextDecoder();
    return hebDictionary.get(word);
}


function getEngTranslation(word){
    // var data = fs.readFileSync('../data/dictionary.json');
    // var myObject= JSON.parse(data);
    // var newData = JSON.stringify(myObject);
    // console.log(newData);




    for (let [key, value] of hebDictionary.entries()) {
        if (value == word){
            return key;
        }   
      }
}


function addDataToDic(key,value){
    //If have the key, update. else push. 
    var data = fs.readFileSync('../data/dictionary.json');
    var myObject= JSON.parse(data);
    if (myObject.get(key)){
        myObject[key] = value;
    }
    else{
        let newData = {
            key: value
        }  
        myObject.push(newData);
    }
    fs.writeFile('data.json', newData, err => {
        // error checking
        if(err) throw err;   
        console.log("New data added");
    });
}

module.exports = { getHebTranslation,getEngTranslation };
