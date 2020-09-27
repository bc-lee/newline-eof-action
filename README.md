# Github action who cares about the newline and end-of-file

## Why cares?

Because POSIX cares 😀

POSIX.1-2001 stated as follows:

3.205 Line
> A sequence of zero or more non- <newline>s plus a terminating <newline>.

3.238 Newline Character (\<newline\>)
> A character that in the output stream indicates that printing should start at the beginning of the next line. It is the character designated by '\n' in the C language. It is unspecified whether this character is the exact sequence transmitted to an output device by the system to accomplish the movement to the next line.

There are no such things like end-of-file. Just have to include the terminating newline character in all files.
