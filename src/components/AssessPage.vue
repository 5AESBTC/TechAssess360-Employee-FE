<template>
  <div class="container-fluid row justify-content-md-center align-items-center">
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
      <div class="profile mb-5 d-flex align-items-center">
        <div class="avatar">
          <img :src="profile.avatarUrl" alt="avatar" />
        </div>
        <div class="info ms-3 text-start">
          <h4 class="mb-2">{{ profile.name }}</h4>
          <div class="line">
            <strong>Vị trí:</strong> {{ profile.position }}
          </div>
          <div class="line">
            <strong>Bộ Phận:</strong> {{ profile.department }}
          </div>
          <div class="line"><strong>Dự án:</strong> {{ profile.project }}</div>
        </div>
      </div>

      <div class="team-mate">
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
                <button class="btn btn-sm btn-primary">Đánh giá</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Right Menu -->
    <div class="col-md-8 right-menu p-4">
      <!-- Evaluation Header -->
      <div class="evaluation-header text-start mb-4">
        <label class="fw-bold fs-4"
          >Đánh giá quý 4 năm 2024 cho : {{ profile.name }}
        </label>
      </div>

      <!-- Evaluation Form -->
      <form class="evaluation-form">
        <!-- Performance Evaluation -->
        <div class="section mb-4">
          <h5>Hiệu suất Công việc</h5>
          <div
            v-for="(
              question, index
            ) in performanceEvaluation.performanceQuestions"
            :key="index"
            class="question mb-3"
          >
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }}</label>
              <span class="score">{{ question.score }}</span>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <input
                  type="radio"
                  :id="'performanceOption' + index + optIndex"
                  :name="'performance' + index"
                  class="form-check-input"
                  v-model="selectedValues[index]"
                  :value="option.value"
                />
                <label
                  :for="'performanceOption' + index + optIndex"
                  class="form-check-label"
                  >{{ option.label }}</label
                >
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="parseFloat(selectedValues[index]) >= 100"
                class="form-control"
                rows="3"
                placeholder="Nhận xét thêm"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Skills and Knowledge -->
        <div class="section mb-4">
          <h5>Kĩ Năng Và Kiến Thức</h5>
          <div
            v-for="(question, index) in performanceEvaluation.skillsQuestions"
            :key="index"
            class="question mb-3"
          >
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }}</label>
              <span class="score">{{ question.score }}</span>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <input
                  type="radio"
                  :id="'performanceOption' + index + optIndex"
                  :name="'performance' + index"
                  class="form-check-input"
                  v-model="selectedValues[index]"
                  :value="option.value"
                />
                <label
                  :for="'performanceOption' + index + optIndex"
                  class="form-check-label"
                  >{{ option.label }}</label
                >
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="parseFloat(selectedValues[index]) >= 100"
                class="form-control"
                rows="3"
                placeholder="Nhận xét thêm"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Attitude and Spirit -->
        <div class="section mb-4">
          <h5>Tinh thần làm việc và Thái độ</h5>
          <div
            v-for="(question, index) in performanceEvaluation.attitudeQuestions"
            :key="index"
            class="question mb-3"
          >
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }}</label>
              <span class="score">{{ question.score }}</span>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <input
                  type="radio"
                  :id="'performanceOption' + index + optIndex"
                  :name="'performance' + index"
                  class="form-check-input"
                  v-model="selectedValues[index]"
                  :value="option.value"
                />
                <label
                  :for="'performanceOption' + index + optIndex"
                  class="form-check-label"
                  >{{ option.label }}</label
                >
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="parseFloat(selectedValues[index]) >= 100"
                class="form-control"
                rows="3"
                placeholder="Nhận xét thêm"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Contributions and Initiatives -->
        <div class="section mb-4">
          <h5>Đóng góp và Sáng kiến</h5>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Nhận xét thêm"
          ></textarea>
        </div>

        <!-- Regulations and Policies -->
        <div class="section mb-4">
          <h5>Quy định và Chính sách</h5>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Nhận xét thêm"
          ></textarea>
        </div>

        <!-- Personal Contributions and Results -->
        <div class="section mb-4">
          <h5>Đóng góp Cá nhân và Kết quả</h5>
          <div class="question mb-3">
            <label class="d-flex justify-content-between title"
              >Thành tích cá nhân nổi bật nhất của bạn trong thời gian qua
              là:</label
            >
            <textarea
              class="form-control"
              rows="3"
              placeholder="Nhận xét thêm"
            ></textarea>
          </div>
          <div class="question mb-3">
            <label class="d-flex justify-content-between title"
              >Bạn cảm thấy mình đã đóng góp đủ cho sự phát triển của tổ chức
              không?</label
            >
            <textarea
              class="form-control"
              rows="3"
              placeholder="Nhận xét thêm"
            ></textarea>
          </div>
        </div>

        <!-- Quarter Goals -->
        <div class="section mb-4">
          <h5>Mục tiêu quý II</h5>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Kết quả đạt được quý II"
          ></textarea>
        </div>
        <div class="section mb-4">
          <h5>Mục tiêu quý III</h5>
          <textarea
            class="form-control"
            placeholder="Kết quả đạt được quý III"
            rows="3"
          ></textarea>
        </div>

        <!-- Form Buttons -->
        <div class="form-buttons d-flex justify-content-center gap-4 mt-4">
          <button type="button" class="btn btn-warning">Lưu</button>
          <button type="submit" class="btn btn-primary">Xác nhận</button>
          <button type="reset" class="btn btn-danger">Xóa</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssessPage",
  data() {
    return {
      profile: {
        name: "Trịnh Thái Quân",
        position: "Intern",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triễn",
        project: "StudyArt",
      },
      sortKey: "name",
      sortOrder: "asc",
      teamMates: [
        {
          name: "Nguyễn Lê Quốc Huy",
          position: "Manager",
          project: "StudyArt",
        },
        { name: "Trịnh Thái Quân", position: "Dev", project: "StudyArt" },
        { name: "Nguyễn A", position: "Dev", project: "StudyArt" },
      ],
      performanceEvaluation: {
        performanceQuestions: [
          {
            label:
              "Bạn đã hoàn thành tất cả các mục tiêu công việc được giao trong thời gian qua?",
            score: 5,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label: "Mức độ chính xác của công việc bạn thực hiện là?",
            score: 10,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label: " Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
            score: 15,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
        ],
        skillsQuestions: [
          {
            label:
              "Bạn đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
            score: 5,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label:
              " Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
            score: 10,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label:
              " Bạn cảm thấy cần cải thiện kỹ năng nào để nâng cao hiệu suất công việc?",
            score: 15,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
        ],
        attitudeQuestions: [
          {
            label:
              " Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
            score: 5,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label: " Khi gặp tình huống khó khăn, bạn xử lý như thế nào?",
            score: 10,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
          {
            label: " Thái độ làm việc của bạn trong công việc là",
            score: 15,
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
        ],
        contributionsQuestions: [
          // Add relevant questions
        ],
        regulationsQuestions: [
          // Add relevant questions
        ],
        personalContributionsQuestions: [
          {
            label:
              "Thành tích cá nhân nổi bật nhất của bạn trong thời gian qua là:",
          },
          {
            label:
              "Bạn cảm thấy mình đã đóng góp đủ cho sự phát triển của tổ chức không?",
          },
        ],
      },
      selectedValues: [], // Make sure to initialize as needed
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
  },
};
</script>

<style scoped>
/* Left menu */
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
  margin-top: 70px;
}

.profile {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
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
  border: 3px solid #007bff; /* Add a border around the avatar */
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
  color: #007bff; /* Highlight the labels with a color */
}

/* Team Mate Table */
.team-mate .table {
  font-size: 14px;
  margin-top: 20px;
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
  margin-top: 70px;
  margin-left: 20px;
}

.evaluation-form {
  flex: 1; /* Take up remaining space */
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto; /* Allow scrolling if content overflows */
}

.evaluation-header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.evaluation-form .title {
  background-color: #7ab6fa;
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
