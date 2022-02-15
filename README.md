# NASA Rover // FoxBit

_A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth…_

So, here we have tools to operate our little and also very friendly **rover**.

# Getting started

Execute `make install` to build and launch application. After installation use only `start` and another `make` listed commands to handle your environment if needed.

> **Tip:** if you're using Windows, first install Makefile support running `choco install make --source=cygwin` on your favorite command interpreter.



# First steps

In order to perform testings execute `make tests` to run the testing suite for the application to make sure everything is working properly before we hit the button and send our little friend on a trip.



# Start Rover

Congratulations, if we got here it means that part of our mission was successfully accomplished.

Our rover is already positioned, however to obtain the telemetry we need to start your system, for that execute the command `make start` so that the rover loads its navigation systems.



## Manual control mode

The manual control mode allows you to operate the rover through the control and telemetry screen in a simple way, just by pressing the `R` and `L` keys to rotate the device respectively to the Right and Left and `M` to move it forward.

Press `ESC` or `CTRL+C` to exit.



## Remote control mode


The remote control mode can be activated by the `make message` command and has been designed to follow the specifications in the standards ordered by the documentation - as shown in the example below:

```
Test Input
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

# Countdown to demo in 10… 9…

[![asciicast](https://asciinema.org/a/AQ6VXiT607Pcc36XKI0xe32fD.svg)](https://asciinema.org/a/AQ6VXiT607Pcc36XKI0xe32fD)
