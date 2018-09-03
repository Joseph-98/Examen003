const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');
const app = express( );
const request = require('request');
const async = require('async');



// importing routes
const customerRoutes = require('./routes/customer');

// settings

//---______---
app.get('/datos',(req,resp)=>{
	async.times(1,(i,callback)=>{
		var options={
			url:'https://www.datos.gov.co/resource/in3j-awgi.json',
		}
		request(options.url,(error,response,body)=>{
			var resultado = JSON.parse(body);
			callback(null, resultado);
			var data = (null, resultado);
			console.log(data);
		});
	},(err,error)=>{
		resp.json(error);
	}
	)
})




//---------------
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'db4free.net',
  user: 'jaig98',
  password: '12345678',
  port: 3306,
  database: 'redbiblioteca'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
