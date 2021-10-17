const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelizeConnection')

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    age: DataTypes.INTEGER,
    email: {
        type: DataTypes.TEXT,
        defaultValue: "Sem email"
    }
}, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'users',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const syncUser = async () => {
    await User.sync({ alter: true })
    console.log("User table altered!");
}

const dropTable = async () => {
    await User.drop();
    console.log("User table dropped!");
}
