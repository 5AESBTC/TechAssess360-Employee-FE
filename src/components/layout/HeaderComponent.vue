<template>
  <div class="site-mobile-menu">
    <div class="site-mobile-menu-header">
      <div class="site-mobile-menu-close mt-3">
        <span class="icon-close2 js-menu-toggle"></span>
      </div>
    </div>
    <div class="site-mobile-menu-body"></div>
  </div>

  <header class="site-navbar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-6 d-flex align-items-center flex-wrap justify-content-between left-navbar">
          <h1 class="mb-0 site-logo">
            <img src="../../assets/Techzenlogo.png" alt="logo" />
          </h1>
          <div class="d-flex align-items-center">
            <!-- <span class="ml-3 text-black font-weight-bold">Còn</span>
            <div class="countdown-timer" id="countdown">{{ countdown }}</div>
            <span class="text-black font-weight-bold">để mở đánh giá</span> -->
            <span class="ml-3 text-black font-weight-bold">Còn</span>
            <div class="countdown-timer" id="countdown">{{ countdown }}</div>
            <span class="text-black font-weight-bold">để đánh giá</span>
          </div>
        </div>
        <div class="col-6 d-none d-xl-block right-navbar">
          <nav class="site-navigation position-relative text-right" role="navigation">
            <ul class="site-menu js-clone-nav d-flex gap-2 justify-content-end mr-auto">
              <li v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }"
                @click="setActive(index)">
                <a :href="item.link"><span>{{ item.text }}</span></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="d-xl-none ml-md-0 mr-auto py-3">
        <a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a>
      </div>
    </div>
    <!-- <div v-if="loading" class="loading-screen">Loading...</div> -->
  </header>
</template>

<script>
// import $ from 'jquery';

export default {
  name: "HeaderComponent",
  data() {
    return {
      countdown: "",
      countDownDate: new Date().getTime() + 60 * 60 * 1000, // Đặt thời gian đếm ngược (ví dụ: 1 giờ)
      loading: true,
      activeIndex: 0,
      menuItems: [
        { text: "Trang chủ", link: "/" },
        { text: "Đánh giá", link: "/assess-page" },
        { text: "Quản lí thành viên", link: "/team-manage" },
        { text: "Kết quả đánh giá", link: "/assess-result" },
        { text: "Thông tin cá nhân", link: "/profile" },
      ],
    };
  },

  mounted() {
    this.startCountdown();
    // so sánh active với path
    const path = window.location.pathname;
    this.menuItems.forEach((item, index) => {
      if (item.link === path) {
        this.activeIndex = index;
      }
    });
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    startCountdown() {
      // Kiểm tra nếu đã có giá trị lưu trong localStorage
      const storedCountDownDate = localStorage.getItem("countDownDate");

      // Nếu chưa có, lưu thời gian kết thúc hiện tại vào localStorage
      if (!storedCountDownDate) {
        localStorage.setItem("countDownDate", this.countDownDate);
      } else {
        this.countDownDate = parseInt(storedCountDownDate); // Gán giá trị từ localStorage
      }

      const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = this.countDownDate - now;

        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countdown = `${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
          clearInterval(x);
          this.countdown = "EXPIRED";
          localStorage.removeItem("countDownDate"); // Xóa khi hết hạn
        }

        // Tắt màn hình loading sau khi bộ đếm bắt đầu
        this.loading = false;
      }, 1000);
    },
    setActive(index) {
      const menuItems = document.querySelectorAll(".site-menu li");

      // Xóa class 'active' từ tất cả các mục
      menuItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm class 'active' vào mục được chọn
      menuItems[index].classList.add("active");
    },
    handleResize() {
      const element = document.querySelector(".left-navbar"); // Thay '.element-class' bằng lớp bạn muốn theo dõi

      if (window.innerWidth < 1200) {
        // Khi cửa sổ nhỏ hơn 768px, xóa class
        if (element) {
          element.classList.remove("col-6"); // Thay 'some-class' bằng lớp cần xóa
        }
      } else {
        // Nếu bạn muốn thêm lại class khi kích thước lớn hơn 768px
        if (element) {
          element.classList.add("col-6"); // Thay 'some-class' bằng lớp cần thêm lại
        }
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.countdown-timer {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  /* Màu nền xanh */
  border: 2px solid #0056b3;
  /* Viền xanh đậm */
  border-radius: 5px;
  /* Bo góc */
  padding: 10px;
  /* Khoảng cách bên trong */
  margin-right: 10px;
  margin-left: 10px;
  /* Khoảng cách giữa đếm ngược và logo */
}

.site-navbar {
  background: rgba(108,
      117,
      125,
      0.5);
  /* bg-secondary màu mặc định là #6c757d */
  backdrop-filter: blur(10px);
  /* Làm mờ nền */
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* Đường viền mờ */
  padding: 10px 10px;
  color: white;
  /* Chữ màu trắng để dễ đọc trên nền mờ */
  margin: 0;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  /* Đảm bảo rằng header luôn ở trên cùng */
}
</style>
