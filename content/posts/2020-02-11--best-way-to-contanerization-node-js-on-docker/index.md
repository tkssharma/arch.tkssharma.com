---
title: node.js containerization best practices
subTitle: node.js containerization best practices
category: "devOps"
cover: banner.jpeg
---

## Node.js containerization best practices

### Few thinhs to take care while developing Node JS Application

There are many ways we can optimize our docker container running Node JS
I hope you are already aware about what is docker and how it works with NodeJS containerization
When we run docker for development it allows you to package an application with its environment and all of its dependencies into a "box", called a container. Usually, a container consists of an application running in a stripped-to-basics version of a Linux operating system. An image is the blueprint for a container, a container is a running instance of an image.

We follow basic setups to create node js application and run it on container 

## Create the Node.js app

First, create a new directory where all the files would live. In this directory create a `package.json` file that describes your app and its dependencies:

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

With your new `package.json` file, run `npm install`. If you are using `npm` version 5 or later, this will generate a `package-lock.json` file which will be copied to your Docker image.

Then, create a `server.js` file that defines a web app using the [Express.js](https://expressjs.com/) framework:

```javascript
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

In the next steps, we'll look at how you can run this app inside a Docker container using the official Docker image. First, you'll need to build a Docker image of your app.

## Creating a Dockerfile

Create an empty file called `Dockerfile`:

```markup
touch Dockerfile
```

Open the `Dockerfile` in your favorite text editor

The first thing we need to do is define from what image we want to build from. Here we will use the latest LTS (long term support) version `10` of `node` available from the [Docker Hub](https://hub.docker.com/):

```docker
FROM node:10
```

Next we create a directory to hold the application code inside the image, this will be the working directory for your application:

```docker
# Create app directory
WORKDIR /usr/src/app
```

This image comes with Node.js and NPM already installed so the next thing we need to do is to install your app dependencies using the `npm` binary. Please note that if you are using `npm` version 4 or earlier a `package-lock.json` file will *not* be generated.

```docker
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
```

Note that, rather than copying the entire working directory, we are only copying the `package.json` file. This allows us to take advantage of cached Docker layers. bitJudo has a good explanation of this [here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/). Furthermore, the `npm ci` command, specified in the comments, helps provide faster, reliable, reproducible builds for production environments. You can read more about this [here](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable).

To bundle your app's source code inside the Docker image, use the `COPY` instruction:

```docker
# Bundle app source
COPY . .
```

Your app binds to port `8080` so you'll use the `EXPOSE` instruction to have it mapped by the `docker` daemon:

```docker
EXPOSE 8080
```

Last but not least, define the command to run your app using `CMD` which defines your runtime. Here we will use `node server.js` to start your server:

```docker
CMD [ "node", "server.js" ]
```

Your `Dockerfile` should now look like this:

```docker
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

## .dockerignore file

Create a `.dockerignore` file in the same directory as your `Dockerfile` with following content:

```
node_modules
npm-debug.log
```

This will prevent your local modules and debug logs from being copied onto your Docker image and possibly overwriting modules installed within your image.

## Building your image

Go to the directory that has your `Dockerfile` and run the following command to build the Docker image. The `-t` flag lets you tag your image so it's easier to find later using the `docker images` command:

```bash
docker build -t <your username>/node-web-app .
```

Your image will now be listed by Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            10         1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

## Run the image

Running your image with `-d` runs the container in detached mode, leaving the container running in the background. The `-p` flag redirects a public port to a private port inside the container. Run the image you previously built:

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

These are simple step to run simeple node js image on docker containers, but is this enough for a Enterprise application being deployed on K8S environments,
Here we will look for how to make our node js application Rockstar on containers

## Stick With Your Current Base Distro (Light image)

 If you’re migrating Node.js apps into containers, use the base image of the host OS you have in production today. After that, my favorite base image is the official node:slim editions rather than node:alpine, which is still good but usually more work to implement and comes with limitations.

- slim and alpine are quite smaller than the default image
There are multiple factors that weigh into this, but don’t make “image size” a top priority unless you’re dealing with IoT or embedded devices where every MB counts.

## Dealing With Node Modules

You don’t have to relocate node_modules in your containers as long as you follow a few rules for proper local development. A second option is to move mode_modules up a directory in your Dockerfile, configure your container properly, and it’ll provide the most flexible option, but may not work with every npm framework.

We’re all now used to a world where we don’t write all the code we run in an app, and that means dealing with app framework dependencies. One common question is how to deal with those code dependencies in containers when they are a subdirectory of our app. Local bind-mounts for development can affect your app differently if those dependencies were designed to run on your host OS and not the container OS.

The core of this issue for Node.js is that node_modules can contain binaries compiled for your host OS, and if it’s different then the container OS, you’ll get errors trying to run your app when you’re bind-mounting it from the host for development. Note that if you’re a pure Linux developer and you develop on Linux x64 for Linux x64, this bind-mount issue isn’t usually a concern.

This is my preferred method when doing pure-Docker development. It works great with a few rules you must follow for local development:

- Develop only through the container. Why? Basically, you don’t want to mix up the node_modules on your host with the node_modules in the container. On macOS and Windows, Docker Desktop bind-mounts your code across the OS barrier, and this can cause problems with binaries you’ve installed with npm for the host OS, that can’t be run in the container OS.
- Run all your npm commands through docker-compose. This means your initial npm install for your project should now be docker-compose run <service name> npm install.

## Use The Node User, Go Least Privilege
All the official Node.js images have a Linux user added in the upstream image called node. This user is not used by default, which means your Node.js app will run as root in the container by default. This isn’t the worst thing, as it’s still isolated to that container, but you should enable in all your projects where you don’t need Node to run as root. Just add a new line in your Dockerfile: USER node

Here are some rules for using it:
- Location in the Dockerfile matters. Add USER after apt/yum/apk commands, and usually before npm install commands.
- It doesn’t affect all commands, like COPY, which has its own syntax for controlling owner of files you copy in.
- You can always switch back to USER root if you need to. In more complex Dockerfiles this will be necessary, like my multi-stage example that includes running tests and security scans during optional stages.
- Permissions may get tricky during development because now you’ll be doing things in the container as a non-root user by default. The way to often get around this is to do things like npm install by telling Docker you want to run those one-off commands as root: docker-compose run -u root npm install

## Don’t Use Process Managers In Production
TL;DR: Except for local development, don’t wrap your node startup commands with anything. Don’t use npm, nodemon, etc. Have your Dockerfile CMD be something like  [“node”, “file-to-start.js”] and you’ll have an easier time managing and replacing your containers.

Nodemon and other “file watchers” are necessary in development, but one big win for adopting Docker in your Node.js apps is that Docker takes over the job of what we used to use pm2, nodemon, forever, and systemd for on servers.


