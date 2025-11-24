#!/bin/bash

# Test sign up
echo "Testing sign up..."
#http://localhost:4566/_localstack/health
#change port to 3000
#curl -X POST http://localhost:3000/api/auth/signup \
#  -H "Content-Type: application/json" \
#  -d '{"email":"test@example.com","password":"Test1234"}'

#verify account manuelly
vrfy=$(awslocal cognito-idp admin-confirm-sign-up \
    --user-pool-id us-east-1_d81b57b5bfc6437b8fd220366a2ed969 \
    --username test@example.com)
echo "$vrfy"

echo "\n\nTesting sign in..."
# Test sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'