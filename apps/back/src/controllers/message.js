import { SOCKET_EVENT } from '@libs/shared';
import { useSocket } from '../hooks/useSocket.js';

const message = () => {
  return {
    createMessage: (req, res, next) => {
      const roomId = req.params.roomId;
      const message = req.body;
      try {
        const { io } = useSocket();
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
