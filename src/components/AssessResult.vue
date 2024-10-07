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
    <label class="form-label">Xếp hạng: <span class="score">B</span></label>
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
import axios from 'axios'; 

export default {
  name: "AssessResult",
  components: {
    RadarChart,
  },
  data() {
    return {
      
      showNote: true,
      profile: {},
      radarData: {
        labels: [],
        selfAssessment: [],
        manager: [],
        team: [],
      },
      note: "",
      tableData: [],
      userInfo: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    
    async fetchData() {
      try {
        const response = await axios.get('/api/assessment', {
          params: {
            userId: this.userInfo.id,
            year: this.selectedYear,
            quarter: this.selectedQuarter
          }
        });
        
        const data = response.data;
        
        // Cập nhật dữ liệu từ API
        this.profile = data.profile;
        this.radarData = data.radarData;
        this.note = data.note;
        this.tableData = data.tableData;
        this.years = data.availableYears;
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
      }
    },
    async updateAssessment() {
      // Gọi khi người dùng thay đổi năm hoặc quý
      await this.fetchData();
    }
  },
  watch: {
    selectedYear() {
      this.updateAssessment();
    },
    selectedQuarter() {
      this.updateAssessment();
    }
  }
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
  width: 100%; 
  max-width: 300px;  
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
  margin: 0 auto 20px;
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

  .profile, .total-score {
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
</style>
