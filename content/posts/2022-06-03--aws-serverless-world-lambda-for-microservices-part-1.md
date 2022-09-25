---
date: 2022-06-03
title: 'AWS serverless world for microservice in Node JS Part-1'
shortTitle: 'AWS serverless world for microservice in Node JS Part-1'
description: 'AWS serverless world for microservice in Node JS Part-1'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: developing-microservices-using-aws-serverless-patterns-part-1
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

### AWS serverless world for microservice in Node JS

Serverless is a cloud-native development model that allows developers to build and run applications without having to manage servers.

There are still servers in serverless, but they are abstracted away from app development. A cloud provider handles the routine work of provisioning, maintaining, and scaling the server infrastructure. Developers can simply package their code in containers for deployment.

Once deployed, serverless apps respond to demand and automatically scale up and down as needed. Serverless offerings from public cloud providers are usually metered on-demand through an event-driven execution model. As a result, when a serverless function is sitting idle, it doesn’t cost anything.

all  major providers like AWS, Azure, GCP provided serverless infra for execution.

Lambda is tightly integrated with API Gateway. The ability to make synchronous calls from API Gateway to Lambda enables the creation of fully serverless applications and is described in detail in the Amazon API Gateway Developer Guide.

The following figure shows the architecture of a serverless microservice with AWS Lambda where the complete service is built out of managed services, which eliminates the architectural burden to design for scale and high availability, and eliminates the operational efforts of running and monitoring the microservice’s underlying infrastructure.


![](https://miro.medium.com/max/1400/1*AbVG9wBBOF2xCUdcEIo7Yw.png)

## Serverless microservice using AWS Lambda

A similar implementation that is also based on serverless services is shown in the following figure. In this architecture, Docker containers are used with Fargate, so it’s not necessary to care about the underlying infrastructure. In addition to DynamoDB, Amazon Aurora Serverless is used, which is an on-demand, auto-scaling configuration for Amazon Aurora (MySQL‑compatible edition), where the database will automatically start up, shut down, and scale capacity up or down based on your application's needs.

Lets talk about how we can manage microservices in serverless world

-  Microservices using AWS Serverless stack and using Synchronous Request-Response pattern with API Gateway and Lambda
-  Asynchronous event submission using API Gateway, SQS and Lambda. And how to implement Saga Orchestration Pattern with Serverless Step Function service
-  event driven system design with different microservices in serverless world 
-  lambda can connect with all other aws services

We can consider a single lambda as a microservices, we can deploy whole app as a lambda and api gateway will proxy all requests to that service 

![](https://jimburnham.cloud/wp-content/uploads/2017/12/DDNS-via-API-Gateway-and-Lambda.jpg)

## lambda as a microservoce

These days we can use lambda as a microservice

- single Lambda per service and each Lambda function has got if/else logic to execute the functionality depending on the routes.
- API Gateway implements a Proxy resource per service — something like /orders/proxy+ with ANY method for Order service and it forwards all the order related requests to Order Service Lambda.
- Single Code repository for hosting both the Lambda functions and other AWS resources like API Gateway, DynamoDB, Roles etc. needed for the services to be up and running in AWS environment.


- Clear separation of functionality — Single Lambda function per service.
- Number of Lambda functions to manage is less — one Lambda function per Service
- Deployment is fast as just one Lambda function to be deployed per service.
- Because the same Lambda function is serving all the features, probability of hitting a Warm lambda is high. So less cold start instances.
- keep this lambda domain specific, do not mix lots of feature in sinle lambda service 



![](https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/images/image4.png)

AWS Lambda is a service that allows you to run your functions in the cloud completely Serverless and eliminates the operational complexity. You upload your code to Lambda, and it takes care of everything needed to run and scale its execution and fulfill conditions and high availability requirements. Lambda supports several programming languages so you can choose the most suitable.
It integrates with the API gateway, allows you to invoke functions with the API calls, and makes your architecture completely Serverless. There are several ways to invoke a function: an event, another AWS service, or another service or application.


So can we put AWS Lambda as a microservice in our Serverless E-Commerce application.

You can see the figure above that shows the architecture of a Serverless microservice with AWS Lambda, where the entire service is built from managed services, which removing the architectural overhead of designing for scaling and high availability, and eliminating the operational efforts of operating and monitoring the microservice’s underlying infrastructure.

## Serverless Microservices with Lambda


In microservices architecture, each of the application components is decoupled and deployed and run independently. An API created with Amazon API Gateway, and then AWS Lambda-initiated functions is all you need to build a microservice. Your team can use these services to decouple and segment your environment to the desired level of detail.

In general, a microservices environment can introduce the following difficulties:

repeated overhead for create each new microservice,
problems optimizing server density and usage,
complexity of running multiple versions of multiple microservices at the same time,
and client-side code requirements to integrate with many services.
When you create microservices using Serverless resources, these problems become less difficult to resolve and, in some cases, simply disappear.

![](https://miro.medium.com/max/1400/1*CQyrnrcfBPv1m4FnS0AF6w.png)

The Serverless Microservices Pattern reduces the barrier for the creation of each subsequent microservice. API Gateway even allows for the cloning of existing APIs, and using of Lambda functions in other accounts.
Optimizing server utilization is no longer relevant with this pattern. Finally, Amazon API Gateway provides programmatically generated client SDKs that are programmatically built in a number of popular languages in order to reduce the integration overhead.

You can see the figure above that shows the architecture of a Serverless microservice with Amazon API Gateway and AWS Lambda. So API Gateway APIs proxy to individual microservices backed by Lambda functions. You can see the microservices-1–2–3–4 that proxy by API Gateway and all of microservices handle with AWS Lambda functions.

So now we are ready to develop our enterprise E-Commerce application with fully Serverless Event-driven Microservices Architecture using AWS Lambda as a Microservices.