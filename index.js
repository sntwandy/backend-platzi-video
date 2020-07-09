const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Middleware Body Parser
app.use(express.json());

moviesApi(app);

// Catch 404 error
app.use(notFoundHandler);

// Middlewares about errors was at the end.
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});