const { Sequelize } = require("sequelize");
const node_env = process.env.NODE_ENV || "development";
const dbconfig = require("./config/db.config.json")[node_env];

const db = new Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.password,
  {
    ssl: node_env === "production",
    host: dbconfig.host,
    dialect: dbconfig.dialect,
    dialectOptions: {
      ssl:
        node_env === "production"
          ? {
              rejectUnauthorized: false,
            }
          : false,
    },
    logging: false,
  }
);

module.exports = db;
