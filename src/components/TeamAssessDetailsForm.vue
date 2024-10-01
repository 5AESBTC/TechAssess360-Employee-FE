<template>
  <div
    class="evaluation-header mb-2"
    style="display: flex; justify-content: space-between; align-items: center"
  >
    <label class="fw-bold fs-4">
      Chi tiết đánh giá quý III năm 2024 của:
      {{ selectedPerson ? selectedPerson.name : "" }}
    </label>
    <!-- <span style="color: red; font-size: 24px;">Tổng điểm: {{ calculateGrandTotalScore() }}</span> -->
  </div>

  <form v-if="selectedPerson" class="evaluation-form">
    <div
      v-for="(criteria, criteriaIndex) in criterias"
      :key="criteriaIndex"
      class="section mb-4"
    >
      <div class="d-flex justify-content-between">
        <label class="d-flex gap-2">
          <h4>{{ criteria.title }}</h4>
          <span class="text-danger fw-bold">*</span>
        </label>
        <div class="point">
          <!-- ({{
            listScores[criteriaIndex].total
              ? istScores[criteriaIndex].total
              : "?"
          }}
          / {{ criteria.point }}) -->
        </div>
      </div>

      <div>
        <div v-if="criteria.questions">
          <div
            v-for="(question, questionIndex) in criteria.questions"
            :key="questionIndex"
            class="question mb-3"
          >
            <div
              v-if="question.label"
              class="d-flex justify-content-between title"
            >
              <label> {{ questionIndex + 1 }}. {{ question.label }} </label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(answer, answerIndex) in question.answer"
                :key="answerIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ answer.label }}</span>
                <div
                  v-if="
                    this.perfValues &&
                    isShowAvatar(criteriaIndex, questionIndex, answer.value)
                  "
                  class="avatar-group mt-2 d-flex justify-content-center"
                >
                  <div
                    style="position: relative; margin-right: 10px"
                    class="avatar-container"
                  >
                    <img
                      :src="userInfo?.avatar"
                      alt="Avatar"
                      class="avatar-img"
                      style="cursor: pointer"
                    />
                    <span
                      v-if="
                        perfValues[criteriaIndex][questionIndex].description
                      "
                      class="tooltiptext"
                      style="
                        background-color: rgba(0, 0, 0, 0.7);
                        color: #fff;
                        padding: 5px;
                        border-radius: 5px;
                      "
                    >
                      {{ perfValues[criteriaIndex][questionIndex].description }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-else>
          <div class="question mb-3">
            <label class="d-flex title"
              >{{ selectedPerson.evaluation[section.key]?.label
              }}<span class="text-danger"> *</span></label
            >
            <div class="form-control text-start">
              {{ selectedPerson.evaluation[section.key]?.answer }}
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </form>
</template>


<script>
import axios from "axios";

export default {
  name: "TeamAssessDetailsForm",
  props: {
    userInfo: Object,
    selectedPerson: Object,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_DB_URL,
      criterias: [],
      perfValues: null,
    };
  },
  mounted() {
    this.fetchCriterias();
    this.loadData();
  },
  methods: {
    isShowAvatar(criteriaIndex, questionIndex, value) {
      console.log(this.perfValues[criteriaIndex][questionIndex]?.value);
      console.log(value);
      return this.perfValues[criteriaIndex][questionIndex]?.value === value;
    },
    async fetchCriterias() {
      try {
        const response = await axios.get(this.apiUrl + "/criterias");
        this.criterias = response.data;
      } catch (error) {
        console.error("Error fetching criterias:", error);
      }
    },
    loadData() {
      try {
        const key = this.userInfo.id + "assessTo" + this.selectedPerson.id;
        const dataString = localStorage.getItem(key);
        console.log(key);
        console.log("Dữ liệu từ localStorage:", dataString); // Kiểm tra giá trị lấy từ localStorage

        if (dataString) {
          this.perfValues = JSON.parse(dataString); // Phân tích dữ liệu JSON
        } else {
          this.loadedData = "Không có dữ liệu nào trong localStorage.";
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
      }
    },
  },
};
</script>

<style scoped>
.section h5 {
  font-weight: bold;
  text-transform: uppercase;
}

.left-menu {
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  height: 80vh;
  margin-top: 25px;
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

/* Team Mate Table */
.team-mate .table {
  font-size: 14px;
  margin-top: 20px;
  display: block;
  width: 100%;
  overflow-x: auto;
  /* Cho phép cuộn ngang */
  -webkit-overflow-scrolling: touch;
}

.table > table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

/* Right Menu Styles */
.right-menu {
  height: 80vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 80vh;
  margin-right: 20px;
  margin-top: 25px;
  margin-left: 20px;
}

.evaluation-form {
  flex: 1;
  /* Take up remaining space */
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
  /* Allow scrolling if content overflows */
}

.evaluation-header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.evaluation-form .title {
  background-color: #99c6f8;
  padding: 10px;
  border-radius: 5px;
}

.point {
  color: red;
}

.evaluation-form .content {
  padding-left: 20px;
}

.content > p {
  color: black;
}

.evaluation-form .form-check-label {
  font-weight: normal;
}

.evaluation-form::-webkit-scrollbar {
  width: 8px;
}

.evaluation-form::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 10px;
}

.evaluation-form::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

/* Form Buttons */
.form-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 10;
  position: absolute;
}

/* Tooltip container */
.avatar-group {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #e2e2e2;
  color: black;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 125%;
  /* Vị trí tooltip */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-container:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.avatar-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
}

.answer-label {
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  max-width: 250px;
  /* Đặt chiều rộng tối đa của label */
  white-space: normal;
  /* Cho phép text xuống dòng */
  overflow-wrap: break-word;
  /* Ngắt từ để text không bị tràn ra ngoài */
  display: inline-block;
  /* Cho phép label có kích thước chiều rộng cụ thể */
}

/* Container cho dropdowns */
.dropdowns {
  display: flex;
  /* Sử dụng Flexbox để sắp xếp các dropdown nằm cùng hàng */
  flex-wrap: nowrap;
  /* Ngăn không cho các dropdown xuống hàng */
  gap: 20px;
  /* Khoảng cách giữa các dropdown */
  align-items: center;
  /* Căn giữa các dropdown theo chiều dọc */
  margin-bottom: 20px;
  /* Khoảng cách dưới của container */
}

/* Style cho mỗi dropdown */
.form-select {
  width: 150px;
  /* Đặt chiều rộng cho dropdown */
  height: 40px;
  /* Thay đổi chiều cao của dropdown */
  padding: 0.375rem 0.75rem;
  /* Padding cho dropdown */
  font-size: 1rem;
  /* Kích thước font chữ */
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  /* Màu nền của dropdown */
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* Viền của dropdown */
  border-radius: 0.25rem;
  /* Bo góc của dropdown */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  /* Hiệu ứng chuyển tiếp */
}

.form-select:focus {
  border-color: #007bff;
  /* Màu viền khi focus */
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
  /* Hiệu ứng bóng đổ khi focus */
}

/* Style cho label của dropdown */
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  /* Khoảng cách dưới của label */
  font-weight: 600;
  /* Định dạng font chữ của label */
  color: #333;
  /* Màu chữ của label */
}

/* Đối với màn hình nhỏ (điện thoại di động) */
@media (max-width: 576px) {
  .container-fluid {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .left-menu,
  .right-menu {
    margin-left: 0;
    margin-right: 0;
    margin-top: 15px;
    height: auto;
    /* Chiều cao tự động để tránh bị cắt xén */
  }

  .profile {
    max-width: 100%;
    margin: 0 auto;
  }

  .evaluation-form {
    padding: 10px;
  }

  .form-select {
    width: 100%;
    /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
  }

  .form-buttons {
    flex-direction: column;
    /* Các nút nằm theo chiều dọc */
    gap: 10px;
  }
}

/* Đối với màn hình trung bình (máy tính bảng) */
@media (min-width: 576px) and (max-width: 768px) {
  .left-menu,
  .right-menu {
    height: auto;
    margin-left: 0;
    margin-right: 0;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar-img {
    width: 20px;
    height: 20px;
  }

  .evaluation-header {
    font-size: 16px;
  }

  .form-select {
    width: 100%;
    /* Đặt chiều rộng toàn bộ */
  }
}

/* Đối với màn hình lớn (máy tính để bàn) */
@media (min-width: 992px) {
  .profile {
    max-width: 400px;
    margin: 0 auto;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .avatar-img {
    width: 24px;
    height: 24px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-display {
  color: red;
  text-align: right;
}
</style>
