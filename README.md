# Using Cloud Datastore

This sample application shows how to use Google Cloud Datastore on Google App
Engine.

[App Engine standard environment][appengine-std] users: See tutorial [Using Cloud Datastore][tutorial-std] for more information on running and deploying this app.

[App Engine flexible environment][appengine-flex] users: See tutorial [Using Cloud Datastore][tutorial-flex] for more information on running and deploying this app.

* [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests)

## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Refer to the [appengine/README.md][readme] file for instructions on
    running and deploying.
1.  Install dependencies:

        npm install

## Running locally

    npm start

## Deploying to App Engine standard environment

	gcloud app deploy app.standard.yaml

## Deploying to App Engine flexible environment

	gcloud app deploy app.flexible.yaml

## Running the tests

## GET https://v1-dot-customers-dot-ikea-services-dev.appspot.com/customers?pageSize=2
Response: 200 OK Time: 165ms Size: 2.93KB
```javascript
[
    {
        "addressLine3": "Nassau",
        "phone2": "516-407-9573",
        "addressLine2": "Garden City",
        "lastName": "Liukko",
        "firstName": "Gilma",
        "phone1": "516-393-9967",
        "addressLine1": "16452 Greenwich St",
        "state": "HO",
        "pinCode": 11530,
        "email": "gilma_liukko@gmail.com",
        "id": "4659360894550016"
    },
    {
        "phone1": "609-373-3332",
        "addressLine1": "3338 A Lockport Pl #6",
        "state": "",
        "pinCode": 8402,
        "email": "catalina@hotmail.com",
        "addressLine3": "Atlantic",
        "phone2": "609-826-4990",
        "addressLine2": "Margate City",
        "lastName": "Tillotson",
        "firstName": "Catalina",
        "id": "4664880598614016"
    },
    {
        "phone2": "407-564-8113",
        "addressLine2": "Longwood",
        "lastName": "Yori",
        "firstName": "Shawnda",
        "phone1": "407-538-5106",
        "addressLine1": "50126 N Plankinton Ave",
        "state": "",
        "pinCode": 32750,
        "email": "shawnda.yori@yahoo.com",
        "addressLine3": "Seminole",
        "id": "4745914484785152"
    },
    {
        "addressLine2": "62 Monroe St",
        "lastName": "Similton",
        "firstName": "Gail",
        "phone1": "760-493-9208",
        "addressLine1": "Wes Esq",
        "state": "CA",
        "pinCode": 92276,
        "email": "",
        "addressLine3": "Thousand Palms",
        "phone2": "760-616-5388",
        "id": "4764727649501184"
    },
    {
        "addressLine2": "303 N Radcliffe St",
        "lastName": "Degroot",
        "firstName": "Novella",
        "phone1": "808-746-1865",
        "addressLine1": "C Kelly Esq",
        "state": "NJ",
        "pinCode": 96720,
        "email": "",
        "addressLine3": "Hilo",
        "phone2": "808-477-4775",
        "id": "4785230011432960"
    },
    {
        "phone1": "315-304-4759",
        "addressLine1": "422 E 21st St",
        "state": "WA",
        "pinCode": 13214,
        "email": "yolando@cox.net",
        "addressLine3": "Onondaga",
        "phone2": "315-640-6357",
        "addressLine2": "Syracuse",
        "lastName": "Luczki",
        "firstName": "Yolando",
        "id": "4787246431469568"
    },
    {
        "firstName": "Candida",
        "phone1": "908-275-8357",
        "addressLine1": "406 Main St",
        "state": "IL",
        "pinCode": 8876,
        "email": "candida_corbley@hotmail.com",
        "addressLine3": "Somerset",
        "phone2": "908-943-6103",
        "addressLine2": "Somerville",
        "lastName": "Corbley",
        "id": "4788074152198144"
    },
    {
        "addressLine2": "Homosassa",
        "lastName": "Skulski",
        "firstName": "Hillary",
        "phone1": "352-242-2570",
        "addressLine1": "9 Wales Rd Ne #914",
        "state": "NJ",
        "pinCode": 34448,
        "email": "hillary.skulski@aol.com",
        "addressLine3": "Citrus",
        "phone2": "352-990-5946",
        "id": "4788953613860864"
    },
    {
        "phone1": "513-508-7371",
        "addressLine1": "72 Mannix Dr",
        "state": "CA",
        "pinCode": 45203,
        "email": "lmerced@gmail.com",
        "addressLine3": "Hamilton",
        "phone2": "513-418-1566",
        "addressLine2": "Cincinnati",
        "lastName": "Merced",
        "firstName": "Laticia",
        "id": "4790583889494016"
    },
    {
        "phone2": "904-627-4341",
        "addressLine2": "Jacksonville",
        "lastName": "Melnyk",
        "firstName": "Gracia",
        "phone1": "904-235-3633",
        "addressLine1": "97 Airport Loop Dr",
        "state": "NH",
        "pinCode": 32216,
        "email": "gracia@melnyk.com",
        "addressLine3": "Duval",
        "id": "4792220137816064"
    }
]
```

## POST https://v1-dot-customers-dot-ikea-services-dev.appspot.com/customers
Request Header: 
Content-Type: application/json

Request Payload: 
```javascript
{
        "addressLine3": "Nassau",
        "phone2": "516-407-9573",
        "addressLine2": "Garden City",
        "lastName": "Liukko",
        "firstName": "Gilma",
        "phone1": "516-393-9967",
        "addressLine1": "16452 Greenwich St",
        "state": "HO",
        "pinCode": 11530,
        "email": "gilma_liukko@gmail.com",
}
```
Response: 201 Created Time:205ms 
Response Headers:
Location →/customers/4887686053625856



