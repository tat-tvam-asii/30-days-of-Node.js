// Problem 2: File Writer
// Problem Statement: Create a function writeToFile(filePath, content) that takes the path to a file and user input content as input. The function should write the content to the specified file using the fs module.

const fs = require('fs')

function writeToFile(filePath, content) {
    fs.writeFile(filePath,content,(err) => {
        if (err) {
            console.error(`Error writing to file : ${err.message}`);
        }
        else {
            console.log(`Data written to ${filePath}`);
        }
    })
}

//Test Cases

writeToFile('test-files/output1.txt','Sample content.');
writeToFile('test-files/nonexistent-folder/output1.txt','Content in a nonexistent folder.');