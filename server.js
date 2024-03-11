const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const http = require("http");
const fs = require('fs');
const port = process.env.port || 3000;
const passphrase = process.env.ssl_blog_passphrase;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });
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
        console.log('ready - started server on port: ' + port);
    });

    http.createServer(async (req, res) => {
        const parsedUrl = parse(req.url, true);
        res.writeHead(301, { Location: `https://${req.headers.host}:${port}${parsedUrl.pathname}` });
        res.end();
    }).listen(80, (err) => {
        if (err) throw err;
        console.log('Ready - Started HTTP server on port: 80');
    });
} catch (error) {
    console.error('Error starting the server:', error);
}
});