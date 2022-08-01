import { SOCKET_EVENT } from '@libs/shared';
import { io } from '../../main.js';

const message = () => {
  return {
    createMessage: (req, res, next) => {
      const roomId = req.params.roomId;
      const message = req.body;
      try {
        io.to(roomId).emit(SOCKET_EVENT.ROOM_NEWMESSAGE, message);
        res.sendStatus(201);
        next();
      } catch (e) {
        console.error(e);
        res.sendStatus(500) && next(e);
      }
    }
  };
};

export default message;
