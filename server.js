const { renderFile } = require('ejs');
const express = require('express');
const path = require('path');

const app = express();

// definindo protocolo http
const server = require('http').createServer(app);
// definindo protocolo wss para o websocket
const io = require('socket.io')(server);
// definido diretório dos arquivos públicos
app.use(express.static(path.join(__dirname, 'public')));
// definir para o node que as views são html
app.set('views', path.join(__dirname, 'public'));
// definir a engine para html
app.engine('html', require('ejs'), renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

server.listen(3001);
