require('dotenv').config(); //instantiate environtment variable

let CONFIG = {} //make this global to use all over application

CONFIG.app            = process.env.APP || 'dev';
CONFIG.port           = process.env.PORT || '4500';

CONFIG.db_dialect     = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host        = process.env.DB_HOST || 'localhost';
CONFIG.db_port        = process.env.DB_PORT || '3306';
CONFIG.db_name        = process.env.DB_NAME || 'crud-sequel';
CONFIG.db_user        = process.env.DB_USER || 'root';
CONFIG.db_password    = process.env.DB_PASSWORD || '12345';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'secret_key';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '360000';

module.exports = CONFIG;


