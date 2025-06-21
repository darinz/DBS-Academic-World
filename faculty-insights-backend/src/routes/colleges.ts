import { Router } from 'express';
import { getCollegeMap, getFacultyKeywords } from '../utils/mongodb';
import { getKeywordInstituteData } from '../utils/neo4j';

const router = Router();

// Get college map data
router.get('/map', async (req, res) => {
  try {
    const collegeData = await getCollegeMap();
    res.json({ status: 'success', data: collegeData });
  } catch (error) {
    console.error('Error fetching college map data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch college map data' });
  }
});

// Get faculty keywords data
router.get('/faculty-keywords', async (req, res) => {
  try {
    const facultyKeywords = await getFacultyKeywords();
    res.json({ status: 'success', data: facultyKeywords });
  } catch (error) {
    console.error('Error fetching faculty keywords:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch faculty keywords' });
  }
});

// Get keyword-institute data for sunburst chart
router.get('/keyword-institute', async (req, res) => {
  try {
    const keywordInstituteData = await getKeywordInstituteData();
    res.json({ status: 'success', data: keywordInstituteData });
  } catch (error) {
    console.error('Error fetching keyword-institute data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch keyword-institute data' });
  }
});

export { router as collegeRoutes }; 