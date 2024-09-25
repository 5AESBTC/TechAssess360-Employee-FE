<template>
  <div class="background-container">
    <div class="container">
      <div class="container-fluid row justify-content-md-center align-items-center">
        <div class="content p-4 d-flex">
          <div class="left-content">
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
              <table class="styled-table">
                <thead>
                  <tr>
                    <th>Hệ số</th>
                    <th>Tiêu Chí</th>
                    <th>Tự đánh giá</th>
                    <th>Tổng Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableData" :key="index">
                    <td>{{ row.factor }}</td>
                    <td>{{ row.criteria }}</td>
                    <td>{{ row.selfAssessment }}</td>
                    <td>{{ row.totalScore.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="radar-container">
            <RadarChart :data="radarData" />
            <div class="note-section mt-4">
              <label for="note"><strong>Ghi chú:</strong></label>
              <p v-if="showNote" id="note" class="note-display">{{ note }}</p>
            </div>
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
      showNote: false,
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
      quarters: ['Qúy 1', 'Qúy 2', 'Qúy 3', 'Qúy 4'],
      note: '',
      tableData: [
        {
          factor: 0.5,
          criteria: 'Hiệu suất Công việc',
          selfAssessment: 4,
          totalScore: 3
        },
        {
          factor: 0.3,
          criteria: 'Kỹ năng và Kiến Thức',
          selfAssessment: 2,
          totalScore: 2.3
        },
        {
          factor: 0.2,
          criteria: 'Tinh thần làm việc và Thái độ',
          selfAssessment: 4,
          totalScore: 2.6
        },
        {
          factor: 0.4,
          criteria: 'Đóng góp và Sáng kiến',
          selfAssessment: 3,
          totalScore: 2.8
        },
        {
          factor: 0.3,
          criteria: 'Quy định và Chính sách',
          selfAssessment: 5,
          totalScore: 3.3
        },
        {
          factor: 0.4,
          criteria: 'Đóng góp Cá nhân và Kết quả',
          selfAssessment: 3,
          totalScore: 3
        }
      ],
      userInfo: null
    }
  },
  mounted() {
    this.isLogin()
  },
  methods: {
    isLogin() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo) {
        this.$router.push('/login');
      }
    },
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
  justify-content: center;
  padding: 20px;
}

.content {
  display: flex;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  min-height: 400px;
  height: auto;
  flex-wrap: wrap;
  margin-top: -20px;
}

.left-content,
.radar-container {
  flex: 1;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.left-content {
  background-color: #eef2f7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
  width: 40%;
}

.profile {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  margin-left: 20px;
}

.info h3 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.line {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  line-height: 1.5;
}

.line strong {
  color: #007bff;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: -30px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  text-align: left;

}

.styled-table th {
  width: 25%;
  /* Set width for each header (4 headers = 100% total) */
}

.styled-table thead tr {
  background-color: #007bff;
  color: #ffffff;
  text-align: center;
}

.styled-table th,
.styled-table td {
  padding: 7px 10px;
  text-align: center;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #007bff;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.radar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-left: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  min-height: 100%;

}

.radar-container canvas {
  width: 100% !important;
  max-width: 400px;
}

.note-section {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
