const fs = require('fs');
const child_process = require('child_process');
 
for(var i=0; i<3; i++) {
    //exec（）
    var workerProcess = child_process.exec('node support.js '+i, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('exec stdout: ' + stdout);
        console.log('exec stderr: ' + stderr);
    });
 
    workerProcess.on('exit', function (code) {
        console.log('exec子进程已退出，退出码 '+code);
    });

    //child_process.spawn 使用指定的命令行参数创建新进程第二参数是数组
    var workerProcess2 = child_process.spawn('node',['support.js', i])
    workerProcess.stdout.on('data', function (data) {
      console.log('spawn  stdout: ' + data);
   });
 
   workerProcess.stderr.on('data', function (data) {
      console.log('spawn  stderr: ' + data);
   });
 
   workerProcess.on('close', function (code) {
      console.log('spawn子进程已退出，退出码 '+code);
   });
   //child_process.fork 是 spawn() 方法的特殊形式，用于创建进程

   var worker_process = child_process.fork("support.js", [i]);
   worker_process.on('close',function(code){
    console.log("fork子进程已退出，退出码 " + code);
   })
}