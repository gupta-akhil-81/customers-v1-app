// [START gae_flex_datastore_app]
'use strict';

const express = require('express');
const uuidv1 = require('uuid/v1');
var bodyParser = require('body-parser');


const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded());


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = new Datastore({namespace: 'cap'});


app.get('/customers/:customerId', async (req, res, next) => {
    var customerId = req.params.customerId;
    

  try {
    const custKey=datastore.key(['customers', parseInt(customerId)]);
    //const query = datastore.createQuery('customers').filter('__key__' ,custKey );
    //const [results] = await datastore.runQuery(query);
    const [result] = await datastore.get(custKey);
    console.log('get customer by id ='+ customerId + ' custkey.id=' + custKey.id + ' custkey.name=' + custKey.name);

    res
      .status(200)
      .set('Content-Type', 'application/json')
      .json(result)
      .end();
  } catch (error) {
    next(error);
  }
});


app.get('/customers', async (req, res, next) => {

  try {
    //const query = datastore.createQuery('customers').order('__key__', {descending: true});
    const query = datastore.createQuery('customers');
    const [results] = await datastore.runQuery(query);

    
    
    results.forEach(result => {
        //console.log('result1=' + result);
        //console.log('result2=' + JSON.stringify(result));
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
});

app.get('/', async (req, res, next) => {

  try {
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Select a valid URL option.`)
      .end();
  } catch (error) {
    next(error);
  }
});

app.post('/customers', async (req, res, next) => {
  
  try {
    const custKey = datastore.key('customers');
    const entity = {
        key: custKey,
        data : req.body
    };
    await datastore.save(entity);
    console.log(`Customer ${custKey.id} created.`);
    res
      .status(201)
      .location(req.url + '/'+custKey.id)
      .end();
      
  } catch (error) {
    next(error);
  }
});

app.post('/customers/batch', async (req, res, next) => {
  
  try {
    var custs=req.body;
    console.log('Batch size =' + custs.length);
    var successCount=0;
    for(var i=0 ; i<custs.length ; i++){
        try {
            const custKey = datastore.key('customers');
            const entity = {
                key: custKey,
                data : custs[i]
            };
            await datastore.save(entity);
            console.log(i + ` Customer ${custKey.id} created.`);
            successCount++;
        }catch(error){
            console.log(error);
        }
    }
    console.log('Records inserted = ' + successCount);
  
    res
      .status(200)
      .end();
      
  } catch (error) {
    next(error);
  }
});

app.put('/customers/:customerId', async (req, res, next) => {
    var customerId = req.params.customerId;
    console.log('Started PUT customers/'+customerId);
  try {
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
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_datastore_app]

module.exports = app;
