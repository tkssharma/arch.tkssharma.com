---
date: 2022-06-07
title: 'AWS serverless world for microservice in Node JS Part-4'
shortTitle: 'AWS serverless world for microservice in Node JS Part-4'
description: 'AWS serverless world for microservice in Node JS Part-4'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: developing-microservices-using-aws-serverless-patterns-part-4
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


**Event-driven Serverless Microservices Design with AWS Lambda**
================================================================

In this blog we will see how lambda based services can be used to built Event Driven Microservice

We will follow **AWS Lambda design principles** and the **best practices**  
when developing our **Lambda-based Event-driven Serverless ** applications.

**Event-driven architecture** provides developers with increased availability, elasticity, scalability, and cost optimization. With the rise of microservices and the cloud, event-driven architecture is becoming increasingly important for developers to understand.

**AWS Lambda** is very good fit with event-driven architectures, because the nature of lambda executions trigger from events. Events can come lots of resources and able to trigger lambda functions.

The **main purpose** of AWS Lambda functions is to **handle events**.

**An event** triggering a Lambda function could be almost anything, you can see in the image, from **REST API HTTP request** with **Amazon API Gateway**, a **schedule task** managed by an **Amazon EventBridge rule**, or an **Amazon S3** notification like object uploaded into bucket.

Even the simplest Lambda-based application uses **at least one event**. So that's why we said, **AWS Lambda** is very **good fit** for the **Event-Driven Architectures**. Because the fuel of AWS Lambda is events.

**Event-driven architectures** rely on creating events into all application state changes that are observable by other services, but the event publisher system is unaware of which consumers are subscribing that event. We call that, these are loosely coupled services.

Most Lambda-based applications use a **combination of AWS services**, for different requirements about Storage, API Management and integrating with other system and services. You can see image below;

![](https://miro.medium.com/max/1312/1*wWFagdDemoCBlcCFm45VzA.png)

[https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html)

In these applications, **AWS Lambda** is connecting between services, providing business logic to transform data that moves between services.

Also There are some **design patterns** in **distributed architectures** that we will follow when build and implement application using AWS services.

**AWS Services** has already implement some of distributed architectures design patterns that we can use easily without investing time to develop these patterns from scratch.

AWS Serverless Microservices with Event-Driven Lambda Invocations
=================================================================

So we will also follow these lambda design principles and the best practices when developing our **Lambda-based event-driven serverless**  applications.

We will **map** Event-driven **Lambda Invocation Types**, So AWS Lambda Invocation Types will be our **Serverless Integrations** when developing our Serverless  application.

If we map these Lambda Invocation Types with our microservices architecture when developing **serverless  application**, you can see the diagram below;

![](https://miro.medium.com/max/1400/1*228B5l9xcNsBEL0dbTgMUQ.png)

Serverless Event-driven  Microservices Architecture

So AWS **Lambda Invocation Types** will be our **Microservices Communications** when developing our **Serverless Event-driven ** Microservices application.

So during the article, we will follow these **Lambda Invocation types** as a M**icroservices Communication** **types** of our serverless  microservices project.

**Lambda Invocation Types** = Sync -> Async -> Event Mapping

Following Microservices Communication Types for Serverless

*   **Synchronous** Communication
*   **Asynchronous** Communication
*   **Event Source Mapping** for Poling queue events

> So how we can follow these invocation types into our application ?

Synchronous Communication for RESTful Microservices
===================================================

Synchronous commands are request/response. In a synchronous model, the client makes a request and waits for a response. We will developed **RESTful Microservices** with **API Gateway, Lambda Functions** and **DynamoDB**.

We called this = **RESTful Microservices**

*   **REST API** and **CRUD** endpoints (AWS Lambda, API Gateway)
*   **Data** persistence (AWS DynamoDB)

AWS API Gateway -for- Restful API-Driven Development for performing CRUD operations amongst lambda and DynamoDB.

Asynchronous Communication
==========================

In an **asynchronous design**, the client sends a request and may get an **acknowledgement** that the event was received, but it doesn’t get a response that includes the results of the request.

We will use

*   **Amazon EventBridge** \-for- Event-Driven **asynchronous communication** between Microservices

We will develop **Amazon EventBridge** with Lambda **Basket microservices** which publish the event in **asynchronous** way and this will consume by Ordering queue.

Event Source Mapping for Polling Event Messages
===============================================

In a polling event, consumers poll the producer for messages in **batches** and then **process** the batch before returning for a new batch of records.

We will use

*   **AWS SQS** -for- **Decouple Microservices** and processing events asynchronously using queues

We will develop **AWS SQS** with Lambda **Ordering microservices** which consumes by polling the event from the Ordering queue.

As you can see that we follow **Serverless Microservices** with AWS Lambda Invocation Types; Following Microservices Communication Types for Serverless;

*   **Synchronous** Communication
*   **Asynchronous** Communication
*   **Event Source Mapping** for Poling events

AWS Serverless Microservices for  Application Architecture
===================================================================

Here you can find the main overall **Serverless Architecture** for our application. This is the **big picture** of what we are going to develop together for **AWS Serverless Event-driven  Microservices** application that is Step by Step Implementation together.

Serverless Event-driven  Microservices Architecture

We will be following the **reference architecture** above which is a **real-world** **Serverless  application** and it includes;

*   **REST API** and **CRUD** endpoints with using **AWS Lambda, API Gateway**
*   **Data persistence** with using **AWS DynamoDB**
*   **Decouple microservices** with **events** using **AWS EventBridge**
*   **Message Queues** for cross-service communication using **AWS SQS**
*   **Cloud stack development** with **IaC** using **AWS CloudFormation CDK**
