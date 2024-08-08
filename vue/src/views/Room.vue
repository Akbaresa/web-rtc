<template>
  <div class="container">
    <p>Room: {{ roomKode }}</p>
    <p>Username: {{ username }}</p>

    <button @click="toggleCamera" :class="cameraActive ? 'btn btn-danger' : 'btn btn-primary'">
      {{ cameraActive ? 'Close Camera' : 'Open Camera' }}
    </button>

    <button @click="toggleMicrophone" :class="microphoneActive ? 'btn btn-danger' : 'btn btn-primary'">
      {{ microphoneActive ? 'Close Microphone' : 'Open Microphone' }}
    </button>
    <div v-for="(item, index) in users" :key="index">
      <p>{{ item.username }}</p>
    </div>
    <video ref="videoElement" autoplay playsinline></video>
    <video ref="remoteVideoElement" autoplay playsinline></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import { useRoute } from 'vue-router';
import { getUser } from '@/api/user';
import { joinUserRoom, getAllUserRoom } from '@/api/userRoom';

const socket = io('http://localhost:4000');

const route = useRoute();
const roomKode = route.params.kode;
const username = ref('');
const users = ref([]);

const videoElement = ref(null);
const remoteVideoElement = ref(null);
const cameraActive = ref(false);
const microphoneActive = ref(false);
let cameraStream = null;
let microphoneStream = null;
let peerConnection = null;

onMounted(async () => {
  try {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    const userResponse = await getUser();
    console.log(userResponse);
    username.value = userResponse.data.data.username;

    
    const joinData = {
      kode: roomKode,
      username: username.value
    };  

    socket.on('updateUserList', (newUser) => {
      console.log('New user added:', newUser);
      users.value.push(newUser.user);
      console.log(users.value);
    });

    socket.emit('joinRoom', joinData);
    console.log(users.value)

    // const userRoomData = { kode: roomKode };
    // const allUsersResponse = await getAllUserRoom(userRoomData);
    // users.value = allUsersResponse.data;

    // socket.on('user-connected', async (userId) => {
    //   console.log('User connected:', userId);
    //   createPeerConnection(userId);
    // });

    // socket.on('signal', async (data) => {
    //   if (data.id !== socket.id) {
    //     if (data.sdp) {
    //       await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
    //       if (data.sdp.type === 'offer') {
    //         const answer = await peerConnection.createAnswer();
    //         await peerConnection.setLocalDescription(answer);
    //         socket.emit('signal', { sdp: answer, id: socket.id, roomId });
    //       }
    //     } else if (data.candidate) {
    //       await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    //     }
    //   }
    // });

    // socket.on('user-disconnected', async (userId) => {
    //   console.log('User disconnected:', userId);
    // });

  } catch (error) {
    console.error(error);
  }
});

onUnmounted(() => {
  socket.off('connect');
  socket.off('updateUserList');
  socket.off('joinRoom');
});

const createPeerConnection = (userId) => {
  peerConnection = new RTCPeerConnection();

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('signal', { candidate: event.candidate, id: socket.id, roomId });
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideoElement.value.srcObject = event.streams[0];
  };

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => peerConnection.addTrack(track, cameraStream));
  }

  peerConnection.createOffer().then(offer => {
    peerConnection.setLocalDescription(offer);
    socket.emit('signal', { sdp: offer, id: socket.id, roomId });
  });
};

const toggleCamera = async () => {
  if (cameraActive.value) {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      videoElement.value.srcObject = null;
      cameraStream = null;
    }
    cameraActive.value = false;
  } else {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.value.srcObject = cameraStream;
      cameraActive.value = true;
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  }
};

const toggleMicrophone = async () => {
  if (microphoneActive.value) {
    if (microphoneStream) {
      microphoneStream.getTracks().forEach(track => track.stop());
      microphoneStream = null;
    }
    microphoneActive.value = false;
  } else {
    try {
      microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneActive.value = true;
    } catch (err) {
      console.error("Error accessing microphone: ", err);
    }
  }
};

</script>

<style scoped>
video {
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
