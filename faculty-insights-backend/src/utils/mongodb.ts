import { MongoClient, Db } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

const DB_NAME = 'academicworld';
const COLLEGE_FACULTY_CSV = path.join(__dirname, '../../../data/college_faculty.csv');
const FACULTY_KEYWORDS_CSV = path.join(__dirname, '../../../data/faculty_keywords.csv');

let client: MongoClient;
let db: Db;

export interface CollegeFaculty {
  college: string;
  professors: number;
  lat: number;
  lon: number;
}

export interface FacultyKeyword {
  professors: string;
  keywords: string;
}

export async function connectToMongoDB(): Promise<void> {
  try {
    client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export async function getCollegeMap(): Promise<CollegeFaculty[]> {
  if (!fs.existsSync(COLLEGE_FACULTY_CSV)) {
    await generateCollegeMapCSV();
  }
  
  const csvData = fs.readFileSync(COLLEGE_FACULTY_CSV, 'utf-8');
  const lines = csvData.split('\n').slice(1); // Skip header
  
  return lines
    .filter(line => line.trim())
    .map(line => {
      const [college, professors, lat, lon] = line.split(',');
      return {
        college,
        professors: parseInt(professors),
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      };
    });
}

export async function getFacultyKeywords(): Promise<FacultyKeyword[]> {
  if (!fs.existsSync(FACULTY_KEYWORDS_CSV)) {
    await generateFacultyKeywordsCSV();
  }
  
  const csvData = fs.readFileSync(FACULTY_KEYWORDS_CSV, 'utf-8');
  const lines = csvData.split('\n').slice(1); // Skip header
  
  return lines
    .filter(line => line.trim())
    .map(line => {
      const [professors, keywords] = line.split(',');
      return { professors, keywords };
    });
}

async function generateCollegeMapCSV(): Promise<void> {
  try {
    const collection = db.collection('faculty');
    const colleges = await collection.distinct('affiliation.name');
    
    const data: CollegeFaculty[] = [];
    
    for (const college of colleges) {
      const numProfessors = await collection.countDocuments({ 'affiliation.name': college });
      const lat = 0; // You would implement geocoding here
      const lon = 0; // You would implement geocoding here
      
      data.push({ college, professors: numProfessors, lat, lon });
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(COLLEGE_FACULTY_CSV);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const csvContent = 'college,professors,lat,lon\n' + 
      data.map(row => `${row.college},${row.professors},${row.lat},${row.lon}`).join('\n');
    
    fs.writeFileSync(COLLEGE_FACULTY_CSV, csvContent);
  } catch (error) {
    console.error('Error generating college map CSV:', error);
    throw error;
  }
}

async function generateFacultyKeywordsCSV(): Promise<void> {
  try {
    const collection = db.collection('faculty');
    const names = await collection.distinct('name');
    
    const data: FacultyKeyword[] = [];
    
    for (const name of names) {
      const faculty = await collection.findOne({ name }, { projection: { keywords: 1 } });
      const keywords = faculty?.keywords || [];
      const keywordsStr = JSON.stringify(keywords);
      
      data.push({ professors: name, keywords: keywordsStr });
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(FACULTY_KEYWORDS_CSV);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const csvContent = 'professors,keywords\n' + 
      data.map(row => `${row.professors},${row.keywords}`).join('\n');
    
    fs.writeFileSync(FACULTY_KEYWORDS_CSV, csvContent);
  } catch (error) {
    console.error('Error generating faculty keywords CSV:', error);
    throw error;
  }
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
  }
} 