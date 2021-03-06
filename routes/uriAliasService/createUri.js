const { resolve } = require('path');
const path = require('path');
const dictionary = require("../dictionaryData/dictionary");
const convertDates = require("../others/convertDates");
const helpFunc = require("./helpFunctions");



/** ----------------------------------------------------------------------------------
 * POST request
 * Return the uri and alias
 * Params in jsom file: 
 * @PARAM {String*} AKNType: Given AKNType (act, officialGazette, bill, debeterecord )
 * @PARAM {String} Type: Given Type (law, basicLaw,חוק,חוק יסוד….)
 * @PARAM {String} emissionDate: Given emissionDate with the format : YYYY-MM-DD 
 * @PARAM {String} DocumentNumber: Given DocumentNumber 
 * @PARAM {String} Language: Given Language (heb,arb,eng)
 * @PARAM {String} ExpressionDate: Given ExpressionDate with the format: YYYY-MM-DD 
 *
 * @RESPONSE [{Uri,Alias,isConfig}]
 * @RESPONSE-SAMPLE [{uri:/akn/il/[AKNType]/[[type]]/[[emissionDate]]/[[law number]]/[[language]]@[[enter into force date]] ,alias: /akn/il/act/חוק/\u200Fכב-אדר-התשף\u200E/2155604,isConfig:false}
 ----------------------------------------------------------------------------------*/



  //Insert the new Json with the data.
createUri = async function (req, res, next) {  
    if (!req || !req.body) return res.sendStatus(400); //if the request is empty, return it
    try{
        const createUris = await createUriFunc(req.body); 
        console.log("createUris: ",createUris);
        var data = createUris[0];
        if (data == null){
           data = {error:"error"}
        }
        res.status(data);
        res.send(createUris[1]);
    }
    catch(err){
        next(err);
    }
}

module.exports = {createUri}


//grab the user from PublicUsers collection
async function createUriFunc(body){
    //Insert the new Json with the data.
    const form = body;
    try{
        var dateCheck = helpFunc.checkFormData(form);
        var dateCheck = 'Success';
        if (dateCheck != 'Success'){
            return(dateCheck[0],dateCheck[1]);
        }  
        var returnData;
        if (helpFunc.contains_heb(form.Type) ||  helpFunc.contains_heb(form.emissionDate)){
            returnData = await helpFunc.createHebUri(form);
        }
        else {
            returnData = await helpFunc.createEngUri(form);
        }
       
        return([200,returnData]) ;
    }catch(err){
        return(err);
    }
}


