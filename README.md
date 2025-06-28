# Faculty Insights and Connections

> A modern web application for discovering and connecting with academic faculty across U.S. universities

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

## Table of Contents

- [Overview](#overview)
- [Demo Video](#demo-video)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Faculty Insights and Connections Analytics is a comprehensive web application designed to facilitate meaningful academic connections and research collaboration. The platform serves as a bridge between professors seeking research partnerships and institutions looking to identify potential candidates for academic positions.

### Primary Use Cases

- **Research Discovery**: Help researchers find colleagues with similar interests across institutions
- **Faculty Recruitment**: Assist universities in identifying and evaluating potential faculty candidates
- **Academic Networking**: Enable meaningful connections based on research domains and expertise

### Target Audience

- **Academic Researchers** seeking collaboration opportunities
- **Faculty Recruiters** evaluating potential candidates
- **University Administrators** managing faculty databases
- **Graduate Students** exploring research opportunities

## Demo Video

**Watch the Application in Action**

To see the Faculty Insights and Connections Analytics application in action, please view our comprehensive demo video:

[![Demo Video](https://img.youtube.com/vi/J6D9Hsbvaec/0.jpg)](https://youtu.be/J6D9Hsbvaec)

**Direct Links:**
- [YouTube Demo Video](https://youtu.be/J6D9Hsbvaec)

The demo showcases all major features including:
- Faculty discovery and search capabilities
- Interactive visualizations and maps
- Publication search and citation analysis
- Faculty management operations
- Research area exploration

## Features

### Advanced Search & Discovery
- **Faculty Directory**: Comprehensive profiles with contact information and research interests
- **Publication Search**: Find research papers by keyword or author
- **Citation Analysis**: Track citation trends and research impact over time
- **Geographic Mapping**: Visualize faculty distribution across U.S. universities

### Interactive Visualizations
- **Interactive Maps**: Faculty distribution with color-coded university markers
- **Citation Trends**: Line charts showing research impact over time
- **Research Areas**: Sunburst charts displaying keyword-institute relationships
- **Statistical Dashboards**: Comprehensive analytics and insights

### Administrative Tools
- **Faculty Management**: Add and remove faculty members with validation
- **Data Import/Export**: Bulk operations for database management
- **User Permissions**: Role-based access control for different user types

### Multi-Database Integration
- **MongoDB**: Document storage for college and faculty mapping
- **Neo4j**: Graph database for relationship management
- **MySQL**: Relational data for publications and citations

## Implementation Status

### **Completed Features**
- **Frontend**: All React components implemented with TypeScript
- **Backend API**: Complete Express.js server with proper routing
- **Database Integration**: MongoDB, Neo4j, and MySQL utilities
- **Data Visualization**: Charts and interactive components
- **Faculty Management**: Add/remove faculty functionality
- **Search & Discovery**: Publication and faculty search
- **Setup Automation**: Automated installation scripts

### **Current Implementation Details**
- **Data Source**: Uses pre-populated CSV files for demonstration
- **Database Connections**: All three databases are initialized on startup
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript implementation with strict typing
- **Responsive Design**: Bootstrap-based responsive UI

### **Known Limitations**
- **Map Visualization**: Faculty Map uses a placeholder implementation (would need Leaflet/Google Maps integration)
- **Real-time Data**: Currently uses static CSV data (would need live database population)
- **Authentication**: No user authentication system implemented
- **Advanced Search**: Basic search functionality (could be enhanced with Elasticsearch)
- **Data Validation**: Basic validation (could be enhanced with Joi/Yup schemas)

### **Future Enhancements**
- Interactive map with real geographic data
- Advanced search with filters and sorting
- User authentication and role-based access
- Real-time data synchronization
- Export functionality (PDF, CSV)
- Mobile app version
- API rate limiting and caching

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support
- **React Router** - Client-side routing and navigation
- **React Bootstrap** - Responsive UI components and styling
- **Recharts** - Professional data visualization library
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - High-performance JavaScript runtime
- **Express.js** - Minimalist web framework for APIs
- **TypeScript** - Type-safe server-side development
- **MongoDB Driver** - Native MongoDB connectivity
- **Neo4j Driver** - Graph database integration
- **MySQL2** - High-performance MySQL client

### Development Tools
- **npm** - Package management and scripting
- **TypeScript Compiler** - Static type checking and compilation
- **ESLint** - Code quality and consistency
- **nodemon** - Development server with auto-reload

## Architecture

### System Design

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Express API   │    │   Databases     │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (MongoDB,     │
│   Port: 3000    │    │   Port: 3001    │    │    Neo4j,       │
└─────────────────┘    └─────────────────┘    │    MySQL)       │
                                              └─────────────────┘
```

### Component Architecture

- **Modular Design**: Independent components with clear interfaces
- **RESTful API**: Stateless communication between frontend and backend
- **Database Abstraction**: Clean separation of data access logic
- **Error Handling**: Comprehensive error management and user feedback

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v4.4 or higher)
- **Neo4j** (v4.4 or higher)
- **MySQL** (v8.0 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/darinz/DBS-Academic-World.git
   cd DBS-Academic-World
   ```

2. **Run the automated setup**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Configure your environment**
   ```bash
   cd faculty-insights-backend
   # Edit .env file with your database credentials
   nano .env
   ```

4. **Start the application**
   ```bash
   # Start both backend and frontend
   npm run dev
   
   # Or start services individually:
   npm run start-backend  # Terminal 1
   npm run start-frontend # Terminal 2
   ```

5. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)

### Alternative Installation

If you prefer to install manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd faculty-insights-backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm run build

# Install frontend dependencies
cd ../faculty-insights-react
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the `faculty-insights-backend` directory:

```env
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
```

### Database Setup

#### MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Verify connection
mongo --eval "db.runCommand('ping')"
```

#### Neo4j
```bash
# Install APOC plugin
# Navigate to Neo4j Desktop → Plugins → Install APOC

# Configure apoc.conf
echo "apoc.trigger.enabled = true
apoc.import.file.enabled = true 
apoc.export.file.enabled = true" > /path/to/neo4j/conf/apoc.conf
```

#### MySQL
```bash
# Start MySQL service
sudo systemctl start mysql

# Create database
mysql -u root -p -e "CREATE DATABASE academicworld;"
```

### Data Files

The application uses pre-populated CSV data files:
- `data/college_faculty.csv` - Faculty distribution across universities
- `data/faculty_keywords.csv` - Faculty research keywords and scores

These files are automatically loaded by the application and provide sample data for demonstration purposes.

## Usage

### Navigation

The application features an intuitive navigation system with the following sections:

| Section | Description | Features |
|---------|-------------|----------|
| **Home** | Overview dashboard | Quick access to main features |
| **Faculty Map** | Geographic visualization | Interactive map with faculty distribution |
| **Faculty Directory** | Search and browse | Detailed profiles and contact information |
| **Publications** | Research discovery | Search by keyword or author |
| **Citation Trends** | Impact analysis | Citation patterns and statistics |
| **Research Areas** | Domain visualization | Sunburst charts and keyword analysis |
| **Faculty Management** | Administrative tools | Add/remove faculty members |

### Key Workflows

#### Faculty Discovery
1. Navigate to **Faculty Directory**
2. Select an institution from the dropdown
3. Choose a faculty member
4. View detailed profile with research interests

#### Publication Search
1. Go to **Publications** section
2. Choose search type (keyword or faculty)
3. Enter search terms
4. Browse results with sorting and filtering

#### Citation Analysis
1. Access **Citation Trends**
2. Enter keyword and faculty name
3. Set year range
4. View interactive trend charts and statistics

#### Faculty Management
1. Navigate to **Faculty Management**
2. Use **Add Faculty** form with validation
3. Or **Delete Faculty** with confirmation
4. Receive real-time feedback on operations

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Faculty Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/faculty/institutes` | Get all institutes | None |
| `GET` | `/faculty/faculties/:instituteName` | Get faculties by institute | `instituteName` (path) |
| `GET` | `/faculty/data/:facultyName` | Get faculty data | `facultyName` (path) |
| `POST` | `/faculty/add` | Add new faculty | Faculty data (body) |
| `DELETE` | `/faculty/delete` | Delete faculty | Faculty data (body) |

### Publication Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/publications/keyword/:keyword` | Get publications by keyword | `keyword` (path) |
| `GET` | `/publications/faculty/:facultyName` | Get publications by faculty | `facultyName` (path) |
| `GET` | `/publications/citations` | Get citation trends | Query parameters |

### College Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/colleges/map` | Get college map data | None |
| `GET` | `/colleges/faculty-keywords` | Get faculty keywords | None |
| `GET` | `/colleges/keyword-institute` | Get keyword-institute relationships | None |

### Response Format

All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "data": {...},
  "message": "Optional message"
}
```

## Development

### Project Structure

```
DBS-Academic-World/
├── faculty-insights-backend/          # Backend API Server
│   ├── src/
│   │   ├── index.ts                   # Server entry point
│   │   ├── routes/                    # API route handlers
│   │   └── utils/                     # Database utilities
│   ├── package.json
│   └── tsconfig.json
├── faculty-insights-react/            # Frontend Application
│   ├── src/
│   │   ├── App.tsx                    # Main application
│   │   └── components/                # React components
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

### Development Commands

```bash
# Backend development (with auto-reload)
cd faculty-insights-backend
npm run dev

# Frontend development (with hot reload)
cd faculty-insights-react
npm start

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run type-check
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code style and quality enforcement
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit validation

## Deployment

### Production Build

1. **Build the applications**
   ```bash
   # Backend
   cd faculty-insights-backend
   npm run build
   
   # Frontend
   cd faculty-insights-react
   npm run build
   ```

2. **Environment configuration**
   ```bash
   # Set production environment variables
   NODE_ENV=production
   PORT=3001
   ```

3. **Process management**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start backend with PM2
   pm2 start dist/index.js --name "faculty-insights-api"
   ```

4. **Reverse proxy setup (nginx)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Serve frontend
       location / {
           root /path/to/faculty-insights-react/build;
           try_files $uri $uri/ /index.html;
       }
       
       # Proxy API requests
       location /api {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Ensure code quality**
   ```bash
   npm run lint
   npm run type-check
   ```
6. **Submit a pull request**

### Code Standards

- Follow TypeScript best practices
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed
- Follow the existing code style

### Issue Reporting

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, etc.)

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Built using modern web technologies**