function abc() {
    console.log("Hello, this is my first application using Node...");
}

let name = "Abhay";

function def() {
    console.log("Hello Abhay...");
}

// Correct way to export in Node.js
module.exports = { abc, name, def };
