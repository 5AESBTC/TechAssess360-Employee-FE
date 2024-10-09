<template>
    <div class="not-found">
      <h1>404 - Bad request</h1>
      <p>Chưa tới thời gian thực hiện thao tác của bạn.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
 .not-found {
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  height: 100vh;
  text-align: center; 
  margin: 0; 
}

  
  .not-found h1 {
    font-size: 48px;
    color: #ff0000;
  }
  
  .not-found p {
    font-size: 24px;
    color: #333;
  }
  </style>
  