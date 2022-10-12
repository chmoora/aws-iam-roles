import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ScIamRolesStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const params = this.node.tryGetContext('Parameters');

    const provisionerRole = new iam.Role(this, 'ScProvisionerRle', {
      roleName: params.Provisioning.RoleName,
      description: 'Provisioning role for AWS Service Catalog',
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('servicecatalog.amazonaws.com')
      )
    })

    for (const managedPolicy of params.Provisioning.ManagedPolicies) {
      provisionerRole.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName(managedPolicy)
      );
    }

    provisionerRole.attachInlinePolicy(
      new iam.Policy(this, 'ScProvisionerInline', {
        statements: [
          new iam.PolicyStatement({
            actions: [ 's3:GetObject' ],
            resources: [ '*' ],
            conditions: {
              'StringEquals': { 's3:ExistingObjectTag/servicecatalog:provisioning': 'true' }
            }
          })
        ]
      })
    );
  
  }
}
