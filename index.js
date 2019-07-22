var templates = require('./templates');
var fs = require('./file-ops');

function validateDirectory(directory) {
  directory = directory || './';
  if (directory.slice(-1) != '/') directory = directory + '/';
  if (directory.slice(-2) === '//') directory = directory.slice(0, -1);
  if (!(fs.directoryExists(directory))) {
    fs.makeDirectory(directory);
  }
  return directory;
}

//Create a file with a react template
function createReactTemplate(name, directory, extension, classes, container, imports, type, visualize) {
  const template = new templates.ReactTemplate();
  template.setName(name)
  template.setClasses(classes)
  template.setContainer(container);
  template.setImport(imports)
  template.setType(type);
  template.setVisualize(visualize);
  directory = validateDirectory(directory)
  extension = extension || '.js';
  fs.writeFile(directory + name + extension, template.template)
}

function createSkeleton(outline) {
  if (!outline) {
    return
  }

  let name = outline.name
  let directory = outline.directory
  let extension = '.js'
  let classes = outline.classes
  let container = ('div');
  let imports = outline.children.length ? outline.children.map(function (e) {
    return ({
      name: e.name,
      location: (e.directory || './') + e.name
    })
  }) : ''
  let type = outline.type
  let visualize = true;
  createReactTemplate(name, directory, extension, classes, container, imports, type, visualize)
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