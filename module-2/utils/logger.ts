import { createLogger, format, transports, Logform } from 'winston';
const { combine, colorize, timestamp, printf } = format;

const colors = {
  info: 'green',
  error: 'red',
};

const formattedInfo = ({
  timestamp,
  level,
  message,
}: Logform.TransformableInfo) => `${timestamp} ${level}: ${message}`;

const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(
    colorize({ colors, all: true }),
    timestamp(),
    printf(formattedInfo)
  ),
});

export default logger;
