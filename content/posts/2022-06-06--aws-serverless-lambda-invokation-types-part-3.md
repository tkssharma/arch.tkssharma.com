---
date: 2022-06-07
title: 'AWS serverless world for microservice in Node JS Part-3'
shortTitle: 'AWS serverless world for microservice in Node JS Part-3'
description: 'AWS serverless world for microservice in Node JS Part-3'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: developing-microservices-using-aws-serverless-patterns-part-3
categories:
  - aws
  - event-driven
  - sns
  - sqs
  - lambda
tags:
  - aws
  - sns
  - sqs
---


AWS Lambda Event Sources and Destination Trigger Services
=========================================================

Lets talk about lambda triggers (In how many ways you can trigger lambda function)

Here we are going to learn about **AWS Lambda Event Sources and Destination Trigger Services** when developing **Serverless ** application.

![](https://www.honeycomb.host/images/uploads/Lambda-EventSources-DataStores.JPG)
![](https://www.honeycomb.host/images/uploads/Lambda-EventSources-EndPoints.JPG)
![](https://www.honeycomb.host/images/uploads/Lambda-EventSources-Repositories.JPG)
![](https://www.honeycomb.host/images/uploads/Lambda-EventSources-Messaging.JPG)

Serverless Event-driven  Microservices Architecture

AWS Lambda Event Sources
========================

With lambda you can run code for virtually any type of applications or backend services all with zero administration. Upload your code and run your code and **scale** your code **automatically** with high availability. So we can also set up our lambda code to automatically **trigger** from **other AWS Services** or call it directly any web or mobile application.

The typical lambda function there is an **event source** or **trigger** and **actual Function code** and then there is the **destination**.

You can see the image below that we have **3 stages**;

*   **Event Source**
*   **Function**
*   **Destination**

![](https://miro.medium.com/max/1400/1*mzP65ilH4nCnen3pbM26zw.png)

[https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#eventsources-sqs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#eventsources-sqs)

AWS Lambda integrates with other AWS services to invoke functions or take other actions.

So the **event source** has a number of services that can directly interact with lambda and these events can be almost anything, they can be;

*   a http call, cron job
*   uploading an object into S3 bucket
*   pushing something to sns
*   pushing something to sqs
*   changes in a resource state
*   third party call like payment done through stripe
*   data streams

There can be a sync and async trigger with Lambda, sync execution like triggering lambda from api gateway and async trigger is invoking lambda using sns message publish.


So the **event** is something that happens that **triggers** to **lambda function** to execute.

After triggering event to lambda function, lambda launch the **execution environment** with **different language** and **runtimes**, you can basically develop any language and runtime into lambda code.

After execution, lambda has **destinations** that can be interaction with your function code it depends your function business logic and business requirements.

Use Cases Lambda Event Sources and Destination Trigger Services
===============================================================

AWS Lambda integrates with other AWS services to invoke functions or take other actions. These are some common use cases:

*   **Invoke a function** in response to resource lifecycle events, such as with Amazon Simple Storage Service (Amazon S3). This is Using AWS Lambda with Amazon S3. For example when an object upload to S3 bucket, this event can be trigger a lambda function
*   **Respond to incoming HTTP requests;** This is Using Lambda with API Gateway. Typical REST API use cases can be trigger api gateway and respond back to client.
*   **Consume events from a queue;** This is Using Lambda with Amazon SQS. Lambda poll queue records from Amazon SQS.
*   **Run a function on a schedule;** This is Using AWS Lambda with Amazon EventBridge (CloudWatch Events).

Depending on which service you’re using with Lambda, the invocation generally works in one of **two ways**. An event drives the **invocation** or Lambda **polls a queue** or data stream and **invokes** the **function** in response to activity in the queue or data stream.

List of Services Lambda Event Sources
=====================================

You can Find the list of services that invokes to **lambda as an event source**. You can see the following table below, in order to determine which method of invocation you should use.

![](https://miro.medium.com/max/1400/1*HrRzeYCfxbVFPenVDgm3Lg.png)

[https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#eventsources-sqs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html#eventsources-sqs)

Follow the link from the service name to find information about how to set up the integration between the services. These topics also include example events that you can use to test your function.


Asynchronous event source 
=================

Asynchronous events are placed in an Event Queue, and the requestor doesn’t wait for the function to complete.
This model makes sense for batch processes. With an async event, Lambda automatically retries the invoke twice more on your behalf. You also have the option to enable a dead-letter queue on your Lambda function.
Make sure the processing is idempotent (in case of retries)
In November 2019, two new error handling options were added to give you more control over failed records from asynchronous event sources: Maximum Event Age and Maximum Retry Attempts.
To invoke functions asynchronously via API, use Event invocation type.
Examples of AWS services that invoke Lambda asynchronously -

- Amazon Simple Storage Service (Amazon S3)
- Amazon Simple Notification Service (Amazon SNS)
- Amazon Simple Email Service (Amazon SES)
- Amazon CloudWatch Logs
- AWS CloudFormation
- Amazon CloudWatch Events
- AWS CodeCommit
- AWS Config
- AWS Internet of Things (IoT) button

Synchronous event source 
=========================

Synchronous events expect an immediate response from the function invocation.
With this execution model, there is no built-in retry in Lambda. You must manage your retry strategy within your application code.
To invoke Lambda synchronously via API, use RequestResponse invocation type.
Examples of AWS services that invoke Lambda synchronously -

User Invoked:

- Elastic Load Balancing (Application Load Balancer)
- Amazon API Gateway
- Amazon CloudFront (Lambda@Edge)
- Amazon S3 Batch

Service Invoked:

- Amazon Cognito
- AWS Step Functions

Other Services:

- Amazon Lex
- Amazon Alexa
- Amazon Kinesis Data Firehose


Lets build a simple Lambda function with SNS trigger/sqs trigger 
================================================================

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

Let's create a simple Stake after removing default code 
This stack is about creating SNS queue and adding SNS Topic subscription to that lambda 
so if any message published to the topic, it will be processed by Lambda (lambda trigger) 

```javascript
export class RfxApiStack extends cdk.Stack {
   constructor(scope: Construct, id: string, props: RfxApiStackProps) {
    super(scope, id, props);

    const {
      stage,
      apiLambdaPath,
      apiLambdaHandler,
      snsListenerLambdaPath,
      snsListenerLambdaHandler,
      lambdaDescription,
    } = props;

        // sns lambda trigger for RFx
    const snsListenerLambda = new cdk.aws_lambda.Function(
      this,
      `api-sns-listener-lambda-${stage}`,
      {
        functionName: `api-sns-listener-${stage}`,
        code: cdk.aws_lambda.Code.fromAsset(snsListenerLambdaPath),
        handler: snsListenerLambdaHandler,
        runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        memorySize: 512,
        logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
        description: lambdaDescription,
        environment: {
          STAGE: stage
        },
        timeout: cdk.Duration.seconds(10),
        initialPolicy: [
          new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ["dynamodb:*"],
            resources: dynamoTableResources,
          }),
        ],
      }
    );

    s3RfxDocumentsBucket.grantReadWrite(apiLambda);
    // sns Subscription for snsListener lambda
    sns.addSubscription(
      new cdk.aws_sns_subscriptions.LambdaSubscription(snsListenerLambda)
    );
    // API GW
    const apiGw = new cdk.aws_apigateway.LambdaRestApi(this, `api-gw`, {
      handler: apiLambda,
      deploy: true,
      proxy: true,
      binaryMediaTypes: ["*/*"],
      deployOptions: {
        stageName: stage,
      },
    });
}
```


```javascript
#!/usr/bin/env node

// Native.
import * as path from "path";

// Package.
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

// Internal.
import { RfxApiStack } from "../stacks/stack";

// Code.
const app = new cdk.App();

const stage = process.env.STAGE || "development";

const env: cdk.Environment = {
  account: process.env.AWS_ACCOUNT_ID,
  region: "eu-east-1",
};

// API Proxy to lambda
const isLocal = stage === "local";

new RfxApiStack(app, `api-stack-${stage}`, {
  stage,
  snsListenerLambdaHandler: "build/event-listener/handler.handle",
  snsListenerLambdaPath: isLocal
    ? path.resolve(`/tmp/${projectName}`)
    : path.resolve(__dirname, "..", "..", `${projectName}.zip`),
  env,
  tags: { domain: "service", service: "rfx" },
  stackName: `api-${stage}`,
  description: `Rfx API stack backed by a lambda to manage rfx - ${gitDescription}`,
  terminationProtection: false,
});
```
This above example can be used in microservices world where you want to publish message to SNS topic so listerner lambda can receive this and process messages

Lets explore all different building blocks to build any microservices arch using lambda's

We will be following the **reference architecture** above which is a **real-world** **Serverless  application** and it includes;

*   **REST API** and **CRUD** endpoints with using **AWS Lambda, API Gateway**
*   **REST API** and **CRUD** endpoints with using **AWS Lambda, API Gateway and AWS CDK with nestjs framework**
*   **Data persistence** with using **AWS DynamoDB**
*   **Decouple microservices** with **events** using **AWS EventBridge**
*   **Message Queues** for cross-service communication using **AWS SQS**
*   **Cloud stack development** with **IaC** using **AWS CDK**
