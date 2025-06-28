#!/bin/bash

echo "Installing backend dependencies..."
npm install

echo "Creating .env file from template..."
if [ ! -f ".env" ]; then
    cp env.example .env
    echo ".env file created from template"
    echo "Please update the .env file with your actual database credentials"
else
    echo ".env file already exists"
fi

echo "Building TypeScript..."
npm run build

echo "Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your actual database credentials"
echo "2. Ensure MongoDB, Neo4j, and MySQL are running"
echo "3. Start the backend server: npm run dev" 