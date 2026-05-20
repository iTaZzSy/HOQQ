import express from 'express';
import cors from 'cors';
import path from 'path';
import reservationRoutes from './routes/reservation.routes';
import menuRoutes from './routes/menu.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// --- API Routes ---
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);


// --- Health Check Route ---
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// --- Serve Frontend Static Files ---
app.use(express.static(path.join(process.cwd(), 'dist')));

// --- Wildcard Route for Single Page Application ---
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

export default app;
