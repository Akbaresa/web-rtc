import { joinRoomService, handleSignalService } from '../service/video-service.js';

const joinRoom = (req, res) => {
  const { roomId, userId } = req.body;
  const result = joinRoomService(roomId, userId);
  res.status(200).json(result);
};

const handleSignal = (req, res) => {
  const data = req.body;
  const result = handleSignalService(data);
  res.status(200).json(result);
};

export default {
    joinRoom,
    handleSignal
}
