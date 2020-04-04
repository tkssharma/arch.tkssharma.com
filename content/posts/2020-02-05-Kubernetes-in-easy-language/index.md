---
title: Understand Kubernetes in easy language
subTitle: Understand Kubernetes in easy language
category: "K8S"
cover: banner.png
---

Kubernetes is Google's open source system for managing Linux containers across private, public and hybrid cloud environments.

Kubernetes automates the ``deployment, scaling, maintenance, scheduling and operation of multiple application containers across clusters of nodes``. Kubernetes contains tools for orchestration, service discovery and load balancing that can be used with Docker and Rocket containers. As needs change, a developer can move container workloads in Kubernetes to another cloud provider without changing the code.

With Kubernetes, containers run in pods. A pod is a basic unit that hosts one or multiple containers, which share resources and are located on the same physical or virtual machine. For each pod, Kubernetes finds a machine with enough compute capacity and launches the associated containers. A node agent, called a Kubelet, manages pods, their containers and their images. Kubelets also automatically restart a container if it fails.

- Master: Runs the Kuberenetes API and controls the cluster.
- Label: A key/value pair used for service discovery. A label tags the containers and links them together into groups.
- Replication Controller: Ensures that the requested numbers of pods are running to user's specifications. This is what scales containers horizontally, ensuring there are more or fewer containers to meet the overall application's computing needs.
- Service: An automatically configured load balancer and integrator that runs across the cluster.
- Containerization is an approach to virtualization in which the virtualization layer runs as an application on top of a common, shared operating system (OS). As an alternative, containers can also run on an OS that's installed into a conventional virtual machine (VM) running on a hypervisor.
  

- Containers are portable across different on-premises and cloud platforms, making them suitable for applications that need to run across various computing environments.

- Kubernetes is mainly used by application developers and IT system administrators. A comparable tool to Kubernetes is Docker Swarm, which offers native clustering capabilities.

We leverage a broad spectrum of operating systems for our application workloads. This is a testament to the inclusive and open nature of the Kubernetes ecosystem.

The star of “The Illustrated Children’s Guide to Kubernetes“, Phippy and her friends explain the core concepts of Kubernetes in simple terms.

K8S has very easy explaination using childrens guide 
----------------------------------------------------

Once upon a time there was a PHP application called Phippy. Phippy lived on a hosting provider, along with a lot of other apps, scary apps that she didn’t care to be associated with. Horrors! Whatever shall poor Phippy do? She longed for her own safe place, a home for just her and a web server to do her bidding.

Thus begins the first, and probably the only, children’s book about the Kubernetes container orchestration manager. “The Children’s Illustrated Guide to Kubernetes” was written by Deis platform architect Matt Butcher, who describes himself as a “lover of wisdom, coffee, and finely crafted code.”

“The other day my daughter sidled into my office and asked me. ‘Dearest father, whose knowledge is incomparable, what is Kubernetes?'” he jokes in the first page of the book. “All right, that’s a little bit of a paraphrase. But you get the idea…”

In a blog post, Butcher describes the book as a way to bridge the gap between geeks and non-geeks. “What better way to talk to your parents, friends, and co-workers about this Kubernetes thing you keep going on about, than a little story time.” The story features a nice set of appropriately colorful illustrations by Bailey Beoughey. The application is represented with a cute little yellow giraffe.

https://www.cncf.io/wp-content/uploads/2019/07/The-Illustrated-Childrens-Guide-to-Kubernetes.pdf

[![K8S](http://img.youtube.com/vi/4ht22ReBjno/0.jpg)](http://www.youtube.com/watch?v=4ht22ReBjno)