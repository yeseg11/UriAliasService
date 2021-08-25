// var express = require('express');
// var router = express.Router();
const path = require('path');
const dictionary = require("../dictionaryData/dictionary");
const convertDates = require("../others/convertDates");
const helpFunc = require("./helpFunctions");


/** ----------------------------------------------------------------------------------
 * POST request
 * Return the array with uri and alias
 * Params in one cell from the array jsom file: 
 * @PARAM {String*} AKNType: Given AKNType (act, officialGazette, bill, debeterecord )
 * @PARAM {String} Type: Given Type (law, basicLaw,חוק,חוק יסוד….)
 * @PARAM {String} emissionDate: Given emissionDate with the format : YYYY-MM-DD 
 * @PARAM {String} DocumentNumber: Given DocumentNumber 
 * @PARAM {String} Language: Given Language (heb,arb,eng)
 * @PARAM {String} ExpressionDate: Given ExpressionDate with the format: YYYY-MM-DD 
 *
 * @RESPONSE [{Uri,Alias,isConfig},{Uri,Alias,isConfig},....]
 * @RESPONSE-SAMPLE [uri:{/akn/il/[AKNType]/[[type]]/[[emissionDate]]/[[law number]]/[[language]]@[[enter into force date]] ,alias: /akn/il/act/חוק/\u200Fכב-אדר-התשף\u200E/2155604,isConfig:false},...]
 ----------------------------------------------------------------------------------*/



createUris = async function (req, res, next) {  
    if (!req || !req.body) return res.sendStatus(400); //if the request is empty, return it
    try{
        var data = await createUrisFunc(req.body);
        console.log(data);
        res.status(data[0]);
        res.send(data[1]);
    }

    catch(err){
        next(err);
    }
}

module.exports = {createUris}


//Grab the user from PublicUsers collection
function createUrisFunc(body){
    return new Promise((resolve, reject) => {
        if (body != null && body != undefined){
            const form = body;
            var promises = [];
            for(index in form)
            {
                promises.push(helpFunc.getUriAndAlias(form[index]));
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
}