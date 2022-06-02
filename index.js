const path = require('path');
const express = require ('express');
const app = express();

//Settings          //configuraciones
app.set('port',process.env.PORT || 3000);


//static files       //archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


//Start the server     //corriendo el servidor
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});


//websocket
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('un usuario se a conectado');


   socket.on('disconnect', () => {
       console.log('Un ususario se a desconectado')
   });

  socket.on('chat:message', (data) => {   //envia los datos a los otros navegadores en pantalla
      io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (data) => {
      socket.broadcast.emit('chat:typing', data);
  });

});