const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Admin extends Model {}

Admin.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Admin',
    timestamps: true // This will automatically manage createdAt
});

module.exports = Admin; 