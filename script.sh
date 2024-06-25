#!/bin/bash

# TODO Define the URL
URL="BENCHMARK_FUNCTION_URL"

# Loop 10 times
for ((cnt=1; cnt<=10; cnt++))
do
  # Use wget to fetch the URL and save the output to {cnt}.txt
  wget -O "${cnt}.txt" "${URL}"
done
