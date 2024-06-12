import mongoose from "mongoose";
import util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

const FUNCTION_NAME = "benchmark-function"; // name of the function
const REGION = "us-east-1"; // region of the function
const LAMBDA_URL = "https://<url>.lambda-url.us-east-1.on.aws/";
const URL_GENEZIO_FUNCTION = "https://<url>.us-east-1.cloud.genez.io";

await mongoose
  .connect(
    "mongodb://localhost:27017/benchmark",
    {}
  )
  .catch(err => {
    console.log(err);
  });

const TimesModel = mongoose.model("Times", {
  time: Number,
  function: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
 

let i = 0;
while (i < 1000) {
  // update the function with a new random environment variable to ensure cold start
  await execPromise(`aws lambda update-function-configuration --function-name ${FUNCTION_NAME} --environment Variables="{VAR1=variable_${Math.random().toString()}value}" --region ${REGION}`)
  
  const time1AWS = new Date().getTime();
  await fetch(LAMBDA_URL,
    {
      keepalive: false
    }
  );
  const time2AWS = new Date().getTime();

  const diffAWS = time2AWS - time1AWS;

  console.log("aws_lambda", diffAWS);

  await TimesModel.create({
    time: diffAWS,
    function: "aws_lambda"
  });




  // TODO: code to kill genezio function

  const time1GNZ = new Date().getTime();
  await fetch(URL_GENEZIO_FUNCTION,
    {
      keepalive: false
    }
  );
  const time2GNZ = new Date().getTime();
  const diffGNZ = time2GNZ - time1GNZ;

  await TimesModel.create({
    time: diffGNZ,
    function: "genezio"
  });

  console.log("genezio", diffGNZ);
  i++;
}