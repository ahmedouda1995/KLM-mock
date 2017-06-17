

module.exports = function(app) {

	var jwt = require('jsonwebtoken');
	var path = require('path');
	var express = require('express');
	var db = require('../db');
 var stripe=require('stripe')('sk_test_lGsGRQLp2SDC1j7hmIwmqw5k');
	var http =require('http');
  var requestify = require('requestify');
	var ips=['ec2-52-26-166-80.us-west-2.compute.amazonaws.com','sebitsplease.com.s3-website-us-east-1.amazonaws.com,52.58.46.74','ec2-52-90-41-197.compute-1.amazonaws.com','52.27.150.19','52.36.169.206','52.32.109.147','52.36.195.124','ec2-54-213-214-212.us-west-2.compute.amazonaws.com:3000','52.36.250.55','ec2-52-38-101-89.us-west-2.compute.amazonaws.com:8080','52.25.15.124','52.207.211.179','54.213.157.185','52.34.160.140','52.90.46.68','52.38.78.176','mynksh.com','ec2-54-152-123-100.compute-1.amazonaws.com',
'54.93.36.94','ec2-52-91-94-227.compute-1.amazonaws.com','www.swiss-air.me','54.191.202.17','52.28.246.230','54.187.103.196:3000','54.93.116.90']
var airlines ={

  "Lufthansa": { 

    "IP": "ec2-54-152-123-100.compute-1.amazonaws.com" 

  },

  "KLM": { 

    "IP": "ec2-52-26-166-80.us-west-2.compute.amazonaws.com" 

  },

  "Emirates Airlines": { 

    "IP": "52.90.46.68" 

  },

  "AirFrance": { 

    "IP": "52.26.173.245"

  },

  "Swiss Air": { 

    "IP": "www.swiss-air.me"

  },

  "Delta Airlines": { 

    "IP": "52.25.15.124"

  },

  "Japan Airlines": { 

    "IP": "54.187.208.145"

  },

  "Singapore air": { 

    "IP": "52.38.234.54"

  },

  "Dragonair": { 

    "IP": "52.58.46.74"

  },

  "Hawaiian": { 

    "IP": "54.93.36.94"

  },

  "Austrian": { 

    "IP": "ec2-52-90-41-197.compute-1.amazonaws.com"

  },

  "South African Airways": { 

    "IP": "54.213.157.185"

  },

  "Malaysia Airlines": { 

    "IP": "52.32.109.147"

  },

  "Northwest Airlines": { 

    "IP": "52.36.169.206"

  },

  "Cathay Pacific Airlines": { 

    "IP": "ec2-52-91-94-227.compute-1.amazonaws.com"

  },

  "Air Madagascar": { 

    "IP": "54.191.202.17"

  },

  "Alaska": { 

    "IP":"52.207.211.179"

  },

  "Turkish Airlines": { 

    "IP": "52.27.150.19"

  },

  "Virgin australia": { 

    "IP": "54.93.116.90"

  },

  "Iberia": { 

    "IP": "52.58.24.76"

  },

  "United": { 

    "IP":"54.187.103.196"

  },

  "AirNewZealand": { 

    "IP":"52.28.246.230"

  },

  "Alitalia": { 

    "IP":"54.93.74.125"

  },

  "Air Canada": { 

   "IP": "52.36.250.55"

  },

  "Air Berlin": { 

   "IP": "ec2-52-38-101-89.us-west-2.compute.amazonaws.com"

  }

}



var allC=[];
app.use(require('body-parser').json());
	app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods','PUT,GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// 	// Unsecured Part



	app.get('/api/airports',function(req,res){
		var airports =  require('../../airports.json');
		res.json(airports);
	});

	// app.get('api/otherflights/:origin/:destination/:departingDate/:class',function(req,res){
	// 	console.log(req);
	// 	// getDataFromAllCompanies(req.params.origin,req.params.destination,req.params.departingDate,req.params.class,function(data){
	// 	// 	console.log(data);
	// 	// 	res.json(data);
	// 	// });
	// });
	app.get('/api/flights',function(req,res){
		var flights =  require('../../flights.json');
		res.json(flights);
	});


  app.get('/', function(req, res) {
  	console.log("request received");

  			//	res.send("end");
  				res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  		});

  		app.use(express.static('public'));


  	// app.get('/db/seed', function(req, res) {

  	// 	db.seed(function (err, seeded) {

  	// 	});
  	// });
  	// 	app.get('/db/delete', function(req, res) {
  	// 		db.clearDB(function(){
  	// 			var airports =  require('../../airports.json');
  	// 			res.json(airports);
  	// 		});
  	// 	});

      /* Middleware for securing the APIs */

  app.use(function(req, res, next) {

    //Handling the undefined condition of thrown error when x-access-token is not defined

    try {

    //Checking on request body, url, and request header

    var token = req.body.wt || req.query.wt || req.headers['x-access-token'];


  } catch (err) {

    //Option #1 for error message
    //res.status(403).send("403: Forbidden");

    //Option #2 for error message
    //res.status(403).sendFile(path.join(__dirname, '../../public/partials', 'forbidden.html'));

    //Option #3 for error message
    res.status(403).sendFile(path.join(__dirname, '../../public/partials', '403.html'));

    app.use(express.static('public'));


  }

    var secret = process.env.JWTSECRET;

    //Trying to verify, if failed throws an error.

    try
    {
      var payload = jwt.verify(token, secret);
      req.payload = payload;
      next();
    }
    catch (err)
    {

      //Option #1 for error message
      //res.status(403).send("403: Forbidden");

      //Option #2 for error message
      //res.status(403).sendFile(path.join(__dirname, '../../public/partials', 'forbidden.html'));

			//Option #3 for error message
			res.status(403).sendFile(path.join(__dirname, '../../public/partials', '403.html'));

			app.use(express.static('public'));


    }

    });
  function foo(info,index,cb){
    if(index===ips.length){
       cb(allC);
      
    }else{
      if(index ===0 && allC.length>0){
        allC=[];
      }
  var options = {
  host: ips[index],
  port: 80,
  path: info,
  timeout:1500 
};
console.log("data"+index);
http.get(options, function(resp){
  resp.setEncoding('utf8');
  resp.on('data', function(chunk){
    try{
    console.log(JSON.parse(chunk));
  chunk=JSON.parse(chunk);
    if(chunk.outgoingFlights&&!(containsObject(chunk,allC))){
      allC.push(chunk);
      
    }
          


    
    }catch(e){
      console.log(e);
    }
   
  });
   index=index+1;
    foo(info,index,cb);
}).on("error", function(e){
  console.log("Got error: " + e.message);
  index=index+1;

  foo(info,index,cb);
});
}
};
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
function parse(data){
  var tmp={outgoingFlights:[],returnFlights:[]};
  for (var i=0;i<data.length;i++){
                      if(data[i].outgoingFlights)
                         for (var j=0;j<data[i].outgoingFlights.length;j++){
                            
                             tmp.outgoingFlights.push(data[i].outgoingFlights[j]);
                         }
                         if(data[i].returnFlights)
                         for (var j=0;j<data[i].returnFlights.length;j++){

                             tmp.returnFlights.push(data[i].returnFlights[j]);
                         }
                     }
                     return tmp;
};

app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res){

    db.find(req.params.origin,req.params.destination,req.params.departingDate,req.params.class,Number(req.params.seats),function(err,data){
                    res.send(data);
    },req.params.returningDate);

  });

app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {

  db.find(req.params.origin,req.params.destination,req.params.departingDate,req.params.class,Number(req.params.seats),function(err,data){
    res.send(data);
  });

});
app.get('/api/flights/searchOthers/:origin/:destination/:departingDate/:returningDate/:class/:seats',function(req,res){
     allC=[];
     var seats=Number(req.params.seats);
    foo('/api/flights/search/'+req.params.origin+'/'+req.params.destination+'/'+req.params.departingDate+'/'+req.params.returningDate+'/'+req.params.class+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c',0,function(data){
      console.log("done");
      console.log(parse(data));
      res.send(parse(data));
    });
    

});
app.get('/api/flights/searchOthers/:origin/:destination/:departingDate/:class/:seats',function(req,res){
     allC=[];
     var seats=Number(req.params.seats);
    foo('/api/flights/search/'+req.params.origin+'/'+req.params.destination+'/'+req.params.departingDate+'/'+req.params.class+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c',0,function(data){
      console.log("done");
      console.log(data);
      res.send(parse(data));
    });
    

});
app.get('/api/booking/:ref', function(req, res) {
db.findByReference(req.params.ref,function(err,data){
  res.send(data);
});

});

  app.post('/booking', function(req, res) {
    // retrieve the token
    var stripeToken = req.body.paymentToken;
    var flightCost = req.body.cost*100;
    
    // attempt to create a charge using token
    stripe.charges.create({
      amount: flightCost,
      currency: "usd",
      source: stripeToken,
      description: "KLM payments"
    },function(err,data){
      if(err){
        res.send({refNum:null,errorMessage:err});
      }else{
        db.insert(req.body.outgoingFlightId,req.body.returnFlightId,req.body.passengerDetails,function(ref){
            res.statusCode = 200;
            res.send({refNum:ref,errorMessage:null});
          });
      }
    });

  // if(!req.body.hasOwnProperty('booking') ) {
  //   res.statusCode = 400;
  //   return res.send('Error 400: Post syntax incorrect.');
  // }



  // db.insert(req.body.booking,function(){
  //   res.statusCode = 200;
  //   res.send("done");
  // });

});
app.get('/stripe/pubkey',function(req,res){
  res.send('pk_test_sQmJKmvytXUZo98BJ2eTVh7S');
})
app.post('/api/booking', function(req, res) {
console.log('stripe is here');
  // if(!req.body.hasOwnProperty('booking') ) {
  //   res.statusCode = 400;
  //   return res.send('Error 400: Post syntax incorrect.');
  // }

  var stripeToken = req.body.paymentToken;
  var stripeToken2 = req.body.Token2;
  var outgoingcost = Number(req.body.booking.flight.outgoingFlights.cost)*req.body.booking.Travellers.length;
 var booking={};
 booking.outgoing={};
 booking.return={};
  booking.oneway = false;

  if((req.body.booking.flight.returnFlights!==undefined)){
var returncost = Number(req.body.booking.flight.returnFlights.cost)*req.body.booking.Travellers.length;
  if(req.body.booking.flight.outgoingFlights.Airline===req.body.booking.flight.returnFlights.Airline){
    var cost = Number(outgoingcost+returncost);
    console.log(req.body.booking.flight.outgoingFlights);
    var body={  
                  method:'POST',
                  body:{
                  passengerDetails:req.body.booking.Travellers,
                  paymentToken:stripeToken,
                  cost:cost,
                  returnFlightId:req.body.booking.flight.returnFlights.flightId,
                  outgoingFlightId:req.body.booking.flight.outgoingFlights.flightId,
                  class:req.body.booking.flight.outgoingFlights.class
                  
                  }
                  ,
    
                  
                  headers : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'} 
                  };
   var options = "http://"+airlines[req.body.booking.flight.outgoingFlights.Airline].IP+"/booking";
   // var options = "http://localhost:3000/booking";
  requestify.request(options,body)
  .then(function(response){
   console.log(JSON.parse(response.body).refNum);
   booking.outgoing.refNum=JSON.parse(response.body).refNum;
   booking.outgoing.airline = req.body.booking.flight.outgoingFlights.Airline;
   booking.return.refNum=JSON.parse(response.body).refNum;
   booking.return.airline = req.body.booking.flight.returnFlights.Airline;
   console.log(booking);
   res.send(booking);
  });
  

}else{
   var body={  
                  method:'POST',
                  body:{
                  passengerDetails:req.body.booking.Travellers,
                  paymentToken:stripeToken,
                  cost:outgoingcost,
                  returnFlightId:null,
                  outgoingFlightId:req.body.booking.flight.outgoingFlights.flightId,
                  class:req.body.booking.flight.outgoingFlights.class
                  
                  }
                  ,
    
                  
                  headers : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'} 
                  };
   var options = "http://"+airlines[req.body.booking.flight.outgoingFlights.Airline].IP+"/booking";
  console.log(stripeToken);
  requestify.request(options,body)
  .then(function(response){
   console.log(response.body);
    
   
   var body={  
                  method:'POST',
                  body:{
                  paymentToken:stripeToken2,
                  cost:returncost,
                  returnFlightId:null,
                  outgoingFlightId:req.body.booking.flight.returnFlights.flightId,
                  class:req.body.booking.flight.returnFlights.class,
                  passengerDetails:req.body.booking.Travellers
                  }
                  ,
    
                  
                  headers : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'} 
                  };
   var options = "http://"+airlines[req.body.booking.flight.returnFlights.Airline].IP+"/booking";
   
  requestify.request(options,body)
  .then(function(response1){
   console.log(response1.body);
   booking.outgoing.refNum=JSON.parse(response.body).refNum;
   booking.outgoing.airline = req.body.booking.flight.outgoingFlights.Airline;
   booking.return.refNum=JSON.parse(response1.body).refNum;
   booking.return.airline = req.body.booking.flight.returnFlights.Airline;
   res.send(booking);
  });
  
  
  });
  
}
}else{
  booking.oneway = true;
   var body={  
                  method:'POST',
                  body:{
                  paymentToken:stripeToken,
                  cost:outgoingcost,
                  returnFlightId:null,
                  outgoingFlightId:req.body.booking.flight.outgoingFlights.flightId,
                  class:req.body.booking.flight.outgoingFlights.class,
                  passengerDetails:req.body.booking.Travellers
                  }
                  ,
    
                  
                  headers : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'} 
                  };
   var options = "http://"+airlines[req.body.booking.flight.outgoingFlights.Airline].IP+"/booking";
   // var options = "http://localhost:3000/booking";
   
  requestify.request(options,body)
  .then(function(response){
   console.log(response.body);
   booking.outgoing.refNum = JSON.parse(response.body).refNum;
   booking.outgoing.airline = req.body.booking.flight.outgoingFlights.Airline;
   booking.return.refNum='';
   booking.return.airline = '';
   
   res.send(booking);
  });
  
}
    // attempt to create a charge using token
    // stripe.charges.create({
    //   amount: req.body.cost*100,
    //   currency: "usd",
    //   source: stripeToken,
    //   description: "KLM payments"
    // },function(err,data){
    //   if(err){
    //     res.send({refNum:null,errorMessage:err});
    //   }else{
    //     db.insert(req.body.booking,function(ref){
    //         res.statusCode = 200;
    //         res.send({refNum:ref,errorMessage:null});
    //       });
    //   }
    // });


  // db.insert(req.body.booking,function(){
  //   res.statusCode = 200;
  //   res.send("done");
  // });

});
};
