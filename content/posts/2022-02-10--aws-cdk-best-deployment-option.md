---
date: 2022-02-10
title: 'Why Cloud Development Kit (CDK) is an Awesome Deployment option'
shortTitle: 'Why Cloud Development Kit (CDK) is an Awesome Deployment option'
description: 'Why Cloud Development Kit (CDK) is an Awesome Deployment option'
template: post
featuredImage: '../thumbnails/aws.png'
thumbnail: '../thumbnails/aws.png'
slug: aws-cdk-development-kit-for-developers
categories:
  - aws
  - cdk
  - Highlight
tags:
  - aws
  - serverless
  - cdk
  - lambda
---

Why Cloud Development Kit (CDK) is an Awesome Deployment option
=======================================================================

**What is AWS Cloud Development Kit (CDK)**

The official description is  is an open source software development framework to model and provision your cloud application resources using familiar programming languages. With AWS CDK, you can define your infrastructure as code and provision it through AWS CloudFormation.

So, this is yet another option to provision resources in AWS cloud. The way it works is, we write code in one of the supported programming languages and when we run a command, CDK automatically creates AWS CloudFormation templates for us. After that, we can deploy the template using another simple command and CDK deploys the template as a CloudFormation Stack.

AWS CDK currently supports JavaScript, TypeScript, and Python languages, with Java, and C# in developer preview. They are plans to support other languages in future, as per the popularity and demand

We are already familiar with other ways provided by AWS for resource creation like [AWS Console](https://adventuresincloud.wordpress.com/2019/05/15/6-projectx-using-aws-api-gateway-with-aws-lambda/), [AWS CLI](https://adventuresincloud.wordpress.com/2019/05/16/7-projectx-automating-deployment-using-aws-cli/), [AWS SAM](https://adventuresincloud.wordpress.com/2019/06/07/12-projectx-deploy-swagger-apis-using-aws-serverless-application-model-sam/), [AWS CloudFormation](https://adventuresincloud.wordpress.com/2019/05/18/8-projectx-automating-deployment-using-aws-cloudformation-2/) etc. Now we have one more option available.

The principal of provisioning resources programmatically is called Infrastructure-as-code (IAC). So, what better way to do IAC then by writing code in a familiar and full-fledged programming language for deployment.

**Software Development Kit (SDK) v/s Cloud Development Kit (CDK)**

Some of you may be wondering that AWS [already has SDK’s](https://aws.amazon.com/getting-started/tools-sdks/), so what is the need for a CDK

Well, both are used for different purpose.

An SDK is used to work with resources **already present** in AWS while a CDK helps in **provisioning** those **resources** in the first place

For example, we would provision a queue in AWS SQS service using CDK and then use SDK to put messages into that queue or read messages from that queue.

**Benefits of using AWS CDK**

When we start using any cloud, our typical journey begins as follows

**Phase-1:**

We use the user interface (portal) provided by our cloud vendor to provision resources (**AWS Console** in our case). This is the easiest way to start, as learning curve is very small.

*   However, after a while, when we have to provision resources repeatedly, it starts to become bothersome.
*   If this task is delegated to a member of your team, there is no way to verify what was done by him and track back the actions taken by him.
*   Also, there is a chance that mistakes might happen, and the result is not what was expected exactly.
*   Plus, there is no way that the actions can be captured and repeated, so every time resources need to be created, the same amount of effort must be expended.

**Phase-2:**

So, Life does not seem as good as before and we are compelled to do some research and search for a better alternative. We find that our cloud vendor also provides Command-Line Interface (CLI) (**AWS CLI** in our case.). This is great because it alleviates many of problems stated above.

*   We can write scripts to create resources and check it in version control.
*   We can have an approval step to confirm what is done is exactly what is required at that moment.
*   There is traceability and tracking of who is doing what in the cloud account.
*   Also, if same things are to be done again, we can make small changes in CLI scripts and that saves a lot of time.

However, in order to gain these benefits, we must do the following

*   The first and difficult step is to learn how to use CLI in a correct way.
*   Also, we must get familiar with the structure of writing scripts and its syntax.

Despite that, the benefits outweigh the cost of learning and so we invest time and learn how to use CLI. Again, Life is peaceful, and we go on with our life creating resources as required.

But overtime, the work keeps increasing as more requests keep coming for provision of large number of resources. So, our scripts keep growing bigger and at some point, it starts to get out of hand. Other issues we see are

*   If someone is handed these scripts, it becomes overwhelming for him to understand such long scripts with 100’s of lines of code
*   Also, it becomes difficult to keep scripts working correctly while making changes without doing mistakes
*   Doing a review or sanity check also gets difficult as it means reading lot of lines of code to uncover any mistakes, if present.
*   Another problem is when the scripts executes partially and stop in the middle because of an error. In this case, your cloud account is left in an incoherent state as half resources were created, and others half were missed out. We have to undertake a manual clean-up to bring our account in a consistent state.
*   Also, with CLI, there is no concept of completing the whole execution of scripts successfully or rolling it back if any resource creation fails.

**Phase-3:**

These advanced level issues start haunting us and we start searching for even better options. Again, we get lucky and find that our cloud vendor supports writing instructions in YAML/JSON file and that can be used for provisioning. We also read that it is an answer to lot of our earlier problems including the support for rollback.

Peace returns and life is good again. In our case, this service is called **AWS CloudFormation** and it works by creating templates and writing instructions in a declarative form to instruct what needs to be done, when these templates are executed. AWS creates an object called Stack out of your written template and all the resources are encapsulated as part of one stack execution. This sounds great. Also, we find that if there is a failure, the whole stack is rolled-back to leave our cloud account in a consistent state irrespective of the success or failure of deployment.

Upon hearing this, we again start believing in god as tears start rolling out of our eyes. We seem to have found an option that has most of benefits of previous option (CLI) but this also helps us in dealing with issues mentioned before.

*   So, Life is back in control and we go on happily doing deployments until we start getting many and frequent requests to provision a lot of resources in groups, required by different applications.
*   Now, we find most of our time is spent in copying and pasting of YAML code and creating templates which easily span 100’s of lines of declarative instructions.
*   Also, when we want to customize some names or write some logic, we must rely upon the awkward syntax and limitations of what is supported by it.
*   Additionally, it is difficult, if not impossible, to write logic to create resources conditionally or if same resources need to be created until a condition is met (loops).
*   There might be problems associated with limits imposed by cloud providers on how many resources can be created by a single template.
*   Also, we may need to nest one template into another and although it is supported by CloudFormation, it is its own idiosyncrasies of how to export values in one stack to get access to it in another stack.

We should mention here that, there may be other 3rd party alternatives, that are better than CLI scripts like using Terraform by HashiCorp and some other frameworks. If you are doing Serverless computing, you can also use AWS SAM or Serverless framework, which are better ways to provision than CLI scripts. However, you have to work with limitations of these products and as size and complexity grow, we start encountering similar issues we got with CloudFormation templates.

So, what next. Enter AWS CDK

**AWS CDK to the rescue**

As you start using AWS CDK, you might find that it borrows a lot of best practices from other projects to make our lives easier. For example,

*   It works by asking you to write minimum code to provide only a few values and it uses smart defaults to generate all the boiler-plate YAML code required in CloudFormation templates.
*   This way while you write a few lines of code in the comfort of your programming language and IDE, it does the grunt work of converting it to 10’s if not 100’s of lines of CloudFormation template code.
*   This helps you to deal with issues of size and complexity as your requirements grow.
*   Also, you have to full power of your programming language for structuring, modularizing and programming, so you don’t find any limitations in terms of applying logic for creating resource conditionally, in loops etc.

This is **as good as it gets** right now, and we breathe a sigh of relief as it offers us a glimmer of hope for restoration of peace and sanity back in our lives. With this superb offering by AWS, we can plan to live happily ever after.

