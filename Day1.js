// Problem 1: File Reader
// Problem Statement: Create a function readFileContent(filePath) that takes the path to a file as input and reads its content asynchronously using the fs module. The function should print the content to the console.

const fs = require('fs')

async function readFileContent(filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) console.log(err)
        else console.log("File Content:\n"+data)
    })
}

readFileContent('test-files/file1.txt');

readFileContent('test-files/empty-file.txt');

readFileContent('test-files/nonexistent-file.txt');