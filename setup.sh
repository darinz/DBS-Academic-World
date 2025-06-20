#!/bin/bash

echo "Setting up Faculty Insights and Connections"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Setup Backend
echo ""
echo "Setting up Backend..."
cd faculty-insights-backend

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found. Please ensure the backend directory is properly created."
    exit 1
fi

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

echo "✅ Backend setup complete!"

# Setup Frontend
echo ""
echo "Setting up Frontend..."
cd ../faculty-insights-react

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found. Please ensure the frontend directory is properly created."
    exit 1
fi

echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"

# Create data directory for backend
echo ""
echo "Creating data directories..."
cd ../faculty-insights-backend
mkdir -p data

echo "Data directories created!"

# Final instructions
echo ""
echo "Setup Complete!"
echo "=================================================================="
echo ""
echo "Next Steps:"
echo "1. Update the .env file in faculty-insights-backend/ with your actual database credentials"
echo "2. Ensure MongoDB, Neo4j, and MySQL are running"
echo "3. Start the backend server:"
echo "   cd faculty-insights-backend && npm run dev"
echo "4. Start the frontend application:"
echo "   cd faculty-insights-react && npm start"
echo ""
echo "Access the application at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo ""
echo "For more information, see the README.md file"
echo "" 