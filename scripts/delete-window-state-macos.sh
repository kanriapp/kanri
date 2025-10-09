#!/bin/bash

TARGET_DIR="$HOME/Library/Application Support/tech.trobonox.kanri"
TARGET_FILE=".window-state.json"

FILE_PATH="$TARGET_DIR/$TARGET_FILE"

if [ -f "$FILE_PATH" ]; then
    echo "Found .window-state.json at $FILE_PATH..."
    rm "$FILE_PATH"
    echo "Deleted $FILE_PATH"
else
    echo "File not found: $FILE_PATH"
fi