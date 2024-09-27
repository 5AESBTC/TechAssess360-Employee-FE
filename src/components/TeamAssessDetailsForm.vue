<template>

  <div class="evaluation-header mb-2" style="display: flex; justify-content: space-between; align-items: center;">
    <label class="fw-bold fs-4">
      Chi tiết đánh giá quý III năm 2024 của:
      {{ selectedPerson ? selectedPerson.name : "" }}
    </label>
    <!-- <span style="color: red; font-size: 24px;">Tổng điểm: {{ calculateGrandTotalScore() }}</span> -->
  </div>

  <form v-if="selectedPerson" class="evaluation-form">
    <div v-for="(section, sectionIndex) in evaluationSections" :key="sectionIndex" class="section mb-4">
      <div class="section-header">
        <h5>{{ sectionIndex + 1 }}. {{ section.title }}</h5>
        <span v-if="section.questions" class="score-display" style="color: red; text-align: right;">
          (<strong>{{ calculateTotalScore(selectedPerson.evaluation[section.key]) }}</strong> / <strong>{{
            maxScore[section.key] }}</strong>)
        </span>
      </div>

      <div>
        <div v-if="section.questions">
          <div v-for="(question, index) in selectedPerson?.evaluation[section.key] ?? []" :key="index"
            class="question mb-3">
            <div v-if="question.label" class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }}<span class="text-danger"> *</span></label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex"
                class="form-check d-flex flex-column align-items-center">
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2" style="display: flex;">
                  <div v-for="(avatar, avatarIndex) in option.avatarUrls" :key="avatarIndex"
                    style="position: relative; margin-right: 10px;" class="avatar-container">
                    <img :src="avatar" alt="Avatar" class="avatar-img" style="cursor: pointer;" />
                    <span v-if="option.avatarDescriptions && option.avatarDescriptions[avatarIndex]" class="tooltiptext"
                      style="background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 5px; border-radius: 5px;">
                      {{ option.avatarDescriptions[avatarIndex] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="question mb-3">
            <label class="d-flex title">{{ selectedPerson.evaluation[section.key]?.label }}<span class="text-danger">
                *</span></label>
            <div class="form-control text-start">{{ selectedPerson.evaluation[section.key]?.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
export default {
  name: "TeamAssessDetailsForm",
  props: {
    userInfo: Object,
    selectedPerson: Object
  },
  data() {
    return {
    };
  },
  methods: {
    calculateMaxScore(questions) {
      return questions.reduce((sum, question) => sum + (question.score || 0), 0);
    },
    calculateTotalScore(questions) {
      if (!questions || !Array.isArray(questions)) return 0;

      let totalScore = 0;

      questions.forEach(question => {
        totalScore += this.calculateQuestionAverage(question, this.getMutilForQuestion(question));
      });

      return parseFloat(((totalScore * 20) / 100).toFixed(0));
    },

    getMutilForQuestion(question) {
      return question.mutil || 1;
    },
    calculateQuestionAverage(question, mutil) {
      if (!question || !question.options || question.options.length === 0) return 0;

      let totalScore = 0;
      let totalAvatars = 0;

      question.options.forEach(option => {
        const numberOfPeople = option.avatarUrls ? option.avatarUrls.length : 0;
        const value = option.value || 0;

        totalScore += value * numberOfPeople;
        totalAvatars += numberOfPeople;
      });

      // Tính điểm trung bình cho câu hỏi
      const average = totalAvatars > 0 ? (totalScore / totalAvatars) : 0;

      // Trả về điểm trung bình đã điều chỉnh theo tỷ lệ (score / mutil)
      const adjustedScore = (average * (question.score || 0)) / mutil;

      return parseFloat(adjustedScore.toFixed(2));
    }
    ,
    calculateGrandTotalScore() {
      if (!this.selectedPerson) return 0;

      let grandTotalScore = 0;

      this.evaluationSections.forEach(section => {
        const sectionScore = this.calculateTotalScore(this.selectedPerson.evaluation[section.key]);
        grandTotalScore += sectionScore;
      });

      return parseFloat(grandTotalScore.toFixed(2));
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
  -webkit-overflow-scrolling: touch
}

.table>table {
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
