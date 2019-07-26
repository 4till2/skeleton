var exports = module.exports;


exports.ReactTemplate = class {
    constructor(){
        this.name = undefined;
        this.imports = [];
        this.type = undefined;
        this.classes = [];
        this.container = 'div';
        this.visualizeContainer = false;
    }
    get template(){
        if (!this.name) return false;
        return this.createTemplate();
    }
    validName(name){
        return name;
    }
    validImports(imports){
        return (imports && Array.isArray(imports) && imports[0].name && imports[0].location)
    }
    validType(type){
        return (type && (type === 'class' || type === 'function'))
    }
    validClasses(classes){
        return (classes && Array.isArray(classes) && classes[0]);
    }
    validContainer(container){
        return (container && (container === 'div' || container === 'a' || container === 'span'))
    }

    setName(name){
        if (this.validName(name)){
            this.name = name;
            return true;
        }
        return false;
    }
    
    setImport(imports){
        if (this.validImports(imports)){
            imports.forEach(imp => this.imports.push({name:imp.name, location:imp.location}))
            return true;
        }
        return false
    }
    setType(type){
        if (this.validType(type)){
            this.type = type;
            return true;
        }
        return false;
    }
    setClasses(classes){
        if (this.validClasses(classes)){
            classes.forEach(cla => this.classes.push(cla))
        }
        return false;
    }
    setContainer(container){
        if (this.validContainer(container)){
            this.container = container;
            return true;
        }
        return false;
    }
    setVisualize(visualizeContainer){
        this.visualizeContainer = visualizeContainer;
    }

    createTemplate(){
        if (this.type === 'class') return this.react_class();
        if (this.type === 'function') return this.react_function();
        if (this.type === 'root') return this.react_root();
        return this.react_empty();
    }

    createImports(){
        return (this.imports.map(imp => (`import ${imp.name} from '${imp.location || './'}'`))).join('\n');
    }

    createContent(){
        return (`<p>${this.name}</p>`)
    }

    createClasses(){
        return (`className="${this.classes.join(" ")}"`)
    }

    createRenders(){
        return (this.imports.map(imp => (`<${imp.name} />`))).join('\n\t\t\t\t');
    }

//REACT TEMPLATES
    react_class(){
        return (`
import React, { Component } from 'react'
${this.createImports()}

export default class ${this.name} extends Component {
    render() {
        return (
            <${this.container} ${(this.classes) ? this.createClasses() : ''}>
                ${this.visualizeContainer ? this.createContent(this.name) : ''} 
                ${this.createRenders()}
            </${this.container}>
        )
    }
}
        `)
    }

    react_function(){
        return (`
import React from 'react'
${this.createImports()}

export default function ${this.name}() {
    return (
        <${this.container} ${(this.classes) ? this.createClasses() : ''}>
            ${this.visualizeContainer ? this.createContent(this.name) : ''}
            ${this.createRenders()} 
        </${this.container}>
    )
} 
        `)
    }

    react_empty(){
        return (`
import React from 'react'
${this.createImports()}
        `)
    }

    react_root(){
        return (`
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<${this.name} />, document.getElementById('root'));              
        `)
    }
}