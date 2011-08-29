#!/bin/bash

DIR=$PWD

cd closure-library/closure/goog
python ../bin/calcdeps.py \
  -p "$DIR/closure-library" \
  -o deps > "$DIR/deps.js"

cd $DIR