const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    transparent: true,
    frame: false,             
    alwaysOnTop: true,    
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  // variável para controlar se os cliques do mouse atravessam a janela
  let ignoreMouse = false;

  // registra o atalho global F8 para alternar o modo
  globalShortcut.register('F8', () => {
    ignoreMouse = !ignoreMouse;
    
    // altera o comportamento da janela dinamicamente
    mainWindow.setIgnoreMouseEvents(ignoreMouse, { forward: true });
    console.log("Cliques a atravessar o chat: ", ignoreMouse);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
}); transparente = true;

// 1. Tenta conectar ao endereço onde o seu servidor Python está rodando
const socket = new WebSocket('ws://localhost:8765');

// 2. Evento disparado assim que a conexão dá certo
socket.onopen = function(event) {
    console.log("Conectado à central do chat!");
    
    // O cliente já pode enviar a primeira mensagem para o seu Python
    socket.send("Olá, servidor! Tem alguém aí?");
};

// 3. Evento disparado sempre que o seu Python enviar uma mensagem (o Broadcast)
socket.onmessage = function(event) {
    const mensagemRecebida = event.data;
    console.log("Nova mensagem recebida: ", mensagemRecebida);
    
    // A partir daqui, a missão dela é pegar essa variável e fazer aparecer na tela (HTML)
};

// 4. Opcional: Lidar com desconexões ou erros
socket.onclose = function(event) {
    console.log("Desconectado do servidor.");
};