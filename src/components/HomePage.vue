<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <div class="info">
          <img src="https://picsum.photos/120/120" alt="profile" />
          <div class="details">
            <div class="detail-item">Tên: Trịnh Thái Quân</div>
            <div class="detail-item">Bộ phận: Thiết kế</div>
            <div class="detail-item">Chức vụ: Intern</div>
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
  name: 'HomePage',
  components: {
    RadarChart
  },
  data() {
    return {
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
  margin-left: 50px;
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

table th,
table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.info img {
  border-radius: 50%;
  margin-right: 15px;
}

.details {
  display: flex;
  flex-direction: column;
}

.detail-item {
  margin-bottom: 10px;
  font-size: 16px;
}

.detail-item::before {
  font-weight: bold;
  min-width: 150px;
}

.radar {
  width: 100%;
  margin-top: -75px;
  margin-left: 80px;
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

  .detail-item::before {
    min-width: 100px; /* Giảm kích thước min-width trên màn hình nhỏ hơn */
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
    padding: 8px; /* Giảm padding cho màn hình nhỏ hơn */
  }

  .info img {
    width: 80px;
    height: 80px;
  }

  .container {
    background-size: contain; /* Điều chỉnh kích thước ảnh nền trên màn hình nhỏ hơn */
  }
}
</style>
