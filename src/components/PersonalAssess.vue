<template>
  <div class="container-fluid row justify-content-md-center align-items-center" v-if="userInfo">
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
      <div class="profile mb-3 d-flex align-items-center justify-content-around">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="avatar" />
        </div>
        <div class="info ms-3 text-start">
          <h3 class="mb-2">{{ userInfo.name }}</h3>
          <div class="line">
            <strong>Vị trí:</strong> {{ userInfo.position }}
          </div>
          <div class="line">
            <strong>Bậc hiện tại:</strong> {{ userInfo.level }}
          </div>
          <div class="line">
            <strong>Dự án hiện tại:</strong> {{ userInfo.project }}
          </div>
          <div class="line">
            <strong>Thời gian làm việc:</strong> {{ calculateWorkTime() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right Menu -->
    <div class="col-md-8 right-menu p-4">
      <!-- Evaluation Header -->
      <div class="evaluation-header text-start mb-2 d-flex justify-content-between">
        <label class="fw-bold fs-4">Đánh giá quý III năm 2024 cho bản thân</label>
        <div class="d-flex">
          <label class="fw-bold fs-4">Tổng điểm:
            <span class="text-danger">{{ calculateTotalScore() }}</span></label>
        </div>
      </div>

      <!-- Evaluation Form -->
      <!-- @submit.prevent="submit" -->
      <form class="evaluation-form" @submit.prevent="submitForm">
        <!-- Performance Evaluation -->
        <div v-for="(criteria, criteriaIndex) in listCriteria" :key="criteriaIndex" class="section mb-4">
          <div class="d-flex justify-content-between">
            <label class="d-flex gap-2">
              <h5>{{ criteriaIndex + 1 }}. {{ criteria.title }}</h5>
              <span class="text-danger fw-bold">*</span>
            </label>
            <div class="multi">
              ({{ criteria.total ? criteria.total : "?" }} /
              {{ criteria.point }})
            </div>
          </div>
          <div v-for="(question, questionIndex) in criteria.questions" :key="questionIndex" class="question mb-3">
            <div class="d-flex justify-content-between title" v-if="question.label">
              <label>
                {{ questionIndex + 1 }}. {{ question.label }}
                <span class="text-danger"> *</span>
              </label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(answer, answerIndex) in question.answer" :key="answerIndex" class="form-check">
                <input type="radio" :id="'performanceOption' +
                  criteriaIndex +
                  questionIndex +
                  answerIndex
                  " :name="'performance' + criteriaIndex + questionIndex" class="form-check-input" @change="
                    selectPerformanceValue(
                      criteriaIndex,
                      questionIndex,
                      answer.value
                    )
                    " :value="answer.value" />
                <label :for="'performanceOption' +
                  criteriaIndex +
                  questionIndex +
                  answerIndex
                  " class="form-check-label">{{ answer.label }}
                </label>
              </div>
            </div>
            <div class="description">
              <textarea v-if="isShowDescription(criteriaIndex, questionIndex)" class="form-control" :class="{
                'error-textarea':
                  perfValues[criteriaIndex][questionIndex]?.hasError,
              }" rows="3" placeholder="Nhận xét thêm" v-model="perfValues[criteriaIndex][questionIndex].description"
                :ref="'description_' + criteriaIndex + '_' + questionIndex"></textarea>
            </div>
          </div>
        </div>

        <!-- Personal contribution and Results -->
        <div class="section mb-4">
          <h5>
            Đóng góp Cá nhân và Kết quả <span class="text-danger"> *</span>
          </h5>
          <div class="form-group">
            <textarea class="form-control" :class="{
              'error-textarea': perfValues.contributionHasError,
            }" rows="5" v-model="perfDetails.contribution"
              placeholder="Ghi rõ những đóng góp và kết quả cá nhân của bạn..."></textarea>
          </div>
        </div>

        <div class="section mb-4">
          <h5>Mục tiêu quý tiếp theo <span class="text-danger"> *</span></h5>
          <div class="form-group">
            <textarea class="form-control" rows="5" v-model="perfDetails.nextTarget"
              placeholder="Ghi rõ những mục tiêu tiếp theo mong muốn đạt được"></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Gửi Đánh Giá</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";

export default {
  name: "TeamMatesAssess",
  data() {
    return {
      apiUrl: process.env.VUE_APP_DB_URL,
      userInfo: null,
      teamMates: [],
      listCriteria: [],
      selectedPerson: null,
      perfValues: [],
      perfDetails: {},
      listScore: [],
      sortKey: "name",
      sortOrder: "asc",
    };
  },
  mounted() {
    this.isLogin();
    this.fetchListCriteria();
  },
  created() {
    // Khởi tạo perfValues dựa trên số lượng tiêu chí và câu hỏi
    this.perfValues = this.listCriteria.map((criteria) =>
      criteria.question.map(() => ({
        value: null, // Giá trị ban đầu là null (chưa chọn)
        description: "", // Mô tả ban đầu là chuỗi rỗng
        hasError: false,
      }))
    );
    this.perfDetails = {
      contribution: "",
      nextTarget: "",
    };
  },
  methods: {
    async fetchListCriteria() {
      try {
        const response = await axios.get(this.apiUrl + "/criterias");
        this.listCriteria = response.data;
      } catch (error) {
        console.error("Error fetching criterias:", error);
      }
    },
    isLogin() {
      const userToken = localStorage.getItem("userToken");
      console.log("THÔNG TIN ĐĂNG NHẬP:: ", userToken);

      if (!userToken) {
        this.$router.push("/login");
      } else {
        this.userInfo = userToken;
        this.selectedPerson = userToken;
      }
    },
    isShowDescription(criteriaIndex, questionIndex) {
      return (
        this.perfValues[criteriaIndex] &&
        this.perfValues[criteriaIndex][questionIndex] &&
        this.perfValues[criteriaIndex][questionIndex].value >= 3
      );
    },
    selectPerformanceValue(criteriaIndex, questionIndex, value) {
      // Đảm bảo perfValues[criteriaIndex] đã được khởi tạo
      if (!this.perfValues[criteriaIndex]) {
        this.perfValues[criteriaIndex] = [];
      }

      // Đảm bảo perfValues[criteriaIndex][questionIndex] là đối tượng
      if (!this.perfValues[criteriaIndex][questionIndex]) {
        this.perfValues[criteriaIndex][questionIndex] = {
          value: null,
          description: "",
          hasError: false,
        };
      }
      this.perfValues[criteriaIndex][questionIndex].value = value;

      // clear textarea description
      if (this.perfValues[criteriaIndex][questionIndex].description && value < 3) {
        this.perfValues[criteriaIndex][questionIndex].description = "";
      }
      // Cập nhật vào list để hiển thị
      if (!this.listScore[criteriaIndex]) {
        this.listScore[criteriaIndex] = {};
      }
      this.listScore[criteriaIndex][questionIndex] =
        this.calculateScoreSelected(criteriaIndex, questionIndex, value);

      // Kiểm tra xem tất cả câu hỏi cho criteriaIndex này đã được trả lời chưa
      const questionsCount =
        this.listCriteria[criteriaIndex]?.questions?.length || 0;
      const answeredQuestionsCount = Object.keys(
        this.listScore[criteriaIndex] || {}
      ).length;

      if (answeredQuestionsCount === questionsCount) {
        // Tính tổng điểm cho criteriaIndex này
        const totalOfCriteria = this.calculateTotalOfCriteria(criteriaIndex);
        const percentage = Math.round(
          ((totalOfCriteria * 20) / 100) *
          (this.listCriteria[criteriaIndex]?.point || 1)
        );
        this.listCriteria[criteriaIndex].total = percentage;
      }
      console.log(this.perfValues);
    },
    calculateScoreSelected(criteriaIndex, questionIndex, value) {
      // Tính điểm cho giá trị đã chọn
      const question =
        this.listCriteria[criteriaIndex]?.questions[questionIndex];
      const pointCriteriaIndex =
        parseFloat(this.listCriteria[criteriaIndex]?.point) || 1;
      const questionScore = parseFloat(question?.score) || 0;
      const selectedValue = parseFloat(value) || 0;

      // Tính toán điểm cho câu hỏi này
      const score = (questionScore / pointCriteriaIndex) * selectedValue;
      return Math.round(score * 100) / 100;
    },
    calculateTotalOfCriteria(criteriaIndex) {
      const listScoreForCriteria = this.listScore[criteriaIndex] || {};
      let total = 0;

      for (const questionIndex in listScoreForCriteria) {
        if (
          Object.prototype.hasOwnProperty.call(
            listScoreForCriteria,
            questionIndex
          )
        ) {
          total += listScoreForCriteria[questionIndex];
        }
      }
      total = Math.round(total * 100) / 100;
      return total;
    },
    calculateTotalScore() {
      return this.listCriteria.reduce((total, criteria) => {
        return (total += criteria.total);
      }, 0)
    },
    submitForm() {
      let allDescriptionsFilled = true;
      let allValuesSelected = true;
      let firstErrorRef = null;

      this.perfValues.forEach((selectedCriteria, index) => {
        selectedCriteria.forEach((question, qIndex) => {
          if (question.value === undefined || question.value === null) {
            allValuesSelected = false;
          }

          if (question.value >= 3) {
            if (!question.description || question.description.trim() === "") {
              allDescriptionsFilled = false;
              question.hasError = true;
              // Kiểm tra ref có tồn tại trước khi truy cập
              if (!firstErrorRef) {
                const refKey = `description_${index}_${qIndex}`;
                firstErrorRef = this.$refs[refKey][0]; // Lưu ref ô lỗi đầu tiên
              }
            } else {
              question.hasError = false;
            }
          } else {
            question.hasError = false;
          }
        });
      });

      // Kiểm tra và thông báo lỗi
      if (!allValuesSelected) {
        toast.error("Vui lòng chọn cho tất cả các câu hỏi!", {
          autoClose: 2000,
        });
        return;
      }

      if (!allDescriptionsFilled) {
        toast.error("Vui lòng nhập đầy đủ nhận xét cho các câu hỏi!", {
          autoClose: 2000,
        });
        if (firstErrorRef) {
          firstErrorRef.scrollIntoView({ behavior: "smooth", block: "center" }); // Cuộn tới ô lỗi đầu tiên
        }
        return;
      }

      for (const key in this.perfDetails) {
        if (!this.perfDetails[key]?.trim()) {
          toast.error("Vui lòng không để trống phần đánh giá chi tiết", {
            autoClose: 2000,
          });
          return;
        }
      }

      // Lưu dữ liệu và thông báo thành công
      localStorage.setItem(
        this.userInfo.id + "assessTo" + this.selectedPerson.id,
        JSON.stringify(this.perfValues)
      );

      localStorage.setItem(
        this.userInfo.id + "assessDetailsTo" + this.selectedPerson.id,
        JSON.stringify(this.perfDetails)
      );

      toast.success("Gửi đánh giá thành công!", { autoClose: 2000 });
      this.clearForm();
    },
    calculateWorkTime() {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo && userInfo.dateJoinCompany) {
        const joinDate = new Date(userInfo.dateJoinCompany);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - joinDate.getFullYear();
        let months = currentDate.getMonth() - joinDate.getMonth();
        let days = currentDate.getDate() - joinDate.getDate();

        if (days < 0) {
          months--;
          days += new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          ).getDate();
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        let result = [];

        if (years > 0) {
          result.push(`${years} năm`);
        }
        if (months > 0) {
          result.push(`${months} tháng`);
        }
        if (days > 0) {
          result.push(`${days} ngày`);
        }

        return result.length > 0 ? result.join(" ") : "Chưa xác định";
      }
      return "Chưa xác định";
    },
    clearForm() {
      this.perfValues = [];
      this.perfDetails = {
        contribution: "",
        nextTarget: "",
      };
      this.listScore = [];
      // clear input radio
      document.querySelectorAll("input[type=radio]").forEach((input) => {
        input.checked = false;
      });

      // clear textarea
      document.querySelectorAll("textarea").forEach((input) => {
        input.value = "";
      });
      this.listCriteria.forEach((criteria) => {
        criteria.total = 0;
      });
      this.selectedPerson = null;
    },
  },
};
</script>

<style scoped>
tbody>tr>td {
  vertical-align: middle;
}

.container-fluid {
  background-color: #4e7fcf;
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 100px;
  margin: 0 auto;
  height: 100%;
}

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
  background-color: #f7f7f7;
  /* backdrop-filter: blur(10px);*/
  border: 3px solid rgba(44, 113, 241, 0.1);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 16px 16px rgba(1, 41, 116, 0.1);
  max-width: 450px;
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

/* Right Menu Styles */
.error-textarea {
  border: 2px solid red;
  /* Đặt viền đỏ */
}

.multi {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

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

.content>p {
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
</style>
