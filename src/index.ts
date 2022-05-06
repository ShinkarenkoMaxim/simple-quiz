import 'dotenv/config';
import { Bot } from 'grammy';
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

import { transformInitData, validate } from './tgAuthHelper';

const bot = new Bot(process.env.BOT_TOKEN);
const app = express();

app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/sendAnswer', async (req, res) => {
  const data = req.body;
  const COUNT_OF_QUESTIONS = 3;

  // If has not auth data - send Bad Request
  let initData = data._auth;
  if (!initData) {
    res.sendStatus(400).end();
    return;
  }

  // Check authorization with Telegram
  initData = transformInitData(initData);
  const isValid = await validate(initData, process.env.BOT_TOKEN);
  if (!isValid) {
    res.status(403).end();
    return;
  }

  // Reply to user
  await bot.api.answerWebAppQuery(initData.query_id, {
    type: 'article',
    id: '1',
    title: 'Title', // empty
    input_message_content: {
      message_text: `Right answers: ${data.result} of ${COUNT_OF_QUESTIONS}`,
    },
  });

  res.status(200).end();
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
