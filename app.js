var express = require('express');
var request = require('request');
var cors=require('cors');
var app = express();  
// var apiServerHost='http://121.197.2.240:8080';
var apiServerHost='http://172.16.64.31:9102';
app.use(cors());

app.use(function(req, res) {  
	console.log("新请求-----------------------------时间："+new Date().toString());
	console.log("path:"+req.path);
	console.log("url:"+req.url);
	console.log("method:"+req.method);
	console.log("body:"+JSON.stringify(req.body));

  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port=process.env.PORT || 8989;
console.log("在"+port+'上开始监听...');
app.listen(port); 