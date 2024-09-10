<template>
  <header>
    <nav class="navbar">
      <div><h3>Tech Assess</h3></div>
      <ul class="nav-links">
        <li><a :class="{ active: activeLink === 'home' }" @click="setActive('home')">Trang chủ</a></li>
        <li><a :class="{ active: activeLink === 'assessment' }" @click="setActive('assessment')">Trang đánh giá</a></li>
        <li v-if="user.role === 'manage'"><a :class="{ active: activeLink === 'manage' }" @click="setActive('manage')">Quản lý thành viên</a></li>
        <li><a :class="{ active: activeLink === 'result' }" @click="setActive('result')">Kết quả đánh giá</a></li>
        <li><a :class="{ active: activeLink === 'account' }" @click="setActive('account')">Tài khoản ▾</a>
          <ul class="dropdown">
            <li><a @click="activateAccountTab">Thông tin chi tiết</a></li>
            <li><a>Đăng xuất</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      user: { role: 'admin' },
      activeLink: 'home'
    };
  },
  methods: {
    setActive(link) {
      this.activeLink = link;
    },
    activateAccountTab() {
      this.activeLink = 'account';
    }
  }
};
</script>

<style scoped>
.navbar {
  justify-content: space-between;
  border-bottom: solid;
  border-color: rgb(224, 220, 220);
  display: flex;
  align-items: center;
  padding: 4px 10px;
  margin: 0 5em;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}
.nav-links li {
  position: relative;
}
.nav-links li a {
  color: rgb(157, 150, 150);
  text-decoration: none;
}
.nav-links li a.active {
  color: #3ca0e7;
  font-weight: bold;
}
.nav-links li:hover > ul,
.nav-links li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
  min-width: 250px;
  text-align: left;
  padding-top: 20px;
  box-shadow: 0px 3px 5px -1px #bbbbbb;
  border-radius: 20px;
}
.nav-links li ul {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 0;
  display: none;
  background: white;
}
.nav-links li ul li {
  width: 70%;
  list-style: none;
  text-decoration: none;
  padding-bottom: 10px;
}
.nav-links li ul li a:hover {
  padding-left: 10px;
  border-left: 2px solid #3ca0e7;
  transition: all 0.3s ease;
}
</style>
