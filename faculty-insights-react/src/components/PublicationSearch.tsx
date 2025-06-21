import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Table, Badge, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

interface Publication {
  id: string;
  title: string;
  year: number;
  citations: number;
  authors: string[];
  venue: string;
}

const PublicationSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'keyword' | 'faculty'>('keyword');

  const searchByKeyword = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:3001/api/publications/keyword/${encodeURIComponent(keyword)}`);
      if (response.data.status === 'success') {
        setPublications(response.data.data);
      } else {
        setError('Failed to fetch publications');
      }
    } catch (err) {
      console.error('Error searching publications:', err);
      setError('Error searching publications');
    } finally {
      setLoading(false);
    }
  };

  const searchByFaculty = async () => {
    if (!facultyName.trim()) {
      setError('Please enter a faculty name');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:3001/api/publications/faculty/${encodeURIComponent(facultyName)}`);
      if (response.data.status === 'success') {
        setPublications(response.data.data);
      } else {
        setError('Failed to fetch publications');
      }
    } catch (err) {
      console.error('Error searching publications:', err);
      setError('Error searching publications');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchType === 'keyword') {
      searchByKeyword();
    } else {
      searchByFaculty();
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Publication Search</h1>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Tabs
                activeKey={searchType}
                onSelect={(k) => setSearchType(k as 'keyword' | 'faculty')}
                className="mb-0"
              >
                <Tab eventKey="keyword" title="Search by Keyword">
                  <div className="mt-3">
                    <Form.Group>
                      <Form.Label>Enter Keyword</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., machine learning, artificial intelligence"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </Form.Group>
                  </div>
                </Tab>
                <Tab eventKey="faculty" title="Search by Faculty">
                  <div className="mt-3">
                    <Form.Group>
                      <Form.Label>Enter Faculty Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., John Smith"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </Form.Group>
                  </div>
                </Tab>
              </Tabs>
            </Card.Header>
            <Card.Body>
              <Button 
                variant="primary" 
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search Publications'}
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

      {publications.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5>
                  Publications Found: {publications.length}
                  {searchType === 'keyword' && keyword && (
                    <span className="text-muted"> for "{keyword}"</span>
                  )}
                  {searchType === 'faculty' && facultyName && (
                    <span className="text-muted"> by "{facultyName}"</span>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Year</th>
                        <th>Citations</th>
                        <th>Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publications.map((pub, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{pub.title}</strong>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {pub.authors.slice(0, 3).map((author, idx) => (
                                <Badge key={idx} bg="secondary">
                                  {author}
                                </Badge>
                              ))}
                              {pub.authors.length > 3 && (
                                <Badge bg="light" text="dark">
                                  +{pub.authors.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td>
                            <Badge bg="info">{pub.year}</Badge>
                          </td>
                          <td>
                            <Badge bg="success">{pub.citations}</Badge>
                          </td>
                          <td>
                            <small className="text-muted">{pub.venue}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {publications.length === 0 && !loading && !error && (
        <Row>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h5>No Publications Found</h5>
                <p className="text-muted">
                  Try searching with different keywords or faculty names.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PublicationSearch; 