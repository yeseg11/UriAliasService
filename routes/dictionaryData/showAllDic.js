// var express = require('express');
const fs = require('fs');
const { getSystemErrorMap } = require('util');

/** ----------------------------------------------------------------------------------
 * Get request
 * Return All the data from the Dictionary 
 *
 * @RESPONSE [{key:value},{key:value},....]
 ----------------------------------------------------------------------------------*/

showDictionary = async function (req, res, next) {  
    try{
        var data = await readJson(form);
        console.log(data);
        res.send(data);
    }

    catch(err){
        next(err);
    }
}

module.exports = {showDictionary};

function readJson(){        
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync('./data/dictionary.json');
        var myObject= JSON.parse(data);
        console.log("myObject",myObject);
        resolve(myObject);
    });
}