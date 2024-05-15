// p1
const { create } = require('venom-bot');

const defaultOptions = {
  // ...
};

const TARGET_NUMBER = '6283166807844@c.us';
const AUTOMATIC_MESSAGE = 'Ini adalah pesan otomatis dari Venom-Bot';

const startClient = (client) => {
  console.log('Client started!');
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro);
        });
    }
  });

  setInterval(() => {
    sendAutomaticMessage(client);
  }, 60000); // time 1m
};

const sendAutomaticMessage = (client) => {
  client.sendText(TARGET_NUMBER, AUTOMATIC_MESSAGE)
    .then((result) => {
      console.log('Pesan terkirim:', result);
    })
    .catch((erro) => {
      console.error('Pesan gagal terkirim:', erro);
    });
};

const catchQR = (base64Qrimg, asciiQR, attempts, urlCode) => {
  console.log('Number of attempts to read the qrcode: ', attempts);
  console.log('Terminal qrcode: ', asciiQR);
  console.log('base64 image string qrcode: ', base64Qrimg);
  console.log('urlCode (data-ref): ', urlCode);
};

const statusFind = (statusSession, session) => {
  console.log('Status Session: ', statusSession);
  console.log('Session name: ', session);
};

const browserInstance = (browser, waPage) => {
  console.log('Browser PID:', browser.process().pid);
  waPage.screenshot({ path: 'screenshot.png' });
};

const options = {
  ...defaultOptions,
  // Override default options here
  browserPathExecutable: '/usr/lib/chromium',
  folderNameToken: 'my-tokens',
  headless: true,
  devtools: true,
  args: ['--no-sandbox'],
};

create('sessionName', catchQR, statusFind, options, browserInstance)
  .then((client) => {
    startClient(client);
  })
  .catch((erro) => {
    console.log(erro);
  });