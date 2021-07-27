require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/mainRouter');

(async () => {
  const app = express();

  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  app.use(cors());

  app.use(mainRouter);

  app.listen(PORT, () => {
    console.log('Server was started on port', PORT);
  });
})();
