/* créer un log */
const winston = require('winston');
const logger = winston.createLogger(
  {format: winston.format.combine(winston.format.timestamp(), winston.format.simple())}
);

/* pour le mode dev

logger.add(new winston.transports.Console(
  {level: 'silly'}
));*/


/* pour avoir un fichier log */

logger.add(new winston.transports.File({ filename: './log/error.log', level: 'error' }));
logger.add(new winston.transports.File({ filename: './log/combined.log', level: 'silly'}));

module.exports = logger;
