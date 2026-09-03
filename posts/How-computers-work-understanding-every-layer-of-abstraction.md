
# what is a computer?

Computers are fascinating machines and in order to understand how a computer works, let's start by setting a basis for what we can call a computer. A computer is an electronic machine that takes in input, processes it and brings out output. The first main identifier of a computer is that it is an electronic machine, and basically what this means is that it works by using discrete quantities of electricity which are given arbitrary meanings  to process  inputs into outputs, where both inputs and output are also represented with these discrete quantities of electricity. So basically any device that takes in input, processes it and produces an output using discrete quantities of electricity can be referred to as a computer.

## The Basics of computer architecture 

For a device to be called a computer it first needs a way to take in input, it does this using devices known as input devices, after these inputs are gotten from a user they are processed by a chip embedded with thousands and millions of electrical circuits called the CPU, which processes the data, and then produces/displays its results to an output device. This is a basic explanation of how computers work, but to get into more detail we have to first understand how computers understand and distinguish inputs like numbers, letters,  colors, sounds and videos, processing them differently to produce useful outputs.

## How Computers Represent Abstract Ideas

computers represent these abstract ideas using patterns of discrete electrical signals, for example to represent numbers we would use a group of wires (which depends on how large the number is); using one wire if current is not flowing we can count that as zero, if current is flowing we can count that as one. using one wire we see that the maximum we can count is just two numbers but when we increase the number of wires used we can count even higher,because we can generate different patterns and map each pattern to a number all we have to do is  add new wires and the total combination of patterns  that we can have increases exponentially, if we use 8 wires we can have 256 distinct patterns; using 16 wires gives us 65536 distinct patterns. Thinking in terms of wires and current flowing is way too abstract for computer scientists, so we like to refer to this rather as 0 and 1, where one symbolizes the flow of current and zero symbolizes the absence of current. Hence the first layer of abstraction, viewing the flow of electricity as zeros and ones.

## Using Numbers To Represent Everything

Given the ability to represent numbers using electrical signals, we can also represent letters. All we have to do is just map numbers to letters where maybe 0 represents the letter "a"  and "1" represents the letter "b", the exact mapping is known as ASCII or its extended version the UNICODE which are standard mappings used by all computers to distinguish how numbers are mapped to letters. To represent colors using numbers all we need to know is that all colors can be gotten from mixing the color red, green and blue, so all we have to do is specify using numbers, the amount of red, green and blue and then we can produce any color. If we can produce colors, we sure can produce images which are just colors positioned at different locations known as pixels. The co-ordinate for those locations can also be specified by numbers; an example would be coordinate 0 on the x axis, coordinate 0 on the y axis to represent the top left corner of the screen and 0 red, 0 green, 0 blue would specify a pure black pixel. If we can produce images we sure can produce videos which are just fast moving images.

## How Computers Represent Instructions

Now that we have seen that everything boils down to being able to represent numbers with electrical signals and these numbers can be used to represent every other thing, how do computers know to distinguish these patterns of electrical signals as a number or as a letter or as a color or as a color position or as sound, this is achieved by providing special header patterns that provide the context of use to the computer and how do we do this using numbers also (cool right).  Numbers used to provide context to computers are known as opcodes (operation codes),  when different patterns of electricity come to the CPU the first things it does is to decode the first maybe 8 bit or 4 bit depending on the manufacturer , these first bits correspond to basic instructions(add, sub, loops, conditionals) implemented in circuit, and when the CPU figures out what operation the pattern matches, it would redirect the remaining bits to a corresponding circuit, which performs the operation on these bits and produces an output. Opcodes combined with their arguments form what is known as computer instructions. Multiple groups of instructions combined together, run in order, form what's known as a program.


## The RAM

That was a lot to take in, but we can't talk about the architecture of a computer without talking about the RAM, although a CPU takes in input and gives out output it is not connected directly to input and output devices rather it is connected to a middle man known as the Random Access Memory (RAM) which is just a continuous array of memory which can hold/retain patterns of electrical signals for as long as the computer is powered on. The CPU reads instructions and data from the random access memory and writes information (processed data) to the random access memory which can either be stored or displayed by an output device. But why do we need a middle man between i/o devices and the CPU? That's because the CPU processes information faster than humans can produce inputs and faster than humans can perceive outputs and also mainly helps  automation, writing programs once but reusing them over and over again because instead of reading instructions from an input device they can be read from a storage device.

## Storage Devices

To make a computer do something we know we need to provide instructions but having to do this via input devices would be strenuous and be too repetitive and only those with good ideas of the operation codes and how to create programs would be able to use the computer, the solution was to create a way where programs would persist on the computer and these programs can be reused, transferred or even sold very easily hence the storage device, these are basically devices that store patterns of electricity even when the computers are turned off; examples include hard disk, flash drive, etc. So now we have everything required to build a fully functioning computer, the CPU, the RAM, Input devices, Output devices, and a persistent storage device. 

## Memory Mapped IO

We know that our i/o devices are not connected directly to the CPU, so basically for i/o devices to communicate with the CPU they have to communicate via the RAM, hence memory-mapped I/O. This is the concept of how i/o devices communicate with CPU, memory addresses are mapped to different i/o devices if the device is an input device it writes to this memory address; if the device is an output device it reads from the memory address mapped to it.

## Device Drivers

How do computers know how to communicate with these i/o devices where there are tens if not hundreds of different i/o, this is achieved by programs known as device drivers which tell the CPU how to interact with specific i/o devices, the basic device drivers come built in either from the firmware manufacturers or from the operating system manufacturers but for very niche and uncommon i/o devices users have to manually install these device drivers so that the CPU can understand how to communicate with it.
## Initial Software Layer (the firmware)

Given the power to write persistent programs, the first and most important program which gets written by computer manufacturers in the firmware, this is the first program that the computer is configured to start running when the computer is turned on, it is usually written to a read-only memory (ROM) chip similar to RAM but can't be modified after being written to. The firmware is in charge of activities like checking the state of all i/o devices and loading basic programs (device drivers) that tell the CPU how to interact with i/o devices. And after doing this it searches for a specific program in the storage device connected to the computer known as the operating system and it gives control of the entire computer to it.
## Operating Systems

This is a program that basically controls every resource owned by a computer from its CPU, to its RAM, to its storage device, to its i/o devices. It serves as an interface between every other program and the computer hardware basically allocating and maintaining resources efficiently. The operating system is a very important program it gives user programs access to computer resources but how does the operating system do this, there is a very important part of the operating system known as the kernel, the kernel is the main part of the operating system that keeps on running from when a computer is booted on and when it goes  off, therefore for any other program  to run it has to communicate with the kernel. An example is a text editor: for a simple text editor to work it has to communicate with the keyboard and screen, and it does this by talking to the kernel.

## Application Programs

These are programs written for users to comfortably use the computer to solve basic day to day problems these programs include: text editors, spreadsheet packages, web browsers, video players, graphics design software, etc.
## Summary

To summarize everything a computer is an electronic machine, it takes input from an input device or a storage device and sends it to the RAM; the CPU reads those input from the RAM processes it and writes the result back to the RAM. The result after it's been written to the RAM can either be written to address locations mapped to output devices (to be displayed) or stored in a storage device. The first program that starts running when a computer is turned on is the firmware, which passes control to the operating system and the operating system by using its kernel, provides an interface for application programs to communicate and use computer resources.







