#!/bin/bash

echo "creating local database"

db=$(aws --endpoint-url=http://localhost:4566 rds create-db-instance \
  --db-instance-identifier LYB-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password password123 \
  --allocated-storage 20)