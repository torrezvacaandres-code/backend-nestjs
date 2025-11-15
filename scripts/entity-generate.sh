#!/bin/sh

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if database variables are set
if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASS" ] || [ -z "$DB_NAME" ]; then
  echo "Error: Database environment variables not set"
  echo "Please ensure DB_HOST, DB_USER, DB_PASS, and DB_NAME are set in .env file"
  exit 1
fi

# Set default port if not set
DB_PORT=${DB_PORT:-5432}

# Output directory
OUTPUT_DIR="src/entities"

echo "Generating entities from database..."
echo "Host: $DB_HOST"
echo "Database: $DB_NAME"
echo "Output: $OUTPUT_DIR"

# Generate entities using typeorm-model-generator
pnpm typeorm-model-generator \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -d "$DB_NAME" \
  -u "$DB_USER" \
  -x "$DB_PASS" \
  -e postgres \
  -o "$OUTPUT_DIR" \
  --noConfig true \
  --cf camel \
  --ce pascal \
  --cp camel

echo "Entities generated successfully in $OUTPUT_DIR"
echo ""

# Check if running inside Docker container
if [ -f /.dockerenv ] || [ -n "$DOCKER_CONTAINER" ]; then
  echo "Running inside Docker container. Files should sync automatically via volume mount."
  echo "If files don't appear locally, run: docker compose cp app:/app/src/entities/. src/entities/"
else
  echo "Running locally. Files are in $OUTPUT_DIR"
fi

echo ""
echo "Note: Review and adjust the generated entities as needed."
echo "You may need to:"
echo "  1. Add decorators like @ApiProperty() for Swagger"
echo "  2. Add validation decorators from class-validator"
echo "  3. Adjust relationships and imports"

