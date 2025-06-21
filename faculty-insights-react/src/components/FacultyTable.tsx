import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

interface Institute {
  value: string;
  label: string;
}

interface Faculty {
  value: string;
  label: string;
}

interface FacultyData {
  name: string;
  position: string;
  email: string;
  phone: string;
  photoUrl: string;
  institute_name: string;
}

const FacultyTable: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [facultyData, setFacultyData] = useState<FacultyData | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  useEffect(() => {
    if (selectedInstitute) {
      fetchFaculties(selectedInstitute);
    }
  }, [selectedInstitute]);

  useEffect(() => {
    if (selectedFaculty) {
      fetchFacultyData(selectedFaculty);
    }
  }, [selectedFaculty]);

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/faculty/institutes');
      if (response.data.status === 'success') {
        setInstitutes(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedInstitute(response.data.data[0].value);
        }
      }
    } catch (err) {
      console.error('Error fetching institutes:', err);
      setError('Failed to fetch institutes');
    }
  };

  const fetchFaculties = async (instituteName: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/faculty/faculties/${encodeURIComponent(instituteName)}`);
      if (response.data.status === 'success') {
        setFaculties(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedFaculty(response.data.data[0].value);
        }
      }
    } catch (err) {
      console.error('Error fetching faculties:', err);
      setError('Failed to fetch faculties');
    }
  };

  const fetchFacultyData = async (facultyName: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/faculty/data/${encodeURIComponent(facultyName)}`);
      if (response.data.status === 'success') {
        setFacultyData(response.data.data.facultyData);
        setKeywords(response.data.data.keywords);
      }
    } catch (err) {
      console.error('Error fetching faculty data:', err);
      setError('Failed to fetch faculty data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Find the Faculty Data</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Institute</Form.Label>
            <Form.Select
              value={selectedInstitute}
              onChange={(e) => setSelectedInstitute(e.target.value)}
            >
              {institutes.map((institute) => (
                <option key={institute.value} value={institute.value}>
                  {institute.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Faculty</Form.Label>
            <Form.Select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              disabled={!selectedInstitute}
            >
              {faculties.map((faculty) => (
                <option key={faculty.value} value={faculty.value}>
                  {faculty.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center">
          <h4>Loading faculty data...</h4>
        </div>
      )}

      {facultyData && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img 
                variant="top" 
                src={facultyData.photoUrl} 
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/200x200?text=No+Photo';
                }}
              />
              <Card.Body>
                <Card.Title>{facultyData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {facultyData.position}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Header>
                <h5>Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td>{facultyData.phone}</td>
                    </tr>
                    <tr>
                      <td><strong>Email</strong></td>
                      <td>{facultyData.email}</td>
                    </tr>
                    <tr>
                      <td><strong>Position</strong></td>
                      <td>{facultyData.position}</td>
                    </tr>
                    <tr>
                      <td><strong>Institute</strong></td>
                      <td>{facultyData.institute_name}</td>
                    </tr>
                  </tbody>
                </Table>
                
                <div className="mt-3">
                  <h6>Top Research Keywords:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {keywords.slice(0, 5).map((keyword, index) => (
                      <Badge key={index} bg="primary">
                        {keyword}
                      </Badge>
                    ))}
                    {keywords.length === 0 && (
                      <span className="text-muted">No keywords available</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FacultyTable; 