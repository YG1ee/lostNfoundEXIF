#!/bin/sh

# example below

alias exiftool='~/Documents/util/exiftool-13.06_64/exiftool.exe'
exiftool -alldates="2023-06-20 08:43:42" 'Resized_20230620_084342.jpeg' && mv 'Resized_20230620_084342.jpeg' ../SUCCESS/Resized_20230620_084342.jpg && mv 'Resized_20230620_084342.jpeg_original' ../PRESERVE/
