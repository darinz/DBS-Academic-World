import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface CitationTrend {
  year: number;
  citations: number;
}

const CitationTrends: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [startYear, setStartYear] = useState(2010);
  const [endYear, setEndYear] = useState(2023);
  const [trends, setTrends] = useState<CitationTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCitationTrends = async () => {
    if (!keyword.trim() || !facultyName.trim()) {
      setError('Please enter both keyword and faculty name');
      return;
    }

    if (startYear >= endYear) {
      setError('Start year must be before end year');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3001/api/publications/citations', {
        params: {
          keyword,
          facultyName,
          startYear,
          endYear
        }
      });
      
      if (response.data.status === 'success') {
        setTrends(response.data.data);
      } else {
        setError('Failed to fetch citation trends');
      }
    } catch (err) {
      console.error('Error fetching citation trends:', err);
      setError('Error fetching citation trends');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - 29 + i);

  return (
    <Container>
      <h1 className="text-center mb-4">Citation Number Trend</h1>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5>Search Parameters</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Keyword</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., machine learning"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Faculty Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., John Smith"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Year</Form.Label>
                    <Form.Select
                      value={startYear}
                      onChange={(e) => setStartYear(parseInt(e.target.value))}
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Year</Form.Label>
                    <Form.Select
                      value={endYear}
                      onChange={(e) => setEndYear(parseInt(e.target.value))}
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Button 
                variant="primary" 
                onClick={fetchCitationTrends}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate Trend Chart'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {trends.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5>
                  Citation Trends for "{keyword}" by {facultyName} ({startYear}-{endYear})
                </h5>
              </Card.Header>
              <Card.Body>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        label={{ value: 'Citations', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Citations']}
                        labelFormatter={(label: number) => `Year: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="citations" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {trends.length === 0 && !loading && !error && (
        <Row>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h5>No Citation Data Available</h5>
                <p className="text-muted">
                  Enter a keyword and faculty name to view citation trends over time.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {trends.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>
                <h5>Trend Summary</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <div className="text-center">
                      <h6>Total Citations</h6>
                      <h4 className="text-primary">
                        {trends.reduce((sum, trend) => sum + trend.citations, 0)}
                      </h4>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center">
                      <h6>Average Citations/Year</h6>
                      <h4 className="text-success">
                        {Math.round(trends.reduce((sum, trend) => sum + trend.citations, 0) / trends.length)}
                      </h4>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center">
                      <h6>Peak Year</h6>
                      <h4 className="text-warning">
                        {trends.reduce((max, trend) => 
                          trend.citations > max.citations ? trend : max
                        ).year}
                      </h4>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center">
                      <h6>Peak Citations</h6>
                      <h4 className="text-danger">
                        {trends.reduce((max, trend) => 
                          trend.citations > max.citations ? trend : max
                        ).citations}
                      </h4>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CitationTrends; 