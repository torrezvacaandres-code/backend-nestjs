#!/bin/sh
if [ -z "$1" ]; then
  echo "Usage: pnpm migration:create --name <MigrationName>"
  exit 1
fi

# Extract name from --name flag or use first argument
NAME=""
if [ "$1" = "--name" ] && [ -n "$2" ]; then
  NAME="$2"
elif [ -n "$1" ]; then
  NAME="$1"
else
  echo "Error: Migration name is required"
  exit 1
fi

pnpm typeorm migration:create "src/migrations/${NAME}"

