import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface CollegeData {
  college: string;
  professors: number;
  lat: number;
  lon: number;
}

const FacultyMap: React.FC = () => {
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollegeData();
  }, []);

  const fetchCollegeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/colleges/map');
      if (response.data.status === 'success') {
        setCollegeData(response.data.data);
      } else {
        setError('Failed to fetch college data');
      }
    } catch (err) {
      setError('Error fetching college data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFacultyCountRange = (count: number): string => {
    if (count <= 50) return '0-50';
    if (count <= 100) return '51-100';
    if (count <= 150) return '101-150';
    if (count <= 200) return '151-200';
    return '200+';
  };

  const getColorForRange = (range: string): string => {
    switch (range) {
      case '0-50': return '#e3f2fd';
      case '51-100': return '#bbdefb';
      case '101-150': return '#90caf9';
      case '151-200': return '#64b5f6';
      case '200+': return '#42a5f5';
      default: return '#e3f2fd';
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center">
          <h2>Loading Faculty Map...</h2>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center">
          <h2>Error: {error}</h2>
          <button className="btn btn-primary" onClick={fetchCollegeData}>
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center mb-4">CS Faculty Count in US Map</h1>
      
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div style={{ height: '600px', overflow: 'auto' }}>
                <div className="text-center mb-3">
                  <h5>Faculty Distribution by University</h5>
                  <p>Hover over universities to see faculty counts</p>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(45deg, #e3f2fd, #42a5f5)',
                  padding: '20px',
                  borderRadius: '8px',
                  minHeight: '500px',
                  position: 'relative'
                }}>
                  {/* This is a simplified map representation */}
                  <div className="text-center">
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                      🗺️ Interactive Map View
                    </div>
                    <p>This would display an interactive map showing faculty distribution across U.S. universities.</p>
                    <p>In a full implementation, this would use a mapping library like Leaflet or Google Maps.</p>
                  </div>
                  
                  <div className="mt-4">
                    <h6>Faculty Count Legend:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {['0-50', '51-100', '101-150', '151-200', '200+'].map(range => (
                        <div key={range} className="d-flex align-items-center me-3">
                          <div 
                            style={{ 
                              width: '20px', 
                              height: '20px', 
                              backgroundColor: getColorForRange(range),
                              marginRight: '8px',
                              borderRadius: '4px'
                            }}
                          />
                          <span>{range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5>University Faculty Counts</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>University</th>
                      <th>Faculty Count</th>
                      <th>Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeData
                      .sort((a, b) => b.professors - a.professors)
                      .slice(0, 20)
                      .map((college, index) => (
                        <tr key={index}>
                          <td>{college.college}</td>
                          <td>{college.professors}</td>
                          <td>
                            <span 
                              className="badge"
                              style={{ backgroundColor: getColorForRange(getFacultyCountRange(college.professors)) }}
                            >
                              {getFacultyCountRange(college.professors)}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FacultyMap; 