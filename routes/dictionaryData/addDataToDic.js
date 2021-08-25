// var express = require('express');
const fs = require('fs');
const { getSystemErrorMap } = require('util');



/** ----------------------------------------------------------------------------------
 * POST request
 * Return the Success if the data added ,else Error
 * Params in one cell from the array jsom file: 
 * @PARAM {String*} key: Given key in English language
 * @PARAM {String} value: Given value in Hebrew language
 *
 * @RESPONSE [{Success},{Error},....]
 ----------------------------------------------------------------------------------*/

 addDataToDic = async function (req, res, next) {  
    if (!req || !req.body) return res.sendStatus(400); //if the request is empty, return it
    try{
        // console.log(req.body);
        const form = req.body;
        // var data = 
        // console.log(form[0]);
        // console.log(form[1]);
        var data = await addDTD(form);
        // console.log(data);
        // res.status(data[0]);
        // res.send(data[1]);
    }

    catch(err){
        next(err);
    }
}

module.exports = {addDataToDic};

//Grab the user from PublicUsers collection
function addDTD(form){
    return new Promise((resolve, reject) => {
        if (form != null && form != undefined){
            var promises = [];
            for(index in form)
            {
                promises.push(addData(form[index].key,form[index].value));
            }
            Promise.all(promises)    
            .then(function(data){ 
                // console.log("data: ",data);
                resolve([200,data]);
                // console.log("res done");
            })
            .catch(function(err){ 
                console.log("ERROR: ",err);
                reject(err);
            });
        }
        else{
            reject("Error body Empty");
        }
    });

    function addData(key,value){        
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./data/dictionary.json');
            var myObject= JSON.parse(data);
            myObject[key] = value;
            let newData = JSON.stringify(myObject);
            fs.writeFile('./data/dictionary.json', newData, err => {
                // error checking
                if(err) throw reject(err);   
                console.log("New data added");
                resolve("the key: "+key+" and the value: " +value+" added");
            });
        });
    }
}
