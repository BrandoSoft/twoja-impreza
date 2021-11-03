require('dotenv').config();

const config = {
    port: Number(process.env.PORT) || 3000,
    database_name: process.env.DBNAME,
    database_pass: process.env.DBPASS,
}

module.exports = config;