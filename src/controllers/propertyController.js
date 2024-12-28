const Property = require('../models/Property');

// Tüm arsaları getir
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yeni arsa ekle
exports.createProperty = async (req, res) => {
    try {
        const propertyData = JSON.parse(req.body.data);
        
        // Yüklenen resimlerin yollarını ekle
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        propertyData.images = images;

        const property = new Property(propertyData);
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Tek bir arsa getir
exports.getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Arsa bulunamadı' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Arsa güncelle
exports.updateProperty = async (req, res) => {
    try {
        const propertyData = JSON.parse(req.body.data);
        
        // Yeni resimler yüklendiyse ekle
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            propertyData.images = [...(propertyData.images || []), ...newImages];
        }

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            propertyData,
            { new: true }
        );

        if (!property) {
            return res.status(404).json({ message: 'Arsa bulunamadı' });
        }
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Arsa sil
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Arsa bulunamadı' });
        }
        // TODO: İlişkili resimleri de sil
        res.json({ message: 'Arsa başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dashboard istatistiklerini getir
exports.getDashboardStats = async (req, res) => {
    try {
        const totalProperties = await Property.countDocuments();
        const properties = await Property.find();
        
        const totalValue = properties.reduce((sum, property) => sum + property.price, 0);
        const cities = [...new Set(properties.map(p => p.location.city))];
        
        // Günlük ziyaretçi sayısını gerçek bir analytics servisinden almalısınız
        // Şimdilik dummy data
        const dailyVisitors = Math.floor(Math.random() * 100) + 50;

        res.json({
            totalProperties,
            totalValue,
            dailyVisitors,
            activeCities: cities.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 