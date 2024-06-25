# Function-as-a-service (Cold Start) Benchmark

This repository contains scripts to benchmark the response time for cold start for function as a service (FaaS) platforms.

## Source Code
- The code includes two handlers: `benchmark_handler` and `hello_handler`.
    - `benchmark_handler`: This function sends 10 concurrent HTTP requests to the URL specified in the `HELLO_FUNCTION_URL` environment variable and logs the response times.
    - `hello_handler`: This function returns a simple 'DONE' message and is used to verify that the endpoint is functioning correctly.

The benchmark function sends 10 concurrent requests to the URL specified in the `HELLO_FUNCTION_URL` environment variable and logs the response times.

The first time invoking the benchmark function will trigger 10 cold starts.
Subsequent invocations will reuse the same instances and will not trigger cold starts.

## Setup

1. **Environment Variables**:
   - Set the `HELLO_FUNCTION_URL` environment variable to the URL you want to benchmark.

## Run the Benchmark

Run the script to call the benchmark function 10 times.
```bash
chmod u+x script.sh && ./script.sh
```
