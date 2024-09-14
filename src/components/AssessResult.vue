<template>
  <div class="container">
    <div class="content">
      <div class="left">
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

      <div class="right">
        <div class="radar">
          <RadarChart :data="radarData" />
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
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 150px;
}

.content {
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  margin-top: 40px;
}

.left {
  width: 50%;
  margin-right: 20px;
  margin-left: 80px;
  margin-top: -30px;
}

.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table td {
  padding: 7px;
  border: 1px solid #ddd;
  text-align: center;
}

table th {
  padding: 10px;
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
  /* Add a border around the avatar */
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
  /* Highlight the labels with a color */
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
  /* In đậm phần label */
  margin-right: 5px;
}

.value {
  font-weight: normal;
  /* Phần giá trị không in đậm */
}

.radar {
  width: 100%;
  margin-top: -75px;
  margin-left: 85px;
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

  .info {
    flex-direction: column;
    align-items: flex-start;
  }

  .info img {
    margin-bottom: 10px;
  }

  .radar {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .detail-item {
    font-size: 14px;
  }

  table th,
  table td {
    padding: 8px;
    /* Giảm padding cho màn hình nhỏ hơn */
  }

  .info img {
    width: 80px;
    height: 80px;
  }

  .container {
    background-size: contain;
    /* Điều chỉnh kích thước ảnh nền trên màn hình nhỏ hơn */
  }
}
</style>
