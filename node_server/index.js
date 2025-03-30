const http = require("http");
const colors = require("colors/safe");


// http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Hello World\n"); 
//     res.end("Abhay Dubey.........\n");
// }).listen(3000, () => {

  

//     console.log("✅ Server running at".green, "http://localhost:3000/".yellow);
// });



colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World\n");
  res.end("Abhay Dubey.........\n");

  
  console.log(colors.error("❌ This is an error!"));
  console.log(colors.warn("⚠️ This is a warning!"));
}).listen(3000, () => {
  console.log(colors.green("✅ Server running at"), colors.yellow("http://localhost:3000/"));
});
