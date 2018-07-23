var fs = require("fs");
 fs.readFile('oust.txt',function(err,data){

if(err) return console.log(err);
console.log(data.toString());

})


console.log("程序执行结束！");
var events = require('events');
//创建一个eventEmiiter对象
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected(){
  console.log('链接成功');
  eventEmitter.emit('data_received');



}

eventEmitter.on('connection',connectHandler);
eventEmitter.on('connection',function()
{
	console.log("connection的第二个监听器")
})
eventEmitter.on('data_received',function(){

console.log('数据连接成功');
})


eventEmitter.emit('connection');

console.log('process runed.........');

console.log(eventEmitter.listeners('connection'))


//链式流一般用于管道操作
//用短刀和链式来压缩文件
var zlib= require('zlib');

fs.createReadStream('out.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('out.txt.gz'));


console.log("文件压缩完成");



