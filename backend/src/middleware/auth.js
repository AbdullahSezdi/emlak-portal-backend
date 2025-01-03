const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const admin = await Admin.findOne({ _id: decoded.id });

        if (!admin) {
            throw new Error();
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Lütfen giriş yapın' });
    }
};

module.exports = auth; 