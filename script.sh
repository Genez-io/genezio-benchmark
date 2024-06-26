#!/bin/bash

# TODO Define the URL
URL="https://7da14e8a-552e-4060-be18-004c08c9a0a1.us-east-1.cloud.genez.io"

# Loop 10 times
for ((cnt=1; cnt<=100; cnt++))
do
  curl $URL >> result.txt
  echo >> result.txt
  echo "Iteration $cnt"
  sleep 1
done
