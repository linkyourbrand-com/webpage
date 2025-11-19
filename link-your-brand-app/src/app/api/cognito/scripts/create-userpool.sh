#!/bin/bash

echo "Creating userpool"
UserPool-id=$(aws --endpoint-url=http://localhost:4566 \
  cognito-idp create-user-pool \
  --region us-east-1 \
  --pool-name LYBUserPool \
  --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,RequireSymbols=false}" \
  --auto-verified-attributes email \
  --username-attributes email \
  --query 'UserPool.Id' \
  --output text)

  clientId=$(
    aws --endpoint-url=http://localhost:4566 \
  cognito-idp create-user-pool-client \
  --user-pool-id $UserPool \
  --client-name LYBWebApp \
  --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH \
  --query 'UserPoolClient.ClientId' \
  --output text
  )