import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Badge } from 'react-bootstrap';
import axios from 'axios';

interface KeywordInstitute {
  keyword: string;
  institute: string;
  faculty: string;
}

const SunburstChart: React.FC = () => {
  const [keywordInstituteData, setKeywordInstituteData] = useState<KeywordInstitute[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKeywordInstituteData();
  }, []);

  const fetchKeywordInstituteData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/colleges/keyword-institute');
      if (response.data.status === 'success') {
        setKeywordInstituteData(response.data.data);
      } else {
        setError('Failed to fetch keyword-institute data');
      }
    } catch (err) {
      console.error('Error fetching keyword-institute data:', err);
      setError('Error fetching keyword-institute data');
    } finally {
      setLoading(false);
    }
  };

  const uniqueKeywords = Array.from(new Set(keywordInstituteData.map(item => item.keyword)));
  const uniqueInstitutes = Array.from(new Set(keywordInstituteData.map(item => item.institute)));

  const filteredData = keywordInstituteData.filter(item => {
    const keywordMatch = selectedKeywords.length === 0 || selectedKeywords.includes(item.keyword);
    const instituteMatch = selectedInstitutes.length === 0 || selectedInstitutes.includes(item.institute);
    return keywordMatch && instituteMatch;
  });

  const keywordStats = uniqueKeywords.map(keyword => {
    const keywordData = filteredData.filter(item => item.keyword === keyword);
    const institutes = Array.from(new Set(keywordData.map(item => item.institute)));
    const faculties = Array.from(new Set(keywordData.map(item => item.faculty)));
    
    return {
      keyword,
      instituteCount: institutes.length,
      facultyCount: faculties.length,
      institutes
    };
  });

  const instituteStats = uniqueInstitutes.map(institute => {
    const instituteData = filteredData.filter(item => item.institute === institute);
    const keywords = Array.from(new Set(instituteData.map(item => item.keyword)));
    const faculties = Array.from(new Set(instituteData.map(item => item.faculty)));
    
    return {
      institute,
      keywordCount: keywords.length,
      facultyCount: faculties.length,
      keywords
    };
  });

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleInstituteToggle = (institute: string) => {
    setSelectedInstitutes(prev => 
      prev.includes(institute) 
        ? prev.filter(i => i !== institute)
        : [...prev, institute]
    );
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center">
          <h2>Loading Research Areas...</h2>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center">
          <h2>Error: {error}</h2>
          <button className="btn btn-primary" onClick={fetchKeywordInstituteData}>
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center mb-4">Compare Keywords Across Institutes</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Filter by Keywords</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                {uniqueKeywords.map(keyword => (
                  <Badge
                    key={keyword}
                    bg={selectedKeywords.includes(keyword) ? 'primary' : 'secondary'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleKeywordToggle(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              {selectedKeywords.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    Selected: {selectedKeywords.join(', ')}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Filter by Institutes</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                {uniqueInstitutes.slice(0, 20).map(institute => (
                  <Badge
                    key={institute}
                    bg={selectedInstitutes.includes(institute) ? 'success' : 'light'}
                    text={selectedInstitutes.includes(institute) ? 'white' : 'dark'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleInstituteToggle(institute)}
                  >
                    {institute}
                  </Badge>
                ))}
              </div>
              {selectedInstitutes.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    Selected: {selectedInstitutes.join(', ')}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Research Areas Distribution</h5>
              <small className="text-muted">
                Showing {filteredData.length} faculty-keyword relationships
              </small>
            </Card.Header>
            <Card.Body>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  📊
                </div>
                <h4>Interactive Sunburst Chart</h4>
                <p>This would display an interactive sunburst chart showing the distribution of research keywords across institutes.</p>
                <p>In a full implementation, this would use a charting library like D3.js or Chart.js.</p>
                
                <div className="mt-4">
                  <h6>Summary Statistics:</h6>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <div className="bg-white bg-opacity-25 p-3 rounded">
                        <h5>{uniqueKeywords.length}</h5>
                        <small>Keywords</small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-white bg-opacity-25 p-3 rounded">
                        <h5>{uniqueInstitutes.length}</h5>
                        <small>Institutes</small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-white bg-opacity-25 p-3 rounded">
                        <h5>{filteredData.length}</h5>
                        <small>Relationships</small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="bg-white bg-opacity-25 p-3 rounded">
                        <h5>{Array.from(new Set(filteredData.map(item => item.faculty))).length}</h5>
                        <small>Faculty</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Keyword Statistics</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                {keywordStats
                  .sort((a, b) => b.facultyCount - a.facultyCount)
                  .slice(0, 10)
                  .map((stat, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                      <div>
                        <strong>{stat.keyword}</strong>
                        <br />
                        <small className="text-muted">
                          {stat.instituteCount} institutes, {stat.facultyCount} faculty
                        </small>
                      </div>
                      <Badge bg="primary">{stat.facultyCount}</Badge>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Institute Statistics</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                {instituteStats
                  .sort((a, b) => b.keywordCount - a.keywordCount)
                  .slice(0, 10)
                  .map((stat, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                      <div>
                        <strong>{stat.institute}</strong>
                        <br />
                        <small className="text-muted">
                          {stat.keywordCount} keywords, {stat.facultyCount} faculty
                        </small>
                      </div>
                      <Badge bg="success">{stat.keywordCount}</Badge>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SunburstChart; 