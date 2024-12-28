const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
const Property = require('./models/Property');
const seedDatabase = require('./seedData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);

// Test the connection and sync database
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database');
        
        // Sync all models
        await sequelize.sync();
        console.log('Database synchronized');
        
        // Seed the database with sample data
        await seedDatabase(Property);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

initializeDatabase();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.originalUrl);
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});