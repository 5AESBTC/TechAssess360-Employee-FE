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
            <li><a @click="activateAccountTab">Chi tiết</a></li>
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
  padding-top: 10px;
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
  margin-right: 10px;
  font-weight: bold;
  color: rgb(128, 123, 123);
  text-decoration: none;
  padding: 5px 15px;
  display: inline-block;
  position: relative;
}

.nav-links li a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  transition: border-color 0.3s;
  border-radius: 20px;
}

.nav-links li a:hover::before,
.nav-links li a:active::before,
.nav-links li a.active::before {
  border-color: rgb(218, 210, 210);
  background-color: rgba(143, 156, 228, 0.5); /* Đỏ với độ trong suốt 50% */
  border-radius: 20px;
}

.nav-links li a.active {
  color: #198ada;
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
  box-shadow: 0px 3px 5px -1px #373535;
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
