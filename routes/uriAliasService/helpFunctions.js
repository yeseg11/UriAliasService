const path = require('path');
const dictionary = require("../dictionaryData/dictionary");
const convertDates = require("../others/convertDates");
  /** ----------------------------------------------------------------------------------
   * Check if str contains hebrew
   *  ----------------------------------------------------------------------------------*/
   function contains_heb(str) {
    return (/[\u0590-\u05FF]/).test(str);
  }
  
  /** ----------------------------------------------------------------------------------
   * get english form and return array with uri and alias
   *  ----------------------------------------------------------------------------------*/
  function createEngUri(form) {
    return new Promise((resolve, reject) => {
      var uri = "/akn/il/";
      var alias = "/akn/il/";
      var dateParts = form.emissionDate.split("-");
      var hDate = convertDates.G2H(dateParts[0],dateParts[1],dateParts[2]);
      dictionary.getHebTranslation(form.Type).then((value) => {
        if (form.Language == undefined || form.Language == "" || form.Language.length < 3){
        uri +=form.AKNType+"/"+form.Type+"/"+form.emissionDate+"/"+form.DocumentNumber
        alias += form.AKNType+"/" +value+"/"+hDate+"/"+form.DocumentNumber
        }
        else{
          uri +=form.AKNType+"/"+form.Type+"/"+form.emissionDate+"/"+form.DocumentNumber+"/"+form.Language+"@"+form.ExpressionDate;
          if (form.ExpressionDate != undefined && form.ExpressionDate.length != 0){
            expressionDateParts = form.ExpressionDate.split("-");
            heDate = convertDates.G2H(expressionDateParts[0],expressionDateParts[1],expressionDateParts[2]);
            alias += form.AKNType+"/" +value+"/"+hDate+"/"+form.DocumentNumber+"/"+form.Language+"@\u200E"+ heDate +"\u200F";
          }
          else{
            alias += form.AKNType+"/" +value+"/"+hDate+"/"+form.DocumentNumber+"/"+form.Language+"@";
          }
        }
        const uriObj = new Object();
        uriObj['uri'] = uri;
        uriObj['alias'] = alias;
        uriObj['ifconfig'] = false;
        uriObj['status'] = 200;
        resolve(uriObj);
      });
    });
  }
  /** ----------------------------------------------------------------------------------
   * Check if the uri data is correct 
   *  ----------------------------------------------------------------------------------*/
   function checkFormData(form){
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

  
  /** ----------------------------------------------------------------------------------
   * get english form and return array with uri and alias
   *  ----------------------------------------------------------------------------------*/
   function createHebUri(form) {
    return new Promise((resolve, reject) => {
      var alias = "/akn/il/";
      var uri = "/akn/il/";
      var emissionDateDateParts = form.emissionDate.split("-"); ; 
      var eDate = convertDates.HStr2G(emissionDateDateParts[2],emissionDateDateParts[1],emissionDateDateParts[0]);
      dictionary.getEngTranslation(form.Type).then((value) => {
        if (form.Language == undefined || form.Language == "" || form.Language.length < 3){
          alias += form.AKNType+"/"+form.Type+"/"+form.emissionDate+"/"+form.DocumentNumber
          uri += form.AKNType+"/" +value+"/"+eDate+"/"+form.DocumentNumber

          
        }
        //Create Expression
        else{
          if (form.ExpressionDate != undefined || form.ExpressionDate != ""){
            alias += form.AKNType+"/"+form.Type+"/"+form.emissionDate+"/"+form.DocumentNumber+"/"+form.Language+"@\u200E"+form.ExpressionDate +"\u200F";
            expressionDateParts = form.ExpressionDate.split("-");
            eeDate = convertDates.HStr2G(expressionDateParts[2],expressionDateParts[1],expressionDateParts[0]);
        
          }
          else{
            alias += form.AKNType+"/"+form.Type+"/"+form.emissionDate+"/"+form.DocumentNumber+"/"+form.Language+"@";
          }
          var dateParts = form.emissionDate.split("-");
          var eDate = convertDates.HStr2G(dateParts[2],dateParts[1],dateParts[0]);
          if (eeDate != null || eeDate != undefined){
            uri += form.AKNType+"/" +value+"/"+eDate+"/"+form.DocumentNumber+"/"+form.Language+"@" +eeDate;
          }
          else {
            uri += form.AKNType+"/" +value+"/"+eDate+"/"+form.DocumentNumber+"/"+form.Language+"@";
          }
        }
        //The last false is for if config!
        const uriObj = new Object();
        uriObj['uri'] = uri;
        uriObj['alias'] = alias;
        uriObj['ifconfig'] = false;
        uriObj['status'] = 200;
        resolve(uriObj);
      });
      // reject("Error on create uri");
    });
    
  }
  



  
  function getUriAndAlias(object){
    return new Promise((resolve, reject) => {
      
      // var returnData = object;
      var dateCheck = checkFormData(object);
      if (dateCheck != 'Success'){
        const errObj = new Object();
        errObj['status'] = dateCheck[0];
        errObj['errorMessege'] = dateCheck[1];
        return errObj;
      }  
      // console.log("Check hebrew: ",contains_heb(object.Type));
      if (contains_heb(object.Type) ||  contains_heb(object.emissionDate)){
        createHebUri(object).then((retdata)=> {
          resolve(retdata);
        });
      }
      else {
        createEngUri(object).then((retdata)=> {
          resolve(retdata);
        });
      }
    });
    
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

  module.exports = {
    contains_heb,
    createEngUri,
    checkFormData,
    createHebUri,
    checkHebDate,
    checkDate,
    getUriAndAlias
  };