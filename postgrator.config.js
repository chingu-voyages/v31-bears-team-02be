require('dotenv').config();

module.exports = {
    database: process.env.RDS_DB_NAME,        
    user:     process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    host: process.env.RDS_HOSTNAME,
    driver: 'pg',
    migrationDirectory: './db/migrations'
}

