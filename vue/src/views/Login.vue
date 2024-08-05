<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
                <img src="/assets/auth/images/logo.svg">
              </div>
              <h4>Hello! let's get started</h4>
              <h6 class="fw-light">Sign in to continue.</h6>
              <form class="pt-3" @submit.prevent="postDataLogin">
                <div class="form-group">
                  <input type="text" v-model="formData.username" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username">
                </div>
                <div class="form-group">
                  <input type="password" v-model="formData.password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="mt-3 d-grid gap-2">
                  <button type="submit" class="btn btn-block btn-primary btn-lg fw-semibold auth-form-btn" >SIGN IN</button>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input"> Keep me signed in </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
                <div class="mb-2 d-grid gap-2">
                  <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                    <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                </div>
                <div class="text-center mt-4 fw-light"> Don't have an account? <a href="/register" class="text-primary">Create</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from "vue-toastification";
  import { login } from '@/api/auth';
  import { setCookie } from '@/api/cookie'; 

  const toast = useToast();
  const router = useRouter();

  const formData = ref({
    username: '',
    password: ''
  });

  const postDataLogin = async () => {
    if (!formData.value.username || !formData.value.password) {
      toast.error("Mohon Lengkapi Form")
    }

    const data = ({
      username: formData.value.username,
      password: formData.value.password
    });

    await login(data)
    .then(response => {
      setCookie(response.data.token)
      router.push('/');
    })
    .catch(error => {

    });
  }
</script>

<style scoped>
@import url('/assets/auth/vendors/mdi/css/materialdesignicons.min.css');
@import url('/assets/auth/vendors/ti-icons/css/themify-icons.css');
@import url('/assets/auth/vendors/css/vendor.bundle.base.css');
@import url('/assets/auth/vendors/font-awesome/css/font-awesome.min.css');
@import url('/assets/auth/vendors/jquery-bar-rating/css-stars.css');
@import url('/assets/auth/vendors/font-awesome/css/font-awesome.min.css');
@import url('/assets/auth/css/style.css');
</style>