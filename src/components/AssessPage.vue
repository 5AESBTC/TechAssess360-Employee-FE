<template>
  <div class="container-fluid row justify-content-md-center align-items-center">
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
      <div class="profile mb-3 d-flex align-items-center">
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
          <div class="line">
            <strong>Thời gian làm việc:</strong> {{ profile.time }}
          </div>
        </div>
      </div>
      <div class="mb-3">
        <button
          v-if="profile.isProcessing"
          class="btn btn-sm btn-primary me-2"
          :disabled="true"
          style="width: 150px"
        >
          Đang đánh giá
        </button>
        <button
          v-else
          class="btn btn-sm btn-primary me-2"
          @click="selectPerson(profile)"
          style="width: 150px"
        >
          Đánh giá bản thân
        </button>
      </div>
      <div class="team-mate">
        <div class="text-start fw-bold">
          Danh sách thành viên có chung dự án hiện tại:
        </div>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th @click="sortBy('name')" style="cursor: pointer">Tên</th>
              <th>Vị Trí</th>
              <th>Dự Án</th>
              <th>Tác Vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mate, index) in sortedTeamMates" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ mate.name }}</td>
              <td>{{ mate.position }}</td>
              <td>{{ mate.project }}</td>
              <td>
                <button
                  v-if="mate.isProcessing"
                  class="btn btn-sm btn-primary me-2 btn-custom"
                  :disabled="true"
                >
                  Đang đánh giá
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-primary me-2 btn-custom"
                  @click="selectPerson(mate)"
                >
                  Đánh giá
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Right Menu -->
    <div class="col-md-8 right-menu p-4">
      <!-- Evaluation Header -->
      <div class="evaluation-header text-start mb-2">
        <label class="fw-bold fs-4"
          >Đánh giá quý III năm 2024 cho:
          {{ isSelected ? isSelected.name : profile.name }}</label
        >
      </div>

      <!-- Evaluation Form -->
      <!-- @submit.prevent="submit" -->
      <form class="evaluation-form" @submit.prevent="submitForm">
        <!-- Performance Evaluation -->
        <div
          v-for="(criteria, criteriaIndex) in performanceEvaluation"
          :key="criteriaIndex"
          class="section mb-4"
        >
          <div class="d-flex justify-content-center gap-2">
            <label>
              <h5>{{ criteriaIndex + 1 }}. {{ criteria.title }}</h5>
            </label>
            <div class="multi">
              <!-- (?/criteria.multi) -->
              ({{ criteria.total ? criteria.total : "?" }} /
              {{ criteria.multi }})
            </div>
          </div>
          <div
            v-for="(question, questionIndex) in criteria.question"
            :key="questionIndex"
            class="question mb-3"
          >
            <div
              class="d-flex justify-content-between title"
              v-if="question.label"
            >
              <label
                >{{ questionIndex + 1 }}. {{ question.label }}
                <span class="text-danger"> *</span></label
              >
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                class="form-check"
              >
                <input
                  type="radio"
                  :id="
                    'performanceOption' +
                    criteriaIndex +
                    questionIndex +
                    optionIndex
                  "
                  :name="'performance' + criteriaIndex + questionIndex"
                  class="form-check-input"
                  @click="
                    selectPerformanceValue(
                      criteriaIndex,
                      questionIndex,
                      option.value
                    )
                  "
                  :value="option.value"
                />
                <label
                  :for="
                    'performanceOption' +
                    criteriaIndex +
                    questionIndex +
                    optionIndex
                  "
                  class="form-check-label"
                  >{{ option.label }}</label
                >
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="isShowDescription(criteriaIndex, questionIndex)"
                class="form-control"
                rows="3"
                placeholder="Nhận xét thêm"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Personal Contributions and Results -->
        <div class="section mb-4">
          <h5>
            Đóng góp Cá nhân và Kết quả <span class="text-danger"> *</span>
          </h5>
          <div class="form-group">
            <textarea
              class="form-control"
              rows="5"
              placeholder="Ghi rõ những đóng góp và kết quả cá nhân của bạn..."
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
  name: "AssessPage",
  data() {
    return {
      profile: {
        name: "Trịnh Thái Quân",
        position: "Fresher",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triển",
        project: "StudyArt",
        level: "3",
        time: "2 năm 3 tháng",
        isProcessing: true,
      },
      sortKey: "name",
      sortOrder: "asc",
      teamMates: [
        {
          name: "Nguyễn Văn B",
          position: "Manager",
          project: "StudyArt",
        },
        {
          name: "Nguyễn Văn C",
          position: "Junior",
          project: "StudyArt",
          level: "3",
          isProcessing: false,
        },
        {
          name: "Nguyễn Văn A",
          position: "Tester",
          project: "StudyArt",
          level: "3",
          isProcessing: false,
        },
      ],
      performanceEvaluation: [
        {
          id: 1,
          title: "Hiệu suất công việc",
          multi: 30,
          total: 0,
          question: [
            {
              label:
                "Bạn đã hoàn thành tất cả các mục tiêu công việc được giao trong thời gian qua?",
              score: 5,
              options: [
                { label: "50%", value: "1" },
                { label: "75%", value: "2" },
                { label: "100%", value: "3" },
                { label: "150%", value: "4" },
                { label: "200%", value: "5" },
              ],
            },
            {
              label: "Mức độ chính xác của công việc bạn thực hiện là?",
              score: 10,
              options: [
                { label: "50%", value: "1" },
                { label: "75%", value: "2" },
                { label: "100%", value: "3" },
                { label: "150%", value: "4" },
                { label: "200%", value: "5" },
              ],
            },
            {
              label:
                " Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
              score: 15,
              options: [
                { label: "Hiếm khi", value: "1" },
                { label: "Thỉnh thoảng", value: "2" },
                { label: "Đôi khi", value: "3" },
                { label: "Thường xuyên", value: "4" },
                { label: "Luôn luôn", value: "5" },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Kỹ năng và Kiến thức",
          multi: 15,
          question: [
            {
              label:
                "Bạn đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
              score: 5,
              options: [
                { label: "Không cải thiện", value: "1" },
                { label: "Cải thiện ít", value: "2" },
                { label: "Cải thiện vừa phải", value: "3" },
                { label: "Cải thiện đáng kể", value: "4" },
                { label: "Cải thiện vượt bậc", value: "5" },
              ],
            },
            {
              label:
                " Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 5,
              options: [
                { label: "Hoàn toàn không", value: "1" },
                { label: "Ít hiệu quả", value: "2" },
                { label: "Hiệu quả trung bình", value: "3" },
                { label: "Khá hiệu quả", value: "4" },
                { label: "Rất hiệu quả", value: "5" },
              ],
            },
            {
              label:
                " Bạn cảm thấy cần cải thiện kỹ năng nào để nâng cao hiệu suất công việc?",
              score: 5,
              options: [
                { label: "Quản lý thời gian", value: "1" },
                { label: "Giao tiếp và hợp tác", value: "2" },
                { label: "Chuyên môn kỹ thuật", value: "3" },
                { label: "Chuyên môn kỹ thuật", value: "4" },
                { label: "Lãnh đạo và quản lý đội nhóm", value: "5" },
              ],
            },
          ],
        },
        {
          id: 3,
          title: "Tinh thần làm việc và Thái độ",
          multi: 10,
          question: [
            {
              label:
                " Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
              score: 3,
              options: [
                { label: "Rất hiếm khi", value: "1" },
                { label: "Thỉnh thoảng", value: "2" },
                { label: "Đôi khi", value: "3" },
                { label: "Thường xuyên", value: "4" },
                { label: "Luôn luôn", value: "5" },
              ],
            },
            {
              label: " Thái độ làm việc của bạn trong công việc là",
              score: 3,
              options: [
                { label: "Thiếu động lực", value: "1" },
                { label: "Hơi thụ động", value: "2" },
                { label: "Cần cải thiện", value: "3" },
                { label: "Tích cực", value: "4" },
                { label: "Rất chủ động", value: "5" },
              ],
            },
            {
              label: "Khi gặp tình huống khó khăn, bạn xử lý như thế nào?",
              score: 4,
              options: [
                {
                  label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên",
                  value: "1",
                },
                {
                  label:
                    "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn",
                  value: "2",
                },
                {
                  label:
                    "Đánh giá tình huống và thử nghiệm các giải pháp khác nhau",
                  value: "3",
                },
                {
                  label: "Tìm ra giải pháp sáng tạo và chủ động áp dụng",
                  value: "4",
                },
                {
                  label: "Giải quyết tình huống một cách hiệu quả và tự tin",
                  value: "5",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          title: "Đóng góp và sáng kiến",
          multi: 10,
          question: [
            {
              score: 10,
              options: [
                { label: "Hầu như không", value: "1" },
                { label: "Có ít đóng góp", value: "2" },
                { label: "Đóng góp mức trung bình", value: "3" },
                { label: "Có nhiều đóng góp", value: "4" },
                { label: "Có rất nhiều đóng góp", value: "5" },
              ],
            },
          ],
        },
        {
          id: 5,
          title: "Quy định và Chính sách",
          multi: 10,
          question: [
            {
              score: 10,
              options: [
                { label: "Hầu như không tuân thủ", value: "1" },
                { label: "Tuân thủ ít", value: "2" },
                { label: "Tuân thủ mức trung bình", value: "3" },
                { label: "Tuân thủ tốt", value: "4" },
                { label: "Tuân thủ hoàn toàn", value: "5" },
              ],
            },
          ],
        },
      ],
      isSelected: this.profile,
      selectedPerformanceValues: [],
      listScore: [],
    };
  },

  computed: {
    sortedTeamMates() {
      return [...this.teamMates].sort((a, b) => {
        let comparison = 0;
        if (a[this.sortKey] > b[this.sortKey]) {
          comparison = 1;
        } else if (a[this.sortKey] < b[this.sortKey]) {
          comparison = -1;
        }
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
    isShowDescription() {
      return (criteriaIndex, questionIndex) => {
        // Access reactive author data and evaluate if the score is >= 3
        return (
          this.selectedPerformanceValues[criteriaIndex]?.[questionIndex] >= 3
        );
      };
    },
  },

  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    selectPerson(person) {
      if (this.isSelected && this.isSelected !== person) {
        this.isSelected.isProcessing = false;
      }

      if (this.profile !== person) {
        this.profile.isProcessing = false; // Luôn tắt xử lý profile sau khi chọn người mới
      }

      // Chọn người mới nếu khác người hiện tại
      if (this.isSelected !== person) {
        if (this.isSelected) this.isSelected.isProcessing = false; // Bỏ chọn người trước đó
        this.isSelected = person;
        person.isProcessing = true;
      }

      console.log(this.isSelected);
    },
    selectPerformanceValue(criteriaIndex, questionIndex, value) {
    // Cập nhật giá trị đã chọn
      if (!this.selectedPerformanceValues[criteriaIndex]) {
        this.selectedPerformanceValues[criteriaIndex] = [];
      }
      this.selectedPerformanceValues[criteriaIndex][questionIndex] = value;

      // Tính điểm cho giá trị đã chọn
      const question = this.performanceEvaluation[criteriaIndex]?.question[questionIndex];
      const multiCriteriaIndex = parseFloat(this.performanceEvaluation[criteriaIndex]?.multi) || 1;
      const questionScore = parseFloat(question?.score) || 0;
      const selectedValue = parseFloat(value) || 0;

      // Tính toán điểm cho câu hỏi này
      const score = (questionScore / multiCriteriaIndex) * selectedValue;
      const roundedScore = Math.round(score * 100) / 100;

      // Lưu điểm vào listScore
      this.listScore[criteriaIndex] = {
        ...this.listScore[criteriaIndex],
        [questionIndex]: roundedScore,
      };

      // Kiểm tra xem tất cả câu hỏi cho criteriaIndex này đã được trả lời chưa
      const questionsCount = this.performanceEvaluation[criteriaIndex]?.question?.length || 0;
      const answeredQuestionsCount = Object.keys(this.listScore[criteriaIndex] || {}).length;

      if (answeredQuestionsCount === questionsCount) {
        // Tính tổng điểm cho criteriaIndex này
        const totalScore = this.calculateTotalScore(criteriaIndex);
        const percentage = Math.round(((totalScore * 20) / 100) * (this.performanceEvaluation[criteriaIndex]?.multi || 1));
        this.performanceEvaluation[criteriaIndex].total = percentage;
        console.log("Tổng điểm:", totalScore);
      }

      console.log("Danh sách điểm:", this.listScore);
    },

    submitForm() {
      console.log('selectedPerformanceValues:', this.selectedPerformanceValues);
      this.selectedPerformanceValues.forEach((value, index) => {
        const criteria = this.performanceEvaluation[index];
        console.log(`Criteria ${index}:`, criteria);
        criteria.question.forEach((question, questionIndex) => {
          console.log(`Question ${index + 1}.${questionIndex + 1}:`, question);
          const score = question.options.find(option => option.value === value[questionIndex]);
          if (score) {
            console.log(`Điểm câu hỏi ${index + 1}.${questionIndex + 1}: ${score.label} - ${score.value}`);
          } else {
            console.log(`Không tìm thấy điểm cho câu hỏi ${index + 1}.${questionIndex + 1}`);
          }
        });
      });
      localStorage.setItem('selectedPerformanceValues', JSON.stringify(this.selectedPerformanceValues));
      toast.success('Operation successful!', {
        autoClose: 2000,
      });
    },

    calculateTotalScore(criteriaIndex) {
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
  },
};
</script>

<style scoped>
/* Left menu */
.btn-custom {
  width: 110px;
}

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
}

/* Right Menu Styles */
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
