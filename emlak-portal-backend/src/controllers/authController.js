const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin girişi
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Admin oluştur (sadece ilk admin için kullanılacak)
exports.createAdmin = async (req, res) => {
    try {
        // Sadece bir admin hesabı olabilir
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin hesabı zaten mevcut' });
        }

        const hashedPassword = await bcrypt.hash('mekanınsahibi', 10);
        const admin = new Admin({
            username: 'hacı',
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin hesabı oluşturuldu' });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
}; 