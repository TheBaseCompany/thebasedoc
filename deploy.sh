#!/bin/bash
# # Enable Docker BuildKit
export DOCKER_BUILDKIT=1

# Run fly deploy with the secrets
fly deploy $(grep -v '^#' .env.production.local | sed 's/^/--build-secret /')
