import mysql from 'mysql2/promise';

let connection: mysql.Connection;

export interface Publication {
  id: string;
  title: string;
  year: number;
  citations: number;
  authors: string[];
  venue: string;
}

export interface CitationTrend {
  year: number;
  citations: number;
}

export async function connectToMySQL(): Promise<void> {
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'academicworld'
    });
    console.log('Connected to MySQL');
  } catch (error) {
    console.error('MySQL connection failed:', error);
    throw error;
  }
}

export async function getPublicationsByKeyword(keyword: string): Promise<Publication[]> {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        p.id,
        p.title,
        p.year,
        p.citations,
        p.venue,
        GROUP_CONCAT(a.name) as authors
      FROM publications p
      JOIN publication_keywords pk ON p.id = pk.publication_id
      JOIN keywords k ON pk.keyword_id = k.id
      JOIN publication_authors pa ON p.id = pa.publication_id
      JOIN authors a ON pa.author_id = a.id
      WHERE k.name LIKE ?
      GROUP BY p.id
      ORDER BY p.citations DESC, p.year DESC
    `, [`%${keyword}%`]);

    return (rows as any[]).map(row => ({
      id: row.id,
      title: row.title,
      year: row.year,
      citations: row.citations,
      venue: row.venue,
      authors: row.authors ? row.authors.split(',') : []
    }));
  } catch (error) {
    console.error('Error fetching publications by keyword:', error);
    throw error;
  }
}

export async function getPublicationsByFaculty(facultyName: string): Promise<Publication[]> {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        p.id,
        p.title,
        p.year,
        p.citations,
        p.venue,
        GROUP_CONCAT(a.name) as authors
      FROM publications p
      JOIN publication_authors pa ON p.id = pa.publication_id
      JOIN authors a ON pa.author_id = a.id
      WHERE a.name LIKE ?
      GROUP BY p.id
      ORDER BY p.citations DESC, p.year DESC
    `, [`%${facultyName}%`]);

    return (rows as any[]).map(row => ({
      id: row.id,
      title: row.title,
      year: row.year,
      citations: row.citations,
      venue: row.venue,
      authors: row.authors ? row.authors.split(',') : []
    }));
  } catch (error) {
    console.error('Error fetching publications by faculty:', error);
    throw error;
  }
}

export async function getCitationTrends(keyword: string, facultyName: string, startYear: number, endYear: number): Promise<CitationTrend[]> {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        p.year,
        SUM(p.citations) as total_citations
      FROM publications p
      JOIN publication_keywords pk ON p.id = pk.publication_id
      JOIN keywords k ON pk.keyword_id = k.id
      JOIN publication_authors pa ON p.id = pa.publication_id
      JOIN authors a ON pa.author_id = a.id
      WHERE k.name LIKE ? 
        AND a.name LIKE ?
        AND p.year BETWEEN ? AND ?
      GROUP BY p.year
      ORDER BY p.year
    `, [`%${keyword}%`, `%${facultyName}%`, startYear, endYear]);

    return (rows as any[]).map(row => ({
      year: row.year,
      citations: row.total_citations
    }));
  } catch (error) {
    console.error('Error fetching citation trends:', error);
    throw error;
  }
}

export async function closeMySQL(): Promise<void> {
  if (connection) {
    await connection.end();
  }
} 