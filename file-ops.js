const fs = require('fs-extra');
var exports = module.exports; 

// Append to file
exports.appendFile = function(path, content) {
    fs.appendFile(path, content, function (err) {
        if (err) throw err;
        console.log('Saved ' + path + '!');
    });
}

// Open file for writing
exports.openFile = function(path, rules = 'w') {
    fs.open(path, rules, function (err, file) {
        if (err) throw err;
        console.log('Opened ' + path + '!');
    });
}

//  Replace file
exports.writeFile = function(path, content) {
    if (path.slice(-2) === './') {
        console.err("No Overwriting current directory")
        return;
    }
    fs.writeFile(path, content, function (err) {
        if (err) throw err;
        console.log('Saved ' + path + '!');
    });
}

// Delete file or directory
exports.deleteFileOrDirectory = function(path) {
    fs.removeSync(path);
    console.log('Deleted: ' + path);
}

// Read JSON from file
exports.readJson = function(path) {
    return new Promise(function (resolve, reject) {
        fs.readJson(path, (err, jsonObject) => {
            if (err) reject(err)
            resolve(jsonObject) // => 0.1.3
        })
    })
}

exports.directoryExists = function(directory){
    return fs.existsSync(directory)
}

exports.makeDirectory = function(directory){
    fs.mkdirSync(directory)
    return true
}