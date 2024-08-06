<template>
  <div class="container">
    <p>Room: {{ roomId }}</p>
    <p>Username: {{ username }}</p>


    <button 
      @click="toggleCamera" 
      :class="cameraActive ? 'btn btn-danger' : 'btn btn-primary'"
    >
      {{ cameraActive ? 'Close Camera' : 'Open Camera' }}
    </button>

    <button 
      @click="toggleMicrophone" 
      :class="microphoneActive ? 'btn btn-danger' : 'btn btn-primary'"
    >
      {{ microphoneActive ? 'Close Microphone' : 'Open Microphone' }}
    </button>

    <video ref="videoElement" autoplay playsinline></video>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { getUser } from '@/api/user';
import { ref, onMounted } from 'vue';

const route = useRoute();
const roomId = route.params.roomId;
const username = ref('');

const videoElement = ref(null);
const cameraActive = ref(false);
const microphoneActive = ref(false);
let cameraStream = null;
let microphoneStream = null;

onMounted(async () => {
  await getUser()
    .then(response => {
      console.log(response);
      username.value = response.data.data.username;
    });
});

const toggleCamera = async () => {
  if (cameraActive.value) {
    // Stop camera stream
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
      microphoneStream.getTracks().forEach(track => track.stop()); // Optionally stop the stream if you don't need it
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
