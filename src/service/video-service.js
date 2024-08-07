export const joinRoomService = (roomId, userId) => {
    return { message: `User ${userId} joined room ${roomId}` };
  };
  
export const handleSignalService = (data) => {
    return { message: 'Signal handled', data };
};
  