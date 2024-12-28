const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
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

// PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Test the connection
sequelize.authenticate()
    .then(async () => {
        console.log('Connected to PostgreSQL');
        try {
            // Sync all models
            await sequelize.sync();
            console.log('Database synchronized');
            
            // Seed the database with sample data
            await seedDatabase(Property);
            console.log('Database seeded successfully');
        } catch (error) {
            console.error('Error setting up database:', error);
        }
    })
    .catch(error => {
        console.error('PostgreSQL connection error:', error);
    });

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
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
        }
    });
});