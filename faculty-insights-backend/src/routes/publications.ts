import { Router } from 'express';
import { 
  getPublicationsByKeyword, 
  getPublicationsByFaculty, 
  getCitationTrends 
} from '../utils/mysql';

const router = Router();

// Get publications by keyword
router.get('/keyword/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    const publications = await getPublicationsByKeyword(keyword);
    res.json({ status: 'success', data: publications });
  } catch (error) {
    console.error('Error fetching publications by keyword:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch publications' });
  }
});

// Get publications by faculty
router.get('/faculty/:facultyName', async (req, res) => {
  try {
    const { facultyName } = req.params;
    const publications = await getPublicationsByFaculty(facultyName);
    res.json({ status: 'success', data: publications });
  } catch (error) {
    console.error('Error fetching publications by faculty:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch publications' });
  }
});

// Get citation trends
router.get('/citations', async (req, res) => {
  try {
    const { keyword, facultyName, startYear, endYear } = req.query;
    
    if (!keyword || !facultyName || !startYear || !endYear) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required parameters: keyword, facultyName, startYear, endYear' 
      });
    }
    
    const trends = await getCitationTrends(
      keyword as string,
      facultyName as string,
      parseInt(startYear as string),
      parseInt(endYear as string)
    );
    
    res.json({ status: 'success', data: trends });
  } catch (error) {
    console.error('Error fetching citation trends:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch citation trends' });
  }
});

export { router as publicationRoutes }; 