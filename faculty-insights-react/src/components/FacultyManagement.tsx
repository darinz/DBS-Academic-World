import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

interface AddFacultyData {
  name: string;
  position: string;
  email: string;
  phone: string;
  instituteName: string;
  keywords: string;
}

interface DeleteFacultyData {
  facultyName: string;
  instituteName: string;
}

const FacultyManagement: React.FC = () => {
  const [addFacultyData, setAddFacultyData] = useState<AddFacultyData>({
    name: '',
    position: '',
    email: '',
    phone: '',
    instituteName: '',
    keywords: ''
  });
  
  const [deleteFacultyData, setDeleteFacultyData] = useState<DeleteFacultyData>({
    facultyName: '',
    instituteName: ''
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddFaculty = async () => {
    if (!addFacultyData.name || !addFacultyData.position || !addFacultyData.instituteName) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const keywords = addFacultyData.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const response = await axios.post('http://localhost:3001/api/faculty/add', {
        ...addFacultyData,
        keywords
      });
      
      if (response.data.status === 'success') {
        setMessage({ type: 'success', text: 'Faculty added successfully!' });
        setAddFacultyData({
          name: '',
          position: '',
          email: '',
          phone: '',
          instituteName: '',
          keywords: ''
        });
        setShowAddModal(false);
      } else {
        setMessage({ type: 'error', text: 'Failed to add faculty' });
      }
    } catch (err) {
      console.error('Error adding faculty:', err);
      setMessage({ type: 'error', text: 'Error adding faculty' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaculty = async () => {
    if (!deleteFacultyData.facultyName || !deleteFacultyData.instituteName) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete('http://localhost:3001/api/faculty/delete', {
        data: deleteFacultyData
      });
      
      if (response.data.status === 'success') {
        setMessage({ type: 'success', text: 'Faculty deleted successfully!' });
        setDeleteFacultyData({
          facultyName: '',
          instituteName: ''
        });
        setShowDeleteModal(false);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete faculty' });
      }
    } catch (err) {
      console.error('Error deleting faculty:', err);
      setMessage({ type: 'error', text: 'Error deleting faculty' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Faculty Management</h1>
      
      {message && (
        <Alert 
          variant={message.type === 'success' ? 'success' : 'danger'}
          onClose={() => setMessage(null)}
          dismissible
        >
          {message.text}
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Add New Faculty</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Faculty Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter faculty name"
                    value={addFacultyData.name}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Position *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Assistant Professor"
                    value={addFacultyData.position}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, position: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={addFacultyData.email}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={addFacultyData.phone}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Institute Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter institute name"
                    value={addFacultyData.instituteName}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, instituteName: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Research Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter keywords separated by commas"
                    value={addFacultyData.keywords}
                    onChange={(e) => setAddFacultyData(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                  <Form.Text className="text-muted">
                    Separate multiple keywords with commas (e.g., machine learning, AI, data science)
                  </Form.Text>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  onClick={() => setShowAddModal(true)}
                  disabled={loading}
                >
                  Add Faculty
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Delete Faculty</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Faculty Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter faculty name to delete"
                    value={deleteFacultyData.facultyName}
                    onChange={(e) => setDeleteFacultyData(prev => ({ ...prev, facultyName: e.target.value }))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Institute Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter institute name"
                    value={deleteFacultyData.instituteName}
                    onChange={(e) => setDeleteFacultyData(prev => ({ ...prev, instituteName: e.target.value }))}
                  />
                </Form.Group>
                
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                >
                  Delete Faculty
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Faculty Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Add Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to add the following faculty member?</p>
          <ul>
            <li><strong>Name:</strong> {addFacultyData.name}</li>
            <li><strong>Position:</strong> {addFacultyData.position}</li>
            <li><strong>Institute:</strong> {addFacultyData.instituteName}</li>
            {addFacultyData.email && <li><strong>Email:</strong> {addFacultyData.email}</li>}
            {addFacultyData.phone && <li><strong>Phone:</strong> {addFacultyData.phone}</li>}
            {addFacultyData.keywords && <li><strong>Keywords:</strong> {addFacultyData.keywords}</li>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddFaculty}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Faculty'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Faculty Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following faculty member?</p>
          <ul>
            <li><strong>Name:</strong> {deleteFacultyData.facultyName}</li>
            <li><strong>Institute:</strong> {deleteFacultyData.instituteName}</li>
          </ul>
          <Alert variant="warning">
            <strong>Warning:</strong> This action cannot be undone. All faculty data will be permanently removed.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteFaculty}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Faculty'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FacultyManagement; 