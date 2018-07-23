var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  // db.close();
  //创建集合
  dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
  });

  //插入数据
   var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });

    //插入多条数据
    var dbo1 = db.db("runoob");
    var myobj1 =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbo1.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });

    //查询
    var dbo2 = db.db("runoob");
    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo2.collection("site"). find({whereStr}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });


    //update
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo2.collection("site").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });

    //delete
    dbo2.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
    //delete多条
    var whereStr2 = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr2, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });

    //paixu
     var mysort = { type: 1 };
    dbo2.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

    //分页
     dbo2.collection("site").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  	});
     //跳过条数
      dbo2.collection("site").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
 	 });

     var orders =  [{ _id: 1, product_id: 154, status: 1 }]
     var products = [
		  { _id: 154, name: '笔记本电脑' },
		  { _id: 155, name: '耳机' },
		  { _id: 156, name: '台式电脑' }
		]

	 dbo.collection('orders').aggregate([
        { $lookup:
            {
                from: 'products',           // 右集合
                localField: 'product_id',   // 左集合 join字段
                foreignField: '_id',        // 右集合 join字段
                as: 'orderdetails'          // 新生成字段（类型array）
            }
        }
    ], function(err, res) {
	    if (err) throw err;
	    console.log(JSON.stringify(res))
	})

	 //删除集合
	 dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });
});