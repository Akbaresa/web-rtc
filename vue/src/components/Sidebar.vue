<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const route = useRoute();

const currentPath = ref(route.path);

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);
</script>

<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item">
                <router-link onclick="updateRoute()" class="nav-link" :class="{ 'bg-active': currentPath === '/' }" to="/">
                    <i class="icon-grid menu-icon " :class="{ 'text-white': currentPath === '/' }"></i>
                    <span class="menu-title" :class="{ 'text-white': currentPath === '/' }">Home</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :class="{ 'bg-active': currentPath === '/event' }" to="/event">
                    <i class="icon-paper menu-icon" :class="{ 'text-white': currentPath === '/event' }"></i>
                    <span class="menu-title" :class="{ 'text-white': currentPath === '/event' }">Event</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
    @import url('/assets/admin/vendors/feather/feather.css');
    @import url('/assets/admin/vendors/ti-icons/css/themify-icons.css');
    @import url('/assets/admin/vendors/font-awesome/css/font-awesome.min.css');
    @import url('/assets/admin/vendors/mdi/css/materialdesignicons.min.css');
    @import url('/assets/admin/css/style.css');
</style>