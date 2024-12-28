const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Property extends Model {}

Property.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    zoning: {
        type: DataTypes.STRING
    },
    parcelNo: {
        type: DataTypes.STRING
    },
    blockNo: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
}, {
    sequelize,
    modelName: 'Property',
    timestamps: true // This will automatically manage createdAt and updatedAt
});

module.exports = Property; 