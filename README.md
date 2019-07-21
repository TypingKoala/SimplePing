# SimplePing
SimplePing is a lightweight website that enables users to easily determine the network latency from the browser to a hosted server. 

## Why SimplePing
Sometimes, you don't want to fire up a terminal just to ping a server. Other times, ICMP packets might behave differently from TCP packets. SimplePing measures round-trip latency using a WebSocket connection, which is a TCP-based connection that can run simultaneously alongside an HTTP(S) connection. WebSocket has lower network overhead compared to HTTP, and thus returns results that are more representative of the actual network latency.

## 🚀 Running
You can get this working on your server in a few steps. Make sure you have a recent version of Node.js and NPM installed.

1. Clone the repo and install the NPM dependencies:
```bash
git clone https://github.com/TypingKoala/SimplePing.git && cd SimplePing && npm install
```

2. Create a `config.json` file and copy/paste the following JSON. You should specify the geographic location of the server in `location`. If your website will be using SSL, set the `ssl` flag to `true` and specify the path to the SSL Key and Certificate file. Otherwise, set the `ssl` flag to `false` and remove the `keyPath` and `certPath` attributes.
```json
{
    "location": "New York",
    "ssl": true,
    "keyPath": "/root/ssl/simpleping.key",
    "certPath": "/root/ssl/simpleping.cert"
}
```

3. Start the server. You also can use `forever-cli` to run and manage SimplePing in the background.
```bash
node index.js
```

4. Open your browser to `http://localhost:3000` (or `https://localhost:3000` if `ssl=true`) and see it work! Note that the latency will be pretty low since you are running it locally. Try accessing the page from a remote computer, either at the same port or using an HTTP proxy.