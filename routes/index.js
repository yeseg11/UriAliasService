var express = require('express');
var router = express.Router();

//Main Page
const mainPage = require('./mainPage/mainPage');

//urlAliasService
const createUris = require('./uriAliasService/createUris');
const createUri = require('./uriAliasService/createUri');

//heb2greService
const heb2greService = require('./heb2greService/heb2greDate');

//gre2hebDate
const gre2hebPost = require('./gre2HebService/gre2hebPost');
const gre2hebGet = require('./gre2HebService/gre2hebGet');

//Dictionary
const dictionaryData = require('./dictionaryData/addDataToDic');
const allDictionary = require('./dictionaryData/showAllDic');

const post = {
  createUris,
  createUri,
  gre2hebPost,
  dictionaryData
};

const get = {
  gre2hebGet,
  heb2greService,
  allDictionary
};

module.exports = {
  post,
  get,
  mainPage
};
