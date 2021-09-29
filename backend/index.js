const app = require('../backend/app')  // Express aplikacija
const http = require('http')
const config = require('../backend/utils/config')
const logger = require('../backend/utils/logger')
 
const server = http.createServer(app)
 
server.listen(config.PORT, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
});




