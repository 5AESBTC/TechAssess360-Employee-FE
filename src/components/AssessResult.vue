<template>
  <div class="background-container">
    <div class="container-fluid p-5">
      <div class="rows content justify-content-md-center align-items-center gap-3">
        <div class="col-md-5 left-content">
          <div class="profile-score-container d-flex justify-content-between align-items-start mb-5">
  <div class="profile d-flex align-items-center">
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
      <div class="line">
        <strong>Bậc hiện tại:</strong> {{ profile.level }}
      </div>
      <div class="line">
        <strong>Dự án hiện tại:</strong> {{ profile.project }}
      </div>
    </div>
  </div>
  <div class="total-score d-flex flex-column font-weight-bold justify-content-end gap-2">
    <label class="form-label">Điểm đánh giá: <span class="score">58 điểm</span></label>
    <label class="form-label">Bậc: <span class="score">B</span></label>
  </div>
</div>

          <div class="table-wrapper">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Hệ số</th>
                  <th class="text-start">Tiêu Chí</th>
                  <th>Tự đánh giá</th>
                  <th>Tổng Điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td>{{ row.factor }}</td>
                  <td class="text-start">{{ row.criteria }}</td>
                  <td>{{ row.selfAssessment }}</td>
                  <td>{{ row.totalScore.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
           
          </div>
        </div>
        <div class="col-md-7 right-content">
          <RadarChart :data="radarData" />
          <div class="note-container text-start">
          <label for="note" ><strong>Đánh giá của quản lý:</strong></label >
          <div v-if="showNote" class="note-section d-flex gap-3">
            <p id="note" class="note-display">{{ note }}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from "./RadarChart.vue";

export default {
  name: "AssessResult",
  components: {
    RadarChart,
  },
  data() {
    return {
      showNote: true,
      profile: {
        name: "Trịnh Thái Quân",
        position: "Fresher",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triển",
        project: "StudyArt",
        level: "3",
      },
      radarData: {
        labels: [
          "Hiệu suất Công việc",
          "Kỹ năng và Kiến thức",
          "Tinh thần làm việc và Thái độ",
          "Đóng góp và Sáng kiến",
          "Quy định và Chính sách",
          "Đóng góp Cá nhân và Kết quả",
        ],
        selfAssessment: [4, 2, 4, 3, 5, 3],
        manager: [2, 3, 2, 2, 2, 3],
        team: [3, 2, 1, 3, 2, 3],
      },
      selectedYear: "",
      selectedQuarter: "",
      years: ["2022", "2023", "2024", "2025"],
      quarters: ["Qúy 1", "Qúy 2", "Qúy 3", "Qúy 4"],
      note: "Thái đố làm việc rất chuyên nghiệp",
      tableData: [
        {
          factor: 30,
          criteria: "Hiệu suất Công việc",
          selfAssessment: 4,
          totalScore: 22,
        },
        {
          factor: 15,
          criteria: "Kỹ năng và Kiến Thức",
          selfAssessment: 2,
          totalScore: 2.3,
        },
        {
          factor: 10,
          criteria: "Tinh thần làm việc và Thái độ",
          selfAssessment: 4,
          totalScore: 2.6,
        },
        {
          factor: 10,
          criteria: "Đóng góp và Sáng kiến",
          selfAssessment: 3,
          totalScore: 2.8,
        },
        {
          factor: 10,
          criteria: "Quy định và Chính sách",
          selfAssessment: 5,
          totalScore: 3.3,
        },
        {
          factor: 25,
          criteria: "Đóng góp Cá nhân và Kết quả",
          selfAssessment: 3,
          totalScore: 3,
        },
      ],
      userInfo: null,
    };
  },
  mounted() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.total-score {
  color: red;
}
.background-container {
  background-color: #4e7fcf;
  margin: 0 auto;
  padding-top: 100px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  min-height: 0%;
  height: auto;
  flex-wrap: wrap;

  height: 50%;
}

.left-content,
.right-content {
  padding: 20px;
  flex: 1;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.left-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  min-width: 50%;
}


.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  max-width: 50%;
}

.profile {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  width: 400px;
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
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.line {
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;
  line-height: 1.5;
}

.line strong {
  color: #007bff;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 100px;
  min-height: 400px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 14px;
  font-family: "Arial", sans-serif;
  text-align: left;
  min-height: 350px;
}

.styled-table th {
  width: 25%;
  /* Set width for each header (4 headers = 100% total) */
}

.styled-table thead tr {
  background-color: #4e7fcf;
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
  border-bottom: 2px solid #4e7fcf;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.right-content canvas {
  width: 100% !important;
  max-width: 400px;
}
.note-display{
  color: white;
  font-weight:bold;
}
.note-container{
  width: 100%;
}
.note-container label{
  text-decoration: underline;
  font-size: 19px;
}
.note-section {
  height: 100px;
  background-color: #4e7fcf;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(20, 13, 72, 0.1);
  margin: 0 auto;
  font-weight: bold;
}

.total-score {
  padding: 10px;
  background-color: #f9f9f9; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm đổ bóng */
  max-width: 300px; /* Độ rộng tối đa */
  margin: 0 auto; /* Căn giữa */
  margin-left: 20px;
  text-align: right; 
}

.form-label {
  display: flex; 
  justify-content:flex-start; 
  font-weight: bold; 
  color: #007bff;
  font-size: 19px;
}

.score {
  font-size: 18px; 
  color: red; 
  margin-left:30px;
}

</style>
