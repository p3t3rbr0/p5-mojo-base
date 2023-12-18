#!/bin/sh

set -e

PORT=${PORT:-5000}
HOST=${HOST:-0.0.0.0}
LOGS_DIR="/var/logs/"
LOCAL_LOGS_DIR="logs/"

[ -d $LOGS_DIR ] || mkdir $LOGS_DIR
[ -d $LOCAL_LOGS_DIR ] || mkdir $LOCAL_LOGS_DIR
[ -f .env ] && export $(cat .env)

env > /etc/environment

echo "-= RUN_IN_MODE: ${MODE} =-"

if [ "$MODE" = "development" ]; then
    exec make run-dev
else
    exec make run-prod
fi
