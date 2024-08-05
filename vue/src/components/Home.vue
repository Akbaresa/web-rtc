<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Modal } from 'bootstrap';

const isAllowAllActive = ref(true);
const isWithPasswordActive = ref(false);

const activateAllowAll = () => {
  isAllowAllActive.value = true;
  isWithPasswordActive.value = false;
};

const activateWithPassword = () => {
  isAllowAllActive.value = false;
  isWithPasswordActive.value = true;
};

const modal = ref(null);
let bsModal = null;

const showModal = () => {
  bsModal.show();
};

const hideModal = () => {
  bsModal.hide();
};

onMounted(() => {
  bsModal = new Modal(modal.value);
});

onBeforeUnmount(() => {
  bsModal.dispose();
});
</script>

<template>
    <div class="modal fade align-content-center"  aria-hidden="true" ref="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">New Meeting</h4>
              <button type="button" class="close border border-white" @click="hideModal" aria-label="Close">
                <i class="mdi mdi-close"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3 d-flex">
                <button
                  :class="['btn', isAllowAllActive ? 'btn-primary' : 'btn-outline-primary']"
                  @click="activateAllowAll"
                >
                  <i class="mdi mdi-cellphone-link" style="font-size: 2rem;"></i>
                  <p>allow all</p>
                </button>
                <button
                  :class="['btn', 'ms-lg-2', isWithPasswordActive ? 'btn-primary' : 'btn-outline-primary']"
                  @click="activateWithPassword"
                >
                  <i class="mdi mdi-file-lock" style="font-size: 2rem;"></i>
                  <p>with password</p>
                </button>
              </div>
              <input
                v-if="isWithPasswordActive"
                type="password"
                class="form-control py-2"
                placeholder="Password"
              >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary text-white" @click="hideModal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


    <div class="content-wrapper">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="row">
              <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                <h3 class="font-weight-bold">Welcome John</h3>
                <h6 class="font-weight-normal mb-0">All systems are running smoothly! You have <span class="text-primary">3 unread alerts!</span></h6>
              </div>
              <div class="col-12 col-xl-4">
                <div class="justify-content-end d-flex">
                  <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                    <button class="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <i class="mdi mdi-calendar"></i> Today (10 Jan 2021) </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                      <a class="dropdown-item" href="#">January - March</a>
                      <a class="dropdown-item" href="#">March - June</a>
                      <a class="dropdown-item" href="#">June - August</a>
                      <a class="dropdown-item" href="#">August - November</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6 grid-margin transparent">
                <div class="row">
                  <div class="col-md-6 mb-4 stretch-card transparent">
                    <div class="card card-tale">
                        <div class="card-body ">
                            <div class="icon-container mb-3 col-lg-3" @click="showModal" style="cursor: pointer;">
                              <div class="card py-2">
                                <i class="mdi mdi-plus text-center text-primary" style="font-size: 2rem;"></i>
                              </div>
                            </div>
                            <h4 class="mb-4">New Meeting</h4>
                            <p class="mb-2">Start a new meeting instantly</p>
                          </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4 stretch-card transparent">
                    <div class="card card-dark-blue">
                      <div class="card-body">
                        <div class="icon-container mb-3 col-lg-3">
                            <div class="card py-2">
                                <i class="mdi mdi-calendar-clock text-center text-primary" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                        <h4 class="mb-4">Schedule Meeting</h4>
                        <p class="mb-2">Plan your meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                    <div class="card card-light-blue">
                      <div class="card-body">
                        <p class="mb-4">Number of Meetings</p>
                        <p class="fs-30 mb-2">34040</p>
                        <p>2.00% (30 days)</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 stretch-card transparent">
                    <div class="card card-light-danger">
                      <div class="card-body">
                        <p class="mb-4">Number of Clients</p>
                        <p class="fs-30 mb-2">47033</p>
                        <p>0.22% (30 days)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          <div class="col-md-6 grid-margin stretch-card">
            <div class="card tale-bg">
              <div class="card-people mt-auto">
                <img src="/assets/admin/images/dashboard/people.svg" alt="people">
                <div class="weather-info">
                  <div class="d-flex">
                    <div>
                      <h2 class="mb-0 font-weight-normal"><i class="icon-sun me-2"></i>31<sup>C</sup></h2>
                    </div>
                    <div class="ms-2">
                      <h4 class="location font-weight-normal">Chicago</h4>
                      <h6 class="font-weight-normal">Illinois</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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