---
title: Right way to setup Microservice Architecture
subTitle: Right way to setup Microservice Architecture
category: "devOps"
cover: ms.png
---

> Microservice Architecture is about decomposing a Software System into autonomus Modules which are independently deployable and which communicates via lightweight, language agnostic way and together they fulfill the business goal*.*

What are Microservices?
----------------------
Using microservices means creating applications from loosely coupling services. The application consists of several small services, each representing a separate business goal. They can be developed and easily maintained individually, after what they are joint in a complex application. You can also use different programming languages, like Node.js, Java, PHP, etc.

Microservices
-------------

Microservices give dev teams the freedom to choose the technology stack they prefer best. They release them from worries about the effects it will have on the app they’re developing. This allows them to operate much faster and have more confidence than when they work with a monolithic architecture.

However, this doesn’t mean that we should completely eliminate and forget monolithic architecture. Many companies are still struggling when it comes to choosing the type of architecture they should use — monolithic or microservice.

So, let’s see what’s the difference.

Monolithic vs. Microservices Architecture
-----------------------------------------

Having a monolithic architecture means creating a single unit as the base for all the functional components. This includes database operations, business logic, background processing, etc. They are all deployed at once and run on the same servers.

Everything is in one single codebase, where all the updates are made. This makes scaling tricky, as the application becomes too complex to handle. Adding more features becomes a bigger problem when the codebase is larger. This limits flexibility and leaves no space for new ideas.

Monolithic architecture means that the processes are tightly coupled. If there is a problem with only one of them, the entire architecture goes down. This is very risky because the entire application can fail due to one small mistake.

On the other hand, the microservice architecture consists of separate services instead of a single unit. These services represent separate codebases that communicate through APIs. As every service represents a separate function, you can also update, deploy, and scale it independently. This doesn’t affect the rest of the microservices.

Monolithic architecture is better when:

the application you’re developing is simple, and everything is in the same language and framework,
you want to test quickly and easily by simply launching the application,
and you don’t have too many new features that will trigger the release of the entire application.
Why choose Microservices?
There are several reasons why microservices are better for your application:

#### Scalability
In the microservices architecture, every service scales separately from the others. This means that every feature functions independently, allowing teams to choose the most suitable technology stack. Moreover, they can estimate costs for each feature, and modify it when needed.

#### Productivity
Microservices are definitely the way to go for large teams. As they work on large projects that take up too much time and effort, the microservices approach allows teams to split them into several independent services.

#### Scalability in microservices

These services function independently. This means that team members will be able to work on the same project without a great need for coordination. Teams working on a particular microservice can make decisions on their own, without having to wait for the others. For starters, they’ll have the freedom to choose the language they want to write a microservice in. They don’t have to coordinate with the tech stack other teams are using.

#### Agility
Being agile is what most of today’s dev teams strive for. Microservices architecture allows a large team to split into several smaller teams responsible for separate services. This gives them autonomy, as well as the possibility to be more efficient by working through a shorter development cycle.

#### Reusability
Working with microservices means having small pieces of code that are paired into a large application. These pieces that represent different features of the application can also function independently. This means that you can use them as a base or an addition to another feature. Developers save a lot of time because they don’t always have to write the code from scratch.

Software Systems are Complex. As the human brain can only handle complexity up to a certain limit, the high complexity of large software systems leads to many problems. A large-scale and complex software system is difficult to develop, enhance, maintain, modernize, scale. Over the years, there are many attempts to tackle the complexity of Software Systems. During the 70s, *Modular Software Development *was introduced by* [David Parnas](https://www.computer.org/profiles/david-parnas) and [Edsger W. Dijkstra](https://history.computer.org/pioneers/dijkstra.html) *to tackle the complexities of Software Systems*. *During the 1990s, *layered Software Architecture *was introduced to tackle the complexities of Business Applications. Since the beginning of this century*, Service Oriented Architecture (SOA) *came to the fore to develop complex business applications.* Microservice Architecture *is the latest methodology to handle the complexity of modern Software Applications. One question may arise: why we need a new Software Development methodology suddenly? The short answer is that the whole ecosystem related to Software Development has changed significantly in the last decade. Nowadays, Software is developed using Agile methodology, deployed on Container+Cloud using CI/CD, persisted on NoSQL databases, rendered on a modern browser or smartphone and the machines are connected via a high-speed network. As a result of these factors, Microservice Architecture is born in 2012.

## Microservice or Monolith:

There are mainly two groups of peoples who share opposite views about Microservice vs Monolith. For one group, Microservice Architecture is all about Cargo-Cult or Hype Driven Development which is just a playground for Technology addicted Developers. For another group, Microservice Architecture is the “One Architecture to Rule them All” which can take away the complexity of any Software Systems. In my opinion, Microservice and Monolith Architecture are complementary. For applications that are lean in the long term, Monolith Architecture is the right approach. On the other hand, for application which is large and complex or has the potential to become large and complex, Microservice Architecture is the right solution. Modern Software development is so vast that both Microservice Architecture and Monolith Architecture will co-exist in the same way as SQL and NoSQL co-exist.

## Best Practices:

Designing Microservice Architecture the right way is quite challenging and difficult. On contrary to Monolith Architecture which gives one solution for all, Microservice Architecture gives a different solution for different problems. If the wrong solution is chosen, then the Microservice Architecture is just a ticking time bomb that is destined to explode. A badly designed Microservice Architecture is worse than a Monolith. Defining a set of Best practices for Microservice Architecture is also challenging. I have seen some conference talks where some renowned and respected Software Engineers have proposed Microservice Architecture best practices which are counterproductive.

Here I am proposing some best practices which will help to develop effective Microservice Applications where the target project is supposed to live more than 6 months and team size is moderate to large (6+ developers). Full disclosure, there also some other posts regarding Microservice Architecture best practices e.g. [Characteristics of a Microservice Architecture](https://martinfowler.com/articles/microservices.html#SynchronousCallsConsideredHarmful) by [*Martin Fowler](https://martinfowler.com/)* or [Microservices Patterns](https://microservices.io/patterns/microservices.html) by [*Chris Richardson](https://www.chrisrichardson.net/)* or Adopting [Microservices at Netflix: Lessons for Architectural Design](https://microservices.io/patterns/microservices.html) by [Tony Mauro](https://www.nginx.com/people/tony-mauro/). There are also some great talks e.g. [Microservices Patterns and Antipatterns](https://www.youtube.com/watch?v=RsyOkifmamI) by [*Stefan Tilkov](https://www.innoq.com/en/staff/stefan-tilkov/)*, [10 Tips for failing badly at Microservices](https://www.youtube.com/watch?v=X0tjziAQfNQ) by David Schmitz, [Principles of Microservices](https://www.youtube.com/watch?v=PFQnNFe27kU) by [*Sam Newman](https://samnewman.io/)*. Also, I have written a curated list of books which are essential to design Microservices in:
[5 Best Microservices book
*Essential books to design Microservice Architecture the right way*towardsdatascience.com](https://towardsdatascience.com/5-best-microservices-book-db981ef9c433)

1.Domain Driven Design: The foremost challenge to develop Microservices is to split a large, complex application into small, autonomous, independently deployable Modules. If Microservices are not split in the right way, there will be tightly coupled Microservices which will have all the disadvantages of a Monolith and all the complexities of Microservices aka Distributed Monolith. Fortunately, there is already a Solution which can greatly help in this regard. [*Eric Evans](https://twitter.com/ericevans0?lang=en)*, a Software Engineering Consultant back then, had encountered recurring issues regarding software complexity in Business Applications across different companies and has summarized his valuable insight in the book “[Domain Driven Design: Tackling Complexity in the Heart of Software](http://dddcommunity.org/book/evans_2003/)” in 2004. The book outlined three Core Concepts:

* The software development team should work in close co-operation with the Business department or Domain Experts.

* The Architects/Developers and Domain Experts should first make the Strategic Design: Finding the Bounded Context and related Core Domain and Ubiquitous Language, Subdomains, Context Maps.

* The Architects/Developers should then make the Tactical Design to decompose the Core Domain into fine-grained Building blocks: Entity, Value Object, Aggregate, Aggregate Root

A detail discussion of Domain-Driven Design is out of the scope of this post but you should read either the original DDD book [Domain Driven Design: Tackling Complexity in the Heart of Software](http://dddcommunity.org/book/evans_2003/) (Blue Book) of [*Eric Evans](https://twitter.com/ericevans0?lang=en)* or a bit modern DDD book [Implementing Domain Driven Design](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577/ref=sr_1_3?keywords=Domain+driven+design&qid=1574198067&s=books&sr=1-3)(Red Book) of [*Vaughn Vernon](https://vaughnvernon.co/)*. If a large system is divided into Core Domain and Sub-domains and the Core Domain and Sub-domains are then mapped to one or more Microservices, then we will get the ideal loosely coupled Microservices.

2.Database per Microservice:
--------------------------
After splitting the Complex application into Micro-Service Modules, the next challenge arises, what to do with the Database? Shall we share the database among Microservices or not. The answer to the question is the double edge sword. On the one hand, sharing the database among microservices will lead to strong coupling among the Microservices which is exactly the opposite of the goal of Microservices Architecture. Even a small change in a database will need synchronization among teams. Also, managing Transaction and Locking of a Database in one service is challenging enough. But managing Transaction/Locking among multiple distributed Microservices is a daunting task. On the other hand, if every Microservice has own database/private tables, then exchanging data between Microservices opens the pandora’s box of challenges. As a result, many prominent Software Engineers have advocated for a shared database among Microservices as a pragmatic solution. However, in my opinion, Microservice is all about sustainable and long term software development. As a result, every Microservice should have its Database (or Private Tables).

3.Micro Frontends: 
------------------
Unfortunately, most of the Backend developers have a backdated view about Frontend Development and think that Frontend Development is simple. As most Software Architects are Backend Developers, they have little regard for Frontend and Frontend is usually neglected in the Architecture Design. Very often in Microservice projects, backends are very finely modularized with their database but there is one Monolith Frontend. In the best case, they consider one of the hottest SPA (React, Angular, Vue) to develop the Monolith Frontend. The main problem of this approach is that Frontend Monolith is as bad as Backend Monolith as I have described [previously](https://towardsdatascience.com/microservice-architecture-a-brief-overview-and-why-you-should-use-it-in-your-next-project-a17b6e19adfd). Also, when the Frontend needs to be modernized due to changes in Browser, then it requires a Big Bang modernization (*That is the reason why so many companies are still using the outdated Angular 1 framework*). The web is simple yet very powerful and inherently offers transclusion. There are many ways to develop SPA based Microfrontends: with iFrame, Web Components or via (Angular/React) Elements.

4.Continuous Delivery:
--------------------
One of the key USP of Microservice Architecture is that each Microservice can be deployed independently. If you have a system of e.g. 100 Microservices and only one Microservice needs to be changed, then you can update only one Microservice without touching the other 99. But deploying 100 Microservices independently without Automation (DevOps, CI/CD) is a daunting task. To take full advantage of this Microservice feature, one needs CI/CD and DevOps. Using Microservice Architecture without CI/CD, DevOps, Automation is like buying the latest Porsche and then drive it with hand-brake. It is no wonder that [CI/CD](https://martinfowler.com/bliki/MicroservicePrerequisites.html) is listed as one of the three prerequisites to use Microservice Architecture by Microservice Expert *Martin Fowler*.

5.Observability: 
---------------
One of the main drawbacks of Microservice Architecture is that Software Development became simple at the expense of Operations. With one Monolith, it is much simpler to monitor the application. But having many microservices run on containers, observability of the whole system became very crucial and complicated. Even Logging became complicated to aggregate logs from many containers/machines into a central place. Fortunately, there are already many Enterprise grade solutions in the market. For example, ELK/Splunk offers Logging for Microservices. Prometheus/App Dynamics offers industry-grade monitoring. Another very crucial observability tool in the Microservice world is Tracing. Often one API request to a microservice leads to several cascaded calls to other microservices. To analyze the latency of a Microservice system, it is necessary to measure the latency of each individual Microservice. Zipkin/Jaeger offers excellent tracing support for Microservices.

6.Unified Tech Stack:
--------------------
Microservice Architecture tells us that for a Microservice, take the programming language and framework best suitable for that microservice. This statement should not be taken literally. Sometime, a microservice may need a new Tech Stack e.g. for CPU heavy/high-performance tasks, programming language like C++/Rust may be chosen. If a Microservice works with Machine learning, maybe Python is a better choice. But using different programming languages/frameworks without any solid reason can lead to too many programming languages and frameworks without any real benefit. Think about the scenario where one microservice is developed using Spring Boot + Kotlin+ React + MySQL, the other one is with JakartaEE + Java + Angular + PostgreSQL, the next one with Scala + Play Framework + VueJS + Oracle then it will need a lots of effort to maintain the different programming language, databases, frameworks without too much gain.

7.Asynchronous Communication: 
----------------------------

One of the most challenging design decisions in Microservice Architecture is how the services will communicate and share data among themselves. This is even more important when each Microservice has its own Data Storage. Typically, one Microservice can exist along but it cannot fulfill all the business goals alone. All the Microservices work together to fulfill the Business goal and to work together, they need to exchange data or trigger other Microservices to do a task. The easiest and most common way to communicate between Microservices is via Synchronous REST API which is pragmatic but a short term solution. If Service A calls Service B, Service B calls Service C, Service C calls service D Synchronously, then latencies added up. Also as Microservices are mostly distributed systems, they could fail. Often Synchronous Microservices lead to failure cascading i.e. Failure in one Service can lead to failure in other services. Synchronous Communication between Microservices also leads to tight coupling between Microservices. For a long term solution, Microservices should communicate Asynchronously. There are many ways for Asynchronous communication between Microservices: via Message Queue e.g. Kafka, via asynchronous REST (ATOM) or CQRS.

8.Microservice First: 
--------------------

Many experts argue that for greenfield (new) projects, it is better to start with a loosely coupled Monolithic Architecture as Microservice Architecture needs lots of initial effort to set up the operations. In their opinion, once the Project became mature enough, the “nicely” designed Monolith can easily be transformed into Microservices. However, in my opinion, this approach will fail in most cases. In practice, the modules inside Monolith will be tightly coupled which will make it difficult to transform it into Microservices. Also once an application is in production, it will be much more difficult to transform it into Microservices without breaking the application down. So, my advice will be to start with Microservices if there is a plan to use Microservice Architecture eventually.

9.Infrastructure over Libraries:
-------------------------------

During the early days of Microservice Software development, Netflix used mainly Java programming to develop Microservices. They also developed many libraries (Netflix OSS Stack including Hystrix, Zuul). Many companies follow through Netflix and started to use the librariesNetflix OSS. Later, many companies (including Netflix) found that Java is not the de facto language to develop Microservices due to its Bulky size and Cold-start problems. Netflix later moved on Polyglot Microservice paradigm and decided not to develop the Netflix OSS further which lead the follower companies into trouble. So, instead of investing heavily in a language-specific library (e.g. Java based Netflix OSS), it is wiser to use frameworks (e.g. Service Meshes, API gateway).

10.Organizational Considerations:
--------------------------------

Almost 50 years ago (1967), [Melvin Conway](https://en.wikipedia.org/wiki/Melvin_Conway) gave an observation that the Software Architecture of a company is limited by Organizational Structure (Conway’s Law). Although the observation is 50 years old, MIT and Harvard Business School have recently found that the law is still valid in modern days. If an organization plans to develop Microservice Architecture, then it should make the team size accordingly (two “American” Pizza team: 7±2 person). Also, the team should be cross-functional and ideally will have Frontend/Backend Developer, Ops Engineering and Tester. Microservice Architecture will only work if the higher Management also changes their viewpoint and vision accordingly.

If you found this helpful, please share it on your favorite forums (Twitter, Facebook, LinkedIn). Comments and constructive criticisms are highly appreciated. Thanks for reading!

If you are interested in Microservice Architecture, you can also read my following articles:
[Looking Beyond The Hype: Is Modular Monolithic Software Architecture Really Dead?
*A reality check of the Modular Monolithic Software Architecture in Modern software development*medium.com](https://medium.com/@md.kamaruzzaman/looking-beyond-the-hype-is-modular-monolithic-software-architecture-really-dead-e386191610f8)
[Microservice Architecture: A brief overview and why you should use it in your next project
*Background for Microservice Architecture and advantages of Microservice Architecture over Monolithic Architecture*towardsdatascience.com](https://towardsdatascience.com/microservice-architecture-a-brief-overview-and-why-you-should-use-it-in-your-next-project-a17b6e19adfd)
[5 Best Microservices book
*Essential books to design Microservice Architecture the right way*towardsdatascience.com](https://towardsdatascience.com/5-best-microservices-book-db981ef9c433)
