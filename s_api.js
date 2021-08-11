
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'hossamyahia1017',
  applicationName: 'upload-image-to-aws-s3-app',
  appUid: 'RgpFvR1SxQGL7j9prm',
  orgUid: '19e1fdbd-490d-430d-a90e-cbe6601d2faf',
  deploymentUid: 'bf283f1d-9f37-4e30-aa66-bdc48ed1900e',
  serviceName: 'upload-image-to-aws-s3',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'production',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '4.5.0',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'upload-image-to-aws-s3-production-api', timeout: 15 };

try {
  const userHandler = require('./lambda.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}