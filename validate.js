const fs = require('./file-ops');

var exports = module.exports; 

const VALID_TYPES = ['class', 'function'];
const VALID_EXTENSIONS = ['.js', '.html', '.css', '.txt'];
const VALID_CONTAINER = ['div', 'span'];
const default_extension = '.js';
const default_directory = './';
const default_container = 'div';
const default_type = 'class';

exports.validateDirectory = function(directory) {
  directory = directory || default_directory;
  if (directory.slice(-1) != '/') directory = directory + '/';
  if (directory.slice(-2) === '//') directory = directory.slice(0, -1);
  if (!(fs.directoryExists(directory))) {
    fs.makeDirectory(directory);
  }
  return directory;
}

exports.validateExtension = function(extension){
  return (VALID_EXTENSIONS.includes(extension)) ? extension : default_extension;
}

exports.validateContainer = function(container){
  return (VALID_CONTAINER.includes(container)) ? container : default_container;
}

exports.validateType = function(type){
  return (VALID_TYPES.includes(type) ? type : default_type);
}

exports.validateName =  function(name){
  return (!fs.directoryExists(name) ? name : "ERROR")
}
