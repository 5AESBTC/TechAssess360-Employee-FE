<template>
  <div
    class="container-fluid row justify-content-md-center align-items-center"
    v-if="userInfo"
  >
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
      <div
        class="profile mb-3 d-flex align-items-center justify-content-around"
      >
        <div class="avatar">
          <img :src="userInfo.avatar" alt="avatar" />
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
          <div class="line">
            <strong>Thời gian làm việc:</strong> {{ calculateWorkTime() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right Menu -->
    <div class="col-md-8 right-menu p-4">
      <!-- Evaluation Header -->
      <div
        class="evaluation-header text-start mb-2 d-flex justify-content-between"
      >
        <label class="fw-bold fs-4"
          >Đánh giá quý III năm 2024 cho bản thân</label
        >
        <div class="d-flex">
          <label class="fw-bold fs-4"
            >Tổng điểm:
            <span class="text-danger">{{
              totalPoint ? totalPoint : "0"
            }}</span></label
          >
        </div>
      </div>

      <!-- Evaluation Form -->
      <!-- @submit.prevent="submit" -->
      <form class="evaluation-form" @submit.prevent="submitForm">
        <!-- Performance Evaluation -->
        <div
          v-for="(criteria, criteriaIndex) in listCriteria"
          :key="criteriaIndex"
          class="section mb-4"
        >
          <div class="d-flex justify-content-between">
            <label class="d-flex gap-2">
              <h5>{{ criteriaIndex + 1 }}. {{ criteria.title }}</h5>
              <span class="text-danger fw-bold">*</span>
            </label>
            <div class="multi">
              {{
                listScore[criteriaIndex]?.totalOfCriteria !== undefined
                  ? listScore[criteriaIndex].totalOfCriteria
                  : "?"
              }}
              / {{ criteria.point }}
            </div>
          </div>
          <div
            v-for="(question, questionIndex) in criteria.questions"
            :key="questionIndex"
            class="question mb-3"
          >
            <div
              class="d-flex justify-content-between title"
              v-if="question.title"
            >
              <label>
                {{ questionIndex + 1 }}. {{ question.title }}
                <span class="text-danger"> *</span>
              </label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(answer, answerIndex) in question.answers"
                :key="answerIndex"
                class="form-check"
              >
                <input
                  type="radio"
                  :id="
                    'performanceOption' +
                    criteriaIndex +
                    questionIndex +
                    answerIndex
                  "
                  :name="'performance' + criteriaIndex + questionIndex"
                  class="form-check-input"
                  @change="
                    selectPerformanceValue(
                      criteriaIndex,
                      questionIndex,
                      answer.value
                    )
                  "
                  :value="answer.value"
                />
                <label
                  :for="
                    'performanceOption' +
                    criteriaIndex +
                    questionIndex +
                    answerIndex
                  "
                  class="form-check-label"
                  >{{ answer.title }}
                </label>
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="isShowDescription(criteriaIndex, questionIndex)"
                class="form-control"
                :class="{
                  'error-textarea': perfValues.assessDetails?.find(
                    (detail) =>
                      detail.criteriaId === criteriaIndex &&
                      detail.questionId === questionIndex
                  )?.hasError,
                }"
                rows="3"
                placeholder="Nhận xét thêm"
                v-model="
                  perfValues.assessDetails.find(
                    (detail) =>
                      detail.criteriaId === criteriaIndex &&
                      detail.questionId === questionIndex
                  ).description
                "
                :ref="'description_' + criteriaIndex + '_' + questionIndex"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Personal contribution and Results -->
        <div class="section mb-4">
          <h5>
            Đóng góp Cá nhân và Kết quả <span class="text-danger"> *</span>
          </h5>
          <div class="form-group">
            <textarea
              class="form-control"
              :class="{
                'error-textarea': perfValues.contributionHasError,
              }"
              rows="5"
              v-model="perfDetails.contribution"
              placeholder="Ghi rõ những đóng góp và kết quả cá nhân của bạn..."
            ></textarea>
          </div>
        </div>

        <div class="section mb-4">
          <h5>Mục tiêu quý tiếp theo <span class="text-danger"> *</span></h5>
          <div class="form-group">
            <textarea
              class="form-control"
              rows="5"
              v-model="perfDetails.nextTarget"
              placeholder="Ghi rõ những mục tiêu tiếp theo mong muốn đạt được"
            ></textarea>
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
import AssessService from "@/services/AssessService";
export default {
  name: "TeamMatesAssess",
  data() {
    return {
      userInfo: null,
      listCriteria: [],
      perfValues: {},
      perfDetails: {},
      listScore: [],
      sortKey: "name",
      sortOrder: "asc",
      totalPoint: 0,
    };
  },
  mounted() {
    const user = localStorage.getItem("user");
    if (user) {
      this.userInfo = JSON.parse(user);
    }
    this.loadCriteria();
  },
  watch: {
    // xem description của từng ô nếu thay đổi thì cập nhật lên localStorage
    perfValues: {
      handler() {
        localStorage.setItem("assessDetails", JSON.stringify(this.perfValues));
      },
      deep: true,
    },
    perfDetails: {
      handler() {
        this.perfValues.userId = this.userInfo?.id;
        this.perfValues.toUserId = this.userInfo?.id;
        this.perfValues.totalPoint = this.totalPoint;
        this.perfValues.assessDetails = this.perfValues.assessDetails.map(
          (detail) => {
            return {
              ...detail,
              criteriaId: detail.criteriaId ?? null,
              questionId: detail.questionId ?? null,
              value: detail.value ?? null, // Sử dụng ?? để thiết lập mặc định là null nếu không có giá trị
              description: detail.description?.trim() || null, // Trim và thiết lập mặc định là null nếu mô tả rỗng
              hasError: false, // Reset trạng thái lỗi
            };
          }
        );
      },
      deep: true,
    },
  },
  methods: {
    async loadCriteria() {
      try {
        this.listCriteria = await AssessService.fetchListData();
      } catch (error) {
        console.error("Error fetching criteria list:", error);
      }
    },

    submitForm() {
      let allDescriptionsFilled = true;
      let allValuesSelected = true;
      let firstErrorRef = null;

      this.perfValues.assessDetails.forEach((detail) => {
        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (detail.value === undefined || detail.value === null) {
          allValuesSelected = false; // Đánh dấu là chưa chọn hết
        } else {
          // Nếu giá trị >= 3, kiểm tra mô tả
          if (detail.value >= 3) {
            // Kiểm tra xem mô tả đã được điền chưa
            if (!detail.description || detail.description.trim() === "") {
              allDescriptionsFilled = false; // Đánh dấu mô tả chưa điền
              detail.hasError = true; // Đánh dấu có lỗi

              // Lưu ref của ô nhập có lỗi đầu tiên
              if (!firstErrorRef) {
                const refKey = `description_${detail.criteriaId}_${detail.questionId}`; // Sửa đổi refKey nếu cần
                firstErrorRef = this.$refs[refKey]?.[0]; // Thêm kiểm tra an toàn với optional chaining
              }
            } else {
              detail.hasError = false; // Nếu đã điền mô tả, không có lỗi
            }
          } else {
            detail.hasError = false; // Nếu giá trị < 3, không cần mô tả, không có lỗi
          }
        }
      });

      // Kiểm tra và hiển thị thông báo lỗi
      if (!allValuesSelected) {
        toast.error("Vui lòng chọn giá trị cho tất cả các câu hỏi!", {
          autoClose: 2000,
        });
        return;
      }

      if (!allDescriptionsFilled) {
        toast.error("Vui lòng nhập nhận xét đầy đủ cho các câu hỏi!", {
          autoClose: 2000,
        });
        if (firstErrorRef) {
          firstErrorRef.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
      
      // nếu tất cả hasError đều false thì xóa field hasError
      this.perfValues.assessDetails.forEach((detail) => {
        if (!detail.hasError) {
          delete detail.hasError;
        }
      });

      try {
        AssessService.submitForm(this.perfValues);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    calculateWorkTime() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    isShowDescription(criteriaIndex, questionIndex) {
      // Kiểm tra xem assessDetails có tồn tại và lấy câu hỏi tương ứng
      const question = this.perfValues.assessDetails?.find(
        (detail) =>
          detail.criteriaId === criteriaIndex &&
          detail.questionId === questionIndex
      );

      // Kiểm tra điều kiện để hiển thị mô tả
      return question && question.value >= 3;
    },
    selectPerformanceValue(criteriaIndex, questionIndex, value) {
      // Giả sử bạn đã khởi tạo perfValues.assessDetails trước đó
      if (!this.perfValues.assessDetails) {
        this.perfValues.assessDetails = [];

        // Khởi tạo assessDetails dựa trên số lượng tiêu chí và câu hỏi
        const criteriaCount = this.listCriteria.length; // Số lượng tiêu chí

        for (let i = 0; i < criteriaCount; i++) {
          const questionsCount = this.listCriteria[i]?.questions.length || 0; // Số lượng câu hỏi cho tiêu chí này

          for (let j = 0; j < questionsCount; j++) {
            this.perfValues.assessDetails.push({
              criteriaId: i,
              questionId: j,
              value: null, // Giá trị của câu hỏi
              description: null, // Mô tả của câu hỏi
              hasError: false, // Trạng thái lỗi
            });
          }
        }
      }

      // Tìm đối tượng assessDetail tương ứng
      const assessDetail = this.perfValues.assessDetails.find(
        (detail) =>
          detail.criteriaId === criteriaIndex &&
          detail.questionId === questionIndex
      );

      // Cập nhật giá trị đã chọn cho câu hỏi
      if (assessDetail) {
        assessDetail.value = value;

        // Xóa ô nhập "description" nếu giá trị < 3
        if (value < 3) {
          assessDetail.description = null; // Hoặc "" tùy thuộc vào yêu cầu
        }
      }

      // Cập nhật listScore để hiển thị
      if (!this.listScore[criteriaIndex]) {
        this.listScore[criteriaIndex] = {};
      }

      // Tính toán điểm mới cho câu hỏi
      const newScore = this.calculateScoreSelected(
        criteriaIndex,
        questionIndex,
        value
      );

      // Cập nhật điểm cho câu hỏi (thay vì cộng dồn)
      this.listScore[criteriaIndex][questionIndex] = newScore;

      // Kiểm tra xem tất cả câu hỏi của tiêu chí này đã được trả lời chưa
      const questionsCount =
        this.listCriteria[criteriaIndex]?.questions?.length || 0;
      const answeredQuestionsCount = Object.keys(
        this.listScore[criteriaIndex] || {}
      ).filter((key) => key !== "totalOfCriteria").length;

      // Tính lại totalOfCriteria khi có sự thay đổi
      if (answeredQuestionsCount === questionsCount) {
        const totalOfCriteria = this.calculateTotalOfCriteria(criteriaIndex);
        const percentage = Math.round(
          ((totalOfCriteria * 20) / 100) *
            (this.listCriteria[criteriaIndex]?.point || 1)
        );

        // Cập nhật tổng điểm tiêu chí
        this.listScore[criteriaIndex].totalOfCriteria = percentage;
      }

      // Cập nhật tổng điểm cho tất cả các tiêu chí
      this.updateTotalPoint();

      // Lưu assessDetails vào localStorage
      localStorage.setItem("assessDetails", JSON.stringify(this.perfValues));
    },
    calculateScoreSelected(criteriaIndex, questionIndex, value) {
      // Tính điểm cho giá trị đã chọn
      const question =
        this.listCriteria[criteriaIndex]?.questions[questionIndex];
      const pointCriteriaIndex =
        parseFloat(this.listCriteria[criteriaIndex]?.point) || 1;
      const questionScore = parseFloat(question?.point) || 0;
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
          ) &&
          questionIndex !== "totalOfCriteria"
        ) {
          total += listScoreForCriteria[questionIndex];
        }
      }
      total = Math.round(total * 100) / 100;
      return total;
    },
    updateTotalPoint() {
      this.totalPoint = 0;
      for (const criteriaIndex in this.listScore) {
        if (
          Object.prototype.hasOwnProperty.call(this.listScore, criteriaIndex)
        ) {
          this.totalPoint += this.listScore[criteriaIndex].totalOfCriteria;
        }
      }
    },
  },
};
</script>

<style scoped>
tbody > tr > td {
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
</style>
