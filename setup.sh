#!/bin/bash

echo "Setting up Faculty Insights and Connections"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "Node.js version: $(node --version)"

# Setup Backend
echo ""
echo "Setting up Backend..."
cd faculty-insights-backend

if [ ! -f "package.json" ]; then
    echo "Backend package.json not found. Please ensure the backend directory is properly created."
    exit 1
fi

echo "Running backend install script..."
chmod +x install.sh
./install.sh

echo "Backend setup complete!"

# Setup Frontend
echo ""
echo "Setting up Frontend..."
cd ../faculty-insights-react

if [ ! -f "package.json" ]; then
    echo "Frontend package.json not found. Please ensure the frontend directory is properly created."
    exit 1
fi

echo "Installing frontend dependencies..."
npm install

echo "Frontend setup complete!"

# Install root dependencies
echo ""
echo "Installing root dependencies..."
cd ..
npm install

# Create data directory for backend
echo ""
echo "Creating data directories..."
cd faculty-insights-backend
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
echo "3. Start the application:"
echo "   npm run dev"
echo ""
echo "Or start services individually:"
echo "   Backend: npm run start-backend"
echo "   Frontend: npm run start-frontend"
echo ""
echo "Access the application at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo ""
echo "For more information, see the README.md file"
echo "" 