#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    for nombre in "$@"; do
        mkdir "ex$nombre"
    done
fi