---
layout: post
title: "Autonomous flight using on-board object tracking"
excerpt: How I spent final year of my undergraduate degree playing with a quadcopter.
---

Currently, a large number of quadcopters demand continuous attention of human operator during the flight. So, in the past year we worked on making a quadcopter that could fly autonomously and follow an object without external assistance. This is done with the help of real-time object tracking and subsequent flight instructions from the on-board Raspberry Pi 3B to maintain object in frame.
<br><br>

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/7mkrIzC0qMY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<figcaption>Following a yellow balloon across open space.</figcaption>
</p>
<br>
<p align="center">
<img alt="Project Overview" src="/assets/quadcopter/Project_overview.jpg" height="450">
<figcaption>Project Overview</figcaption>
</p>

<br>

| <img alt="Control GUI" src="/assets/quadcopter/RPi_Control.jpg"> | <img alt="Parts Closeup" src="/assets/quadcopter/Parts.jpg"> | <img alt="Quadcopter" src="/assets/quadcopter/QuadFinal.jpg">|

<figcaption>Left: Control GUI, Center: Flight Stack, Right: Final Quadcopter</figcaption>

#### **Further Reading**
The project can be divided into five parts:
1. [Building the quadcopter.](/assets/quadcopter/1.png)
2. [Communication between quadcopter and on-board Raspberry Pi.](/assets/quadcopter/2.png)
3. [Flight Controller and firmware.](/assets/quadcopter/3.png)
4. [Object tracking during flight.](/assets/quadcopter/4.png)
5. [Algorithm for adjusting yaw, pitch and throttle.](/assets/quadcopter/5.png)

Each part contains a link to screenshot of Mediawiki Page that I wrote during that time.  
> I switched to Jekyll from Mediawiki, someday I will port these 5 pages too.
