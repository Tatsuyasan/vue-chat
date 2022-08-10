import { SOCKET_EVENT } from 'shared';
import { useSocket } from '../hooks/useSocket.js';

const userController = () => {
  return {
    getUser: async (req, res, next) => {
      const roomId = req.params.roomId;
      try {
        const { io } = useSocket();

        // console.log(io.to(roomId).allSockets());
        const users = await io.to(roomId).allSockets();
        console.log({ ...users });
        res.json({ users: { ...users } });
      } catch (e) {
        console.error(e);
        res.sendStatus(500) && next(e);
      }
    }
  };
};

export default userController;
