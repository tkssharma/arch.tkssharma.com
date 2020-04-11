---
title: Load balancing on Node JS containers using nginx Reverse Proxy 
subTitle: Load balance in Node JS Containers
category: "devOps"
cover: banner.jpeg
---
## Load balancing on Node JS containers using nginx Reverse Proxy 

We will using Docker and containers as Node JS instance so lets get some information
on how it works

Docker and Containers
---------------------

Docker is a software container platform. Developers use Docker to eliminate “works on my machine” problem when collaborating with co-workers. This is done by putting pieces of a software architecture on containers (a.k.a. dockerize or containerize).

Using containers, everything required to make a piece of software run is packaged into isolated containers. Unlike Virtual Machines (VMs), containers do not bundle a full operating system—only libraries and settings required to make the software work are needed. This makes them efficient, lightweight, self-contained and guarantees that software will always run on the same configuration, regardless of where it’s deployed.

To learn more about Docker, take a look at this webinar.

Installing Docker
-----------------
Everything that we will need to test this architecture is Docker. As the instances of our Node.js application and NGINX will run inside Docker containers, we won't need to install them on our development machine. To install Docker, simply follow the instructions on their website.

Creating the Node.js Application
--------------------------------

![](banner.png)

To show NGINX load balancing in action, we are going to create a simple Node.js application that serves a static HTML file. After that, we are going to containerize this application and run it twice. Lastly, we will configure a dockerized NGINX instance to dispatch requests to both instances of our application.

In the end, we will be able to reach http://localhost:8080 on our local machine to "randomly" get results from one or another instance. In fact, the result won't be randomly decided, we will configure NGINX to use round-robin algorithm to decide which instance will respond on each request.

But let's tackle one step at a time. To create this application we will first create a directory for the application, and then create an index.js file that will respond to HTTP requests.

To create the directory, let's issue the following command: mkdir application. After that, let's create the index.js file in this directory and paste the following source code:
```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<h1>${process.env.MESSAGE}</h1>`);
}).listen(8080);
```

Everything that this Node.js script does is to answer HTTP requests to http://localhost:8080 with and HTML tag that contains a message defined in the MESSAGE environment variable. To better understand how this works, we can run the following commands:
```bash
export MESSAGE=Howdy!
node index
```
And then open http://localhost:8080 on a web browser. See? We got simple web page with the Howdy! message. Before proceeding, let's stop our application by hitting Ctrl + C.

Dockerizing the Node.js Applications
To dockerize our Node.js application, we will need to create a file called Dockerfile in the application directory. The content of this file will be:
```dockerfile
FROM node
RUN mkdir -p /usr/src/app
COPY index.js /usr/src/app
EXPOSE 8080
CMD [ "node", "/usr/src/app/index" ]
```
Note: If you don't understand how a Dockerfile works, check out this reference.

After that we need to create an image, from this Dockerfile, which can be done through the following command:
Lets build the image from docker file and give it a name "load-balanced-app"
It will 
```bash
docker build -t load-balanced-app .
```
And then we can run both instances of our application with the following commands:
From one dockerfile we are creating two different containers on two different host ports like
8081 and 8082 which are connected to same containers port 8080 

Docker run command is used to create container from its image and image we have already built using docker build command

```bash
docker run -e "MESSAGE=First instance" -p 8081:8080 -d load-balanced-app
docker run -e "MESSAGE=Second instance" -p 8082:8080 -d load-balanced-app
docker run -e "MESSAGE=First instance" -p 8083:8080 -d load-balanced-app

```

After running both commands, we will be able to open both instances on a web browser by going to http://localhost:8081 and http://localhost:8082. The first URL will show a message saying "First instance", the second URL will show a message saying "Second instance".

## Load Balancing with a Dockerized NGINX Instance
Now that we have both instances of our application running on different Docker containers and responding on different ports on our host machine, let's configure an instance of NGINX to load balance requests between them. First we will start by creating a new directory.

![](https://miro.medium.com/max/1162/1*diDDMGTnbnfVn1uqnqWf4w.png)

In this directory, we will create a file called ``nginx.conf`` with the following code:
```javascript
mkdir nginx-docker
upstream my-app {
    server 172.17.0.1:8081 weight=1;
    server 172.17.0.1:8082 weight=1;
    server 172.17.0.1:8083 weight=1;
}

server {
    location / {
        proxy_pass http://my-app;
    }
}
```

This file will be used to configure NGINX. On it we define an ``upstream group of servers`` containing both URLs that respond for the instances of our application. By not defining any particular algorithm to load balance requests, we are using round-robin, which is the default on NGINX. There are several other options to load balance requests with NGINX, for example the least number of active connections, or the least average response time.

After that, we define a server property that configures NGINX to pass HTTP requests to http://my-app, which is handled by the upstream defined before. Also, note that we hardcoded 172.17.0.1 as the gateway IP, this is the default gateway when using Docker. If needed, you can change it to meet your local configuration.

Now we will create the Dockerfile that will be used to dockerize NGINX with this configuration. This file will contain the following code:
```dockerfile
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Having created both files, we can now build and run NGINX containerized on Docker. We achieve that by running the following commands:

```bash
docker build -t load-balance-nginx .
docker run -p 8080:80 -d load-balance-nginx
```

After issuing these commands, let's open a web browser and access http://localhost:8080. If everything went well, we will see a web page with one of the two messages: First instance or Second instance. If we hit reload on our web browser a few times, we will realized that from time to time the message displayed switches between First instance and Second instance. This is the round-robin load balancing algorithm in action.