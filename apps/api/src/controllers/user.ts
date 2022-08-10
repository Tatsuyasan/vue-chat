import { RequestHandler } from 'express';
// import { SOCKET_EVENT } from 'shared';
import { io } from '../services/WebSocket';

export const getUser: RequestHandler = async (req, res, next) => {
  const roomId = req.params.roomId;
  try {
    const users = await io.to(roomId).allSockets();
    console.log({ ...users });
    res.json({ users: { ...users } });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
