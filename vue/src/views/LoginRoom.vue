<template>
    <div class="container">
      <h1 class="my-4">Login</h1>
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Enter Email" />
      </div>
      <div class="mb-3">
        <input v-model="roomCode" type="text" class="form-control" placeholder="Enter Room Code" />
      </div>
      <button @click="joinRoomHandler" class="btn btn-primary">Join Room</button>
      <button @click="createRoomHandler" class="btn btn-secondary">Create Room</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { createRoom, joinRoom } from '../api';
  
  const router = useRouter();
  const email = ref('');
  const roomCode = ref('');
  
  const joinRoomHandler = async () => {
    try {
      const response = await joinRoom(roomCode.value, email.value);
      router.push(`/room/${response.data.id}`);
    } catch (error) {
      console.error(error);
      alert('Room not found');
    }
  };
  
  const createRoomHandler = async () => {
    try {
      const response = await createRoom(email.value);
      router.push(`/room/${response.data.id}`);
    } catch (error) {
      console.error(error);
      alert('Error creating room');
    }
  };
  </script>
  