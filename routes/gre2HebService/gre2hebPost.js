const convertToHebrewDate = require("../others/convertDates");
const datesHelpFunc = require("../others/datesHelpFunctions");

/** ----------------------------------------------------------------------------------
 * POST request
 * Get gregorian date and Return hebrew date
 * Params in jsom file: 
 * @PARAM {String*} Year: Given Year in format: YYYY
 * @PARAM {String} Month: Given Month in format: NN
 * @PARAM {String} Day: Given Day in format: DD 
 *
 * @RESPONSE Hebrew date
 * @RESPONSE-SAMPLE : '‏כא-תמוז-התשפא‎'
 *  ----------------------------------------------------------------------------------*/


 gre2hebDate = async function (req, res, next) {  
  if (!req || !req.body) return res.sendStatus(400); //if the request is empty, return it
  try{
    const data = req.body;
    //console.log("data",data);
    var dateCheck = datesHelpFunc.checkDate(data.year,data.month,data.day);
    if (dateCheck != 'Success'){
      res.status(dateCheck[0]);
      res.send(dateCheck[1]);
      return;
    }
    // console.log("data.year",data.year);
    var year = data.year;
    var month = data.month;
    var day = data.day;
    var hDate = convertToHebrewDate.G2H(year,month,day);
    res.status(200);
    res.send(hDate);
  }
  catch(err){
      next(err);
  }
}

module.exports = {gre2hebDate};