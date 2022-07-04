import log from 'loglevel';

log.setDefaultLevel(log.levels.ERROR);
log.setLevel(log.levels.ERROR);

if (process.env.NODE_ENV !== 'production') {
  log.setDefaultLevel(log.levels.DEBUG);
  log.setLevel(log.levels.DEBUG);
}

export default log;
