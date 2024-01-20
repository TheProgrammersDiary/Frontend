const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = 3000;
const passphrase = process.env.ssl_blog_passphrase;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync('./ssl_private_key.pem'),
    passphrase: passphrase,
    cert: fs.readFileSync('./ssl_certificate.pem')
};
app.prepare().then(() => {
    try {
    createServer(httpsOptions, async (req, res) => {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log('ready - started server on url: https://localhost:' + port);
    });
} catch (error) {
    console.error('Error starting the server:', error);
  }
});