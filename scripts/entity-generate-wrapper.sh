#!/bin/sh
# Wrapper script to generate entities and sync them to local filesystem
# This script should be run from the host machine, not inside Docker

echo "🚀 Generating entities from database..."
echo ""

# Check if Docker container is running
if ! docker compose ps app | grep -q "Up"; then
  echo "❌ Error: Docker container 'app' is not running."
  echo "   Please start it with: docker compose up -d"
  exit 1
fi

# Execute the command inside Docker container
echo "📡 Executing generation inside Docker container..."
docker compose exec app pnpm run entity:generate

# Check if command was successful
if [ $? -eq 0 ]; then
  echo ""
  echo "📦 Syncing generated entities to local filesystem..."
  
  # Wait a moment for files to be written
  sleep 1
  
  # Copy entities from container to host
  docker compose cp app:/app/src/entities/. src/entities/ 2>/dev/null
  
  if [ $? -eq 0 ]; then
    ENTITY_COUNT=$(ls -1 src/entities/*.ts 2>/dev/null | grep -v ".gitkeep" | wc -l)
    echo "✅ Entities synced successfully to src/entities/"
    echo ""
    echo "📊 Generated files: $ENTITY_COUNT entities"
    echo ""
    echo "📁 Entity files:"
    ls -1 src/entities/*.ts 2>/dev/null | sed 's|src/entities/||' | sed 's/^/   - /'
  else
    echo "⚠️  Warning: Could not sync files automatically."
    echo "   You may need to run manually: docker compose cp app:/app/src/entities/. src/entities/"
    exit 1
  fi
else
  echo "❌ Error generating entities. Please check the output above."
  exit 1
fi

