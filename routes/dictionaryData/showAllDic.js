// var express = require('express');
const fs = require('fs');
const { getSystemErrorMap } = require('util');

/** ----------------------------------------------------------------------------------
 * Get request
 * Return All the data from the Dictionary 
 *
 * @RESPONSE [{key:value},{key:value},....]
 ----------------------------------------------------------------------------------*/

getAllDictionary = async function (req, res, next) {  
    try{
        var data = await readJson();
        res.send(data);
    }

    catch(err){
        next(err);
    }
}
module.exports = {getAllDictionary};


function readJson(){        
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync('./data/dictionary.json');
        var myObject= JSON.parse(data);
        resolve(myObject);
    });
}