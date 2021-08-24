const path = require('path');
const dictionary = require("../dictionaryData/dictionary.js");
const convertDates = require("../others/convertDates");

/** ----------------------------------------------------------------------------------
 * Check if the hebrew year,month and day is correct 
 *  ----------------------------------------------------------------------------------*/
 function checkHebDate(year,month,day){
    if (year == undefined || year == ''){
        return [400,"Error in year"]; 
    } 
    if (month == undefined || month == '' || month.length < 2){
      return [400,"Error in month"]; 
    }
    if (day == undefined || day == ''){
      return [400,"Error in day"]; 
    }
    return 'Success';
  }


  /** ----------------------------------------------------------------------------------
   * Check if the uri data is correct 
   *  ----------------------------------------------------------------------------------*/
   function checkFormDate(form){
    if (form.AKNType == undefined || form.AKNType == ''){
        return [400,"Error in aknType"]; 
    } 
    if (form.Type == undefined || form.Type == ''){
      return [400,"Error in type"]; 
    }
    if (form.emissionDate == undefined || form.emissionDate == ''){
      return [400,"Error in emissionDate"]; 
    }
    if (form.DocumentNumber == undefined || form.DocumentNumber == ''){
      return [400,"Error in DocumentNumber"]; 
    }
    // if (form.Language == undefined || form.Language == ''){
    //   return [400,"Error in Language"]; 
    // }
    return 'Success';
  }

  // /** ----------------------------------------------------------------------------------
//  * Check if the gregorian year,month and day is correct 
//  *  ----------------------------------------------------------------------------------*/
function checkDate(year,month,day){
    if (year == undefined || year == '' || year.length != 4){
        return [400,"Error in year"]; 
    } 
    if (month == undefined || month == '' || month.length > 2){
      return [400,"Error in month"]; 
    }
    if (day == undefined || day == '' || day.length > 2){
      return [400,"Error in day"]; 
    }
    return 'Success';
  }

  module.exports = {
    checkFormDate,
    checkHebDate,
    checkDate
  };