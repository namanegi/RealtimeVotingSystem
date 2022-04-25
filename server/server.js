const WebSocket = require('ws');
const uuid = require('uuid');

const wsServer = new WebSocket.Server({ port: 5001 });

let current_question = {
  active: false,
  question: {
    question: '問題を設置するまでお待ちください',
    opA: "",
    opB: "",
    opC: "",
    opD: "",
    ctA: 0,
    ctB: 0,
    ctC: 0,
    ctD: 0
  }
}

wsServer.on('connection', server => {
  Object.assign(server, {id: uuid.v4(), type: 'initial'})
  
  server.on('message', message => {
    let messageParsed = JSON.parse(message)
    console.log(server.id, messageParsed)
    broadcast({
      type: 'curQuestion',
      message: current_question.question
    })
    
    if (messageParsed.type === 'initial') {
      server.type = messageParsed.message
      let toClient = findClientById(server.id)
      toClient.send(JSON.stringify({message: 'registed', id: server.id}))
    }
    else if (messageParsed.type === 'questionSubmit') {
      current_question.active = true
      current_question.question = messageParsed.message
      console.log(current_question)
      broadcast({
        type: 'resBroadcast',
        message: current_question.question
      })
    }
    else if (messageParsed.type === 'vote') {
      if (messageParsed.message === current_question.question.opA) {
        current_question.question.ctA++
      } else if (messageParsed.message === current_question.question.opB) {
        current_question.question.ctB++
      } else if(messageParsed.message === current_question.question.opC) {
        current_question.question.ctC++
      } else if(messageParsed.message === current_question.question.opD) {
        current_question.question.ctD++
      }
      broadcast({
        type: 'resBroadcast',
        message: current_question.question
      })
    }
  });
});

const findClientById = (id) => {
  let clientFound;
  wsServer.clients.forEach(client => {
    if (client.id === id && client.readyState === WebSocket.OPEN) {
      clientFound = client;
    }
  })
  return clientFound
}

const broadcast = (message) => {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}


console.log('websocket起動中...');