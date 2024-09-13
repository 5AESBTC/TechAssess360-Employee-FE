<template>
  <div class="site-mobile-menu">
    <div class="site-mobile-menu-header">
      <div class="site-mobile-menu-close mt-3">
        <span class="icon-close2 js-menu-toggle"></span>
      </div>
    </div>
    <div class="site-mobile-menu-body"></div>
  </div>

  <header class="site-navbar" role="banner">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-11 col-xl-2">
          <h1 class="mb-0 site-logo">
            <img src="../../assets/Techzenlogo.png" alt="logo" />
          </h1>
        </div>
        <div class="col-12 col-md-10 d-none d-xl-block">
          <nav class="site-navigation position-relative text-right" role="navigation">
            <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
              <li class="active">
                <a href="/"><span>Trang chủ</span></a>
              </li>
              <li>
                <a href="/assess-page"><span>Đánh giá</span></a>
              </li>
              <li>
                <a href="/team-mate"><span>Quản lí thành viên</span></a>
              </li>
              <li>
                <a href="/assess-result"><span>Kết quả đánh giá</span></a>
              </li>
              <li>
                <a href="/profile"><span>profile</span></a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style="position: relative; top: 3px">
          <a href="#" class="site-menu-toggle js-menu-toggle text-white">
            <span class="icon-menu h3"></span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import $ from 'jquery';

export default {
  name: "HeaderComponent",
  mounted() {
    // Ensure jQuery is available
    if (window.$) {
      // Use jQuery functions as required
      // Example: $('.site-mobile-menu', 'site-navbar').on('click', '.arrow-collapse', function (e) {...});
    } else {
      console.error('jQuery is not loaded');
    }
  }
};
</script>

<style scoped>
.site-navbar {
  margin: 0;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
header {
  position: fixed; /* Hoặc position: absolute; nếu cần */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Đảm bảo rằng header luôn ở trên cùng */
}
</style>
