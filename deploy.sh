#!/bin/bash

# Enable Docker BuildKit
export DOCKER_BUILDKIT=1

# Source the environment variables from the .env.production.local file
set -a
source .env.production.local
set +a

# Echo the environment variables for checking
echo "APP_KEY=$APP_KEY"
echo "GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID"
echo "GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET"
echo "DB_URL=$DB_URL"


# Run fly deploy with the secrets
fly deploy \
  --build-secret APP_KEY=$APP_KEY \
  --build-secret GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
  --build-secret GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET \
  --build-secret DB_URL=$DB_URL