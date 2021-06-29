require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  RDS_HOSTNAME: process.env.RDS_HOSTNAME,
  RDS_USERNAME: process.env.RDS_USERNAME,
  RDS_PASSWORD: process.env.RDS_PASSWORD,
  RDS_PORT: process.env.RDS_PORT,
  RDS_DB_NAME: process.env.RDS_DB_NAME,
  TEST_RDS_DB_NAME: process.env.TEST_RDS_DB_NAME,
}
