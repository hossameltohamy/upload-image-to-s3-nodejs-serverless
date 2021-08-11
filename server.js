/**
 * @file server is the root  app
 * @author Hossam Yahia
 * @see <a href="https://github.com/hossameltohamy/upload-image-to-s3-nodejs-serverless">project repo </a>
 */

const path = require('path');

/**
 * express Framework npm imported
 * @type {NPM}
 */
const express = require('express');
const dotenv = require('dotenv');


/**
 * import morgan npm for development purpose
 * @type {NPM}
 */
const morgan = require('morgan');
const colors = require('colors');

const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
/**
 * helmet for Secure ExpressJS Application
 * @type {NPM}
 */
const helmet = require('helmet');
/**
 * xss for Secure ExpressJS Application (avoid XSS Attacks)
 * @type {NPM}
 */
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

/**
 * TO mange error response
 * @type {Error-midleware}
 */
const errorHandler = require('./middleware/error');

/**
 * connect with mongo db
 * @type {string}
 */
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

//Route files
/**
 * import auth route
 * @type {Route}
 */
const auth = require('./routes/auth');
/**
 * import users route
 * @type {Route}
 */
const users = require('./routes/users');

const upload = require('./routes/uploade');

const app = express();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * To Upload files
 *@type {NPM}
 **/
const fileUpload = require('express-fileupload');
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());
/**
 * set view enging
 *
 */
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index.html'));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use('/api/v1/upload', upload);

// handle erros
app.use(errorHandler);

// const PORT = process.env.PORT || 3000;

// const server = app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  //server.close(() => process.exit(1));
});
module.exports = app;