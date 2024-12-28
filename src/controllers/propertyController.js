const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, area, location, features } = req.body;
    const images = req.files.map(file => file.path.replace('src/', ''));

    const property = new Property({
      title,
      description,
      price,
      area,
      location,
      features: features ? JSON.parse(features) : [],
      images
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const { title, description, price, area, location, features } = req.body;
    const updateData = {
      title,
      description,
      price,
      area,
      location,
      features: features ? JSON.parse(features) : []
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path.replace('src/', ''));
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const properties = await Property.find();
    
    const totalValue = properties.reduce((sum, property) => sum + property.price, 0);
    const uniqueCities = [...new Set(properties.map(property => property.location))].length;

    // Get daily visitors (mock data for now)
    const dailyVisitors = Math.floor(Math.random() * 100) + 50;

    res.json({
      totalProperties,
      totalValue,
      dailyVisitors,
      activeCities: uniqueCities
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 