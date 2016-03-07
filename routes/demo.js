// import the modules we will use
var DocumentDBClient = require('documentdb').DocumentClient;
var nodemailer = require('nodemailer');
var nconf = require('nconf');
//var uuid = require('node-uuid');

// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });


var host = nconf.get("HOST");
var authKey = nconf.get("AUTH_KEY");
var databaseId = nconf.get("DATABASE");
var collectionId = nconf.get("COLLECTION");

// create some global variables which we will use later to hold instances of the DocumentDBClient, Database and Collection

// create an instance of the DocumentDB client
var client = new DocumentDBClient(host, { masterKey: authKey });

 var express = require('express');
 var router = express.Router();
 
 
  router.get('/authenticate/:email/:pass/:type',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                authenticate(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var authenticate = function(request,collection,callback){ 
  
  var query ='SELECT r.uid,r.role from root r where r.username="'+request.params.email+'" and r.password="'+request.params.pass+'" and r.type="'+request.params.type+'" ';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}
 
 router.get('/getlocations/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getlocations(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getlocations = function(request,collection,callback){ 
  
  var query ='SELECT r.locations from root r where r.type="locations" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}


 router.get('/gettiles/:screennum/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getmanagertiles(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getmanagertiles = function(request,collection,callback){ 
  
  var query ='SELECT r.tiles from root r where r.type="tiles" and r.screen="'+request.params.screennum+'" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}
 
 
 router.get('/getaccounts/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getaccounts(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getaccounts = function(request,collection,callback){ 
  
  var query ='SELECT r.accountslist from root r where r.type="accountslist" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

 router.get('/getdeliverymanagers/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getdeliverymanagers(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getdeliverymanagers = function(request,collection,callback){ 
  
  var query ='SELECT r.deliverymanagerlist from root r where r.type="deliverymanagerlist" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/getaccountmanagers/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getaccountmanagers(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getaccountmanagers = function(request,collection,callback){ 
  
  var query ='SELECT r.accountmanagerlist from root r where r.type="accountmanagerlist" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/getticker/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getticker(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 var getticker = function(request,collection,callback){ 
  
  var query ='SELECT r.ticker from root r where r.type="ticker" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/getchmparametersfordmdata/:type/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getchmparametersfordmdata(request,collection, function (docs) {  
                    var data=[];
                    var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++){
                     for(var j=0;j<docs[0].dmdata.length;j++){
                         if(docs[0].dmdata[j].Name==listofnames[i])
                         {
                             data.push(docs[0].dmdata[j]);
                         }
                     }
                } 
               response.json(data);              
            });    
        });
     });
 });
 
 var getchmparametersfordmdata = function(request,collection,callback){ 
  var query ='SELECT r.dmdata from root r where r.type="'+request.params.type+'" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/getchmparametersforamdata/:type/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getchmparametersforamdata(request,collection, function (docs) {  
                    var data=[];
                    var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++){
                     for(var j=0;j<docs[0].amdata.length;j++){
                         if(docs[0].dmdata[j].Name==listofnames[i])
                         {
                             data.push(docs[0].amdata[j]);
                         }
                     }
                } 
               response.json(data);              
            });    
        });
     });
 });
 
 var getchmparametersforamdata = function(request,collection,callback){ 
  var query ='SELECT r.amdata from root r where r.type="'+request.params.type+'" and r.uid="'+request.params.uid+'"';   
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

var readOrCreateDatabase = function (callback) {
    client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            client.createDatabase({ id: databaseId }, function (err, createdDatabase) {
                callback(createdDatabase);
            });
        } else {
            // we found a database
            callback(results[0]);
        }
    });
}

var readOrCreateCollection = function (database, callback) {
    //console.log(collectionId);
    client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }           
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            //indicating no collection exists in the provided database matching the query
            client.createCollection(database._self, { id: collectionId }, function (err, createdCollection) {
                callback(createdCollection);
            });
        } else {
            // we found a collection
            callback(results[0]);
        }
    });
}


// excel upload

router.post('/uploadexcel',function (request, response) {
   response.header("Access-Control-Allow-Origin", '*');      
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {              
             if (request.body) {
                 debugger;
                 createItem(collection, request.body, function () {
                             response.end('true');
                            
                  }); 
             }
    });
    });
    }); 

var createItem = function (collection, documentDefinition, callback) {
        //documentDefinition.completed = false;
    client.createDocument(collection._self, documentDefinition, function (err, doc) {
        if (err) {
            throw (err);
        }
        
        callback();
    });
}

// pulse and Pcsat 
  var getpcsatCurrentQtr = function(request,collection,callback){ 
     var query= 'SELECT r.PCSAT from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="currentQtr"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
     var getpcsatLastQtr = function(request,collection,callback){ 
     var query= 'SELECT r.PCSAT from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="lastQtr"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
 
  var getpcsatLasttwoQtrs = function(request,collection,callback){ 
     var query= 'SELECT r.PCSAT from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="last2Qtrs"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
 
  var getpulseLasttwoQtrs = function(request,collection,callback){ 
     var query= 'SELECT r.Pulse from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="last2Qtrs"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
 
   var getpulseLastQtr = function(request,collection,callback){ 
     var query= 'SELECT r.Pulse from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="lastQtr"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
 
 
  var getpulseCurrentQtr = function(request,collection,callback){ 
     var query= 'SELECT r.Pulse from root r where r.type="customersatisfaction" and r.uid="'+request.params.uid+'" and r.quarter="currentQtr"';
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
 }
 
 router.get('/getpcsatLasttwoQtrs/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsatLasttwoQtrs(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 
 router.get('/getpcsatCurrentQtr/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsatCurrentQtr(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 router.get('/getpcsatLastQtr/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsatLastQtr(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 
  router.get('/getpulseCurrentQtr/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpulseCurrentQtr(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
  router.get('/getpulseLastQtr/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpulseLastQtr(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 
  router.get('/getpulseLasttwoQtrs/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpulseLasttwoQtrs(request,collection, function (docs) {  
                          
               response.json(docs);              
            });    
        });
     });
 });
 
 
 // revenue charts code
 router.get('/getrevenue/:date1/:date2/:date3/:type/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getrevenue(request,collection, function (docs) {  
                    var data=[];
                    var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++){
                     for(var j=0;j<docs[0].data.length;j++){
                         if(docs[0].data[j].DMManger==listofnames[i].trim())
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                } 
                console.log(data);
               response.json(data);              
            });    
        });
     });
});


  var getrevenue = function(request,collection,callback){  
    
  var query ='SELECT r.data from revenue r where r.type="'+request.params.type+'" and r.uid="'+request.params.uid+'" and contains(r.timestamp,"'+request.params.date1+'")'+
             ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'")';
  
    
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}



module.exports = router;