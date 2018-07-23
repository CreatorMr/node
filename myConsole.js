  var fs = require('fs');
  

  var output = fs.createWriteStream('./out.txt');
  var errorOutput = fs.createWriteStream('./error.txt');

 var logger = new console.Console(output,errorOutput);

 var msg = "我是日志";

logger.log(msg);
var error = "错误日志";


