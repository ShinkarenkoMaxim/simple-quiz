import 'dotenv/config';
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/demo', (req, res) => {
  res.send({
    success: true,
    message: 'Hello World!',
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
