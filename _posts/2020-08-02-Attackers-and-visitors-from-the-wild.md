---
layout: post
title: "Attackers and visitors from the wild"
excerpt: Why is security important for machines connected to internet? Observations from log files of a remote server.
---

After maintaining a $5/month remote server for 3 years, I
finally decided to move away from it. This is mainly because:
- It was an over-engineered solution for a small blog/wiki.
- I finally ran out of my student credits on the hosting platform.
- I wanted to try [Jekyll](https://jekyllrb.com/) and [GitHub Pages](https://pages.github.com/).

Before doing so, I went through the log files of the server for
the last 80 days and found that more than 99% of `journalctl` entries were
populated by `sshd` and `ufw` logs. This post is a summary of what I found
and an answer to "Who would even try to take over my machine?".

### **Information about remote server**
- Ubuntu 18.04 based virtual machine (VM) with a static IPv4 address.
- LAMP stack (Linux, Apache, MySQL, PHP) with [Mediawiki](https://www.mediawiki.org/wiki/MediaWiki) based website.
- Deny all incoming traffic except on 3 ports. Used for OpenSSH and Apache (https, http).
- SSH allowed password based authentication.

### **Secure shell (SSH) brute-force attempts**
Majority of `sshd` entries indicate that there was a failed password attempt. For example:

```
Apr 10 00:01:35 Austen1 sshd[7126]: Invalid user csgoserver from 1.202.219.245 port 59956
Apr 10 00:01:35 Austen1 sshd[7126]: pam_unix(sshd:auth): check pass; user unknown
Apr 10 00:01:35 Austen1 sshd[7126]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=1.202.219.245
Apr 10 00:01:37 Austen1 sshd[7126]: Failed password for invalid user csgoserver from 1.202.219.245 port 59956 ssh2
Apr 10 00:01:37 Austen1 sshd[7126]: Received disconnect from 1.202.219.245 port 59956:11: Bye Bye [preauth]
Apr 10 00:01:37 Austen1 sshd[7126]: Disconnected from invalid user csgoserver 1.202.219.245 port 59956 [preauth]
```
<figcaption>Sample logs</figcaption>

This also shows that a valid user was not always entered (or known) by the attacker. After going through all the entries,
valid users still constitute more than half of all failed attempts.  

```
Attempts  |  Type of user
---------------------------
 349285      invalid users
 421441      valid users
---------------------------
 770726      Total attempts
```
<figcaption>Number of brute-force attempts</figcaption>

The reason behind this becomes clear after looking at the top 10 users with most failed attempts.

```
Attempts  |  user
---------------------
 416947      root
  16050      admin
   7637      test
   5190      ubuntu
   5077      postgres
   4691      user
   3025      oracle
   2647      git
   2583      deploy
   2332      ftpuser
```
<figcaption>Top 10 users with most failed attempts</figcaption>

Here, `root` is the only valid user, making 98.9% of all valid user attempts.

So, a significant number of brute-force attempts took place over the period of 80 days. This makes use of popular and frequently used password a recipe for disaster (_I bet you have already heard this before_). Additionally, majority of attacks rely on using commonly present/used usernames which might be protected using similar passwords. The main reason `root` draws majority of attraction is probably due to its _omnipresent_ nature and permissions. A nice starting point to fend off these attacks will be to disable root login (`PermitRootLogin`) over SSH.

But isn't it possible that these numbers skyrocketed because one of my friends wanted to teach me a lesson on one particular Monday night?

#### **Distribution of SSH attempts**
A proper analysis of log files show that these SSH brute-force attacks happen regularly. Looking at the distribution
of login attempts over 80 days, majority of days have anywhere between 8000 to 12000 attempts.  

<img alt="Distribution of failed attempts over 80 days" src="/assets/server-logs/daily-attempts.png">
<figcaption>Distribution of failed attempts over 80 days</figcaption>

Also, these attempts originate from a large set of IP addresses (12173 in total). It is interesting to see that
the top 10 IP addresses sorted by the number attempts make up only 9% of all attempts.

```
Attempts  |  IP Address
----------------------------
  12414      157.230.136.255
  10043      218.92.0.207
   9153      49.88.112.72
   8477      49.88.112.71
   7269      49.88.112.73
   5610      49.88.112.74
   5068      112.85.42.172
   3484      51.75.255.6
   3360      222.186.42.7
   3177      222.186.180.142
```
<figcaption>Top 10 IP addresses with respect to number of attempts</figcaption>

It is easier to loose sight of the bigger picture, if we only look at top 10 IP addresses only.
There were 18 hosts in 222.186.175.0/24 subnet which made 34983 attempts in total.

```
Attempts  |  IP Address
----------------------------
   2741      222.186.175.23
     31      222.186.175.84
    110      222.186.175.140
   2601      222.186.175.148
   2089      222.186.175.150
   2930      222.186.175.151
   1714      222.186.175.154
   2427      222.186.175.163
   2139      222.186.175.167
   2108      222.186.175.169
   2556      222.186.175.182
   2304      222.186.175.183
   2096      222.186.175.202
   1807      222.186.175.212
   2611      222.186.175.215
   2206      222.186.175.216
   2431      222.186.175.217
     82      222.186.175.220
```
<figcaption>Number of attempts by each host in 222.186.175.0/24 subnet</figcaption>

As most of these hosts made 2000 to 3000 attempts each, they remain outside the top 10 list
while their cumulative attempts exceed the sum of top 3 individual entries. Stepping back a bit
further reveals that 61 hosts in 222.186.0.0/16 subnet made 129167 login attempts (which is about 17%
of all attempts). Therefore, it is possible that attackers use multiple machines for
attempting brute-force attacks which helps them to slip under the radar even when they attempt a large number of brute-force attacks.

Now, one might say that attackers love SSH. Everything else is safe.

### **Traffic blocked by firewall**
A large number of `UFW BLOCK` entries indicate that blocked ports on the server were also receiving significant ammount of
traffic.  

```
Apr 10 11:34:54 Austen1 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=3e:f2:e2:42:24:d1:fe:00:00:00:01:01:08:00 SRC=209.17.96.90 DST=157.245.106.136 LEN=44 TOS=0x08 PREC=0x20 TTL=245 ID=54321 PROTO=TCP SPT=51489 DPT=8443 WINDOW=65535 RES=0x00 SYN URGP=0
Apr 10 11:34:59 Austen1 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=3e:f2:e2:42:24:d1:fe:00:00:00:01:01:08:00 SRC=141.98.80.204 DST=157.245.106.136 LEN=40 TOS=0x00 PREC=0x00 TTL=249 ID=60661 PROTO=TCP SPT=51855 DPT=16559 WINDOW=1024 RES=0x00 SYN URGP=0
Apr 10 11:35:00 Austen1 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=3e:f2:e2:42:24:d1:fe:00:00:00:01:01:08:00 SRC=49.213.184.137 DST=157.245.106.136 LEN=40 TOS=0x00 PREC=0x00 TTL=44 ID=10536 PROTO=TCP SPT=57180 DPT=23 WINDOW=63183 RES=0x00 SYN URGP=0
```
<figcaption>Sample logs</figcaption>

After going through all the entries, there were 346244 packets blocked in total.

```

Packets blocked  |  Protocol
-----------------------------
    329445            TCP
     16783            UDP
        16            Other
-----------------------------
    346244            Total
```
<figcaption>Number of packets blocked</figcaption>

The top 10 ports with regards to the number of packets blocked suggest that attackers are still not shy of giving the old `telnet` a chance.

```
Packets blocked  |  Port
-----------------------------
     17004          23
      9599          8088
      9570          1433
      4736          8080
      4156          3389
      4088          37215
      3302          5060
      2753          81
      2209          5555
      1847          8545
```
<figcaption>Top 10 ports with respect to number of packets blocked</figcaption>

But the most interesting point is that out of 65532 blocked ports, 56290 ports received at least one or more packets. This means that only 14% of ports remained untouched after 80 days.

<img alt="Number of packets blocked on a particular port" src="/assets/server-logs/packets-blocked-ports.png">
<figcaption>Number of packets blocked on a particular port</figcaption>

While it will be wrong to classify all of these packets as malicious (without more information), it can still be said that a there was a lot of unnecessary traffic. Thus, a misconfigured
port can also cause a lot of trouble.
<br>
<br>
<hr>
<br>

### **Major takeaways**
- SSH brute-force attempts happened regularly (with almost 10000 attacks/day).  
- `root` user was the most popular choice for attackers due to its presence and permissions.  
- Attacks originated from a large variety of hosts, with possibility of multiple hosts working together.  
- SSH attempts were not the only attraction, majority of network ports on the system were also probed.
