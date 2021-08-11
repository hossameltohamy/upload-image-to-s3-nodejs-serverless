const app = require('./server.js');
const port = process.env.PORT || 8000;

// Server running in locale
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});