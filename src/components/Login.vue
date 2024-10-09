<template>
  <!-- Login 10 - Bootstrap Brain Component -->
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 content"
        >
          <div class="mb-5">
            <div class="text-center mb-4">
              <a href="#!">
                <img
                  src="../assets/Techzenlogo.png"
                  alt="Logo"
                  width="175"
                  height="150"
                />
              </a>
            </div>
            <h2 class="text-center mb-4">Đăng nhập Tech Assess 360</h2>
          </div>
          <div class="card border border-light-subtle rounded-4">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <form @submit.prevent="handleLogin">
                <div class="row gy-3 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        v-model="username"
                        placeholder="anv (Nguyễn Văn A)"
                      />
                      <label for="username" class="form-label">Tài khoản</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        id="password"
                        value=""
                        placeholder="Password"
                      />
                      <label for="password" class="form-label">Mật khẩu</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        name="remember_me"
                        id="remember_me"
                      />
                      <label
                        class="form-check-label text-secondary"
                        for="remember_me"
                      >
                        Ghi nhớ đăng nhập
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn btn-primary btn-lg" type="submit">
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import AuthService from "../services/AuthService";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        toast.error("Vui lòng nhập tài khoản và mật khẩu!");
        return;
      }
      const res = await AuthService.login(this.username, this.password);  // Đợi Promise hoàn tất
      if (res.code === 1011) {
        await AuthService.fetchUserByUserName(this.username);
        toast.success("Đăng nhận thành công!");
        this.$router.push('/');
      } else {
        toast.error("Tài khoản hoặc mật khẩu sai");
      }
    },
  },
};
</script>
<style scoped>
section {
  height: 100vh;
  background-color: #4e7fcf;
  padding-top: 150px;
}

.content {
  background-color: white;
  border-radius: 2%;
  padding: 20px;
}
</style>
