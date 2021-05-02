---
layout: post
title: "Illusion of Randomness"
excerpt: Solution to the final python problem in Saarsec CTF Workshop (2021).
---

> If you ever design new font make sure I and l look different. So, that Illusion and lllusion don't become an IIIusion in itself.

### **Challenge description**  
`For this challenge, you have to connect to <challenge website> on port 22002. You could start by using netcat: nc <challenge website> 22002, for example.`

### **Do you want to try it first?**

The challenge can be divided into two parts.
1. Connect to the server and recover python source code.  
2. Craft an input that allows us to read `flag.txt`  

Since I don't have any resources to host this challenge again, you can start from the recovered [source code](#reconstructed-python-file) and give it a try before reading the solution.


For a better reading experience:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>Such blocks will show what user entered.
</code_input></pre></div></div>

<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>Such blocks will show what server replied.
</code_output></pre></div></div>

### **Part 1 - Recovering Python Code**

On connecting to server (`$ nc <challenge website> 22002`) we get:

<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>To access your secret vault, please enter the passkey! Of course, using commas.
</code_output></pre></div></div>

So, we enter random garbage:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>a,b,c,d
</code_input></pre></div></div>

We get back:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>You are trying to cheat on us? We need a list of length 0x4a. Poor hacker...
You have 9 tries left.
</code_output></pre></div></div>

Okay! We enter a list of length 0x4a full of 0s:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
</code_input></pre></div></div>

We get back:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>You are trying to cheat on us? We need a list of integers. Poor hacker...You don't know how integers look like? This is an example: 27
Oh, and here is a random value from YOUR list... " 0" Maybe this is not an integer?
You have 8 tries left.
</code_output></pre></div></div>

Wait what?! It is a list of integers.  

After wasting some time I got to know that the program wants a simple list, no python braces `[ ]`.  
I enter again:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
</code_input></pre></div></div>

We get back:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>We don't take your stupid hash as an input...
##########################################################################
You have 7 tries left.
</code_output></pre></div></div>

Okay. ~~This is weird.~~ I enter new list:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73
</code_input></pre></div></div>

We get back:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>We don't take your stupid hash as an input...
#!/usr/bin/python3
from Crypto.Hash import SHA256
import random
import bin
You have 6 tries left.
</code_output></pre></div></div>

This looks useful. So, it seems some kind of python code is coming out. What if I enter numbers from 60 to (60+74)?
<div class="language-plaintext highlighter-rouge">
<div class="highlight_input">
<pre class="highlight_input">
<code_input>60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133
</code_input></pre></div></div>

We get back:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>We don't take your stupid hash as an input...
dom
import binascii
import os.path

BASE = os.path.dirname(os.path.realpat
You have 5 tries left.
</code_output></pre></div></div>

Our last 2 lists have 14 numbers in common and if we look at output, there is also some common part.
Common part:  
```
dom
import bin
```
There are 12 visible characters + 1 space + 1 line break after `dom` (= 14).

So, the server is giving us the contents of file corresponding to the items of our list as index. Now we need to reconstruct the complete file.

> Note: The server had a weird behavior. Even if our 74 character limit finished in the middle of a sentence, it appended `\n` to the end of line. This made it difficult to know which were the original line breaks and which were not. I applied a cheap trick:
1. Print `----` at the end of 74 characters. So that it is easy to find in file.
2. Print some overlapping characters. Here 14, as `begin_passkey = 60` in code below which is 14 less than 0x4a (=74)
3. Delete the overlapping characters and `----` with hand.

#### **Code for reconstructing complete file**:

```python
from pwn import *

server = remote('server address', 22002)
file = open('file_reconstructed.txt', "a")
begin_passkey = 0

# we have 10 attempts to enter passkey
for i in range(10):
    passkey = []
    for k in range(begin_passkey, begin_passkey + 74):
        passkey.append(k)
    passkey = str(passkey)
    # remove python "[", "]"
    passkey = passkey[1:-1]
    # next pass key begins 60 characters ahead; 14 characters overlap
    begin_passkey += 60

    # receive intro line "To access your secret..." on first time
    if i == 0:
        print(server.recvline())

    server.sendline(passkey)
    received_line = ""
    # last line after entering passkey is always "You have x tries left."
    while received_line[0:8] != "You have":
        output = server.recvline()
        received_line = output.decode("utf-8")

        # skip "You have x tries left."
        if received_line[0:8] == "You have":
            pass

        # skip "We don't take your stupid hash as an input..."
        elif received_line[0:8] == "We don't":
            pass

        # write useful lines to file
        else:
            file.write(received_line)
    file.write("----")
file.close()
```

#### **Reconstructed python file**
```python
#!/usr/bin/python3
from Crypto.Hash import SHA256
import random
import binascii
import os.path

BASE = os.path.dirname(os.path.realpath(__file__))

secret = ''
outer_secret = ''


def process(user_output):
    arr = user_output.split(',')
    # since we are secure, we only allow a length of 0x4a
    if len(arr) != 0x4a:
        print('You are trying to cheat on us? We need a list of length 0x4a. Poor hacker...')
        return None

    with open(os.path.join(BASE, 'main.py'), 'rt') as source:
        data = source.read()

    try:
        arr = [int(i) for i in arr if 0 <= int(i) < len(data)]
    except ValueError:
        # we are just printing real random stuff to confuse those script kiddies, right?
        print('You are trying to cheat on us? We need a list of integers. Poor hacker...' +
              'You don\'t know how integers look like? This is an example: {}'
              .format(random.SystemRandom().randint(0, 0x4a)))
        print('Oh, and here is a random value from YOUR list... "{}" Maybe this is not an integer?'
              .format(arr[random.randint(0, 0x4a)]))
        return None

    input_hash = ''.join([data[i] for i in arr])

    # generate some random string of random length
    target_len = random.randint(0, 0x4a)
    random_numbers = [random.randint(0, 0x4a) for _ in range(target_len)]
    m = ''.join([chr(rnd) for rnd in random_numbers])

    h = SHA256.new(m.encode()).hexdigest()
    try:
        special_char = input_hash[0x3f]
        char_comp = [special_char == h[0x3f], h == input_hash[:0x40]] + \
                    [x == y for (x, y) in zip(outer_secret, input_hash[0x40:])]
    except IndexError:
        print('Something terrible happened. I know that you are responsible for this! Stop it!' +
              'But at least, I can tell you that some of your integers are too large...')
        return None

    if not all(char_comp):
        print('We don\'t take your stupid hash as an input...')
        print(input_hash)
        return None

    # yes, we're in
    with open(os.path.join(BASE, 'flag.txt'), 'rt') as flag:
        return flag.read().strip()

if __name__ == '__main__':
    with open(os.path.join(BASE, 'params.txt'), 'rt') as p:
        secret, outer_secret = p.read().strip().split(',')

    initify = 1337 * int(binascii.hexlify(secret.encode()), 8*2)
    random.seed(initify)
    print('To access your secret vault, please enter the passkey! Of course, using commas.')

    for t in range(10):
        flag = process(input().strip())
        if flag is None:
            print('You have {} tries left.'.format(9-t))
        else:
            print('Here is the content: {}'.format(flag))
```


### **Part 2 - Diving into python code**
Key observations from `main`:
1. There is some `params.txt` (to which we don't have access) and two values are read from it:
  - `secret`  
  - `outer_secret`  

2. `secret` decides what is seed for `random`

3. `flag` takes output from `process` function. We need to make sure `flag` is not `None`.

Key observations from `process()`:  
1. Length of `0x4a` is mandatory for passkey we enter.  It is stored in list `arr`.  

2. This source code itself is stored in `data`.  

3. **[Important]** `arr = [int(i) for i in arr if 0 <= int(i) < len(data)]`  
Even though we are forced to enter passkey of length `0x4a`, if element in `arr` is greater than `len(data)` it is ignored.
For example:
```python
# let us assume len(data) = 10
# if arr is
arr = [1,3,7,10,13,16]
arr = [int(i) for i in arr if 0 <= int(i) < 10]
print(arr)
# [1,3,7]
```
So, we can decrease length of `arr` even if we are forced to enter passkey of length `0x4a`.

4. There are two different ways used to print random integers. Why?
- 1) `random.SystemRandom().randint(0, 0x4a)`
- 2) `random.randint(0, 0x4a)`

5. `input_hash` is the combination of elements from `data` with elements of `arr` as index.

6. `random_numbers` contains "random" integers and its length is `target_len`.  

7. `h` is SHA256 hash of `random_numbers`

All of this leads to the epicenter of this challenge:
```python
special_char = input_hash[0x3f]
char_comp = [special_char == h[0x3f], h == input_hash[:0x40]] + \
            [x == y for (x, y) in zip(outer_secret, input_hash[0x40:])]
```
If `all(char_comp)` is `True` we move to reading the flag and our challenge will finish. In order to achieve this, we need two comparisons to return `True`:
1. `h == input_hash[:0x40]]`  
2. `x == y for (x, y) in zip(outer_secret, input_hash[0x40:])`  

We will focus on them one by one.  

**Let us start with comparison 1.**  
`h == input_hash[:0x40]]`  

Here we need our hash `h` to be same as `0x40 (=64)` characters that we can cherry pick from our reconstructed python file. Therefore, our main target is to find `h`.  

But now you may wonder: `h` is hash of some random numbers, we don't know the seed value, how can we even predict random numbers? Think again. First, we know that seed is fixed. So, same numbers are generated every time. Can we find the numbers somehow? See observation 4: two different ways to print random integers.

Let us look where the random numbers are used. Method in:  
4.1. is used to provide example integers.  
4.2. is used to show some random value from our passkey.

Let us pass this passkey to our server:  
`[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73]`  
this will trigger `ValueError` and we get:
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>You are trying to cheat on us? We need a list of integers. Poor hacker...You don't know how integers look like? This is an example: 44
Oh, and here is a random value from YOUR list... " 9" Maybe this is not an integer?
You have 9 tries left.
</code_output></pre></div></div>

terminate `nc` (netcat) session and run again, enter same passkey, we get:  
<div class="language-plaintext highlighter-rouge">
<div class="highlight_output">
<pre class="highlight_output">
<code_output>You are trying to cheat on us? We need a list of integers. Poor hacker...You don't know how integers look like? This is an example: 59
Oh, and here is a random value from YOUR list... " 9" Maybe this is not an integer?
You have 9 tries left.
</code_output></pre></div></div>

We get different integer examples 44 and 59 (here) but random value from our list is same both times. Interesting.

What if I enter passkey in correct format?: `ValueError` will never be encountered and first random integer from `random.randint(0, 0x4a)` is assigned to `target_length`. Therefore, `target_length = 9`. And then 9 more random integers will be drawn to fill `random_numbers`.

Similarly we can leak 9 more integers generated by `random.randint(0, 0x4a)` by entering the wrong passkey used above. If we will use passkey with correct format instead, these random integers will fill `random_numbers` array. Next 9 integers from calling `random.randint(0, 0x4a)` turn out to be `[18, 19, 58, 62, 16, 47, 22, 64, 22]`.
> Note that it is not a random coincidence that first call to `random.randint(0, 0x4a)` gives 9 when we are only allowed 10 attempts to enter passkey. I think, this was carefully deigned by the person setting this problem.

Let us find `h`:  
```python
from Crypto.Hash import SHA256

random_numbers = [18, 19, 58, 62, 16, 47, 22, 64, 22]
m = ''.join([chr(rnd) for rnd in random_numbers])
h = SHA256.new(m.encode()).hexdigest()
print(h)
# h = de406e4275ae26e75a14741ca029dfc674537e6a0226300b7bc60469a641514a
```

Now we need to cherry pick 64 indexes to give as passkey which will translate to same string as `h`. This is more of manual labor. Our hash `h` contains all hex digits except 8.

```python
# We know:
# input_hash = ''.join([data[i] for i in arr])
# So, data[32] is "a", data[7] is "b"...
dict = {"a": 32, "b": 7, "c": 150, "d": 60, "e": 149, "f": 19, "1": 2285, "2": 46, "3": 17, \
              "4": 292, "5": 47, "6": 48, "7": 2288, "9": 2595,"0": 314}

arr = [dict[i] for i in h]
print(arr)
# arr = [60, 149, 292, 314, 48, 149, 292, 46, 2288, 47, 32, 149, 46, 48, 149, 2288, 47, 32, 2285, 292, 2288, 292, 2285, 150, 32, 314, 46, 2595, 60, 19, 150, 48, 2288, 292, 47, 17, 2288, 149, 48, 32, 314, 46, 46, 48, 17, 314, 314, 7, 2288, 7, 150, 48, 314, 292, 48, 2595, 32, 48, 292, 2285, 47, 2285, 292, 32]
```
So, we have satisfied `h == input_hash[:0x40]]`.

**Now let us consider comparison 2.**  
`x == y for (x, y) in zip(outer_secret, input_hash[0x40:])`

If we look closely at `outer_secret` there is no way we can leak it. If we can not leak it what can we do?

- Bruteforce `outer_secret`? This way we need to bruteforce `0x4a`-`0x40` = 10 characters. What are the possible values for 1 character: `a-z`,`A-Z`,`0-9` = 62? Can be even more. For 10 characters we have more than 62^10 possibilities. So, bruteforcing is not a feasible option.

Is there a better way?

- Remember that in 3. we found that we can force `arr` used inside the program to be of length less than `0x4a`. What if length of `arr` is `0x40`?

```python
# outer secret can be anything
outer_secret = 'abcdefghij'
input_hash = 'de406e4275ae26e75a14741ca029dfc674537e6a0226300b7bc60469a641514a'
char_comp_part2 = [x == y for (x, y) in zip(outer_secret, input_hash[0x40:])]
print(char_comp_part2)
# char_comp_part2 = []
```
Thus we can add 10 numbers (larger than length of `data`) to the solution of comparison 1. This will:
  - Make our passkey of length `0x4a`
  - Make `input_hash` of only `0x40` in length  

So, our final passkey to enter in first attempt is:   
`60, 149, 292, 314, 48, 149, 292, 46, 2288, 47, 32, 149, 46, 48, 149, 2288, 47, 32, 2285, 292, 2288, 292, 2285, 150, 32, 314, 46, 2595, 60, 19, 150, 48, 2288, 292, 47, 17, 2288, 149, 48, 32, 314, 46, 46, 48, 17, 314, 314, 7, 2288, 7, 150, 48, 314, 292, 48, 2595, 32, 48, 292, 2285, 47, 2285, 292, 32, 99999, 99999, 99999, 99999, 99999, 99999, 99999, 99999, 99999, 99999`

`99999` is a random value that is larger than `len(data)`

**Finally from comparison 1 and 2:**
```python
char_comp = [True, True] + []
```
and we get our flag.
```
Here is the content: d75aedd8a8eda0fa56cdc129a6bae0ad
```
