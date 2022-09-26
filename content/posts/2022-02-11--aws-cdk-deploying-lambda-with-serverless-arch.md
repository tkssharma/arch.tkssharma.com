---
date: 2022-02-11
title: 'Deploying Lambda with Dynamo DB using AWS CDK'
shortTitle: 'Deploying Lambda with Dynamo DB using AWS CDK'
description: 'Deploying Lambda with Dynamo DB using AWS CDK'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: deploying-aws-lambda-using-aws-cdk
categories:
  - aws
  - cdk
  - Highlight
tags:
  - aws
  - serverless
  - cdk
  - aws-cdk
  - dynamodb
  - api-gateway
  - lambda
---

Deploying Lambda with Dynamo DB using AWS CDK
=============================================

**What is AWS Cloud Development Kit (CDK)**

The official description is an open source software development framework to model and provision your cloud application resources using familiar programming languages. With AWS CDK, you can define your infrastructure as code and provision it through AWS CloudFormation.

AWS CDK has been experiencing a steady increase in enthusiastic developers since 2019 and already has a strong and helpful community that is very active on Slack, for example. There is of course much more to say about AWS CDK and I recommend you explore it. Drop me a line if you have any questions.

Developers use the CDK framework in one of the supported programming languages to define reusable cloud components called constructs, which are composed together into stacks, forming a "CDK app".

They then use the AWS CDK CLI to interact with their CDK app. The CLI allows developers to synthesize artifacts such as AWS CloudFormation Templates, deploy stacks to development AWS accounts and "diff" against a deployed stack to understand the impact of a code change.

More on AWS CDK
-  https://tkssharma.com/aws-cdk-managing-infra-as-code/
-  https://tkssharma.com/AWS-CDK-developers-must-learn/

## Lets Build this infra with the help of AWS CDK 

![](../thumbnails//aws-gateway.png)

## AWS Components we will deploy on AWS using CDK

### Amazon API Gateway

AWS API gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor and secure APIs. API acts as a front door for the application to access data, business logic or functionality from the backend services. It handles all the task involved in accepting and processing up of hundreds or thousands of concurrent API calls, including traffic management, authorization, access control, monitoring and API management.
### AWS Lambda 

AWS lambda lets the user to run code without provisioning or managing servers and the user needs to pay for how much they use. The user can also scale it up and down according to their needs.
### Amazon DynamoDB

Amazon DynamoDB is a fully managed proprietary NoSQL database service that supports key-value and document data structures. It allows us to create database tables that can store and retrieve any amount of data. It also relieves the customers from the burden of operating and scaling a distributed database.

Lets get started with AWS CDK 

## Prepare for AWS CDK Typescript App
Install or update the AWS CDK CLI from npm (requires Node.js ≥ 14.15.0). We recommend using a version in Active LTS
```bash
$ npm i -g aws-cdk
```
(See Manual Installation for installing the CDK from a signed .zip file).

Initialize a project:
```bash
$ mkdir hello-cdk
$ cd hello-cdk
$ cdk init sample-app --language=typescript
```
This creates a sample project with basic folder structure 
```sh
❯ tree -I node_modules               
.
├── README.md
├── bin
│   └── bootstrap.ts
├── cdk.json
├── jest.config.js
├── lib
│   └── bootstrap-stack.ts
├── package-lock.json
├── package.json
├── test
│   └── bootstrap.test.ts
└── tsconfig.json
```
What we need is a simple lambda which can access Dynamo Table and do the operation and expose REST interface using API Gateway, its more like a basic serverless app with api-gateway, lambda and dynamoDB

Our Lambda code is basic and simple which is just reading dynamo Table 
```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE
};

module.exports.handler = (event, context, callback) => {
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not get books.'
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
};
```

Let's create a simple Stake after removing default code 
This stack is about creating SQS queue and adding SNS Topic subscription to that Queue 
so if any message published to the topic, it will be processed by SQS queue 

```javascript
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class QaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'QaQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'QaTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
```

We can change this to a different Stack having lambda, api-gateway and dynamo DB 
```javascript
const cdk = require('@aws-cdk/core');
const dynamodb = require('@aws-cdk/aws-dynamodb');
const lambda = require('@aws-cdk/aws-lambda');
const iam = require('@aws-cdk/aws-iam');
const apigw = require('@aws-cdk/aws-apigateway');


class BookStoreStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);
  }
}
```
#### First create Dynamo DB Resource 
```javascript
    const booksCatalogTable = new dynamodb.Table(
      this,
      'bookStore',
      {
        tableName: 'books-catalog',
        partitionKey: {
          name: 'id',
          type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
      }
    );
```
#### Now Lambda Function reading code from /lambda dir
```javascript
    const listBooks = new lambda.Function(this, 'listBooksLambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      functionName: 'list-books',
      description: 'returns list of all books in catalog',
      code: lambda.Code.asset('lambda'),
      handler: 'list.handler',
      environment: {
        DYNAMODB_TABLE: booksCatalogTable.tableName
      }
    });
```
#### create api gateway and integrate lambda with HTTP binding 
```javascript
    const booksApi = new apigw.LambdaRestApi(this, 'booksApi', {
      proxy: false,
      handler: listBooks
    });

    const booksApiResource = booksApi.root.addResource('books');
    const booksApiLambdaIntegration = new apigw.LambdaIntegration(
      listBooks
    );
    booksApiResource.addMethod('GET', booksApiLambdaIntegration);
```
#### allow lambda function to read data from Dynamo Permissions 
```javascript
    listBooks.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:Scan'],
        resources: [booksCatalogTable.tableArn]
      })
    );
```
Putting all things together 

```javascript
const cdk = require('@aws-cdk/core');
const dynamodb = require('@aws-cdk/aws-dynamodb');

const lambda = require('@aws-cdk/aws-lambda');
const iam = require('@aws-cdk/aws-iam');
const apigw = require('@aws-cdk/aws-apigateway');


class BookStoreStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);


    const booksCatalogTable = new dynamodb.Table(
      this,
      'tableBooksCatalog',
      {
        tableName: 'books-catalog',
        partitionKey: {
          name: 'id',
          type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
      }
    );

    const listBooks = new lambda.Function(this, 'listBooksLambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      functionName: 'list-books',
      description: 'returns list of all books in catalog',
      code: lambda.Code.asset('lambda'),
      handler: 'list.handler',
      environment: {
        DYNAMODB_TABLE: booksCatalogTable.tableName
      }
    });

    const booksApi = new apigw.LambdaRestApi(this, 'booksApi', {
      proxy: false,
      handler: listBooks
    });

    const booksApiResource = booksApi.root.addResource('books');
    const booksApiLambdaIntegration = new apigw.LambdaIntegration(
      listBooks
    );

    booksApiResource.addMethod('GET', booksApiLambdaIntegration);

    listBooks.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:Scan'],
        resources: [booksCatalogTable.tableArn]
      })
    );

  }
}

module.exports = { BookStoreStack }
```

Register the stack with App 

```javascript
require('source-map-support/register');
const cdk = require('@aws-cdk/core');
const { BookStoreStack } = require('../lib/books-api-stack');

const app = new cdk.App();
new BookStoreStack(app, 'BookStoreStack');
```

Now we can trigger basic CDK commands

```sh
cdk init
cdk synth 
cdk bootstrap 
cdk deploy
cdk destroy
```

cdk bootstrap : we must run this command before deploy, this is one time command to initialize platform before deployment
cdk deploy with provide user friendly interface and will expose all resources its creating
aws destroy - it will destroy resources created




