/* GET home page. */
var express = require('express');
var router = express.Router();
const path = require('path');

mainPage = async function (req, res, next) {  
  try{
    res.sendFile(path.join(__dirname+'/mainPage.html'));
  }

  catch(err){
      next(err);
  }
}
module.exports = {mainPage}