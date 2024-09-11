<template>
    <div class="dropdown">
      <input type="checkbox" id="dropdown" v-model="isChecked">
  
      <label class="dropdown__face" for="dropdown">
        <div class="dropdown__text">Tài khoản</div>
        <div class="dropdown__arrow"></div>
      </label>
  
      <ul class="dropdown__items" :class="{ visible: isChecked }">
          <li><a href="">Thông tin chi tiết</a></li>
          <li><a href="">Đăng xuất</a></li>
      </ul>
    </div>
  
    <svg>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </svg>
  </template>
  <style scoped>
  .dropdown {
    color: gray;
    position: relative;
    width: 175px;
    filter: url(#goo);
  }
  
  .dropdown__face,
  .dropdown__items {
    background-color: white;
    border-radius: 25px;
    border: solid;
  }
  
  .dropdown__face {
    display: block;
    position: relative;
  }
  
  .dropdown__items {
    
    margin: 0px;
    position: absolute;
    right: 0;
    top: 50%;
    width: 100%;
    list-style: none;
    display: inline; /* Sử dụng Flexbox */
   justify-content: space-between;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.93, 0.88, 0.1, 0.8);
  }
  
  .dropdown__items::before {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 20%;
    height: 40px;
    width: 20px;
  }
  .dropdown__items li {
    padding: 5px;
    text-align: center;
  }
  .dropdown__items li a{
    text-decoration: none;

  }
  .dropdown__arrow {
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    position: absolute;
    top: 50%;
    right: 30px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) translateY(-50%);
    transform-origin: right;
  }
  
  input {
    display: none;
  }
  
  .dropdown__items.visible {
    top: calc(100% + 25px);
    visibility: visible;
    opacity: 1;
  }
  
  body {
    background-image: linear-gradient(140deg, #e2e2e2, #cdcdcd);
    display: grid;
    place-items: center;
    font-family: "Lato", Arial, sans-serif;
    height: 100vh;
    margin: 0;
  }
  
  * {
    box-sizing: border-box;
  }
  
  svg {
    display: none;
  }

  </style>
<script>
export default {
  name: 'QuanLyTaiKhoan',
  data() {
    return {
      isChecked: false
    };
  }
};
</script>

  
  