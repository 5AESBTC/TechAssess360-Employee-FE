<template>
  <div class="container-fluid row justify-content-md-center align-items-center">
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
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
      <div class="evaluation-header text-start mb-2">
        <label class="fw-bold fs-4">Đánh giá quý III năm 2024 cho: {{ profile.name }}
        </label>
      </div>

      <!-- Evaluation Form -->
      <form class="evaluation-form">
        <!-- Performance Evaluation -->
        <div class="section mb-4">
          <h5>Hiệu suất Công việc </h5>
          <div v-for="(
              question, index
            ) in performanceEvaluation.performanceQuestions" :key="index" class="question mb-3">
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }} <span class="text-danger"> *</span></label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="radio" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
            <div class="description">
              <textarea v-if="parseFloat(selectedValues[index]) >= 100" class="form-control" rows="3"
                placeholder="Nhận xét thêm"></textarea>
            </div>
          </div>
        </div>

        <!-- Skills and Knowledge -->
        <div class="section mb-4">
          <h5>Kĩ Năng Và Kiến Thức</h5>
          <div v-for="(question, index) in performanceEvaluation.skillsQuestions" :key="index" class="question mb-3">
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }} <span class="text-danger"> *</span></label>
            </div>

            <div v-if="index === 2" class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="checkbox" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>

            <div v-else class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="radio" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>

            <div class="description">
              <textarea v-if="index === 2 && selectedValues[index] && selectedValues[index].length > 0"
                class="form-control" rows="3" placeholder="Nhận xét thêm"></textarea>
            </div>
          </div>
        </div>


        <!-- Attitude and Spirit -->
        <div class="section mb-4">
          <h5>Tinh thần làm việc và Thái độ </h5>
          <div v-for="(question, index) in performanceEvaluation.attitudeQuestions" :key="index" class="question mb-3">
            <div class="d-flex justify-content-between title">
              <label>{{ index + 1 }}. {{ question.label }} <span class="text-danger"> *</span></label>
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="radio" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
            <div class="description">
              <textarea v-if="parseFloat(selectedValues[index]) >= 100" class="form-control" rows="3"
                placeholder="Nhận xét thêm"></textarea>
            </div>
          </div>
        </div>

        <!-- Contributions and Initiatives -->
        <div class="section mb-4">
          <h5>Đóng góp và Sáng kiến <span class="text-danger"> *</span></h5>
          <div v-for="(question, index) in performanceEvaluation.contributionsQuestions" :key="index"
            class="question mb-3">
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="radio" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
            <div class="description">
              <textarea v-if="parseFloat(selectedValues[index]) >= 100" class="form-control" rows="3"
                placeholder="Nhận xét thêm"></textarea>
            </div>
          </div>
        </div>

        <!-- Regulations and Policies -->
        <div class="section mb-4">
          <h5>Quy định và Chính sách <span class="text-danger"> *</span></h5>
          <div v-for="(question, index) in performanceEvaluation.regulationsQuestions" :key="index"
            class="question mb-3">
            <div class="options d-flex justify-content-around my-3">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                <input type="radio" :id="'performanceOption' + index + optIndex" :name="'performance' + index"
                  class="form-check-input" v-model="selectedValues[index]" :value="option.value" />
                <label :for="'performanceOption' + index + optIndex" class="form-check-label">{{ option.label }}</label>
              </div>
            </div>
            <div class="description">
              <textarea v-if="parseFloat(selectedValues[index]) >= 100" class="form-control" rows="3"
                placeholder="Nhận xét thêm"></textarea>
            </div>
          </div>
        </div>

        <!-- Personal Contributions and Results -->
        <div class="section mb-4">
          <h5>Đóng góp Cá nhân và Kết quả</h5>
          <div class="question mb-3">
            <label class="d-flex title">Thành tích cá nhân nổi bật nhất của bạn trong thời gian
              qua
              là <span class="text-danger"> *</span></label>
            <textarea class="form-control" rows="3" placeholder="Các thành tích nổi bật..."></textarea>
          </div>
          <div class="question mb-3">
            <label class="d-flex title">Bạn cảm thấy mình đã đóng góp đủ cho sự phát triển của
              tổ chức
              không? <span class="text-danger"> *</span></label>
            <textarea class="form-control" rows="3" placeholder="Nêu nhận xét"></textarea>
          </div>
        </div>

        <!-- Quarter Goals -->
        <div class="section mb-4">
          <h5>Mục tiêu quý IV <span class="text-danger"> *</span></h5>
          <textarea class="form-control" placeholder="Bạn đặt mục tiêu gì cho quý tiếp theo..." rows="3"></textarea>
        </div>

        <!-- Form Buttons -->
        <div class="form-buttons d-flex justify-content-center gap-4 mt-4">
          <button type="reset" class="btn btn-danger">Xóa</button>
          <button type="button" class="btn btn-warning">Lưu nháp</button>
          <button type="submit" class="btn btn-primary">Xác nhận</button>
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
        position: "Fresher",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triển",
        project: "StudyArt",
        level: "3",
      },
      sortKey: "name",
      sortOrder: "asc",
      teamMates: [
        {
          name: "Nguyễn Văn B",
          position: "Manager",
          project: "StudyArt",
        },
        { name: "Nguyễn Văn C", position: "Junior", project: "StudyArt" },
        { name: "Nguyễn Văn A", position: "Tester", project: "StudyArt" },
      ],
      performanceEvaluation: {
        performanceQuestions: [
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
            label: " Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
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
        skillsQuestions: [
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
            score: 10,
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
            score: 15,
            options: [
              { label: "Quản lý thời gian", value: "1" },
              { label: "Giao tiếp và hợp tác", value: "2" },
              { label: "Chuyên môn kỹ thuật", value: "3" },
              { label: "Giải quyết vấn đề và ra quyết định", value: "4" },
              { label: "Lãnh đạo và quản lý đội nhóm", value: "5" },
            ],
          },
        ],
        attitudeQuestions: [
          {
            label:
              " Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
            score: 5,
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
            score: 15,
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
            score: 10,
            options: [
              { label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên", value: "1" },
              { label: "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn", value: "2" },
              { label: "Đánh giá tình huống và thử nghiệm các giải pháp khác nhau", value: "3" },
              { label: "Tìm ra giải pháp sáng tạo và chủ động áp dụng", value: "4" },
              { label: "Giải quyết tình huống một cách hiệu quả và tự tin", value: "5" },
            ],
          },

        ],
        contributionsQuestions: [
          {
            score: 10,
            options: [
              { label: "Hầu như không", value: "1" },
              { label: "Có ít đóng góp", value: "2" },
              { label: "Đóng góp mức trung bình", value: "3" },
              { label: "Có nhiều đóng góp", value: "4" },
              { label: "Có rất nhiều đóng góp", value: "5" },
            ],
          }
        ],
        regulationsQuestions: [
          {
            score: 10,
            options: [
              { label: "Hầu như không tuân thủ", value: "1" },
              { label: "Tuân thủ ít", value: "2" },
              { label: "Tuân thủ mức trung bình", value: "3" },
              { label: "Tuân thủ tốt", value: "4" },
              { label: "Tuân thủ hoàn toàn", value: "5" },
            ]

          }
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
