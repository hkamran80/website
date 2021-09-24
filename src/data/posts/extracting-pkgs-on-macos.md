*Photo by [chuttersnap](https://unsplash.com/chuttersnap) on [Unsplash](https://unsplash.com)*

Let’s say you’re on a computer where you don’t have administrative access, but you really need to use this one piece of software. In my case, this was Apple’s SF Symbols app. There’s a pretty simple way to extract the payload from the package (.PKG).

To get started, you first need two things. A macOS-equipped computer and a DMG with a PKG inside, or just a PKG. This tutorial will detail both.

## Extracting the Package Contents
**If your PKG is inside of a DMG, start here.**

To extract the payload from a PKG inside of a DMG, we need to mount the DMG. There are two ways to do this. You can either use the Finder (double-click the DMG to mount it) or use the terminal with the following command:

```
hdiutil attach [PATH_TO_YOUR_DMG]
(EXAMPLE) hdiutil attach ~/Downloads/SF-Symbols.dmg
```

**PKG Extraction**

Now is where we have to use the terminal. In your terminal, navigate to the folder just above where you want your PKG to be extracted. An example command is as follows:

`cd ~/Documents/`

You can then proceed to extract the PKG with:
```
pkgutil --expand-full [PATH_TO_PKG] [FOLDER_TO_EXTRACT_TO]/
(PKG inside of DMG) pkgutil --expand-full /Volumes/[VOLUME_NAME]/[PACKAGE].pkg [FOLDER_TO_EXTRACT_TO]/
(EXAMPLE) pkgutil --expand-full /Volumes/SFSymbols/SF\ Symbols.pkg extracted_package/
```
The snippet below is what my terminal looked like after extracting the package to the “extracted_package” folder.

```
Daedalus:~/Documents/extracted_package hkamran$ ls
Distribution  Resources     SFSymbols.pkg
```
To see what is inside of the payload, type:

```
cd [PACKAGE_NAME].pkg/Payload/; open $(pwd)
(EXAMPLE) cd SFSymbols.pkg/Payload/; open $(pwd)
```
*The `open $(pwd)` command opens the current directory with the Finder.*

The folder hierarchy of the Payload folder is very simple. The directories are the places to put the files. For example, the directory *Applications* has “SF Symbols.app”, because that needs to be put in the Applications folder on your computer.

Once you have extracted the payload, you can eject the volume (if you are using a DMG) and delete the PKG, as you no longer need it.
