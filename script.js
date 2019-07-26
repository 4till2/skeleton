const Template = require('./templates/templates');
const fs = require('./file-ops');
const Validate = require('./validate')

const VISUALIZE = true;

//Create a file with a react template
function createReactTemplate(element) {
  const reactTemplate = new Template.react.ReactTemplate();
  reactTemplate.setName(element.name)
  reactTemplate.setClasses(element.classes)
  reactTemplate.setContainer(element.container);
  reactTemplate.setImport(element.imports)
  reactTemplate.setType(element.type);
  reactTemplate.setVisualize(element.visualize);
  fs.writeFile(element.directory + element.name + element.extension, reactTemplate.template)
}

function createSkeleton(outline) {
  if (!outline) {
    return
  } console.log(outline)
  let element = {
    directory : Validate.validateDirectory(outline.directory),
    name : Validate.validateName(outline.name),
    extension : Validate.validateExtension(outline.extension),
    classes : outline.classes,
    container : Validate.validateContainer(outline.container),
    imports : outline.children.length ? outline.children.map(function (e) {
      return ({
        name: Validate.validateName(e.name),
        location: Validate.validateDirectory(e.directory) + e.name
      })
    }) : '',
    type : Validate.validateType(outline.type),
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

function build(outline){
  const htmlTemplate = new Template.html.HtmlTemplate()
  const reactTemplate = new Template.react.ReactTemplate();
  reactTemplate.name = outline.name;
  reactTemplate.type = 'root';
  fs.writeFile(Validate.validateDirectory() + 'index.html', htmlTemplate.template)
  fs.writeFile(Validate.validateDirectory() + 'index.js', reactTemplate.template)
  createSkeleton(outline)
}

function main() {
  fs.readJson('./outline.json')
    .then(outline => deleteSkeleton(outline))
    .catch(err => console.log(err))
}

main()