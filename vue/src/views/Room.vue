<template>
    <div class="container">
      <h1 class="my-4">Room {{ roomId }}</h1>
      <ul class="list-group">
        <li v-for="user in users" :key="user.email" class="list-group-item d-flex justify-content-between align-items-center">
          {{ user.email }}
          <span v-if="!user.cameraStatus" class="badge bg-danger">Camera Off</span>
          <video v-if="user.cameraStatus" :id="`video-${user.email}`" autoplay></video>
        </li>
      </ul>
      <video ref="myVideo" autoplay></video>
      <button @click="toggleCamera" class="btn btn-secondary mt-3">Toggle Camera</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import io from 'socket.io-client';
  import { fetchUsers } from '@/api';
  
  const route = useRoute();
  const roomId = route.params.roomId;
  const socket = io('http://localhost:3000');
  const users = ref([]);
  const email = ref(''); 
  const myVideo = ref(null);
  let cameraStatus = true;
  let stream = null;
  
  // Function to start camera
  const startCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (myVideo.value) {
      myVideo.value.srcObject = stream;
    }
  };
  
  // Function to stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
  };
  
  // Toggle camera status
  const toggleCamera = async () => {
    if (cameraStatus) {
      stopCamera();
    } else {
      await startCamera();
    }
    cameraStatus = !cameraStatus;
    socket.emit('toggle-camera', roomId, email, cameraStatus);
  };
  
  const fetchUser = async (roomId) => {
    const response = await fetchUsers(roomId);
    users.value = response.data;
  };
  
  socket.on('user-connected', (userId) => {
    console.log('User connected:', userId);
    fetchUser(roomId);
  });
  
  socket.on('camera-toggled', (userId, status) => {
    console.log('Camera toggled:', userId, status);
    const user = users.value.find(u => u.email === userId);
    if (user) {
      user.cameraStatus = status;
      const videoElement = document.getElementById(`video-${user.email}`);
      if (status && !videoElement.srcObject) {
        // videoElement.srcObject =;
      }
    }
  });
  
  // Initialize connection and fetch user data
  onMounted(async () => {
    
    socket.emit('join-room', roomId, email);
    fetchUser(roomId);
  });
  </script>