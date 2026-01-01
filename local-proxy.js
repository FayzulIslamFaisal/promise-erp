const http = require('http');

const TARGET_HOST = 'nginx';
const TARGET_PORT = 80;
const LISTEN_PORT = 8888;

const server = http.createServer((clientReq, clientRes) => {
    const options = {
        hostname: TARGET_HOST,
        port: TARGET_PORT,
        path: clientReq.url,
        method: clientReq.method,
        headers: clientReq.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
        clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(clientRes, { end: true });
    });

    proxyReq.on('error', (e) => {
        console.error(`Proxy error: ${e.message}`);
        clientRes.writeHead(502);
        clientRes.end('Bad Gateway');
    });

    // Check if request has body data
    if (clientReq.method === 'POST' || clientReq.method === 'PUT' || clientReq.method === 'PATCH') {
        clientReq.pipe(proxyReq, { end: true });
    } else {
        proxyReq.end();
    }
});

server.listen(LISTEN_PORT, '127.0.0.1', () => {
    console.log(`Internal Proxy listening on 127.0.0.1:${LISTEN_PORT} -> ${TARGET_HOST}:${TARGET_PORT}`);
});
