import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import FacultyMap from './components/FacultyMap';
import FacultyTable from './components/FacultyTable';
import PublicationSearch from './components/PublicationSearch';
import CitationTrends from './components/CitationTrends';
import FacultyManagement from './components/FacultyManagement';
import SunburstChart from './components/SunburstChart';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/">Faculty Insights & Connections</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/faculty-map">Faculty Map</Nav.Link>
                <Nav.Link href="/faculty-table">Faculty Directory</Nav.Link>
                <Nav.Link href="/publications">Publications</Nav.Link>
                <Nav.Link href="/citations">Citation Trends</Nav.Link>
                <Nav.Link href="/sunburst">Research Areas</Nav.Link>
                <Nav.Link href="/management">Faculty Management</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty-map" element={<FacultyMap />} />
            <Route path="/faculty-table" element={<FacultyTable />} />
            <Route path="/publications" element={<PublicationSearch />} />
            <Route path="/citations" element={<CitationTrends />} />
            <Route path="/sunburst" element={<SunburstChart />} />
            <Route path="/management" element={<FacultyManagement />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-4">Faculty Insights and Connections Analytics</h1>
      <p className="lead">
        Discover and connect with the right faculty across U.S. universities.
      </p>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Faculty Map</h5>
              <p className="card-text">View CS faculty distribution across U.S. universities on an interactive map.</p>
              <a href="/faculty-map" className="btn btn-primary">Explore Map</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Faculty Directory</h5>
              <p className="card-text">Browse faculty profiles, contact information, and research interests.</p>
              <a href="/faculty-table" className="btn btn-primary">Browse Faculty</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Publications</h5>
              <p className="card-text">Search publications by keyword or faculty member.</p>
              <a href="/publications" className="btn btn-primary">Search Publications</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
