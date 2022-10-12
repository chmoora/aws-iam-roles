#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ScIamRolesStack } from '../lib/sc-iam-roles-stack';

const app = new cdk.App();
new ScIamRolesStack(app, 'ScIamRolesStack', {
  terminationProtection: false
});