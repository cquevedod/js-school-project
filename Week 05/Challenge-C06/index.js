const app = require('./app');
require('./startup/logging');
require('./startup/db')();

const port = process.env.PORT || 3977;

app.listen(port, function () {
  console.log(`Server listening at http://localhost:${port}`);
});