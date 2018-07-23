var http = require("http");
var url = require('url');
var querystring = require('querystring');
var util = require('util');
var fs = require('fs');

var os = require('os');

var path = require('path');

var net = require('net');


// var  postHtml = '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '网站名： <input name="name"><br>' +
//   '网站 URL： <input name="url"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';
function start(route){
	function onRequest(request,response){
		    var pathname = url.parse(request.url).pathname;
		    console.log("Request for " + pathname + " received.");
		 
		    route(pathname);
		 
		    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
		    var params = url.parse(request.url, true).query;

		    console.log("params >>>>");
		    console.log(params);
		    // CPU 的字节序
			console.log('endianness : ' + os.endianness());

			// 操作系统名
			console.log('type : ' + os.type());

			// 操作系统名
			console.log('platform : ' + os.platform());

			// 系统内存总量
			console.log('total memory : ' + os.totalmem() + " bytes.");

			// 操作系统空闲内存量
			console.log('free memory : ' + os.freemem() + " bytes.");


			// 转换为绝对路径
			console.log('resolve : ' + path.resolve('favicon.ico'));
		    var post = "";
		    request.on('data',(chunk)=>{
		    	post += chunk;
		    });
		    console.log("????????????????????????post>>>")
		    console.log(querystring.parse(post));
		    request.on('end',()=>{
		    	fs.readFile(pathname.substr(1),function(err,data){
		    		if(err){
		    			console.log(err);
		    			//http 状态吗404 not found 
		    			response.writeHead(404,{"content-Type":"text/html"});
		    		}else{
		    			response.writeHead(200,{"content-Type":'text/html'});
		    			response.write(data.toString());

		    			if(params.name && params.url){
		    				response.write("网站名： " + params.name);
		    				response.write("网址： " + params.url);
		    			}
		    		}
				    response.end();	
		    	})
			   
		    })
	}
	//使用http创建web服务器

	http.createServer(onRequest).listen(8888)
	console.log("node server is statring")
}

exports.start = start;

