angular.module('app.flightsSrv', [])


.factory('FlightsSrv', function ($http, Stripe) {
               var ips=[ "ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
               "ec2-52-90-41-197.compute-1.amazonaws.com",
               "www.swiss-air.me",
                 "54.93.36.94",
                 "ec2-52-38-101-89.us-west-2.compute.amazonaws.com",
                  "www.mynksh.com", //Loads Forever





  "52.28.246.230", //works correctley but wrong dateTime format

  "52.25.15.124",  //working but return empty array

  "52.36.250.55", //Loads forever

  "54.187.208.145", //Throws Error

  "sebitsplease.com.s3-website-us-east-1.amazonaws.com", //return HTML page

  "52.58.46.74", // not working yet

  "54.191.202.17", //working but return empty array

  "54.213.157.185", //not working yet

  "52.36.195.124", // not working yet

  "52.207.211.179", //throws error

  "52.32.109.147", // not working yet

  "52.36.169.206", // not working yet

  "ec2-52-91-94-227.compute-1.amazonaws.com", // not working yet

  "ec2-54-152-123-100.compute-1.amazonaws.com", //loads forever

  "52.34.160.140", // not working yet

  "52.90.46.68", //not working yet
  "52.27.150.19"//works correctley but wrong DateTime format
];

var airlines={
  "Lufthansa": { 
    "publishable key": '', 
    "IP": "ec2-54-152-123-100.compute-1.amazonaws.com" 
  },
  "KLM": { 
    "publishable key": "pk_test_sQmJKmvytXUZo98BJ2eTVh7S", 
    "IP": "ec2-52-26-166-80.us-west-2.compute.amazonaws.com" 
  },
  "Emirates Airlines": { 
    "publishable key": '', 
    "IP": "52.90.46.68" 
  },
  "Air France": { 
    "publishable key": '', 
    "IP": "52.34.160.140"
  },
  "Swiss Air": { 
    "publishable key": '', 
    "IP": "www.swiss-air.me"
  },
  "Delta Airlines": { 
    "publishable key": '', 
    "IP": "52.25.15.124"
  },
  "Japan Airlines": { 
    "publishable key": '', 
    "IP": "54.187.208.145"
  },
  "Singapore Airlines": { 
    "publishable key": '', 
    "IP": "sebitsplease.com.s3-website-us-east-1.amazonaws.com"
  },
  "Dragonair": { 
    "publishable key": '', 
    "IP": "52.58.46.74"
  },
  "Hawaiian": { 
    "publishable key": "pk_test_wAzEmAILhEkjKJZdSiui6s98", 
    "IP": "54.93.36.94"
  },
  "Austrian": { 
    "publishable key": '', 
    "IP": "ec2-52-90-41-197.compute-1.amazonaws.com"
  },
  "South African Airways": { 
    "publishable key": '', 
    "IP": "54.213.157.185"
  },
  "Malaysia Airlines": { 
    "publishable key": '', 
    "IP": "52.32.109.147"
  },
  "Northwest Airlines": {
    "publishable key": '', 
    "IP": "52.36.169.206"
  },
  "Cathay Pacific Airlines": { 
    "publishable key": '', 
    "IP": "ec2-52-91-94-227.compute-1.amazonaws.com"
  },
  "Air Madagascar": { 
    "publishable key": "pk_test_0hp9j1pvGDdsbY4zEyqvfwpD", 
    "IP": "54.191.202.17"
  },
  "Alaska": { 
    "publishable key": '', 
    "IP":"52.207.211.179"
  },
  "Turkish Airlines": { 
    "publishable key": '', 
    "IP": "52.27.150.19"
  },
  "Virgin australia": { 
    "publishable key": "pk_test_FX4O5SPvyU2LpRV7xFGVTOIL", 
    "IP": "54.93.116.90"
  },
  "Iberia": { 
    "publishable key": "pk_test_fWP8viqFbT95teED8zWD3ieK", 
    "IP": "52.58.24.76"
  },
  "United": { 
    "publishable key": '', 
    "IP":"54.187.103.196"
  },
  "AirNewZealand": { 
    "publishable key": '', 
    "IP":"52.28.246.230"
  }

};


    var allC=[];
         var x={};
         x.getAirportCodes = function() {
          //console.log(Number("123"));
          return $http.get('http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/airports');

         }

        x.searchOurAirlineRound= function(){
          console.log("in search");
              var seats=Number(x.getAdults())+Number(x.getChild())+Number(x.getBaby());
            return $http.get('http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/flights/search/'+x.getFrom()+'/'+x.getTo()+'/'+x.departDate+'/'+x.returnDate+'/'+x.class+'/'+1, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'},
      });
         }
         x.searchOurAirline= function(){
          var seats=Number(x.getAdults())+Number(x.getChild())+Number(x.getBaby());
            return $http.get('http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/flights/search/'+x.getFrom()+'/'+x.getTo()+'/'+x.departDate+'/'+x.class+'/'+seats, {
        "headers" : { 'x-access-token' :'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'},
      });
         }


         x.getClass=function(){
          return x.class;
         }
         x.setClass=function(val){
          x.class=val;
         }
         x.setFrom= function(value) {
           x.from = value;
         }
         x.getFrom= function() {
           return x.from;
         }
         x.setTo= function(value) {
           x.to = value;
         }
         x.getTo= function() {
           return x.to;
         }
         x.setReturn=function(value){
          x.returning=value;
         }
         x.isReturn=function(){
          return x.returning;
         }
         x.setAdults=function(value){
          x.adults=value;
         }
         x.setChild=function(value){
          x.child=value;
         }
         x.setBaby=function(value){
          x.Baby=value;
         }
         x.getAdults=function(){
          return x.adults;
         }
         x.getChild=function(){
          return x.child;
         }
         x.getBaby=function(){
          return x.Baby;
         }
         x.setReturning=function(returnDate){
          x.returnDate=returnDate;
         }
         x.setDepart=function(departDate){
          x.departDate=departDate;
         }
         x.getReturn= function(){
          return x.returnDate;
         }
         x.getDepart=function(){
            return x.departDate;
         }
         x.setCost=function(value){
          x.cost=value;
         }

         x.getCost=function(){
          return x.cost;
         }
         x.getFlight=function(){
          return x.booking.flight;
         }
         x.setOutGoing=function(value){
          x.booking.flight.outgoingFlights=value;
         }
         x.setReturningFlight=function(value){
          x.booking.flight.returnFlights=value;
         }
         x.setReturningFlights=function(value){
          x.returnFlights=value;
         }
         x.getReturningFlights=function(){
          return x.returnFlights;
         }
         x.setBooking=function(){
           x.booking={};
           x.booking.flight={};

         }

         x.setRefrence = function(ref){
          x.reference = ref;
         }

         x.getReference = function(){
          return x.reference;
         }

         x.getBookingFromDb=function(ref){
          return  $http.get('http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/booking/'+ref+'', {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'},
      });
         }
               x.postBooking=function(){
                console.log('hena');
          console.log(x.booking);
          console.log("le hena");
          return $http.post('http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/booking',{
            'booking':x.booking,
            'cost':x.cost,
            'paymentToken':x.token,
            'Token2':x.token1},{
          "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c'},
        });
           }

            x.getDataFromAllCompaniesRound=function(idx,cb) {
                 if (idx === ips.length || (idx === 0 && allC.length > 0)) cb(allC);
                 else {
                  var seats=Number(x.getAdults())+Number(x.getChild())+Number(x.getBaby());
                     $http.get('http://' + ips[idx] + '/api/flights/search/'+x.getFrom()+'/'+x.getTo()+'/'+x.departDate+'/'+x.returnDate+'/'+x.class+'/'+seats+'?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c', {
                      timeout:1500
      }).success(function (res) {
                         allC.push(res);

                    x.getDataFromAllCompaniesRound(idx + 1,cb);
                     }).error(function(data){
                         x.getDataFromAllCompaniesRound(idx + 1,cb);
                     });
                 }
             }
              x.getDataFromAllCompaniesOneWay=function(idx,cb) {
                 if (idx === ips.length ) cb(allC);
                 else {var seats=Number(x.getAdults())+Number(x.getChild())+Number(x.getBaby());
                     $http.get('http://' + ips[idx] + '/api/flights/search/'+x.getFrom()+'/'+x.getTo()+'/'+x.departDate+'/'+x.class+'/'+seats+'?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c', {
                      timeout:1500

                    }).success(function (res) {
                         allC.push(res);
                    x.getDataFromAllCompaniesOneWay(idx + 1,cb);

                     }).error(function(data){
                         x.getDataFromAllCompaniesOneWay(idx + 1,cb);
                     });
                 }
             }
             x.getDataFromAllCompanies=function(cb) {
                 var tmp={outgoingFlights:[],returnFlights:[]};
                 allC=[];
                 if(x.isReturn()){
                   x.getDataFromAllCompaniesRound(0,function(data){
                  console.log(data);
                     for (var i=0;i<data.length;i++){
                      if(data[i].outgoingFlights)
                         for (var j=0;j<data[i].outgoingFlights.length;j++){
                            console.log(data[i].outgoingFlights[j]);
                             tmp.outgoingFlights.push(data[i].outgoingFlights[j]);
                         }
                         if(data[i].returnFlights)
                         for (var j=0;j<data[i].returnFlights.length;j++){

                             tmp.returnFlights.push(data[i].returnFlights[j]);
                         }
                     }
                     console.log(tmp);

                     cb(tmp);
                 });
                 }else{
                   x.getDataFromAllCompaniesOneWay(0,function(data){
                      // tmp.returnFlights=[];
                     for (var i=0;i<data.length;i++){
                      if(data[i].outgoingFlights)
                         for (var j=0;j<data[i].outgoingFlights.length;j++){
                             tmp.outgoingFlights.push(data[i].outgoingFlights[j]);
                         }


                     }

                     cb(tmp);
                 });
                 }
               }


             x.setOtherAirlines=function(value){
              x.otherAirlines=value;
             }
             x.getOtherAirlines=function(){
              return x.otherAirlines;
             }

             x.setPublickey=function(airline ,cd){
          $http.get('http://' + airlines[airline].IP + '/stripe/pubkey?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXNoRm9yayIsImlhdCI6MTQ2MDYzMjk5NCwiZXhwIjoxNDkyMTY4OTk1LCJhdWQiOiJodHRwOi8vZWMyLTUyLTI2LTE2Ni04MC51cy13ZXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tLyIsInN1YiI6IkFkbWluaXN0cmF0b3IifQ.WTu7g6aTNULCmNMJ6I78x5jfRScOsRpJ1IRipeLOK5c', {
                      timeout:2000

                    }).success(function (res) {
                        Stripe.setPublishableKey(res);
                        console.log('setPub');
                        cd();
                     }).error(function(data){
                        
                     });
          
         }
         x.setTravellers = function(value){
          console.log('check');
          x.booking.Travellers = value;
         }
         x.getBooking=function(){
           return x.booking;
         }
         x.setBookingref=function(value){
          x.bookingref=value;
         }

         x.getBookingref=function(){
          return x.bookingref;
         }

         x.setToken=function(value){
          x.token=value;
         }
         x.setToken1=function(value){
          x.token1=value;
         }
         x.getAirlineIP=function(value){
          return airlines[value].IP;
         }
         x.setCardInfo=function(cardNumber,cvc,expirymonth,expiryyear){
          x.cardNumber=cardNumber;
          x.cvc=cvc;
          x.expirymonth=expirymonth;
          x.expiryyear=expiryyear;
         }
         x.getCardNumber=function(){
          return x.cardNumber;
         }
         x.getCVC=function(){
          return x.cvc;
         }
         x.getExpirymonth=function(){
          return x.expirymonth;
         }

         x.getExpiryyear=function(){
          return x.expiryyear;
         }

     return x;
  }).config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.timeout = 1000;
}]);
