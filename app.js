'use strict';

const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded());

// Initialize datastore client
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore({namespace: 'com.ikea.datastore'});

//get customer by id
app.get('/customers/:customerId', async (req, res, next) => {
    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);
    
    try {
        var customerId = req.params.customerId;
	    const custKey=datastore.key(['customers', parseInt(customerId)]);
	    const [result] = await datastore.get(custKey);
	    res
	      .status(200)
	      .set('Content-Type', 'application/json')
	      .json(result)
	      .end();
        
	  } catch (error) {
	    next(error);
	  }
      console.log('End : '+reqURL);
});


app.get('/customers', async (req, res, next) => {

    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);
    var pageSize=req.query.pageSize;
    if(pageSize == undefined){ pageSize = 20 ; }

	try {
        let query = datastore.createQuery('customers').limit(pageSize);
	    const [results] = await datastore.runQuery(query);

        // set the data store key as id of each entity.
	    results.forEach(result => {
	       result['id']=result[datastore.KEY].id;
	});
	    res
	    .status(200)
	    .set('Content-Type', 'application/json')
	    .json(results)
	    .end();
	} catch (error) {
		next(error);
	}
    console.log('End : '+reqURL);
});

app.get('/', async (req, res, next) => {

    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);

	try {
		res
		.status(200)
		.set('Content-Type', 'text/plain')
		.send(`Select a valid URL option.`)
		.end();
	} catch (error) {
		next(error);
	}
    console.log('End : '+reqURL);
});

app.post('/customers', async (req, res, next) => {

    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);
  
	try {
		const custKey = datastore.key('customers');
		const entity = {
				key: custKey,
				data : req.body
		};
	    await datastore.save(entity);
	    console.log('Customer '+ custKey.id + ' created.');
	    res
	    .status(201)
	    .location(req.url + '/'+custKey.id)
	    .end();
	} catch (error) {
		next(error);
	}
    console.log('End : '+reqURL);
});

app.post('/customers/batch', async (req, res, next) => {

    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);

	try {
	    var custs=req.body;
        var batchSize = custs.length;
	    console.log('Batch size =' + batchSize);
        if(batchSize > 100 ){
            res
            .status(400)
            .send("Batch size limit is 100 elements only.");
        }
	    var successCount=0;
        var customerIds=[];
	    for(var i=0 ; i<batchSize ; i++){
	    	try {
	            const custKey = datastore.key('customers');
	            const entity = {
	            		key: custKey,
	            		data : custs[i]
	            };
	            await datastore.save(entity);
	            console.log(i + ' Customer '+custKey.id+' created.');
                customerIds.push({ "id" : custKey.id });
	            successCount++;
	        }catch(error){
	            console.log(error);
	        }
	    }
	    console.log('Records inserted = ' + successCount);
        var responseJsonObj={'recordsReceived' : batchSize, 'recordsInserted' : successCount, 'customerIds' : customerIds  }
	    res
	    .status(200)
        .json(responseJsonObj)
	    .end();
	}catch (error) {
		next(error);
	}
    console.log('End : '+reqURL);
});

app.put('/customers/:customerId', async (req, res, next) => {

    var reqURL=req.method +' ' + req.url;
    console.log('Start: '+reqURL);

    try {
        var customerId = req.params.customerId;
    	const custKey=datastore.key(['customers', parseInt(customerId)]);
    	var customer=req.body;
    	const entity={
    			key : custKey,
    			data : customer
    	};
    	await datastore.update(entity);
    	console.log('Done PUT customers/'+customerId);  
    	res
    	.status(200)
    	.end();
      
    } catch (error) {
    	next(error);
    }
    console.log('End : '+reqURL);
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;