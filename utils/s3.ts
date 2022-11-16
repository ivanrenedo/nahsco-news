import aws from 'aws-sdk';


const endpointUrl = process.env.S3_ENDPOINT!;
const spacesEndpoint = new aws.Endpoint(endpointUrl);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  region: process.env.REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  signatureVersion: "v4"
});

export {
    s3
}