<template>
  <div class="background-container">
    <div class="container-fluid p-5">
      <div class="rows content justify-content-md-center align-items-center gap-3">
        <div class="col-md-5 left-content">
          <div class="profile-score-container d-flex justify-content-between align-items-start mb-5">
            <div class="profile d-flex align-items-center">
              <div class="avatar">
                <img :src="this.defaultAvatar" alt="avatar" />
              </div>
              <div class="info ms-3 text-start">
                <h3 class="mb-2">{{ userInfo.name }}</h3>
                <div class="line">
                  <strong>Vị trí:</strong> {{ userInfo.rank.position.name }}
                </div>
                <div class="line">
                  <strong>Bậc hiện tại:</strong> {{ userInfo.rank.level }}
                </div>
                <div class="line">
                  <strong>Dự án hiện tại:</strong> {{ userInfo.project }}
                </div>
              </div>
            </div>
            <div class="total-score d-flex flex-column font-weight-bold justify-content-end gap-2">
              <label class="form-label">Điểm đánh giá: <span class="score">{{ totalPoint ? totalPoint + "điểm" : "?"
                  }}</span></label>
              <label class="form-label">Đề xuất nâng bậc: <span class="score">{{ levelUp ? levelUp : "?"
                  }}</span></label>
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
                <tr>
                  <td>30</td>
                  <td class="text-start">Hiệu suất công việc</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>20</td>
                  <td class="text-start">Kỹ năng và kiến thức</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>20</td>
                  <td class="text-start">Tinh thần làm việc và thái độ</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>15</td>
                  <td class="text-start">Đóng góp và sáng kiến</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>15</td>
                  <td class="text-start">Quy định và chính sách</td>
                  <td></td>
                  <td>{{ averageTeamScore }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-7 right-content">
          <RadarChart :data="radarData" />
          <div class="note-container text-start">
            <label for="note"><strong>Đánh giá của quản lý:</strong></label>
            <div v-if="showNote" class="note-section d-flex gap-3">
              <p id="note" class="note-display">{{ note ? note : "Không có nhận xét thêm" }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from "./RadarChart.vue";
import AssessService from "@/services/AssessService";
export default {
  name: "AssessResult",
  components: {
    RadarChart,
  },
  data() {
    return {
      showNote: true,
      radarData: {
        labels: [],
        selfAssessment: [],
        manager: [],
        team: [],
      },
      tableData: [],
      userInfo: null,
      totalPoint: 0,
      levelUp: "",
      note: "",
      selfAssessment: [],
      teamsAssessment: [],
      managerAssessment: [],
      averageTeamPoint: 0,
      managerPoint: 0,
      defaultAvatar:
        "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",

    };
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.userInfo = JSON.parse(user);
    }
  },
  mounted() {
    this.fetchListAssessOfUser();

  },
  computed: {
    averageTeamScore() {
      if (!this.tableData.data) return 0;

      const teamAssessments = this.teamsAssessment.filter(assess => assess.assessmentType === "TEAM");
      console.log(teamAssessments);

      if (teamAssessments.length === 0) return 0;

      let totalScore = 0;
      let totalWeight = 0;


      return totalWeight ? (totalScore / totalWeight).toFixed(2) : 0;
    }
  },
  methods: {
    async fetchListAssessOfUser() {
      try {
        const res = await AssessService.fetchAssessSelf(this.userInfo.id);
        if (res.code === 1010) {
          this.tableData = res;
          console.log(this.tableData);
        }
        this.selfAssessment = this.tableData.data.filter(assess => assess.assessmentType === "SELF")
        console.log("SELF ASSESSMENT::", this.selfAssessment);

        this.managerAssessment = this.tableData.data.filter(assess => assess.assessmentType === "MANAGER")
        console.log("MANAGER ASSESSMENT::", this.managerAssessment);

        this.teamsAssessment = this.tableData.data.filter(assess => assess.assessmentType === "TEAM")
        console.log("TEAM ASSESSMENT::", this.teamsAssessment);

      } catch (error) {
        console.error("Error fetching assess list:", error);
      }
    },
  },
};
</script>

<style scoped>
.background-container {
  background-color: #4e7fcf;
  margin: 0 auto;
  padding-top: 60px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-fluid {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 15px;
}

.content {
  display: flex;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 1500px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.left-content,
.right-content {
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  min-height: 700px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
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

  width: 100%;

  max-width: 800px;
}

.left-content {
  display: flex;
  flex-direction: column;
}

.profile-score-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.profile {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
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

.total-score {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: right;
}

.form-label {
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  color: #007bff;
  font-size: 19px;
}

.score {
  font-size: 18px;
  color: red;
  margin-left: 10px;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 70px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table thead tr {
  background-color: #4e7fcf;
  color: #ffffff;
}

.styled-table th,
.styled-table td {
  padding: 7px 10px;
  text-align: center;
}

@media (max-width: 992px) {
  .content {
    flex-direction: column;
  }

  .left-content,
  .right-content {
    width: 100%;
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .profile-score-container {
    flex-direction: column;
  }

  .profile,
  .total-score {
    width: 100%;
  }

  .avatar {
    margin-bottom: 15px;
  }

  .info {
    text-align: center;
  }
}

.right-content canvas {
  width: 100% !important;
  max-width: 400px;
}

.note-display {
  color: white;
  font-weight: bold;
}

.note-container {
  width: 100%;
}

.note-container label {
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
</style>
