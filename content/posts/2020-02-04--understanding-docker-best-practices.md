---
date: 2022-02-04
title: 'Best Practices for working with Dockerfile'
shortTitle: 'Best Practices for working with Dockerfile'
description: 'Best Practices for working with Dockerfile'
template: post
featuredImage: '../thumbnails/docker.png'
thumbnail: '../thumbnails/docker.png'
slug: best-practices-of-using-dockerfile
categories:
  - docker
  - microservice
  - aws
tags:
  - docker
  - k8s 
  - microservice
---

# Best Practices for working with Dockerfile

This guide assumes you are familiar with Docker and its build environment. Let's review some of the basic concepts before you start to put them into practice.

### What is a Docker image?
A Docker image is a template that allows you to instantiate running containers. It is represented as a list of instructions (known as layers) in a filesystem.

### What is a Dockerfile?
A Dockerfile is just a blueprint that contains the instructions to build a Docker image. Currently, more than a million Dockerfiles are on GitHub.

### What does "Docker build" mean?
The process of building a Docker image from a Dockerfile is known as a Docker build.

Find detailed information in the Dockerfile reference.

### What is a Docker layer?
Each layer in a Docker context represents an instruction included in a Docker image's Dockerfile. The layers can also be referred to as "build steps".

### What is the Docker build cache?
Every time you build a Docker image, each build step is cached. Reuse cached layers that do not change in the image rebuild process to improve the build time.

### Concerns when building images
These are the main areas of improvement I will cover in this guide:

- Consistency: If you are consistent designing your images, they are easier to maintain and you will reduce the time spent when developing new images.
Build Time: Especially when your builds are integrated in a Continuous Integration pipeline (CI), reducing the build time can significantly reduce your apps' development cost.
Image Size: Reduce the size of your images to improve the security, performance, efficiency, and maintainability of your containers.
Security: Critical for production environments, securing your containers is very important to protect your applications from external threats and attacks.

Image Source and Credits: http://pierre-jean.baraud.fr/blog/2014/05/14/fist-look-dockerfile/

Dockerfiles allow users to define the exact actions needed to create a new container image. This allows users to write the execution environment as if it were code, storing it in version control if desirable.

The same Docker file built in the same environment will always produce an identical container image. Dockerfiles helps in automating the building of container images and establishes a repeatable process.

Some of the benefits Dockerfiles provide are:

* Easy versioning: Dockerfiles can be committed and maintained via version control to track changes and revert any mistakes.

* Predicbility: Building images from a Dockerfile helps remove human error from the image creation process.

* Accountability: If you plan on sharing your images, it is often a good idea to provide the Dockerfile that created the image as a way for other users to audit the process.

* Flexibility: Creating images from a Dockerfile allows you to override the defaults that interactive builds are given. This means that you do not have to provide as many runtime options to get the image to function as intended.
* Docker images have intermediate layers that increase reusability, decrease disk usage, and speed up docker build by allowing each step to be cached.

![Image Source and Credits: [http://blog.bigstep.com/developers-love-docker/](http://blog.bigstep.com/developers-love-docker/)](https://cdn-images-1.medium.com/max/2000/1*rCBBYVVJBlnNdo2f3OVyWw.png)*Image Source and Credits: [http://blog.bigstep.com/developers-love-docker/](http://blog.bigstep.com/developers-love-docker/)*

## Best Practices for writing Dockerfiles:

### Use a .dockerignore file

The best way is to put the Dockerfile inside the empty directory and then add only the application and configuration files required for building the docker image. To increase the build’s performance, you can exclude files and directories by adding a .dockerignore file to that directory as well.

### Containers should be immutable & ephemeral

The container created with the image produced by Dockerfile should be ephemeral and immutable. In other words, the container should be destroyed and a new one built and put in place with an absolute minimum set-up and configuration.

### Minimize the number of layers / Consolidate instructions

Each instruction in the Dockerfile adds an extra layer to the docker image. The number of instructions and layers should be kept to a minimum as this ultimately affects build performance and time.

### Avoid installing unnecessary packages

In order to reduce complexity, dependencies, file sizes, and build times, avoid installing unnecessary packages.

### Sort multi-line arguments

Sorting multiline arguments alphanumerically will help avoid duplication of packages and make the list much easier to update.

    RUN  yum update -y && \
         yum install -y apache2 \
                        git \
                        java \
                        python

### Build cache

While building an image, Docker will step through the instructions mentioned in the Dockerfile, executing them in chronological order. As each instruction is examined Docker will look for an existing image layer in its cache that it can reuse, rather than creating a new image layer.
- If you do not want to use the cache at all, then use the--no-cache=true option with the docker build command.

However, when Docker is not allowed to use its cache, then the basic rules Docker will follow to find a matching image are mentioned below:

* Starting with a base image that is already in the cache, the next instruction is compared against all child images derived from that base image to see if one of them was built using the exact same instruction. If not, the cache is invalidated.

* For the ADD and COPY instructions, the contents of the file(s) in the image are examined and a checksum is calculated for each file. During the cache lookup, the checksum is compared against the checksum in the existing images. If anything has changed in the file(s), such as the contents and metadata, then the cache is invalidated.

* Aside from the ADD and COPY commands, cache checking will not look at the files in the container to determine a cache match. For example, when processing a RUN apt-get -y update command the files updated in the container will not be examined to determine if a cache hit exists. In that case just the command string itself will be used to find a match.

Once the cache is invalidated, all subsequent Dockerfile commands will generate new images and the cache will not be used.

### Build every time

Building docker images is very fast as docker makes use of previously cached build steps (default). By building the image every time, one can use containers as reliable artifacts. For example, one can go back and run a container from previous docker image to inspect a problem, or can run long tests on the previous version image while editing the code.

### Dockerfile for Development Environment

For a development environment, map your source code on the host to a container using a volume. This enables to choose the editor of your choice on the host and test the application right away in the container. This is done by mounting the application build folder as a volume rather than copying the build artifact using the ADD command in the Dockerfile.

### Understand CMD and ENTRYPOINT

CMD simply sets a command to run in the image if no arguments are passed to docker run, while ENTRYPOINT is meant to make your image behave like a binary.

* If the Dockerfile uses only CMD, the specified command is executed if no arguments are passed to docker run.

* If the Dockerfile uses only ENTRYPOINT, the arguments passed to docker run are always passed to the entrypoint; the entrypoint is executed if no arguments are passed to docker run.

* If the Dockerfile declares both ENTRYPOINT and CMD and no arguments are passed to docker run, then the argument(s) to CMD are passed to the declared entrypoint.

Source: ~ Docker Docs

Disclaimer: Content and Image source has been mentioned
