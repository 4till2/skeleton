const fs = require('fs-extra');

// Append to file
module.exports.appendFile = function(path, content) {
    fs.appendFile(path, content, function (err) {
        if (err) throw err;
        console.log('Saved ' + path + '!');
    });
}

// Open file for writing
module.exports.openFile = function(path, rules = 'w') {
    fs.open(path, rules, function (err, file) {
        if (err) throw err;
        console.log('Opened ' + path + '!');
    });
}

//  Replace file
module.exports.writeFile = function(path, content) {
    fs.writeFile(path, content, function (err) {
        if (err) throw err;
        console.log('Saved ' + path + '!');
    });
}

// Delete file or directory
module.exports.deleteFileOrDirectory = function(path) {
    fs.removeSync(path);
    console.log('Deleted: ' + path);
}

// Read JSON from file
module.exports.readJson = function(path) {
    return new Promise(function (resolve, reject) {
        fs.readJson(path, (err, jsonObject) => {
            if (err) reject(err)
            resolve(jsonObject) // => 0.1.3
        })
    })
}

module.exports.directoryExists = function(directory){
    return fs.existsSync(directory)
}

module.exports.makeDirectory = function(directory){
    fs.mkdirSync(directory)
    return true
}