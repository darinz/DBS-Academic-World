import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { facultyRoutes } from './routes/faculty';
import { publicationRoutes } from './routes/publications';
import { collegeRoutes } from './routes/colleges';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/colleges', collegeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Faculty Insights API is running' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 