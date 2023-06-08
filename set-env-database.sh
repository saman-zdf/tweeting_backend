#!/bin/bash
set -a  
source .env
set +a  

$PASS=$MYSQL_ROOT_PASSWORD
docker-compose -f docker-compose.test.yml exec database mysql -p"$PASS" -e "CREATE DATABASE tweet_test_db;"