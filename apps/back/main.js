import router from './src/routes/index.js';
import Message from './src/models/Message.js';
import WebSocket from './src/models/WebSocket.js';
import webSocketApi from './src/socket/index.js';
import cors from 'cors';
import 'dotenv/config';

import express from 'express';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const webSocket = new WebSocket(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());
app.use('/api', router);

export const io = webSocketApi(webSocket).init();

//USER CONNECT
// webSocket.on('connection', (socket, io) => {
//   //Add user to the list when they connect
//   let connected_user = {
//     id: socket.id,
//     name: 'user',
//     color: randomColor(60)
//     //Add a color element that is random for each user when they connect
//   };

//   users.push(connected_user);
//   console.log(connected_user.name, ' has connected.');

//   //A connected user joins the chat
//   socket.on('userJoined', name => {
//     name = name.trim();
//     if (name.length >= 3 && name.length <= 20) {
//       connected_user.name = name;
//       console.log(connected_user.name, ' has joined the chat.');

//       chatUsers.push(connected_user);
//       socket.join('chat', () => {
//         io.to('chat').emit('userJoined', {
//           username: name,
//           chatUsers: chatUsers
//         });
//       });

//       let lastMessages = chat.messages.slice(-10);

//       //Sends the last 10 messages
//       socket.emit('chatJoined', {
//         status: 'OK',
//         content: lastMessages
//       });
//     } else {
//       socket.emit('chatJoined', {
//         status: 'KO',
//         message:
//           'Incorrect username, username must have between 3 & 20 characters'
//       });
//     }
//   });

//   //A connected user leaves the chat
//   socket.on('userLeft', () => {
//     removeUser(chatUsers, socket.id);
//     io.to('chat').emit('userLeft', {
//       username: connected_user.name,
//       chatUsers: chatUsers
//     });
//   });

//   socket.on('message', message => {
//     //Checks if the user is a chat user
//     if (chatUsers.includes(connected_user)) {
//       addNewMessage(message, connected_user);
//     }
//   });

//   /**
//    * command = {
//    *  name,
//    *  content
//    * }
//    */
//   socket.on('command', command => {
//     let result = {
//       status: 'KO',
//       command: command,
//       message: ''
//     };
//     switch (command.name) {
//       case 'help':
//         result.status = 'OK';
//         result.message = commands.help.description;
//         socket.emit('commandResult', result);
//         break;
//       case 'color':
//         //TODO: Validate input
//         connected_user.color = command.content;
//         result.status = 'OK';
//         result.message = 'Username color was changed to ' + command.content;
//         socket.emit('commandResult', result);
//         break;
//       case 'roll':
//         let dice = parseInt(command.content.split(' ')[0], 10);
//         if (isNaN(dice)) {
//           result.status = 'KO';
//           result.message = "Argument provided for command wasn't a number";
//           socket.emit('commandResult', result);
//         } else {
//           result.status = 'OK';
//           let diceRoll = Math.ceil(Math.random() * dice);
//           result.message =
//             connected_user.name + ' rolls a ' + dice + ' dice...';
//           result.message += '\n Gets ' + diceRoll;
//           io.to('chat').emit('newMessage', {
//             content: result.message,
//             tag: 'infoMsg'
//           });
//         }
//         break;
//       case 'rename':
//         try {
//           let previousUsername = connected_user.name;
//           changeUsername(connected_user, command.content);
//           result.status = 'OK';
//           result.message =
//             'Changed username from ' +
//             previousUsername +
//             ' to ' +
//             connected_user.name;
//           result.content = getUserNames();
//         } catch (error) {
//           result.status = 'KO';
//           result.message = error;
//         }
//         socket.emit('commandResult', result);
//         break;

//       default:
//         result.status = 'KO';
//         result.message = `'${command.name}' command is not supported.`;
//         break;
//     }
//   });

//   //USER DISCONNECT
//   socket.on('disconnect', () => {
//     if (chatUsers.includes(connected_user)) {
//       removeUser(chatUsers, socket.id);

//       io.to('chat').emit('userLeft', {
//         username: connected_user.name,
//         chatUsers: chatUsers
//       });
//       socket.emit('disconnected');
//     }
//     removeUser(users, socket.id);
//     console.log(connected_user.name, ' has disconneted.');
//   });
// });

// function getUserNames() {
//   let usernames = [];
//   chatUsers.forEach(user => {
//     usernames.push({ name: user.name });
//   });
//   return usernames;
// }
/**
 * Check the message array size before adding a new one
 * If the size is higher than the max, shift the first message
 * then add the new one
 */
// function addNewMessage(message, user) {
//   //Add his message to the chat
//   let messageAdded = new Message(message, user);

//   //If messages array has reached its limit, remove the last message
//   //Prevents memory overload
//   if (chat.messages.length >= chat.maxMessage) {
//     chat.messages.shift();
//   }
//   //Then add the new one
//   chat.messages.push(messageAdded);

//   console.log(messageAdded.user, ' ', messageAdded.content);

//   //Broadcast message to everyone
//   webSocket.emit('newMessage', messageAdded);
// }

// function getUser(users, socketID) {
//   users.forEach(user => {
//     if (user.id == socketID) {
//       return user;
//     }
//   });
//   console.error('No user found with that ID:', socketID);
//   return null;
// }

// function getUserIndex(users, socketID) {
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].id == socketID) return i;
//   }
//   console.error('No user found with that ID:', socketID);
//   return null;
// }

// function removeUser(users, socketID) {
//   return users.splice(getUserIndex(users, socketID), 1);
// }

// function randomColor(light) {
//   return `hsl(${Math.floor(Math.random() * 360)}, 100%, ${light}%)`;
// }

// function isNumber(value) {
//   return !isNaN(parseInt(value)) && isFinite(value);
// }

// function changeUsername(user, newName) {
//   if (newName.length >= 3 && newName.length <= 20) {
//     user.name = newName;
//   } else {
//     throw new Error('New name dimensions are incorrect.');
//   }
// }

// function getAllCommandsHelp(commands) {
//   let result = '';
//   for (let prop in commands) {
//     if (prop != 'help') result += commands[prop].description + '\n';
//   }
//   return result;
// }

// Starts the server.
httpServer.listen(5001, '0.0.0.0', function () {
  console.log('Started server on port 5001');
});
