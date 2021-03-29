const { renderFile } = require('ejs');
const express = require('express');
const path = require('path');
const port = 3001;
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
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

let messages = [];

io.on('connection', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
  socket.on('sendMessage', (data) => {
    messages.push(data);
  });
});

server.listen(port, () => {
  console.log('Server está escutando a porta *:' + port);
});
