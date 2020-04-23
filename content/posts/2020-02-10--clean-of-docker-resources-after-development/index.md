---
title: Cleaning up docker resources after Development
subTitle: Cleaning up docker resources after Development
category: "devOps"
cover: banner.jpeg
---
## Cleaning up docker resources after Development

Have you been running and re-running docker-compose lately? If you’re using Docker for development purposes, you’re running lots of containers, building new images and probably have a chunk of space on your disk which is occupied by stuff you don’t need.

Just chucking along, and not doing anything about it, will soon see your root directory fill up 99% of your available space. Weird things tend to happen when you max out your capacity - here’s what you need to do to clean up after Docker.

Use these with caution! If you have any valuable data dangling around in Docker containers:

*   Mount local directories for important data.
*   Back up your volumes.
*   Shame on you.

The stuff which is taking up most space, are old images (previous builds), stopped containers and their volumes.

## Docker Compose

If you just want to clean up the data of a particular docker-compose stack, run

    $ docker-compose down -v --rmi all --remove-orphans

This will take care of taking down the volumes, images and dangling stuff. Anyway, you might wannt to look into the following as well.

## Getting a List of Offenders

_docker ps -a -q_ is your friend. It lists all container identifiers, and only them in a nice list. The same goes for _docker images -q_ - all image identifiers just for you. Regarding volumes, _docker volume ls -q_ is your friend.

Fall most commands, you can pass on a list of ids to perform the operation on. This happens with the bash notation _$(command)_, which executes a command and insers its output into the place it occupies.

## Cleaning Up

The following commands will take care of your mess. Once again, make sure you’re not removing stuff you might miss later on. Take heed. The last command for example, will remove volumes related to docker-compose stacks if the containers are down. That’s usually NOT what you want to do.

The _-f_ arguments help to reduce the number of warnings you get (upon trying to remove a running container for example) and make the intentions clearer. If you want to just remove all images for example, just leave out the -f argument when getting a list of images.

    $ docker rm -v $(docker ps -aq -f 'status=exited')
    $ docker rmi $(docker images -aq -f 'dangling=true')

    # ATTENTION: this will also remove volumes of docker-compose if the containers are barely stopped
    $ docker volume rm $(docker volume ls -q -f 'dangling=true')

## Since Version 1.25

A new change came along, which hugely simplifies the above operations, and reduces them to one [single command](https://docs.docker.com/engine/reference/commandline/system_prune/).

    $ docker system prune

This will remove all unused containers, volumes, networks and images (both dangling and unreferenced).

If you’d like more control than the above, you can limit the pruning down to a single part, like the images, by issuing something like:

    $ docker image prune
    $ docker volume prune
    $ docker network prune

# A Docker Cheat Sheet

### Introduction

How to Use This Guide:

*   This guide is in cheat sheet format with self-contained command-line snippets
*   Jump to any section that is relevant to the task you are trying to complete.

The command substitution syntax, `<span class="highlight">command</span> $(<span class="highlight">command</span>)`, used in the commands is available in many popular shells such as bash, zsh, and Windows Powershell.


## Purging All Unused or Dangling Images, Containers, Volumes, and Networks

Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

    docker system prune

To additionally remove any stopped containers and all unused images (not just dangling images), add the `-a` flag to the command:

    docker system prune -a


## Removing Docker Images

### Remove one or more specific images

Use the `docker images` command with the `-a` flag to locate the ID of the images you want to remove. This will show you every image, including intermediate image layers. When you’ve located the images you want to delete, you can pass their ID or tag to `docker rmi`:

List:

    docker images -a

Remove:

    docker rmi ImageId

### Remove dangling images

Docker images consist of multiple layers. Dangling images are layers that have no relationship to any tagged images. They no longer serve a purpose and consume disk space. They can be located by adding the filter flag, `-f` with a value of `dangling=true` to the `docker images` command. When you’re sure you want to delete them, you can use the `docker images purge` command:

<span class="note">Note: If you build an image without tagging it, the image will appear on the list of dangling images because it has no association with a tagged image. You can avoid this situation by [providing a tag](https://docs.docker.com/engine/reference/commandline/build/#/tag-image--t) when you build, and you can retroactively tag an images with the [docker tag](https://docs.docker.com/engine/reference/commandline/tag/) command.  
</span>

List:

    docker images -f dangling=true

Remove:

    docker images purge

### Removing images according to a pattern

You can find all the images that match a pattern using a combination of `docker images` and [`grep`](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux). Once you’re satisfied, you can delete them by using `awk` to pass the IDs to `docker rmi`. Note that these utilities are not supplied by Docker and are not necessarily available on all systems:

List:

    docker images -a |  grep "pattern"

Remove:

    docker images -a | grep "pattern" | awk '{print $3}' | xargs docker rmi

### Remove all images

All the Docker images on a system can be listed by adding `-a` to the `docker images` command. Once you’re sure you want to delete them all, you can add the `-q` flag to pass the Image ID to `docker rmi`:

List:

    docker images -a

Remove:

    docker rmi $(docker images -a -q)

<a name="removing-containers" data-unique="removing-containers"></a><a name="removing-containers" data-unique="removing-containers"></a>

## Removing Containers

### Remove one or more specific containers

Use the `docker ps` command with the `-a` flag to locate the name or ID of the containers you want to remove:

List:

    docker ps -a

Remove:

    docker rm ID_or_Name ID_or_Name

### Remove a container upon exit

If you know when you’re creating a container that you won’t want to keep it around once you’re done, you can run `docker run --rm` to automatically delete it when it exits.

Run and Remove:

    docker run --rm image_name

### Remove all exited containers

You can locate containers using `docker ps -a` and filter them by their status: created, restarting, running, paused, or exited. To review the list of exited containers, use the `-f` flag to filter based on status. When you’ve verified you want to remove those containers, using `-q` to pass the IDs to the `docker rm` command.

List:

    docker ps -a -f status=exited

Remove:

    docker rm $(docker ps -a -f status=exited -q)

### Remove containers using more than one filter

Docker filters can be combined by repeating the filter flag with an additional value. This results in a list of containers that meet either condition. For example, if you want to delete all containers marked as either Created (a state which can result when you run a container with an invalid command) or Exited, you can use two filters:

List:

    docker ps -a -f status=exited -f status=created

Remove:

    docker rm $(docker ps -a -f status=exited -f status=created -q)

### Remove containers according to a pattern

You can find all the containers that match a pattern using a combination of `docker ps` and [grep](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux). When you’re satisfied that you have the list you want to delete, you can use `awk` and `xargs` to supply the ID to `docker rmi`. Note that these utilities are not supplied by Docker and not necessarily available on all systems:

List:

    docker ps -a |  grep "pattern”

Remove:

    docker ps -a | grep "pattern" | awk '{print $3}' | xargs docker rmi

### Stop and remove all containers

You can review the containers on your system with `docker ps`. Adding the `-a` flag will show all containers. When you’re sure you want to delete them, you can add the `-q` flag to supply the IDs to the `docker stop` and `docker rm` commands:

List:

    docker ps -a

Remove:

    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)

<a name="removing-volumes" data-unique="removing-volumes"></a><a name="removing-volumes" data-unique="removing-volumes"></a>

## Removing Volumes

### Remove one or more specific volumes - Docker 1.9 and later

Use the `docker volume ls` command to locate the volume name or names you wish to delete. Then you can remove one or more volumes with the `docker volume rm` command:

List:

    docker volume ls

Remove:

    docker volume rm volume_name volume_name

### Remove dangling volumes - Docker 1.9 and later

Since the point of volumes is to exist independent from containers, when a container is removed, a volume is not automatically removed at the same time. When a volume exists and is no longer connected to any containers, it’s called a dangling volume. To locate them to confirm you want to remove them, you can use the `docker volume ls` command with a filter to limit the results to dangling volumes. When you’re satisfied with the list, you can remove them all with `docker volume prune`:

List:

    docker volume ls -f dangling=true

Remove:

    docker volume prune

### Remove a container and its volume

If you created an unnamed volume, it can be deleted at the same time as the container with the `-v` flag. Note that this only works with _unnamed_ volumes. When the container is successfully removed, its ID is displayed. Note that no reference is made to the removal of the volume. If it is unnamed, it is silently removed from the system. If it is named, it silently stays present.

Remove:

    docker rm -v container_name
