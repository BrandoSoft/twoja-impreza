require('dotenv').config();

const config = {
    port: Number(process.env.PORT) || 3000,
    database_name: process.env.BASENAME,
    database_pass: process.env.BASEPASS,
}

module.exports = config;