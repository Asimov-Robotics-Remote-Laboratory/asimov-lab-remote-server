const express = require ('express');
const http = require ('http');
const cors = require ('cors');
const config = require('config');
const history = require('connect-history-api-fallback');
const websocket = require('./sockets/main-websocket');
const connectDB = require('./database/connectDB');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || config.get('serverPort');
const {Settings} = require('luxon');

/**
 * Setting TimeZone
 */
Settings.defaultZone = "America/Campo_Grande"

/**
 * DB connection
 */
connectDB();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json({extended: false}));
app.use(history());
app.use('/', express.static(__dirname + '/public'));

/**
 * Routes
 */
app.use('/ws/user', require('./services/user/routes/main'));
app.use('/ws/laboratory', require('./services/laboratory/routes/main'));
app.use('/ws/code', require('./services/code/routes/main'));
app.use('/ws/schedule', require('./services/schedule/routes/main'));

/**
 * Websocket
 */
websocket.startWebSocketServer(httpServer);

/**
 * Application start
 */
httpServer.listen(PORT, () => {
    console.log('HTTP Server listening');
});