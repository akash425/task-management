const redis = require('redis');
// const client = redis.createClient(); // Specify your Redis port here

// await client.connect();

// client.on('connect', () => {
//     console.log('Connected to Redis...');
// });

// client.on('error', (err) => {
//     console.log('Redis error: ', err);
// });

// module.exports = client;


let client;

(async () => {
    client = redis.createClient();

    client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
})();

module.exports = client;
