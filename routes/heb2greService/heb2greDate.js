const convertToHebrewDate = require("../others/convertDates");
const datesHelpFunc = require("../others/datesHelpFunctions");
/** ----------------------------------------------------------------------------------
 * GET request
 * Get Hebrew date and Return gregorian date 
 * @PARAM {String*} Date: Given Hebrew date in format: YYYY-MM-DD
 *
 * @RESPONSE Gregorian date 
 * @RESPONSE-SAMPLE : '2021-07-19'
 *  ----------------------------------------------------------------------------------*/

 heb2greDate = async function (req, res, next) {  
  if (!req || !req.params) return res.sendStatus(400); //if the request is empty, return it
  try{
    const data = req.params;
    var hDate = data.hDate;  
    hDate = hDate.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
    var hDateArr = hDate.split("-");
    
    var dateCheck = datesHelpFunc.checkHebDate(hDateArr[2],hDateArr[1],hDateArr[0]);
    if (dateCheck != 'Success'){
      res.status(dateCheck[0]);
      res.send(dateCheck[1]);
      return;
    }
    var year = hDateArr[2];
    var month = hDateArr[1];
    if (month == 'אדר ב' || month == 'אדר שני' || month == 'אדרב'){
      month = 'אדר_ב';
    }
    if (month == 'אדר א' || month == 'אדר_א' || month == 'אדר ראשון'){
      month = 'אדר';
    }
    var day = hDateArr[0];
    var gDate = convertToHebrewDate.HStr2G(year,month,day);
    res.status(200);
    res.send(gDate);
  }
  catch(err){
      next(err);
  }
}

module.exports = {heb2greDate};