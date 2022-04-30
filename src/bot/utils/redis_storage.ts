import IORedis from 'ioredis';

const client = new IORedis('redis://localhost:6379/0');

client.on('error', (error) => {
  console.error(error);
});

export default client;
