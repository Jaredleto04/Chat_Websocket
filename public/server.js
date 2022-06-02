const WebSocket = require('ws')
 
const usuarios = new Array();


const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {

  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    let mess = JSON.parse(message);
    console.log(mess.tipo)

    if(mess.tipo==1){
      usuarios.push({msg:mess.user,socket:ws});
    
      for(let i=0; i<usuarios.length; i++)
      { 
      usuarios[i].socket.send(JSON.stringify(mess));
      }
    }
    if(mess.tipo==2)
    {
      for(let i=0; i<usuarios.length; i++)
      { 
      usuarios[i].socket.send(JSON.stringify(mess));
    }
    }
    if(mess.tipo==3)
    {
      
      for(let i=0; i<usuarios.length; i++)
      { 
        console.log(`${usuarios[i].msg} y ${mess.dest}`)
      if(usuarios[i].msg==mess.dest)
      {
        usuarios[i].socket.send(JSON.stringify(mess))
        
      }

      }

    };
    if(mess.tipo==4)
    {
      let usuariosx ="";
      let msg ="";
      for(let i=0; i<usuarios.length; i++)
      { 
      msg += `<h6>Está: ${usuarios[i].msg}</h6>`;
      console.log(msg)
      }
      usuariosx = {tipo:4, msg:msg};
      for(let i=0; i<usuarios.length; i++)
      { 
      usuarios[i].socket.send(JSON.stringify(usuariosx));
      }
    }
    
  })
  
  //ws.send('Hello! Message From Server!!')
})