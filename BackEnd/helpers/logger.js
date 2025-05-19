import winston from 'winston';
import path from 'path';

//Esto es para guardar excpeciones en archivo log

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message, stack})=> {
            return `[${timestamp}] ${level}: ${stack || message}`;
        })
    ),
    transports: [
        new winston.transports.File({filename: path.join('logs', 'errors.log')}),
    ],
})

export default logger;