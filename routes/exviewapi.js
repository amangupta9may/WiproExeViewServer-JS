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

router.get('/getchmparametersdata/:type/:datafor/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getchmparametersdata(request,collection, function (docs) {  
                    var data=[];
                    var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++){
                     for(var j=0;j<docs[0].data.length;j++){
                         if(docs[0].data[j].DMManager==listofnames[i])
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }
               response.json(data);              
            });    
        });
     });
 });
 
 var getchmparametersdata = function(request,collection,callback){ 
  var query ='SELECT r.data from root r where r.type="'+request.params.type+'" and r.uid="'+request.params.uid+'" and r.datafor="'+request.params.datafor+'"';
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}


/*
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
*/
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

//need to chage
 router.get('/getpcsat/:date1/:date2/:date3/:date4/:date5/:date6/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsat(request,collection, function (docs) {  
                 var data=[];
                 var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i].trim())
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }                             
                
                response.json(data);              
            });    
        });
     });
});


var getpcsat = function(request,collection,callback){ 
     
     var query ='SELECT r.data from customersatifaction r where r.type="pcsat" and r.uid="'+request.params.uid+'" and (contains(r.timestamp,"'+request.params.date1+'")'+
                ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'")'+
                ' or contains(r.timestamp,"'+request.params.date4+'")  or contains(r.timestamp,"'+request.params.date5+'")'+
                ' or contains(r.timestamp,"'+request.params.date6+'"))';
                
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }               
        callback(docs);
    });
 }
 
 //pulse
  router.get('/getpulse/:date1/:date2/:date3/:date4/:date5/:date6/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsat(request,collection, function (docs) {  
                 var data=[];
                 var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i].trim())
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }                             
                
                response.json(data);              
            });    
        });
     });
});


var getpulse = function(request,collection,callback){ 
     
     var query ='SELECT r.data from customersatifaction r where r.type="pulse" and r.uid="'+request.params.uid+'" and (contains(r.timestamp,"'+request.params.date1+'")'+
                ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'")'+
                ' or contains(r.timestamp,"'+request.params.date4+'")  or contains(r.timestamp,"'+request.params.date5+'")'+
                ' or contains(r.timestamp,"'+request.params.date6+'"))';
                
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }               
        callback(docs);
    });
 }
 

///

 router.get('/getpcsat/:date1/:date2/:date3/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpcsat(request,collection, function (docs) {  
                 var data=[];
                 var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i].trim())
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }                             
                
                response.json(data);              
            });    
        });
     });
});


var getpcsat = function(request,collection,callback){ 
     
     var query ='SELECT r.data from customersatifaction r where r.type="pcsat" and r.uid="'+request.params.uid+'" and (contains(r.timestamp,"'+request.params.date1+'")'+
                ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'"))';
                
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }               
        callback(docs);
    });
 }
 
  router.get('/getpulse/:date1/:date2/:date3/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getpulse(request,collection, function (docs) {                                 
               var data=[];
                 var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i].trim())
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }                             
                
                response.json(data);               
            });    
        });
     });
});


 var getpulse = function(request,collection,callback){ 
     
     var query ='SELECT r.data from customersatifaction r where r.type="pulse" and r.uid="'+request.params.uid+'" and (contains(r.timestamp,"'+request.params.date1+'")'+
                ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'"))';
                
     client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }               
        callback(docs);
    });
 }
 // revenue charts code
 router.get('/getrevenue/:date1/:date2/:date3/:type/:uid/:listofnames',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getrevenue(request,collection, function (docs) {  
                    var data=[];
                    var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i].trim())
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



//change 
router.get('/getconsolidateddata/:type1/:type2/:date1/:date2/:date3/:date4/:date5/:date6/:uid/:DMName',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getconsolidateddata(request,collection, function (docs) {  
                var result=[];                
                for(var i=0;i<docs.length;i++)
                    { 
                        for(var k=0;k<docs[i].data.length;k++){                        
                         if(docs[i].data[k].DMManager==request.params.DMName)
                         {
                            var total=BHC=Bulge=Rookie=OffShore=OnSite=GrossMargin=COD=OM=0;
                                switch(docs[i].type)
                                {
                                    case 'revenuechart': 
                                                                      
                                         total = Number(docs[i].data[k].total);
                                             
                                        result.push({"property" :docs[i].type, "quarter" :docs[i].quater, "value" : total });
                                    break;
                                    
                                    case 'chmchart':
                                    //for(var j=0;j<docs[i].data.length;j++)
                                      //  {                                     
                                            BHC = Number(docs[i].data[k]["Bulge BHC"]);                                    
                                            Rookie = Number(docs[i].data[k]["Rookie BHC"]);
                                            OffShore = Number(docs[i].data[k]["Offshore #"]);
                                            OnSite = Number(docs[i].data[k]["Onsite #"]);
                                        //}  
                                        result.push({"property" :"BHC", "quarter" :docs[i].quater, "value" : BHC });                                
                                        result.push({"property" :"Rookie", "quarter" :docs[i].quater, "value" : Rookie });
                                        result.push({"property" :"OffShore", "quarter" :docs[i].quater, "value" : OffShore });
                                        result.push({"property" :"OnSite", "quarter" :docs[i].quater, "value" : OnSite });
                                    break;                         
                                    
                                } //switch 
                           }//if  
                        }//k loop                               
                    }
               response.json(result);              
            });    
        });
     });
 });
 
 var getconsolidateddata = function(request,collection,callback){
  
  var query ='SELECT r.data,r.type,r.quater from root r where r.uid="'+request.params.uid+'" and(r.type="'+request.params.type1+'" or r.type="'+request.params.type2+'" or r.type="'+request.params.type3+'" or r.type="'+request.params.type4+'" or r.type="'+request.params.type5+'")'+
            'and (contains(r.timestamp,"'+request.params.date1+'")'+' or contains(r.timestamp,"'+request.params.date2+'")'+
            'or contains(r.timestamp,"'+request.params.date3+'") or contains(r.timestamp,"'+request.params.date4+'") or contains(r.timestamp,"'+request.params.date5+'") or contains(r.timestamp,"'+request.params.date6+'"))';
            
   client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/cod/:date1/:date2/:date3/:uid/:listofnames',function(request, response, next){
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getcod(request,collection, function (docs) {                               
                 var data=[];
                 var listofnames = request.params.listofnames.split(',');
                 for(var i=0;i< listofnames.length;i++)
                 {
                     for(var j=0;j<docs[0].data.length;j++)
                     {
                         if(docs[0].data[j].DMManager==listofnames[i])
                         {
                             data.push(docs[0].data[j]);
                         }
                     }
                }
               response.json(data);              
            });    
        });
     });
});



  var getcod = function(request,collection,callback){  
    
  var query ='SELECT r.data from cod r where r.type="cod" and r.uid="'+request.params.uid+'" and (contains(r.timestamp,"'+request.params.date1+'")'+
             ' or contains(r.timestamp,"'+request.params.date2+'")  or contains(r.timestamp,"'+request.params.date3+'"))';
             
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}

router.get('/getopportunity/:uid',function(request, response, next){  
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {           
                getopportunity(request,collection, function (docs) {                               
                
                response.json(docs);              
            });    
        });
     });
});



  var getopportunity = function(request,collection,callback){  
    
  var query ='SELECT r.data from oppurtunity r where r.type="opportunity"  and r.uid="'+request.params.uid+'"';
    client.queryDocuments(collection._self,query).toArray(function (err, docs) {
        if (err) {
            throw (err);
        }     
          
        callback(docs);
    });
}


module.exports = router;