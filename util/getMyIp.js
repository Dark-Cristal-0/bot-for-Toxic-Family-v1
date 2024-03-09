const https = require('https');

https.get('https://api.ipify.org', (res) => {
  res.on('data', (ip) => {
    console.log(`Ваша зовнішня IP-адреса: ${ip}`);
  });
});
