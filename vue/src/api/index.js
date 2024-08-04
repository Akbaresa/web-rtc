import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createRoom = (email) => {
    return apiClient.post('/create-room', { email });
};
  
export const joinRoom = (kodeRoom, email) => {
    return apiClient.post('/join-room', { kodeRoom, email });
};

export const fetchUsers = (roomId) => {
    return apiClient.get(`/room/${roomId}/users`);
}
