// p2
const { create } = require('venom-bot');

const defaultOptions = {
  //...
};

const TARGET_NUMBERS = ['6283166807844@c.us', '6287882641012@c.us'];
const AUTOMATIC_MESSAGE_TEXT = 'Ini adalah pesan otomatis dari Venom-Bot';

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
  TARGET_NUMBERS.forEach((targetNumber) => {
    client.sendText(targetNumber, AUTOMATIC_MESSAGE_TEXT)
     .then((result) => {
        console.log(`Pesan terkirim to ${targetNumber}:`, result);
      })
     .catch((erro) => {
        console.error(`Pesan gagal terkirim to ${targetNumber}:`, erro);
      });
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
  waPage.screenshot({ path: 'creenshot.png' });
};

const options = {
 ...defaultOptions,
  // Override default options here
  browserPathExecutable: '/usr/bin/google-chrome-stable',
  folderNameToken: 'y-tokens',
  headless: true,
  devtools: true,
};

create('sessionName', catchQR, statusFind, options, browserInstance)
 .then((client) => {
    startClient(client);
  })
 .catch((erro) => {
    console.log(erro);
  });