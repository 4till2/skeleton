const templates = require('./templates');
const fs = require('./file-ops');

const default_extension = '.js';
const default_directory = './';
const default_container = 'div';
const default_type = 'class';

const VALID_TYPES = ['class', 'function'];
const VALID_EXTENSIONS = ['.js', '.html', '.css', '.txt'];
const VALID_CONTAINER = ['div', 'span'];

const VISUALIZE = false;

function validateDirectory(directory) {
  directory = directory || default_directory;
  if (directory.slice(-1) != '/') directory = directory + '/';
  if (directory.slice(-2) === '//') directory = directory.slice(0, -1);
  if (!(fs.directoryExists(directory))) {
    fs.makeDirectory(directory);
  }
  return directory;
}

function validateExtension(extension){
  return (VALID_EXTENSIONS.includes(extension)) ? extension : default_extension;
}

function validateContainer(container){
  return (VALID_CONTAINER.includes(container)) ? container : default_container;
}

function validateType(type){
  return (VALID_TYPES.includes(type) ? type : default_type);
}

function validateName(name){
  return (!fs.directoryExists(name) ? name : "ERROR")
}

//Create a file with a react template
function createReactTemplate(element) {
  const template = new templates.ReactTemplate();
  template.setName(element.name)
  template.setClasses(element.classes)
  template.setContainer(element.container);
  template.setImport(element.imports)
  template.setType(element.type);
  template.setVisualize(element.visualize);
  fs.writeFile(element.directory + element.name + element.extension, template.template)
}

function createSkeleton(outline) {
  if (!outline) {
    return
  }
  let element = {
    directory : validateDirectory(outline.directory),
    name : validateName(outline.name),
    extension : validateExtension(outline.extension),
    classes : outline.classes,
    container : validateContainer(outline.container),
    imports : outline.children.length ? outline.children.map(function (e) {
      return ({
        name: validateName(e.name),
        location: validateDirectory(e.directory) + e.name
      })
    }) : '',
    type : validateType(outline.type),
    visualize : VISUALIZE
  }

  createReactTemplate(element)
  if (!outline.children) return
  outline.children.forEach(e => createSkeleton(e));
}

function deleteSkeleton(outline){
  if (!outline) return
  fs.deleteFileOrDirectory(outline.directory+outline.name+'.js')
  if (!outline.children) return
  outline.children.forEach(e => deleteSkeleton(e));
}

function main() {
  fs.readJson('./outline.json')
    .then(outline => createSkeleton(outline))
    .catch(err => console.log(err))
}

main()