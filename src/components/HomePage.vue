<template>
  <div class="background-container">
    <div class="container">
      <div class="step-container">
        <div v-for="(step, index) in steps" :key="index" class="step" :style="{ backgroundColor: step.color }" :class="{ active: isActiveStep(index) }">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-text">{{ step.text }}</div>
        </div>
      </div>

      <div class="title-container">
        <div class="title-box">
          <div v-for="(title, index) in titles" :key="index" class="title" :class="[title.class, { active: isActiveTitle(index) }]">
            {{ title.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {  title: 'Nhân viên đánh giá', text: 'Các nhân viên sẽ tự đánh giá và đánh giá cho  các thành viên chung dự án.', color: '#90EE90' },
        {  title: 'Quản lý đánh giá', text: 'Quản lý sẽ tự đánh giá và đánh giá các thành viên mà mình quản lý', color: '#87CEEB' },
        {  title: 'Kết quả', text: 'Công bố kết quả', color: '#FFD700' }
      ],
      titles: [
        { text: '09/09 - 20/09', class: 'before' },
        { text: '21/09 - 30/09', class: 'now' },
        { text: '31/09', class: 'after' }
      ],
      currentDate: new Date() // Cập nhật giá trị này tùy thuộc vào nhu cầu
    };
  },
  methods: {
    isActiveTitle(index) {
      // Logic để xác định tiêu đề nào là hiện tại
      const titleDates = [
        { start: new Date('2024-09-09'), end: new Date('2024-09-20') },
        { start: new Date('2024-09-21'), end: new Date('2024-09-30') },
        { start: new Date('2024-09-31'), end: new Date('2024-09-31') }
      ];

      const { start, end } = titleDates[index];
      return this.currentDate >= start && this.currentDate <= end;
    },
    isActiveStep(index) {
      return this.isActiveTitle(index); // Bước và tiêu đề đồng bộ
    }
  }
}
</script>
<style scoped>
.background-container {
  margin-top:-55px;
  background-color: #4e7fcf;
  height: 100%; 
  padding: 70px; 

}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
  weight:500px;
  background-color: #f7f7f7;
  padding: 20px; /* Padding để tạo khoảng cách bên trong container */
  border-radius: 12px; /* Viền góc cho container */
  box-shadow: 6px 6px 8px 8px rgba(0, 0, 0, 0.2); /* Box-shadow nhẹ quanh toàn bộ container */
  background-color: #fff; /* Nền trắng cho container */
}
.step-container {
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin-bottom: 20px; /* Giảm khoảng cách giữa step-container và title-container */
}

.step {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  width: 120px;
  height: 150px; /* Đặt chiều cao để tạo không gian cho nội dung */
  margin-right: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Canh giữa theo chiều dọc */
  align-items: center; /* Canh giữa theo chiều ngang */
}


.step.active {
  transform: translateY(-25px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: #3498db;
  color: #fff; 

}

.step:last-child {
  margin-right: 0;
}

.step-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.step-number {
  font-size: 48px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 12px;
}

.step-text {
  font-size: 14px;
  color: #666;
}

/* Title container with border */
.title-container {
  display: flex;
  justify-content: center;
  width: 70%;
}

.title-box {
  display: flex;
  align-items: center;
  width: 100%; /* Đảm bảo title-box có chiều rộng đầy đủ */
  position: relative; /* Để cho phép divider hiển thị */
  
}

.title {
  background-color: #b3b5b5; /* Màu nền của tiêu đề để nổi bật hơn */
  color: #fff;
  border-radius: 10px; /* Đảm bảo viền trùng khớp với .title-box */
  padding: 20px 30px; /* Điều chỉnh padding để phù hợp với kích thước */
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  box-sizing: border-box; /* Đảm bảo padding không ảnh hưởng đến kích thước tổng thể */
  width: 33.33%; /* Đặt kích thước của các tiêu đề để khớp với các bước */
 
}

.title.before {
  border-radius: 10px 0 0 10px; /* Viền góc trên bên trái và dưới bên trái */
}

.title.now {
  border-radius: 0; /* Không có viền góc */
}

.title.after {
  border-radius: 0 10px 10px 0; /* Viền góc trên bên phải và dưới bên phải */
}

.title.active {
  background-color: #646666; /* Màu nền nổi bật cho tiêu đề hiện tại */
  color: #fff; /* Màu chữ nổi bật cho tiêu đề hiện tại */
}

.title-box::before {
  content: "";
  display: block;
  height: 2px;
  width: 100%;
  background-color: #ccc;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: -1;
}

.title-box::after {
  content: "";
  display: block;
  height: 2px;
  width: 100%;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
}

/* Adjust styles for smaller screens */
@media (max-width: 768px) {
  .step-container, .title-container {
    flex-direction: column;
    align-items: center;
  }

  .step, .title-box {
    width: 100%;
    margin-bottom: 20px;
  }

  .step:last-child, .title-box:last-child {
    margin-bottom: 0;
  }

  .title {
    width: 100%;
    margin-bottom: 10px;
  }

  .title-box::before,
  .title-box::after {
    display: none;
  }
}
</style>
