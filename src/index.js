var http =require('http');

var server = http.createServer((req,res)=>{
    res.setHeader('content-type', 'text/plain;charset=utf-8')
    const {path,params} = parseUrl(req);
    var num=0;

    if(path==='/add'){
        for(key in params){
            if(isNaN(params[key])||(!params[key])){
                res.end("加运算失败，数据不是num类型不能进行加运算");
                return;
            }
            num=num+parseInt(params[key]);
        }
        res.end(JSON.stringify("求和结果为"+num));
        return;
    }
})

function parseUrl(req){
    const url = req.url;
    const [path='',paramsStr=''] = url.split('?');
    const pairs = paramsStr.split('&');
    const params = {};
    pairs.forEach(pair => {
        const [key,value]=pair.split('=');
        params[key]=value;
    });
    return {
        path,
        params,
    };
}

server.listen(3000);

