import axios from "axios";

async function fetchData(url) {
  const startTime = Date.now();
  // console.log("Start time: " + startTime)
  const response = await fetch(url);
  const endtime = Date.now();
  // console.log("End time: " + endtime)
  const fetchTime = endtime - startTime;
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  if (response.status !== 200) {
    throw new Error('Network status response is not 200 ' + response.status);
  }
  const text = await response.text();
  if (text !== 'DONE') {
    throw new Error('Response body is not DONE' + text);
  }

  return { text, fetchTime };
}

async function ensure_cold_start() {
  const projectId = process.env.PROJECT_URL;
  const projectEnvId = process.env.PROJECT_ENV_ID;
  const authToken = process.env.API_TOKEN;

  const data = JSON.stringify({
    environmentVariables: [
      {
        name: "DUMMY",
        value: "dummy_value",
      }
    ]
  });

  const response = await axios({
    method: "POST",
    url: `https://api.genez.io/projects/${projectId}/${projectEnvId}/environment-variables`,
    data: data,
    headers: {
        Authorization: `Bearer ${authToken}`,
        "Accept-Version": `genezio-cli/2.0`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Env var status response is not 200 ' + response.status);
  }
}

export const benchmark_handler = async (event, context) => {
    const url = process.env.HELLO_FUNCTION_URL;
    const promises = [];
    const n = 1;

    for (let i = 0; i < n; i++) {
        promises.push(fetchData(url));
    }
    const results = await Promise.all(promises);
    const fetchTimes = results.map(result => result.fetchTime);

    await ensure_cold_start()
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
