---
date: 2022-06-09
title: 'AWS serverless Dealing with Asynchronous events'
shortTitle: 'AWS serverless Dealing with Asynchronous events'
description: 'AWS serverless Dealing with Asynchronous events'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: developing-microservices-using-aws-async-patterns
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

The event-driven paradigm is usually adopted with serverless architectures, dispatching asynchronous events to trigger wanted effects. In this blog we will see how we can acknowledge end user on UI after async event has been executed 

You can also look at this blog for same assessment
AWS article pushing toward WebSocket: [https://aws.amazon.com/blogs/compute/from-poll-to-push-transform-apis-using-amazon-api-gateway-rest-apis-and-websockets/](https://aws.amazon.com/blogs/compute/from-poll-to-push-transform-apis-using-amazon-api-gateway-rest-apis-and-websockets/)


Example 

- User uploaded file
- lambda will process file and send sns event to another lambda 
- another lambda will send ack to UI end user after processing is over 

And when developing your micro-services, we find it best to connect them with the same pattern:

*   when a synchronous Lambda (for example inviteUser) dispatches an event through EventBridge triggering another Lambda

After treating events asynchronously, you will want to update the end-users by pushing data from the back-end to the front-end.

In this article we will reply to two questions: What’s the best way to do the above? How to implement it in JavaScript?

Let’s review our options
========================

This problematic is not new, classic architectures have well-known options: (Long) Polling, WebSocket or Server-Sent Events (SSE). On top of those, AWS offers an higher level abstraction: [AWS AppSync](https://aws.amazon.com/appsync/).

Let’s deep dive and assess each of them in a serverless context:

**(Long) Polling**
------------------

Your front-end has the responsibility of regularly asking your back-end if there is any fresh data. Hence the front will make the same call every few seconds/minutes. Sometimes one of those calls will have a fresh data to handle.

![](https://miro.medium.com/max/1400/1*ngKdNSrWqu1O-1Dch1CWNA.png)

A quick synchronous Polling request is sent every X seconds

Long polling is different in the fact that the request is kept open by the server as long as possible until it eventually returns a fresh data or reaches a timeout.

![](https://miro.medium.com/max/1400/1*FzoBsK7e8QZm0QRQhpamZw.png)

A lasting synchronous Long Polling request is sent as soon as the previous one returned

**Pros**

*   HTTP: robust and easy to handle.

**Cons**

*   With Polling, you usually add a delay between requests to not make it too intensive, this naturally delays your data arrival (not real-time).
*   Implementation with Lambdas: each Polling request hits a custom Lambda, and keeps its connection alive for the allocated amount of time before sending a potential empty response.
*   Cost with Lambdas: too costly because pinging “useless” HTTP routes and Lambdas as most of the polling requests won’t see a change in data. This con is a **deal-breaker**.

WebSocket
---------

Your front-end opens a long-lasting, bi-directional communication with your back-end through a WebSocket protocol. Thus, the back can push a message as soon as necessary.

![](https://miro.medium.com/max/1400/1*mWUU5CuHRsAKjumqCKGrwg.png)

The WS connection is kept open, then messages are pushed as early as possible

**Pros**

*   Implementation with Lambdas: WebSocket APIs is an official solution from AWS API Gateway. It handles the connections for you, and only pings your Lambdas on messages.
*   Cost with Lambdas: cheap, using [AWS API Gateway pricing source](https://aws.amazon.com/api-gateway/pricing/#WebSocket_APIs) we calculated that a small app with around 25,000 messages per day, triggering 25,000 Lambdas behind, would cost below $1 per month.

**Cons**

*   WebSocket is a different protocol for delivering data, you need to deal with two different paradigms in your app, HTTP and WS.
*   WebSocket is not automatically multiplexed (compared to HTTP/2). Implementing multiplexing both on the server and the client is a bit complicated.

**Server-Sent Events**
----------------------

Your front-end opens a long-lasting, uni-directional communication from your back-end through the HTTP protocol. Here as well, the back-end can push a message as soon as necessary.

![](https://miro.medium.com/max/1400/1*rqy2nF9oIybsQkj0iWS5Og.png)

Similar to WebSocket, except that it’s uni-directional (enough for our use-case) and using HTTP

**Pros**

*   Simple implementation and data efficient with HTTP.
*   It is automatically multiplexed over HTTP/2 out of the box.

**Cons**

*   Implementation with Lambdas: requires to keep a live connection between the client and your Lambdas in the back-end. Lambdas are not meant to be kept alive for a whole client session. Going around this limit is a hassle.
*   Cost with Lambdas: too costly because of the necessity to keep live Lambdas up and running. This con is a **deal-breaker**.

AWS AppSync
-----------

AppSync is a fully managed GraphQL API layer. It handles the parsing and resolution of requests connecting them to different data sources such as Lambdas, DynamoDB or HTTP APIs.

It, out of the box, includes real-time GraphQL subscriptions. To which you can connect with your favourite GraphQL front-end framework such as Apollo or Relay.

**Pros**

*   AppSync is serverless by design.
*   Easy to use, providing GraphQL schema and resolver templates is enough to generate an available GraphQL endpoint which supports GraphQL subscription.
*   Implementation with Lambdas: out of the box.
*   Cost with Lambdas: can be cheaper than WebSocket API as AppSync cost per million connection minutes is $0.08, whereas it’s $0.29 for WebSocket. However the price per million messages is higher ($1.14 for WS against $2 for AppSync).

**Cons**

*   GraphQL only.
*   Vendor (AWS) lock-in.
*   There is [no proper way to implement custom authorizers](https://github.com/aws/aws-appsync-community/issues/2) (only accepting API KEY, AWS IAM, OpenID Connect and AWS Cognito).
*   Hard to pair with an Event-Driven micro-services approach and often results in a monolith or distributed monolith structure.

What’s the best choice then?
============================

We recommend going for **WebSocket**, because:

*   It’s the only flexible and standard solution officially supported by AWS.
*   It has the smaller cost impact as the connection is kept alive by API Gateway and Lambdas are only triggered on useful events.
*   You’ll find lots of online content and libraries helping you implement WebSocket in a serverless context.

How to set it up?
=================

**_Pre-requesite:_** _In the context of the Serverless Framework on AWS in TypeScript.  
_**_Development time:_** _This solution takes less than half a day to set-up, test and deploy (not including the front-end)._

![](https://miro.medium.com/max/1400/1*mZRPyHe8Kwm_4k2WM095HQ.png)

1.  Start and keep track of the live WebSocket connection
2.  An event, like a SaaS hook, triggers a DB update
3.  A DynamoDB event then triggering a Lambda to notify the front-end of the updated data

**Code example:**

Configure connect and disconnect Lambdas to keep track of the active connections. When you declare the `websocket` event type for the first time, Serverless Framework will create a new WebSocket API Gateway. `$connect` and `$disconnect` are official WebSocket route events.

Configure your Lambda connection handlers in your serverless.yml

The Lambda called on connect is responsible to keep the connection ID, in your DynamoDB table for instance

The Lambda called on disconnect is responsible to remove the connection ID

Then add a Lambda responsible to push WebSocket messages to the front-ends.

Configure the lambda responsible to update your front-end, preferably triggered with an EventBridge event

The Lambda will pass the message to the interested live connections

And that’s it! With a few lines of code your serverless back-end is ready to handle live WebSocket connections.

That’s the solution we now use by default on our serverless projects in my company ([Theodo](http://theodo.com/global)), until a better one arises!

Beyond that, we are closely looking out for SSE news in serverless. Because outside of serverless, we believe it solves the problem in a nicer way than WebSocket. Some amazing tools exist that we would love to be able to use (for instance Mercure: [https://github.com/dunglas/mercure](https://github.com/dunglas/mercure)).

I do hope this article answered some of your questions. If you have any question or feedback, feel free to drop a comment, we’d love to hear from you!

Sources
=======

**Comparisons**


*   Comparision between Polling, Websocket and SSE: [https://codeburst.io/polling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9](https://codeburst.io/polling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9)
*   Another comparison: [https://blog.stanko.io/do-you-really-need-websockets-343aed40aa9b](https://blog.stanko.io/do-you-really-need-websockets-343aed40aa9b)
*   SSE instead of Websocket: [www.smashingmagazine.com/2018/02/sse-websockets-data-flow-http2/](https://www.smashingmagazine.com/2018/02/sse-websockets-data-flow-http2/)
*   AWS article pushing toward WebSocket: [https://aws.amazon.com/blogs/compute/from-poll-to-push-transform-apis-using-amazon-api-gateway-rest-apis-and-websockets/](https://aws.amazon.com/blogs/compute/from-poll-to-push-transform-apis-using-amazon-api-gateway-rest-apis-and-websockets/)

**WebSocket**

*   WebSocket 101: [https://lucumr.pocoo.org/2012/9/24/websockets-101/](https://lucumr.pocoo.org/2012/9/24/websockets-101/)
*   WebSocket API Gateway article from AWS: [https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/)
*   Websocket API Gateway example repository: [https://github.com/aws-samples/simple-websockets-chat-app](https://github.com/aws-samples/simple-websockets-chat-app)
*   Websocket in Serverless Framework documentation: [https://serverless.com/framework/docs/providers/aws/events/websocket/](https://serverless.com/framework/docs/providers/aws/events/websocket/)
*   Websocket article from Serverless Framework: [https://serverless.com/blog/api-gateway-websockets-example/](https://serverless.com/blog/api-gateway-websockets-example/)
*   Multiplexing with Websocket: [https://www.rabbitmq.com/blog/2012/02/23/how-to-compose-apps-using-websockets/](https://www.rabbitmq.com/blog/2012/02/23/how-to-compose-apps-using-websockets/)
*   Websocket API Gateway pricing: [https://aws.amazon.com/api-gateway/pricing/#WebSocket\_APIs](https://aws.amazon.com/api-gateway/pricing/#WebSocket_APIs)

**AWS AppSync**

*   AWS AppSync pricing: [https://aws.amazon.com/appsync/pricing/](https://aws.amazon.com/appsync/pricing/)
*   Serverless Framework documentation about AWS AppSync: [https://serverless.com/aws-appsync/](https://aws.amazon.com/appsync/pricing/)

