#!/bin/bash

# Test sign up
echo "Testing sign up..."
#http://localhost:4566/_localstack/health
#actually create the account
#curl -X POST http://localhost:3000/api/auth/signup \
#  -H "Content-Type: application/json" \
#  -d '{"email":"test@example.com","password":"Test1234"}'

awslocal cognito-idp sign-up \
  --client-id b7da0nu45bjlnsy7vetusr15vf \
  --username test@example.com \
  --password "Password123!"


#verify account manuelly
vrfy=$(awslocal cognito-idp admin-confirm-sign-up \
    --user-pool-id us-east-1_9009eea040bb404d8054087e3498fde2 \
    --username test@example.com)
echo "$vrfy"

echo "\n\nTesting sign in..."
# Test sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'