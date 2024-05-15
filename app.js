// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
  setInterval(() => {
    const targetNumber = '6283166807844@c.us'; //nomer
    const message = 'Ini adalah pesan otomatis dari Venom-Bot';
    client.sendText(targetNumber, message)
        .then((result) => {
            console.log('Pesan terkirim:', result);
        })
        .catch((erro) => {
            console.error('Pesan gagal terkirim:', erro);
        });
  }, 60000); //time 1m
}

