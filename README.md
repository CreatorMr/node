###Node.js
##### Express框架

##### 可以设置中间件来响应http请求
  定义了路由表用于执行不同的http请求
  可以通过向模版传递参数来动态渲染html页面

##### input.js 中涉及的事件和压缩的

##### 安装express
    npm install express --save

##### 一下几个重要的模块一起安装

body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

npm install body-parser --save
npm install cookie-arser --save
npm install multer --save


基于users.json 创建 以下 restful api 
序号	URI	             HTTP 方法	发送内容	          结果
1	listUsers       	GET	       空	      显示所有用户列表
2	addUser         	POST	JSON 字符串    	添加新用户
3	deleteUser      	DELETE	JSON 字符串   	删除用户
4	:id	                GET	       空	      显示用户详细信息

##### node  多进程
Node 提供了 child_process 模块来创建子进程

exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。

spawn - child_process.spawn 使用指定的命令行参数创建新进程。

fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
support.js 和 master.js  两个文件学习。child_process 

这里涉及

process对象提供一系列属性，用于返回系统信息。

process.argv：返回一个数组，成员是当前进程的所有命令行参数。
process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME。
process.installPrefix：返回一个字符串，表示 Node 安装路径的前缀，比如/usr/local。相应地，Node 的执行文件目录为/usr/local/bin/node。
process.pid：返回一个数字，表示当前进程的进程号。
process.platform：返回一个字符串，表示当前的操作系统，比如Linux。
process.title：返回一个字符串，默认值为node，可以自定义该值。
process.version：返回一个字符串，表示当前使用的 Node 版本，比如v7.10.0。