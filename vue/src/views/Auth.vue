<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
</template>

<script setup>


</script>