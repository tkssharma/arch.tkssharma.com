---
date: 2022-02-03
title: 'Understanding docker compose for building microservices'
shortTitle: 'Understanding docker compose for building microservices'
description: 'Understanding docker compose for building microservices'
template: post
featuredImage: '../thumbnails/docker.png'
thumbnail: '../thumbnails/docker.png'
slug: understanding-docker-compose-for-building-services
categories:
  - docker
  - microservice
  - aws
tags:
  - nodejs
  - docker 
  - microservice
---

## “What, Why, How” Docker Compose?

we’ve discussed how we can turn docker containers into development machines in my ealier posts. In this post, we’ll talk about how we will grip the strengths of docker containers to run a multi-container application. Let’s dive into the process.

# What is docker Compose? Why docker Compose?

Docker compose is a simple yet powerful tool that is used to run multiple containers as a single service.* For example*, suppose you have an application which requires Nginx as a web server and PostgreSQL as a database service. In this case by docker-compose, you can create one single file (docker-compose.yml ) which will create both the containers as a single service without starting each separately

Docker Compose is used to run multiple containers as a single service. For example, suppose you had an application which required NGNIX and MySQL, you could create one file which would start both the containers as a service without the need to start each one separately.


How Docker Compose Works?

1. use yaml files to configure application services (docker-compose.yaml)

2. can start all the services with a single command ( docker-compose up )

3. can stop all the service with a single command ( docker-compose down )

4. able to scale up the specific services when required.

5. works in all environments: production, staging, development, testing, as well as CI workflows

Step 1 || Install Docker Compose

Run below command from your Linux terminal to install docker-compose:

    $ pip install -U docker-compose

    # check version:
    $ docker-compose -v

    Note: docker-compose mostly comes along while installing docker in both Mac and windows.

Step 2 || Create Docker Compose file

Now, create a docker compose file at any location on your system named docker-compose.yml and add below content to that yaml file.

    services:
    
      web:
        image: nginx         # webserver for our web application
      database:
        image: postgres     # postgresql is used as database 

you can select more from [https://hub.docker.com/search?q=&type=image](https://hub.docker.com/search?q=&type=image)

Step 3 || Check the validity of file by command

check the validity of the yaml file by running:

    $ docker-compose config

    output: ERROR: The Compose file './docker-compose.yml' is invalid because:Unsupported config option for services: 'web'result:

To resolve the error you must add a version on top of the file matched with your docker-compose version. check all version compatibility here: [https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/)

so our updated file will look like:

    version: "3"
    services:
    
      web:
        image: nginx
      database:
        image: postgres

Step 4|| Run docker-compose.yml file

Now, run following command to run your docker-compose file:

    $ docker-compose up -d         # -d or --detach means detached mode 
> detached mode (-d, --detach) : Detached mode shown by -d or — detach means a docker container is running in the background of your terminal. It doesn’t receive input or display any output .

When the process will be done you will see something like this at the very end of your terminal:

    Creating dockercomposefile_web_1      ... done
    Creating dockercomposefile_database_1 ... done

Step 5 || Verify running containers

Now verify whether your containers are running or not by:

    $ docker ps           # or you can run docker-compose ps

you will see something like this:

![](https://cdn-images-1.medium.com/max/2482/1*tvhTUwfPo9mKaCktqqJ7rQ.png)

Hooa! your containers are successfully running!

Step 6 || expose nginx in a specific port

In our yaml file we’ve just used minimum code to run the service. Now if we want to add more, like we want to expose nginx in a specif port we can do it by adding below content to the yaml file:

    ports:
      - "6080:80"

    # It means expose the port 80(default port of nginx) of the web server and expose it to the 6080 port of host machine.

Now our file will look like:

    version: "3"
    services:
    
      web:
        image: nginx
        ports:
          - "6080:80"      
      database:
        image: postgres

Run docker ps again and see the changes!

![](https://cdn-images-1.medium.com/max/2524/1*LEjPlf0hzt0YU199KHLpmQ.png)

Now go to [http://localhost:6080/](http://localhost:6080/) of your host machine, you will see nginx is running!

Step 7|| Bring down the application

To stop the running containers run below command:

    $ docker-compose down      # all containers will be stopped 

    # verify whether the containers are stopped or not
    $ docker ps

Scaling up the service

Suppose you need to scale up your database and need four instances of the database instead of one. you can scale up the service running below command:

    $ docker-compose -d --scale database=4

    # Will start the container and create four instances of database service

Verify whether the instances have been created or not by:

    $ docker ps 

you can see we have one nginx server running and four database services are running:

![4 instances of the database have been created](https://cdn-images-1.medium.com/max/2622/1*7b8SRI0w92Af-nXXIpau7Q.png)*4 instances of the database have been created*

Now stop the containers running docker-compose down

Oh Great! By now, you are done with the basic of docker-compose .

example of docker-compose for nodejs and mysql application

entrypoint script to initialize container data at runtime

```sh
set -e

npm install
npm run build

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"
```

```yaml
  
version: "3"

services:
    node:
        build: .
        command: npm run debug
        ports:
            - 3000:3000
        volumes:
            - ./:/server
            - ./docker/node/node-docker-entrypoint.sh:/usr/local/bin/docker-entrypoint.sh
        depends_on:
            - mysql
    mysql:
        image: mysql:5.7
        ports:
            - 3306:3306
        volumes:
            - db-data:/var/lib/mysql
        environment:
            MYSQL_ROOT_PASSWORD: test
            MYSQL_DATABASE: test
            MYSQL_USER: test
            MYSQL_PASSWORD: test
volumes:
    db-data: {}
```    

## Lets explore one more example and look into every components 

A sample file could look like this:
```yaml
version: '3.3'

services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
volumes:
    db_data: {}
```

As you can see this file contains a whole Wordpress application including the MySQL database. Each of these services is treated as a separate container that can be swapped in and out when you need it.

Now that we know the basic structure of a Compose file let's continue by looking at the important concepts.

Concepts / Keywords
------------------
The core aspects of the Compose file are its concepts which allow it to manage and create a network of containers. In this section, we will explore these concepts in detail and take a look at how we can use them to customize our Compose configuration.

Services:
---------
The services tag contains all the containers which are included in the Compose file and acts as their parent tag.

```yaml
services:
  proxy:
    build: ./proxy
  app:
    build: ./app
  db:
    image: postgres
```    
Here you can see that the services tag contains all the containers of the Compose configuration.

Base image (Build):
-------------------
The base image of a container can be defined by either using a preexisting image that is available on DockerHub or by building images using a Dockerfile.

Here are some basic examples:
```yaml
version: '3.3'

services:
    alpine:
        image: alpine:latest
        stdin_open: true
        tty: true
        command: sh
```        
Here we use a predefined image from DockerHub using the image tag.
```yaml
version: '3.3'
services:
    app:
        container_name: website
        restart: always
        build: .
        ports:
            - '3000:3000'
    command:
        - 'npm run start'
```        
In this example, we define our images using the build tag which takes the destination of our Dockerfile as a parameter.

The last option of defining the base image is to use a Dockerfile with a custom name.
```yaml
build:
    context: ./dir
    dockerfile: Dockerfile.dev
Ports:
```
Exposing the ports in Compose works similarly as in the Dockerfile. We differentiate between two different methods of exposing the port:

Exposing the port to linked services:
```yaml
expose:
 - "3000"
 - "8000"
```
Here we publish the ports to the linked services of the container and not to the host system.

Exposing the port to the host system:

ports:
  - "8000:80"  # host:container
In this example, we define which port we want to expose and the host port it should be exposed to.

You can also define the port protocol which can either be UDP or TCP:
```yaml
ports:
  - "8000:80/udp"
```
Commands:
Commands are used to execute actions once the container is started and act as a replacement for the CMD action in your Dockerfile.

The CMD action is the first command that gets executed when the container is started and is therefore mostly used to start a process e.g. start your website through a CLI command like npm run start.
```yaml
app:
        container_name: website
        restart: always
        build: ./
        ports:
            - '3000:3000'
        command:
            - 'npm run start'
```            
Here we create a service for a website and add the starting command using the command tag. This command will be executed after the container has started and will then start the website.

For more information about CMD, RUN, and Entrypoint you can read this article which discusses the details and compares their functionality.

Volumes:
-------
Volumes are Docker's preferred way of persisting data which is generated and used by Docker containers. They are completely managed by Docker and can be used to share data between containers and the Host system.

They do not increase the size of the containers using it, and their context is independent of the lifecycle of the given container.

Docker Volumes
------------
Src: https://docs.docker.com/storage/volumes/
There are multiple types of volumes you can use in Docker. They can all be defined using the volumes keyword but have some minor differences which we will talk about now.

Normal Volume:

The normal way to use volumes is by just defining a specific path and let the Engine create a volume for it. This can be done like this:
```yaml
volumes:
# Just specify a path and let the Engine create a volume
  - /var/lib/mysql
```  
Path mapping:

You can also define absolute path mapping of your volumes by defining the path on the host system and mapping it to a container destination using the: operator.
```
volumes:
  - /opt/data:/var/lib/mysql
```  
Here you define the path of the host system followed by the path of the container.

Named volume:
------------
Another type of volume is the named volume which is similar do the other volumes but has it's own specific name that makes it easier to use on multiple containers. That's why it's often used to share data between multiple containers and services.

volumes:
  - datavolume:/var/lib/mysql
Dependencies:
Dependencies in Docker are used to make sure that a specific service is available before the dependent container starts. This is often used if you have a service that can't be used without another one e.g. a CMS (Content Management System) without its database.
```yaml
   ghost:
        container_name: ghost
        restart: always
        image: ghost
        ports:
            - 2368:2368
        environment:
            - .
        depends_on: [db]
    db:
        image: mysql
        command: --default-authentication-plugin=mysql_native_password
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: example
```            
Here we have a simple example of a Ghost CMS which depends on the MySQL database to work and therefore uses the depends_on command. The depends_on command takes an array of string which defines the container names the service depends on.

Environment variables:
---------------------
Environment variables are used to bring configuration data into your applications. This is often the case if you have some configurations that are dependent on the host operating system or some other variable things that can change.

There are many different options of passing environment variables in our Compose file which we will explore here:

You can set environment variables in a container using the "environment" keyword, just like with the normal docker container run --environment command in the shell.
```yaml
web:
  environment:
    - NODE_ENV=production
```    
In this example, we set an environment variable by providing a key and the value for that key.

Passing an environment variable:

You can pass environment variables from your shell straight to a container by just defining an environment key in your Compose file and not giving it a value.
```yaml
web:
  environment:
    - NODE_ENV
```    
Here the value of NODE_ENV is taken from the value from the same variable in the shell which runs the Compose file.

Using an .env file:

Sometimes a few environment variables aren't enough and managing them in the Compose file can get pretty messy. That is what .env files are for. They contain all the environment variables for your container and can be added using one line in your Compose file.
```yaml
web:
  env_file:
    - variables.env
```    

Networking
----------
Networks define the communication rules between containers, and between containers and the host system. They can be configured to provide complete isolation for containers, which enables building applications that work together securely.

By default Compose sets up a single network for each container. Each container is automatically joining the default network which makes them reachable by both other containers on the network, and discoverable by the hostname defined in the Compose file.

Specify custom networks:
Instead of only using the default network you can also specify your own networks within the top-level networks key, allowing to create more complex topologies and specifying network drivers and options.
```yaml
networks:
  frontend:
  backend:
    driver: custom-driver
    driver_opts:
      foo: "1"
```      
Each container can specify what networks to connect to with the service level "networks" keyword, which takes a list of names referencing entries of  the top-level "networks" keyword.
```yaml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres
    networks:
      - backend
```      
You can also provide a custom name to your network (since version 3.5):
```yaml
version: "3.5"
networks:
  webapp:
    name: website
    driver: website-driver
```    
For a full list of the network configuration options, see the following references:

Top-level network key
Service-level network key
External (Pre-existing) networks:
You can use pre-existing networks with Docker Compose using the external option.
```yaml
networks:
  default:
    external:
      name: pre-existing-network
```      
In this example, Docker never creates the default network and just uses the pre-existing network defined in the external tag.

Configure the default networks:
Instead of defining your own networks you could change the settings of the default network by defining an entry with the name default under the "networks" keyword.
```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres

networks:
  default:
    driver: custom-driver
```    

In this example, the web container can reach the database using one of the two hostnames (db or database).

CLI
All the functionality of Docker-Compose is executed through its build in CLI, which has a very similar set of commands to what is offered by Docker.

- build    Build or rebuild services 
- help     Get help on a command 
- kill     Kill containers 
- logs     View output from containers 
- port     Print the public port for a port binding 
- ps       List containers 
- pull     Pulls service images 
- rm       Remove stopped containers 
- run      Run a one-off command 
- scale    Set number of containers for a service 
- start    Start services 
- stop     Stop services 
- restart  Restart services 
- up       Create and start containers
- down     Stops and removes containers


They are not only similar but also behave like their Docker counterparts. The only difference is that they affect the entire multi-container architecture which is defined in the docker-compose.yml file instead of a single container.

Some Docker commands are not available anymore and have been replaced with other commands that make more sense in the context of a completely multi-container setup.

The most important new commands include the following:
```bash
docker-compose up
docker-compose down
```
Using Multiple Docker Compose Files
The use of multiple Docker Compose files allows you to change your application for different environments (e.g. staging, dev, and production) and helps you run admin tasks or tests against your application.

Docker Compose reads two files by default, a docker-compose.yml file, and an optional docker-compose.override.yml file. The docker-compose.override file can be used to store overrides of the existing services or define new services.

To use multiple override files, or an override file with a different name, you can pass the -f option to the docker-compose up command. The base Compose file has to be passed on the first position of the command.
```bash
docker-compose up -f override.yml override2.yml
```
When you use multiple configuration files, you need to make sure that the paths are relative to the base Compose file which is specified first with the -f flag.

Now let's look at an example of what can be done using this technique.
```bash
# original service
npm run dev

# new service
npm run start
```
Here you override the old run command with the new one which starts your website in production instead of dev mode.

When you use multiple values on options like ports, expose, DNS and tmpfs, Docker Compose concatenates the values instead of overriding them which is shown in the following example.

```yaml
# original service
expose:
    - 3000
    
# new service
expose:
    - 8080
```    
Compose in production
Docker Compose allows for easy deployment because you can deploy your whole configuration on a single server. If you want to scale your app, you can run it on a Swarm cluster.

There are still things you probably need to change before deploying your app configuration to production. These changes include:

Binding different ports to the host
Specifying a restart policy like restart: always to avoid downtime of your container
Adding extra services such as a logger
Removing any unneeded volume bindings for application code
After you have taken these steps you can deploy your changes using the following commands:
```bash
docker-compose build
docker-compose up --no-deps -d
```
This first rebuilds the images of the services defined in the compose file and then recreates the services.

Example
Now that we have gone through the theory of Compose let's see some of the magic we just talked about in action. For that, we are going to build a simple Node.js application with a Vue.js frontend which we will deploy using the tools we learned about earlier.

Let's get started by cloning the repository with the finished Todo list application so we can directly jump into the Docker part.

Lets explote this docker compose file 

```yaml
services:
    nodejs:
        build:
            context: ./backend/
            dockerfile: Dockerfile
        container_name: nodejs
        restart: always
        environment:
            - HOST=mongo
        ports:
            - '3000:3000'
        depends_on: [mongo]
    mongo:
        container_name: mongo
        image: mongo
        ports:
            - '27017:27017'
        # volumes:
        #     - ./data:/data/db
    frontend:
        build:
            context: ./frontend/
            dockerfile: Dockerfile
        container_name: frontend
        restart: always
        ports:
            - '8080:8080'
```

This should give you a project with the following folder structure:

Folderstructure
Node-Vue Todo list folderstructure
Now that we have the project setup lets continue by writing our first Dockerfile for the Node.js backend.
```dockerfile
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000:3000
CMD [ "node", "server.js" ]
```
All right, let's understand what's going on here by walking through the code:

First, we define the base image using the FROM keyword
Then we set the directory we are going to work in and copy our local package.json file into the container
After that, we install the needed dependencies from the package.json file and expose the port 3000 to the host machine
The CMD keyword lets you define the command which will be executed after the container startup. In this case, we use it to start our express server using the node server.js command.
Now that we have finished the Dockerfile of the backend lets complete the same process for the frontend.
```dockerfile
FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
```
This file is similar to the last one but installs an HTTP server which displays the static site we get when building a Vue.js application. I will not go into further detail about this script because it isn't in the scope of this tutorial.

With the Dockerfiles in place, we can go ahead and write the docker-compose.yml file we learned so much about.

First, we define the version of our Compose file (in this case version 3)
```yaml
version: '3'
After that, we start defining the services we need for the project to work.

services:
    nodejs:
        build:
            context: ./backend/
            dockerfile: Dockerfile
        container_name: nodejs
        restart: always
        environment:
            - HOST=mongo
        ports:
            - '3000:3000'
        depends_on: [mongo]
```    
The nodejs service uses the Dockerfile of the backend which we created above and publishes the port 3000 to the host machine. The service also depends on the mongo service which means that it lets the database start first before starting itself.

Next, we define a basic MongoDB service which uses the default image provided on DockerHub.
```yaml
     mongo:
        container_name: mongo
        image: mongo
        ports:
            - '27017:27017'
        volumes:
            - ./data:/data/db
``` 
This service also publishes a port to the host system and saves the data of the database in a local folder using a volume.

The last service we need to define is the frontend which uses the frontend Dockerfile to build the image and publishes port 8080 to the host system.
```yaml
    frontend:
        build:
            context: ./frontend/
            dockerfile: Dockerfile
        container_name: frontend
        restart: always
        ports:
            - '8080:8080'
```            
That is it! We have finished our Docker files and can now move on to running the application. This is done using the following two commands:
```bash
# builds the images from the dockerfiles
docker-compose build

# starts the services defined in the docker-compose.yml file
# -d stands for detached
docker-compose up -d
```
As indicated by the terminal output, your services are now running and you are ready to visit the finished website on localhost:8080 which should look something like this:

docker-compose logs

This command will display all logs of the running containers and can help you debug your errors or check the current state of your application.

That is it for the project. The source code for the whole project can be found on my Github.

Conclusion
You made it all the way until the end! I hope that this article helped you understand the Docker Compose and how you can use it to improve your development and deployment workflow as a developer.

If you have found this useful, please consider recommending and sharing it with other fellow developers. If you have any questions or feedback, let me know in the comments down below.