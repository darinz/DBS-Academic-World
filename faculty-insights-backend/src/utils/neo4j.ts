import neo4j, { Driver, Session } from 'neo4j-driver';

let driver: Driver;

export interface Institute {
  value: string;
  label: string;
}

export interface Faculty {
  value: string;
  label: string;
}

export interface FacultyData {
  name: string;
  position: string;
  email: string;
  phone: string;
  photoUrl: string;
  institute_name: string;
}

export interface KeywordInstitute {
  keyword: string;
  institute: string;
  faculty: string;
}

export async function connectToNeo4j(): Promise<void> {
  try {
    driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'password'
      )
    );
    
    // Test the connection
    const session = driver.session();
    await session.run('RETURN 1');
    await session.close();
    
    console.log('Connected to Neo4j');
  } catch (error) {
    console.error('Neo4j connection failed:', error);
    throw error;
  }
}

export async function getInstitutes(): Promise<Institute[]> {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (i:Institute)
      RETURN i.name as name
      ORDER BY i.name
    `);
    
    return result.records.map(record => ({
      value: record.get('name'),
      label: record.get('name')
    }));
  } finally {
    await session.close();
  }
}

export async function getFaculties(instituteName: string): Promise<Faculty[]> {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (f:Faculty)-[:WORKS_AT]->(i:Institute)
      WHERE i.name = $instituteName
      RETURN f.name as name
      ORDER BY f.name
    `, { instituteName });
    
    return result.records.map(record => ({
      value: record.get('name'),
      label: record.get('name')
    }));
  } finally {
    await session.close();
  }
}

export async function getFacultyData(facultyName: string): Promise<{ facultyData: FacultyData; keywords: string[] }> {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (f:Faculty)-[:WORKS_AT]->(i:Institute)
      WHERE f.name = $facultyName
      OPTIONAL MATCH (f)-[:INTERESTED_IN]->(k:Keyword)
      RETURN f.name as name,
             f.position as position,
             f.email as email,
             f.phone as phone,
             f.photoUrl as photoUrl,
             i.name as institute_name,
             collect(k.name) as keywords
    `, { facultyName });
    
    if (result.records.length === 0) {
      throw new Error('Faculty not found');
    }
    
    const record = result.records[0];
    const facultyData: FacultyData = {
      name: record.get('name'),
      position: record.get('position') || 'Unknown',
      email: record.get('email') || 'N/A',
      phone: record.get('phone') || 'N/A',
      photoUrl: record.get('photoUrl') || 'https://via.placeholder.com/150',
      institute_name: record.get('institute_name')
    };
    
    const keywords = record.get('keywords') || [];
    
    return { facultyData, keywords };
  } finally {
    await session.close();
  }
}

export async function getKeywordInstituteData(): Promise<KeywordInstitute[]> {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (f:Faculty)-[:WORKS_AT]->(i:Institute)
      MATCH (f)-[:INTERESTED_IN]->(k:Keyword)
      RETURN k.name as keyword,
             i.name as institute,
             f.name as faculty
      ORDER BY k.name, i.name, f.name
    `);
    
    return result.records.map(record => ({
      keyword: record.get('keyword'),
      institute: record.get('institute'),
      faculty: record.get('faculty')
    }));
  } finally {
    await session.close();
  }
}

export async function addFaculty(facultyData: {
  name: string;
  position: string;
  email: string;
  phone: string;
  instituteName: string;
  keywords: string[];
}): Promise<void> {
  const session = driver.session();
  try {
    await session.run(`
      MERGE (f:Faculty {name: $name})
      SET f.position = $position,
          f.email = $email,
          f.phone = $phone
      MERGE (i:Institute {name: $instituteName})
      MERGE (f)-[:WORKS_AT]->(i)
      WITH f
      UNWIND $keywords as keyword
      MERGE (k:Keyword {name: keyword})
      MERGE (f)-[:INTERESTED_IN]->(k)
    `, facultyData);
  } finally {
    await session.close();
  }
}

export async function deleteFaculty(facultyName: string, instituteName: string): Promise<void> {
  const session = driver.session();
  try {
    await session.run(`
      MATCH (f:Faculty)-[:WORKS_AT]->(i:Institute)
      WHERE f.name = $facultyName AND i.name = $instituteName
      DETACH DELETE f
    `, { facultyName, instituteName });
  } finally {
    await session.close();
  }
}

export async function closeNeo4j(): Promise<void> {
  if (driver) {
    await driver.close();
  }
} 