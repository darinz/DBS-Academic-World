import { Router } from 'express';
import { 
  getInstitutes, 
  getFaculties, 
  getFacultyData, 
  addFaculty, 
  deleteFaculty 
} from '../utils/neo4j';

const router = Router();

// Get all institutes
router.get('/institutes', async (req, res) => {
  try {
    const institutes = await getInstitutes();
    res.json({ status: 'success', data: institutes });
  } catch (error) {
    console.error('Error fetching institutes:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch institutes' });
  }
});

// Get faculties by institute
router.get('/faculties/:instituteName', async (req, res) => {
  try {
    const { instituteName } = req.params;
    const faculties = await getFaculties(instituteName);
    res.json({ status: 'success', data: faculties });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch faculties' });
  }
});

// Get faculty data
router.get('/data/:facultyName', async (req, res) => {
  try {
    const { facultyName } = req.params;
    const facultyData = await getFacultyData(facultyName);
    res.json({ status: 'success', data: facultyData });
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch faculty data' });
  }
});

// Add new faculty
router.post('/add', async (req, res) => {
  try {
    const facultyData = req.body;
    await addFaculty(facultyData);
    res.json({ status: 'success', message: 'Faculty added successfully' });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ status: 'error', message: 'Failed to add faculty' });
  }
});

// Delete faculty
router.delete('/delete', async (req, res) => {
  try {
    const { facultyName, instituteName } = req.body;
    await deleteFaculty(facultyName, instituteName);
    res.json({ status: 'success', message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete faculty' });
  }
});

export { router as facultyRoutes }; 