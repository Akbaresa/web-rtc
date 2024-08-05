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
                  <h4>New here?</h4>
                  <h6 class="fw-light">Signing up is easy. It only takes a few steps</h6>
                  <form class="pt-3" @submit.prevent="postDataRegister">
                    <div class="form-group">
                      <input type="text" v-model="formData.nama" class="form-control form-control-lg" placeholder="Nama">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="formData.username" class="form-control form-control-lg" placeholder="Username">
                    </div>
                    <div class="form-group">
                      <input type="email" v-model="formData.email" class="form-control form-control-lg" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="formData.password" class="form-control form-control-lg" placeholder="Password">
                    </div>
                    <div class="mb-4">
                      <div class="form-check">
                        <label class="form-check-label text-muted">
                          <input type="checkbox" class="form-check-input"> I agree to all Terms & Conditions </label>
                      </div>
                    </div>
                    <div class="mt-3 d-grid gap-2">
                      <button type="submit" class="btn btn-block btn-primary btn-lg fw-semibold auth-form-btn">SIGN UP</button>
                    </div>
                    <div class="text-center mt-4 fw-light"> Already have an account? <a href="/login" class="text-primary">Login</a>
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
import { useToast } from "vue-toastification";
import { register } from '../api/auth';
const toast = useToast();

const formData = ref({
    nama: '',
    username: '',
    email: '',
    password: '',
});

const postDataRegister = async () => {
    if (!formData.value.nama || !formData.value.username || !formData.value.email || !formData.value.password){        
        toast.error("Mohon Lengkapi Form");
    }
    const data = ({
        name : formData.value.nama,
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
    });

    await register(data)
    .then(response => {
        toast.success("Berhasil Registrasi");
    }).catch(error => {
        toast.error(error.response.data.message)
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