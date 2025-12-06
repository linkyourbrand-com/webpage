#!/bin/bash

# Test sign up
echo "Testing sign up..."
#http://localhost:4566/_localstack/health
#actually create the account
#curl -X POST http://localhost:3000/api/auth/signup \
#  -H "Content-Type: application/json" \
#  -d '{"email":"test@example.com","password":"Test1234"}'

#go back to awslocal if you run into trouble
sleep 4
aws cognito-idp sign-up \
  --client-id 3ksaexes4emgajm5tkhh5da3zm \
  --username test@example.com \
  --password "Password123!"


#verify account manuelly
vrfy=$(aws cognito-idp admin-confirm-sign-up \
    --user-pool-id us-east-1_7c8bf81e6f764a72857057919d3e11ab \
    --username test@example.com)
echo "$vrfy"

echo "\n\nTesting sign in..."
# Test sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'

  #docker run -d \
  #--name localstack \
  #-p 4566:4566 \
  #-e LOCALSTACK_API_KEY=ls-FifU2039-QUKO-yuxA-gaYI-tUfE34383509 \
  #-e SERVICES=cognito-idp,dynamodb,s3,rds \
  #localstack/localstack-pro

  #aws --endpoint-url=http://localhost:4566 \
  #  cognito-idp list-user-pool-clients \
  #  --user-pool-id us-east-1_7c8bf81e6f764a72857057919d3e11ab