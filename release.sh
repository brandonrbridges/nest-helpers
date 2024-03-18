#!/bin/bash

# Capture the message argument
MESSAGE=$1
PATCH=$2

# Ensure a message was provided
if [ -z "$MESSAGE" ]; then
  echo "A commit message is required."
  exit 1
fi

# Ensure a patch version was provided
# patch, minor, or major
if [ -z "$PATCH" ]; then
  echo "A patch version is required."

  exit 1
fi

# Execute the release steps
git add .
git commit -m "$MESSAGE" || true # Proceed even if there's nothing to commit
npm version $PATCH -m "Version %s - $MESSAGE" # Adjust 'patch' as necessary
npm run build
git push && git push --tags
npm publish