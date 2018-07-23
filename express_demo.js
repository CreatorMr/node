var express = require('express');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var util = require('util');
var app = express();

var bodyParser = require('body-parser');
 var multer  = require('multer');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(multer({ dest: '/tmp/'}).array('image'))
app.use(cookieParser());


//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}
//1
app.get('/index.html',(req,res)=>{
	console.log("Cookies: " + util.inspect(req.cookies));
	res.sendFile(__dirname + '/' + 'index.html');

})
//  主页输出 "Hello World"
//2
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 //3
//  /del_user 页面响应
app.get('/app', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
    fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
     if (err) {
         return console.error(err);
     }
     console.log("数据写入成功！");
     console.log("--------我是分割线-------------")
     console.log("读取写入的数据！");
     fs.readFile('input.txt', function (err, data) {
        if (err) {
           return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
     });
  });
   res.send('删除页面');
})
 //4
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 //5
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
//6
app.get('/process_get',(req,res)=>{
	console.log(req);
	var process = {
		firstName:req.query.first_name,
		lastName :req.query.last_name
	}
	res.end(JSON.stringify(process))
})

app.post('/process_post',urlencodedParser,(req,res) => {
	// 输出 JSON 格式
   var response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name,

       "net_name":req.body.net_name,
       "net_url":req.body.net_url
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


 

 
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
		  res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
          res.end( JSON.stringify( response ) );
       });
   });
})

// //  POST 请求
// app.post('/', function (req, res) {
//    console.log("主页 POST 请求");
//    res.send('Hello POST');
// })
//获取users的列表
//7
app.get('/listUsers', function (req, res) {
	console.log("__dirname : >>>>.")
	console.log(__dirname);
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})
//添加用户
//8
app.get('/addUsers',(req,res) => {
	fs.readFile(__dirname + '/' + 'users.json',"utf8",(err,data) => {
		data = JSON.parse(data);
		data['user4'] = user['user4'];
		console.log(data);
		res.end(JSON.stringify(data));
	})
})


//用户详情
/*

  此处的路由 尽量不要使用。 /:id。  可能会有路由冲突的时候。在其之后的挂到实例的请求方法就失效了，走当前的路由，不会精准匹配

*/
app.get('/users/:id',(req,res) => {
  console.log(1)
	fs.readFile(__dirname + '/' + 'users.json',"utf8",(err,data) => {
		if(err){
			console.log(2)
		}else{
			data = JSON.parse(data)
			let user = data['user'+req.params.id];
			console.log(3);
      console.log(req.params)
			res.end(JSON.stringify(user))
		}
	});
	
})


app.get('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})