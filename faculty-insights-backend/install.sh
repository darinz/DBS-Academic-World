#!/bin/bash

echo "Installing backend dependencies..."
npm install

echo "Creating .env file..."
cat > .env << EOF
# Database Configuration
MONGODB_URI=mongodb://localhost:27017
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=academicworld

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
EOF

echo "Backend setup complete!"
echo "Please update the .env file with your actual database credentials." 