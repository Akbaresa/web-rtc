import userRoomController from '../controller/user-room-controller.js';
import userRoomService from '../service/user-room-service.js';

const socketRoutes = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', async (data) => {
        try {
            if (!data.kode || !data.username) {
                throw new Error('Invalid data: kode and username are required');
            }
            
            const userRoom = await userRoomService.joinUserRoomSocket(io, socket, data);
            const roomId = userRoom.room.id_room;
            const user = userRoom.user;
            socket.join(roomId);
            io.to(roomId).emit('updateUserList', { user: user });
            console.log(roomId);
            console.log(result);
            console.log(user);
        } catch (error) {
            console.error('Error in join-room event:', error.message);
            socket.emit('error', { message: error.message });
        }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
    socket.on('connect', () => {
      console.log('Client konek');
    });
  });
};

export default socketRoutes;
