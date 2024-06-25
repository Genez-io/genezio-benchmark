async function fetchData(url) {
  const startTime = Date.now();
  const response = await fetch(url);
  const fetchTime = Date.now() - startTime;
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  if (response.status !== 200) {
    throw new Error('Network response was not ok ' + response.status);
  }
  const text = await response.text();
  return { text, fetchTime };
}

export const benchmark_handler = async (event, context) => {
    const url = process.env.HELLO_FUNCTION_URL;
    const promises = [];
    const n = 10;

    for (let i = 0; i < n; i++) {
        promises.push(fetchData(url));
    }
    const results = await Promise.all(promises);
    const fetchTimes = results.map(result => result.fetchTime);

    return {
        statusCode: 200,
        body: `${fetchTimes.join('\n')}`
    };
}

export const hello_handler = async (event, context) => {
    const body = 'DONE';

    return {
      statusCode: 200,
      body: `${body}`
    };
  };
