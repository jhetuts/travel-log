const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());


const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})