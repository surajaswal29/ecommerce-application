#!/bin/bash

# Function to remove yarn.lock and install dependencies
install_deps() {
    local dir=$1
    local name=$2
    if [ -f "$dir/yarn.lock" ]; then
        echo "🗑️  Removing yarn.lock in $name..."
        rm "$dir/yarn.lock"
    else
        echo "⚠️  No yarn.lock found in $name, skipping removal..."
    fi
    echo "📦 Installing dependencies in $name with Yarn..."
    yarn --cwd "$dir"
}

echo "🚀 Starting installation process..."

# Install root dependencies
install_deps "." "root"

# Install server dependencies
install_deps "server" "server"

# Install view dependencies
install_deps "view" "view"

echo "✅ Installation complete!"
