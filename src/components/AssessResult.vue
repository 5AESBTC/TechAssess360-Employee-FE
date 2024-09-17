<template>
  <div class="background-container">
    <div class="container">
      <div class="container-fluid row justify-content-md-center align-items-center">
        <div class="col-md-4 left-menu p-3">
          <div class="profile mb-5 d-flex align-items-center">
            <div class="avatar">
              <img :src="profile.avatarUrl" alt="avatar" />
            </div>
            <div class="info ms-3 text-start">
              <h3 class="mb-2">{{ profile.name }}</h3>
              <div class="line">
                <strong>Bộ Phận:</strong> {{ profile.department }}
              </div>
              <div class="line">
                <strong>Vị trí:</strong> {{ profile.position }}
              </div>
              <div class="line"><strong>Bậc hiện tại:</strong> {{ profile.level }}</div>
              <div class="line"><strong>Dự án hiện tại:</strong> {{ profile.project }}</div>
            </div>
          </div>
          <!-- <div class="dropdowns mb-4">
            <label for="year" class="form-label">Chọn năm:</label>
            <select id="year" v-model="selectedYear" class="form-select">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            
            <label for="quarter" class="form-label">Chọn quý:</label>
            <select id="quarter" v-model="selectedQuarter" class="form-select">
              <option v-for="quarter in quarters" :key="quarter" :value="quarter">
                {{ quarter }}
              </option>
            </select>
          </div> -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Hệ số</th>
                  <th>Tiêu Chí</th>
                  <th>Tự đánh giá</th>
                  <th>Quản Lý</th>
                  <th>Team</th>
                  <th>Tổng Điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30</td>
                  <td>Hiệu suất Công việc</td>
                  <td>4</td>
                  <td>2</td>
                  <td>3</td>
                  <td>22.00</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Kỹ năng và Kiến thức</td>
                  <td>2</td>
                  <td>3</td>
                  <td>2</td>
                  <td>10.00</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Tinh thần làm việc và Thái độ</td>
                  <td>4</td>
                  <td>2</td>
                  <td>1</td>
                  <td>6.00</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Đóng góp và Sáng kiến</td>
                  <td>3</td>
                  <td>2</td>
                  <td>3</td>
                  <td>6.67</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Quy định và Chính sách</td>
                  <td>5</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7.33</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>Đóng góp Cá nhân và Kết quả</td>
                  <td>3</td>
                  <td>3</td>
                  <td>3</td>
                  <td>20.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-md-8 right-menu p-4">
          <div class="radar">
            <RadarChart :data="radarData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RadarChart from './RadarChart.vue';

export default {
  name: 'AssessResult',
  components: {
    RadarChart
  },
  data() {
    return {
      profile: {
        name: "Trịnh Thái Quân",
        position: "Fresher",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triển",
        project: "StudyArt",
        level: "3",
      },
      radarData: {
        labels: ['Hiệu suất Công việc', 'Kỹ năng và Kiến thức', 'Tinh thần làm việc và Thái độ', 'Đóng góp và Sáng kiến', 'Quy định và Chính sách', 'Đóng góp Cá nhân và Kết quả'],
        selfAssessment: [4, 2, 4, 3, 5, 3],
        manager: [2, 3, 2, 2, 2, 3],
        team: [3, 2, 1, 3, 2, 3]
      },
      selectedYear: '',
      selectedQuarter: '',
      years: ['2022', '2023', '2024', '2025'],
      quarters: ['Qúy 1', 'Qúy 2', 'Qúy 3', 'Qúy 4']
    }
  }
}
</script>

<style scoped>

.background-container {
  background-color: #4e7fcf;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 100px;
  box-sizing: border-box;
  width: 100%;

}


.container-fluid {
  
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  margin-top: 17px;
  flex-wrap: nowrap; /* Avoid line breaks if space is insufficient */
}

.left-menu {
  width: 50%;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  height: 700px;
}


.right-menu {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 700px;
}
.radar {
  width: 30%;
  max-width: 500px; /* Ensure radar fits in the container */
  height: auto;
  margin-top: -75px;
  margin-left: 90px;
  text-align: center;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table td,
table th {
  padding: 7px;
  border: 1px solid #ddd;
  text-align: center;
}

.profile {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  margin: 0 auto;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #007bff;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h4 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.line {
  font-size: 16px;
  margin-bottom: 5px;
  line-height: 1.5;
}

.line strong {
  color: #007bff;
}

.details {
  padding-top: 13px;
  display: flex;
  flex-direction: column;
}

.detail-item {
  display: flex;
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}

.value {
  font-weight: normal;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .left,
  .right {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .radar {
    max-width: 100%; /* Ensure radar adjusts on smaller screens */
  }
}

@media (max-width: 480px) {
  .detail-item {
    font-size: 14px;
  }

  table th,
  table td {
    padding: 8px;
  }

  .avatar img {
    width: 80px;
    height: 80px;
  }
}
/* Container cho dropdowns */
.dropdowns {
  display: flex; /* Sử dụng Flexbox để sắp xếp các dropdown nằm cùng hàng */
  flex-wrap: nowrap; /* Ngăn không cho các dropdown xuống hàng */
  gap: 20px; /* Khoảng cách giữa các dropdown */
  align-items: center; /* Căn giữa các dropdown theo chiều dọc */
  margin-bottom: 20px; /* Khoảng cách dưới của container */
}

/* Style cho mỗi dropdown */
.form-select {
  width: 150px; /* Đặt chiều rộng cho dropdown */
  height: 40px; /* Thay đổi chiều cao của dropdown */
  padding: 0.375rem 0.75rem; /* Padding cho dropdown */
  font-size: 1rem; /* Kích thước font chữ */
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff; /* Màu nền của dropdown */
  background-clip: padding-box;
  border: 1px solid #ced4da; /* Viền của dropdown */
  border-radius: 0.25rem; /* Bo góc của dropdown */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; /* Hiệu ứng chuyển tiếp */
}

.form-select:focus {
  border-color: #007bff; /* Màu viền khi focus */
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); /* Hiệu ứng bóng đổ khi focus */
}

/* Style cho label của dropdown */
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* Khoảng cách dưới của label */
  font-weight: 600; /* Định dạng font chữ của label */
  color: #333; /* Màu chữ của label */
}
</style>
