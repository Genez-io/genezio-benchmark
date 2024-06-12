export const handler = async (event, context) => {
  console.log("Hello world!");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello world!"
    })
  };
};
