const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('shopOptimizer', 'postgres', '1555', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
});

const initModels = require("./models/init-models");
const models = initModels(sequelize);

// We export the sequelize connection instance to be used around our app.
//sequelize-auto -o "./database" -d shopOptimizer -h localhost -u postgres -p 5432 -x 1555 -e postgres
module.exports = models;