Last semester I took a course on Assembly Language Programming and after that I fell in love with the language and I decided to learn more than the scope of the class. After reading the book "Low-Level Programming" by Igor Zhirkov and the book "Learn to Program with Assembly" by Jonathan Bartlett I decided to build something with the language. So I chose to build a simple terminal text editor in assembly.

I had never built a text editor or any terminal application before, so the first thing I did was research about how terminal applications are built and how they work. The first thing I learnt was termios (terminal input and output settings). To build an application like a text editor that would work in the terminal, some of the terminal input and output settings have to be modified giving the application full control of user input. So to build a text editor the terminal has to be placed into a setting known as raw mode giving the text editor full control of every input without handling any of it. Basically, this means clearing a few flags the kernel normally sets by default.
	
```nasm
; modify the settings to put terminal in raw mode
mov eax, [new_terminal_settings + 12]
and eax, ~ECHO      ; stop the terminal from echoing keys back automatically
and eax, ~ICANON    ; disable line-buffering, so keys are readable one at a time
and eax, ~ISIG      ; stop Ctrl-C / Ctrl-Z from sending signals — I want those keys myself
and eax, ~IEXTEN    ; disable extended input processing
mov [new_terminal_settings + 12], eax
```

So to build the text editor the plan or better the algorithm I came up with was as follows:
- Read the filename from the command-line argument.
- Save the current terminal settings, then switch the terminal into raw mode.
- Open or create the file.
- Read its contents into a buffer and write that buffer to the screen.
- Loop: wait for a keypress, then check whether it's a character to insert, or a command like Ctrl-Q (quit) or Ctrl-S (save).

But how would I do this in assembly? The first step, which is to "get the file name as an argument" is quite easy, because when programs run in the terminal, the argument count and a pointer to an array of arguments passed are placed on the program stack, which can be easily retrieved and stored for further use. Although assembly is a low-level language, building user applications is quite similar to doing so in any other programming language. At the lowest level it all boils down to system calls: the interface provided by the kernel for allowing a user application to communicate with it to request either computer resources or other services it provides. Since the text editor involves a lot of file operations which are basically the job of the kernel, to open, write and create files requires using the open system call, to get and manipulate terminal input and output settings requires the termios system call, to exit the program requires the exit system call. 

After building this project I decided to rebuild it in C, and implement some features I didn't add to the assembly version. Building this without a C runtime and any external library meant a lot of things I'd never had to think about — reading argv off the raw stack instead of a function giving it to me, realizing "moving the cursor" is just me writing an escape sequence to stdout, writing my own number-to-string conversion since there's no printf. Assembly doesn't hide anything; you feel the absence of every convenience you didn't know you were relying on. The source code for the application can be found at https://github.com/DareOlolade/Mivi. As for what's next, I'm currently building a SQLite-like database system in C from scratch.  