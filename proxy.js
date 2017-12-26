const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

//创建一个API代理服务
const apiServer = http.createServer((req,res) => {
   const url = 'http://news-at.zhihu.com/api/4'+req.url;
   const options = {
     url : url
   };
   function callback(error,response,body){
     if(!error && response.statusCode === 200){
       //设置编码类型，解析中文
       res.setHeader('Content-Type','text/plain;charset=UTF-8');
       //设置允许跨域
       res.setHeader('Access-Control-Allow-Origin','*');
       //返回代理后内容
       res.end(body);
     }
   }
   request.get(options,callback);
 });
 //监听8010端口
apiServer.listen(port,hostname,() => {
  console.log('api接口运行中')
});
//创建一个图片代理服务
const imgServer = http.createServer((req,res) => {
   const url = req.url.split('/img/')[1];
   const options = {
     url : url,
     encoding: null
   };
   function callback(error,response,body){
     if(!error && response.statusCode === 200){
       //设置编码类型，解析中文
       res.setHeader('Content-Type',response.headers['content-type']);
       //设置允许跨域
       res.setHeader('Access-Control-Allow-Origin','*');
       //返回代理后内容
       res.end(body);
     }
   }
   request.get(options,callback);
 });
 //监听8010端口
imgServer.listen(imgPort,hostname,()=>{
  console.log('img接口运行中')
});
