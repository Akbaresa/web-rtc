<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
    <div class="container-scroller">
        <Navbar />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <router-view />
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ms-1"></i></span>
                </div>
            </footer>
          </div>
        </div>
      </div>
</template>

<style scoped>
  @import url('/assets/admin/vendors/feather/feather.css');
  @import url('/assets/admin/vendors/ti-icons/css/themify-icons.css');
  @import url('/assets/admin/vendors/css/vendor.bundle.base.css');
  @import url('/assets/admin/vendors/font-awesome/css/font-awesome.min.css');
  @import url('/assets/admin/vendors/mdi/css/materialdesignicons.min.css');
  @import url('/assets/admin/js/select.dataTables.min.css');
  @import url('/assets/admin/css/style.css');
</style>