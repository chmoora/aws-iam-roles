# AWS IAM Roles

IAM roles for AWS Service Catalog launch constrains required on AWS tenant accounts.

## Framework

AWS Cloud Development Framework v2
[https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html](
https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)

## Deployment

1. Edit `cdk.context.json` file to modify parameters.

2. Install NPM dependencies and build the CDK application
```bash
npm install && npm run build
```

3. Synthesize CDK app/stack to generate CF templates
```
npx cdk synth --all
```

4. Authenticate to your AWS account, define AWS CLI profile & region
```
export AWS_PROFILE={profile_name}
export AWS_REGION={region_name}
```

5. Review AWS resources to deploy
```
npx cdk diff --all
```

6. Deploy CDK app/stacks to your AWS account
```
npx cdk deploy --all
```

## Cleanup

1. Destroy CDK app/stacks on your AWS account
```
npx cdk destroy --all
```
