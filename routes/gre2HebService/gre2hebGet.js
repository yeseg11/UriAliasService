const convertToHebrewDate = require("../others/convertDates");
const datesHelpFunc = require("../others/datesHelpFunctions");

  /** ----------------------------------------------------------------------------------
   * GET request
   * Get gregorian date and Return hebrew date 
   * @PARAM {String*} Date: Given date in format: YYYY-MM-DD
   *
   * @RESPONSE Hebrew date
   * @RESPONSE-SAMPLE : '‏כא-תמוז-התשפא‎'
   *  ----------------------------------------------------------------------------------*/
  
   gre2hebDate = async function (req, res, next) {  
    if (!req || !req.params) return res.sendStatus(400); //if the request is empty, return it
    try{
        const data = req.params;
        var dateParts = data.date.split("-");
        var dateCheck = datesHelpFunc.checkDate(dateParts[0],dateParts[1],dateParts[2]);
        if (dateCheck != 'Success'){
          res.status(dateCheck[0]);
          res.send(dateCheck[1]);
          return;
        }
        
        var year = dateParts[0];
        var month = dateParts[1];
        var day = dateParts[2];
        var hDate = convertToHebrewDate.G2H(year,month,day);
        res.status(200);
        res.send(hDate);
    }
    catch(err){
        next(err);
    }
  }
  
  module.exports = {gre2hebDate};