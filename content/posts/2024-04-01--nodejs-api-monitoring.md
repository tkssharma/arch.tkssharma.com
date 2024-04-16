---
date: 2024-04-01
title: 'Node JS API Monitoring using Prometheus and Grafana'
shortTitle: 'Node JS API Monitoring using Prometheus and Grafana'
description: 'Node JS API Monitoring using Prometheus and Grafana'
template: post
featuredImage: '../thumbnails/nodejs.png'
thumbnail: '../thumbnails/nodejs.png'
slug: how-to-monitor-nodejs-application-using-prometheus-grafana
categories:
  - nodejs
  - prometheus
  - aws
tags:
  - nodejs
  - prometheus
  - aws
---

Monitoring a node.js application is one of the crucial stages in analyzing the quality and proper functioning of the application. It allows you to identify ongoing issues and quickly make decisions to fix them.

PM2 provides internal tools for monitoring all your applications, but in the free version, they are only accessible through the console command `pm2 monit`. Alternatively, PM2 offers a subscription service called PM2 Plus with additional functionality.

![](https://miro.medium.com/v2/resize:fit:700/0*aQLLgvAhM28o5PWJ.png)

Unfortunately, neither of the mentioned methods are suitable for monitoring because you need to see not only current performance metrics but also changes in values over time (for example, the growth of memory usage within the application or the number of its reloads). Also payment subscription does not integrated into your overall monitoring system and located on separated service.

![](https://miro.medium.com/v2/resize:fit:700/0*O0rwNP-iZ4_c7Yrr.png)

In most cases, applications use the combination of [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/), which allows collect data and display it in the form of graphs and also to set up alerts for changes in any metrics.

Unfortunately, PM2 does not provide a convenient and simple way to export data to Prometheus, so it was a motivation to implement my own module that would allow doing this. In addition, this module should be able to export additional metrics which my another module [pm2-autoscale](https://www.npmjs.com/package/pm2-autoscale), relies.

Finally [pm2-prom-module](https://www.npmjs.com/package/pm2-prom-module) has been released and available for everyone. You can install it just with command `pm2 install`:

pm2 install pm2-prom-module

After installation monitoring service will be available on port `9988` and you can reach it by url`[http://localhost:9988/](http://localhost:9988/)`.

Of course you can configure module and change port and service name, for example:

pm2 set pm2-prom-module:port 10801  
pm2 set pm2-prom-module:service_name MyApp

Specifying the `service_name` is very convenient when installing the module across different projects, while using a single dashboard in Grafana. This allows you to create a dropdown list with all the services and quick switch between them.

This module collect all available metrics provided by PM2 and a few additional ones. The complete list looks something like this:

1.  Available free memory
2.  Number of CPUs
3.  Number of running applications
4.  Number of instances for each application
5.  Average memory usage per application
6.  Total memory used for each application
7.  Average CPU load for each application
8.  Current CPU load for each application
9.  Number of restarts for each application
10.  Uptime for each application

As well as all the statistics within PM2:

1.  Used Heap Size
2.  Heap Usage
3.  Heap Size
4.  Event Loop Latency p95
5.  Event Loop Latency
6.  Active handles
7.  Active requests
8.  HTTP req/min
9.  HTTP P95 Latency
10.  HTTP Mean Latency

Sometimes, PM2 returns very peculiar data that requires double-checking, such as Active requests or HTTP req/min (in reality, it seems more like req/sec).

Here is example of module output:
``sh

 HELP pm2_free_memory Show available host free memory  
 TYPE pm2_free_memory gauge  
pm2_free_memory{serviceName="my-app"} 377147392  
  
 HELP pm2_cpu_count Show available CPUs count  
 TYPE pm2_cpu_count gauge  
pm2_cpu_count{serviceName="my-app"} 4  
  
 HELP pm2_available_apps Show available apps to monitor  
 TYPE pm2_available_apps gauge  
pm2_available_apps{serviceName="my-app"} 1  
  
 HELP pm2_app_instances Show app instances count  
 TYPE pm2_app_instances gauge  
pm2_app_instances{app="app",serviceName="my-app"} 2  
  
 HELP pm2_app_average_memory Show average using memory of an app  
 TYPE pm2_app_average_memory gauge  
pm2_app_average_memory{app="app",serviceName="my-app"} 60813927  
  
 HELP pm2_app_total_memory Show total using memory of an app  
 TYPE pm2_app_total_memory gauge  
pm2_app_total_memory{app="app",serviceName="my-app"} 121626624  
  
 HELP pm2_event_loop_latency_p95 Event Loop Latency p95. Unit "ms"  
 TYPE pm2_event_loop_latency_p95 gauge  
pm2_event_loop_latency_p95{app="app",instance="1",serviceName="my-app"} 2.55  
pm2_event_loop_latency_p95{app="app",instance="2",serviceName="my-app"} 2.48

```

Finally you can have Grafana dashboard with detailed statistic of your application. If you like it you can [download this dashboard from this link](https://vexell.ru/content/files/2023/09/grafana-model.json).

![](https://miro.medium.com/v2/resize:fit:700/0*LtupLuydytEVVblc.png)

In our case, each node.js project is packaged into a Docker container, and inside, we install PM2 and additional modules. All parameters, such as the service name or port, are passed through arguments. As a result, the Docker container looks something like this:

FROM node:18-bullseye-slim   
  
 Install PM2  
RUN npm i -g pm2@5.2.2  
  
 ...  
 Build project  
...  
  
ARG PROJECT_NAME  
ARG ENV_METRICS_PORT  
  
 Install modules for PM2  
RUN pm2 install pm2-autoscale && pm2 install pm2-prom-module && pm2 set pm2-prom-module:port $ENV_METRICS_PORT && pm2 set pm2-prom-module:service_name $PROJECT_NAME  
  
CMD ["pm2-runtime", "--json", ".ecosystem.config.js"]