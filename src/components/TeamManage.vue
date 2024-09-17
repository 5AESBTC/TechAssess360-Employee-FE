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

      <div class="team-mate">
        <div class="text-start fw-bold">Danh sách thành viên đang quản lý:</div>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>STT</th>
              <th @click="sortBy('name')" style="cursor: pointer">Tên</th>
              <th>Vị Trí</th>
              <th>Cấp bậc</th>
              <th>Dự Án</th>
              <th>Tác Vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mate, index) in sortedTeamMates" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ mate.name }}</td>
              <td>{{ mate.position }}</td>
              <td>{{ mate.level }}</td>
              <td>{{ mate.project }}</td>
              <td class="d-flex">
                <div class="btn-show">
                  <button
                    v-if="mate.isViewing"
                    class="btn btn-sm btn-primary me-2 btn-custom"
                    :disabled="true"
                  >
                    Đang xem
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-primary me-2 btn-custom"
                    @click="viewPerson(mate)"
                  >
                    Xem đánh giá
                  </button>
                </div>
                <div class="btn-act">
                  <button
                    class="btn btn-sm btn-success me-2"
                    @click="processPerson(mate)"
                  >
                    Đánh giá
                  </button>
                </div>
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
          >Chi tiết đánh giá quý III năm 2024 của:
          {{ selectedPerson ? selectedPerson.name : "" }}
        </label>
        <!-- <div class="dropdowns mb-4">
          <label for="year" class="form-label">Chọn năm:</label>
          <select id="year" v-model="selectedYear" class="form-select">
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>

          <label for="quarter" class="form-label">Chọn quý:</label>
          <select id="quarter" v-model="selectedQuarter" class="form-select">
            <option v-for="quarter in quarters" :key="quarter" :value="quarter">
              {{ quarter }}
            </option>
          </select>
        </div> -->
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
              <label
                >{{ index + 1 }}. {{ question.label }}
                <span class="text-danger"> *</span></label
              >
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check d-flex flex-column align-items-center"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                  <span class="tooltiptext">{{ option.description? option.description : '' }}</span>
                </div>
              </div>
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
              <label
                >{{ index + 1 }}. {{ question.label }}
                <span class="text-danger"> *</span></label
              >
            </div>

            <div
              v-if="index === 2"
              class="options d-flex justify-content-around my-3"
            >
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                </div>
              </div>
            </div>

            <div v-else class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                </div>
              </div>
            </div>

            <div class="description">
              <textarea
                v-if="
                  index === 2 &&
                  selectedValues[index] &&
                  selectedValues[index].length > 0
                "
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
              <label
                >{{ index + 1 }}. {{ question.label }}
                <span class="text-danger"> *</span></label
              >
            </div>
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                </div>
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
          <h5>Đóng góp và Sáng kiến <span class="text-danger"> *</span></h5>
          <div
            v-for="(
              question, index
            ) in performanceEvaluation.contributionsQuestions"
            :key="index"
            class="question mb-3"
          >
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                </div>
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

        <!-- Regulations and Policies -->
        <div class="section mb-4">
          <h5>Quy định và Chính sách <span class="text-danger"> *</span></h5>
          <div
            v-for="(
              question, index
            ) in performanceEvaluation.regulationsQuestions"
            :key="index"
            class="question mb-3"
          >
            <div class="options d-flex justify-content-around my-3">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="form-check"
              >
                <span class="answer-label me-2">{{ option.label }}</span>
                <div class="avatar-group mt-2">
                  <img
                    v-for="(avatar, avatarIndex) in option.avatarUrls"
                    :key="avatarIndex"
                    :src="avatar"
                    alt="Avatar"
                    class="avatar-img"
                  />
                </div>
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

        <!-- Personal Contributions and Results -->
        <div class="section mb-4">
          <h5>Đóng góp Cá nhân và Kết quả</h5>
          <div class="question mb-3">
            <label class="d-flex title"
              >Thành tích cá nhân nổi bật nhất của Quân trong thời gian qua là
              <span class="text-danger"> *</span></label
            >
            <div class="form-control text-start" rows="3">
              Có được chứng chỉ SM, Hoàn thành task xuất sắc
            </div>
          </div>
          <div class="question mb-3">
            <label class="d-flex title"
              >Quân cảm thấy mình đã đóng góp đủ cho sự phát triển của tổ chức
              không? <span class="text-danger"> *</span></label
            >
            <div class="form-control text-start" rows="3">
              Sẽ cống hiến hết mình vì công ty, không có giới hạn nào là đủ
            </div>
          </div>
        </div>

        <!-- Quarter Goals -->
        <div class="section mb-4">
          <h5>Mục tiêu quý IV <span class="text-danger"> *</span></h5>
          <div class="form-control text-start" rows="3">
            Được tăng lương, Hoàn thành task nhanh hơn, Có được chứng chỉ N2
          </div>
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
        position: "Tester",
        avatarUrl: require("@/assets/avata.png"),
        department: "Phát triển",
        project: "StudyArt",
        level: "1",
        time: "2 năm 3 tháng",
      },
      sortKey: "name",
      sortOrder: "asc",
      teamMates: [
        {
          name: "Nguyễn Văn B",
          position: "Middle",
          project: "StudyArt",
          level: "3",
          isViewing: false,
        },
        {
          name: "Nguyễn Văn C",
          position: "Junior",
          project: "StudyArt",
          level: "5",
          isViewing: false,
        },
        {
          name: "Trịnh Thái Quân",
          position: "Tester",
          project: "StudyArt",
          level: "1",
          isViewing: false,
        },
        {
          name: "Hồ Xuân Đại",
          position: "Fresher",
          project: "StudyArt",
          level: "3",
          isViewing: false,
        },
        {
          name: "Trần Văn E",
          position: "Senior",
          project: "StudyArt",
          level: "4",
          isViewing: false,
        },
      ],
      performanceEvaluation: {
        performanceQuestions: [
          {
            label: "Mức độ chính xác của công việc Quân thực hiện là?",
            score: 10,
            options: [
              {
                label: "50%",
                avatarUrls: [require("@/assets/avata.png")],
                description: "description",
              },
              {
                label: "75%",
                avatarUrls: [require("@/assets/avata.png")],
                description: "description",
              },
              {
                label: "100%",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              { label: "150%", avatarUrls: [require("@/assets/avata.png")] },
              { label: "200%", avatarUrls: [require("@/assets/avata.png")] },
            ],
          },
          {
            label: "Mức độ chính xác của công việc Quân thực hiện là?",
            score: 10,
            options: [
              {
                label: "50%",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              { label: "75%", avatarUrls: [require("@/assets/avata.png")] },
              { label: "100%", avatarUrls: [require("@/assets/avata.png")] },
              {
                label: "150%",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              { label: "200%", avatarUrls: [require("@/assets/avata.png")] },
            ],
          },
          {
            label: " Quân có thường xuyên hoàn thành công việc đúng hạn không?",
            score: 15,
            options: [
              {
                label: "Hiếm khi",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Thỉnh thoảng",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Đôi khi",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Thường xuyên",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Luôn luôn",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
            ],
          },
        ],
        skillsQuestions: [
          {
            label:
              "Quân đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
            score: 5,
            options: [
              {
                label: "Không cải thiện",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Cải thiện ít",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Cải thiện vừa phải",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Cải thiện đáng kể",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Cải thiện vượt bậc",
                avatarUrls: [require("@/assets/avata.png")],
              },
            ],
          },
          {
            label:
              " Quân có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
            score: 10,
            options: [
              {
                label: "Hoàn toàn không",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Ít hiệu quả",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Hiệu quả trung bình",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Khá hiệu quả",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Rất hiệu quả",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
            ],
          },
          {
            label:
              " Quân cảm thấy cần cải thiện kỹ năng nào để nâng cao hiệu suất công việc?",
            score: 15,
            options: [
              {
                label: "Quản lý thời gian",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Giao tiếp và hợp tác",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Chuyên môn kỹ thuật",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Giải quyết vấn đề và ra quyết định",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Lãnh đạo và quản lý đội nhóm",
                avatarUrls: [require("@/assets/avata.png")],
              },
            ],
          },
        ],
        attitudeQuestions: [
          {
            label:
              " Quân có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
            score: 5,
            options: [
              {
                label: "Rất hiếm khi",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Thỉnh thoảng",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Đôi khi",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Thường xuyên",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Luôn luôn",
                avatarUrls: [require("@/assets/avata.png")],
              },
            ],
          },
          {
            label: " Thái độ làm việc của Quân trong công việc là",
            score: 15,
            options: [
              {
                label: "Thiếu động lực",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Hơi thụ động",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Cần cải thiện",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Tích cực",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Rất chủ động",
                avatarUrls: [require("@/assets/avata.png")],
              },
            ],
          },
          {
            label: "Khi gặp tình huống khó khăn, Quân xử lý như thế nào?",
            score: 10,
            options: [
              {
                label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label:
                  "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label:
                  "Đánh giá tình huống và thử nghiệm các giải pháp khác nhau",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Tìm ra giải pháp sáng tạo và chủ động áp dụng",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Giải quyết tình huống một cách hiệu quả và tự tin",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
            ],
          },
        ],
        contributionsQuestions: [
          {
            score: 10,
            options: [
              {
                label: "Hầu như không",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Có ít đóng góp",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Đóng góp mức trung bình",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Có nhiều đóng góp",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Có rất nhiều đóng góp",
                avatarUrls: [require("@/assets/avata.png")],
              },
            ],
          },
        ],
        regulationsQuestions: [
          {
            score: 10,
            options: [
              {
                label: "Hầu như không tuân thủ",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Tuân thủ ít",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Tuân thủ mức trung bình",
                avatarUrls: [require("@/assets/avata.png")],
              },
              {
                label: "Tuân thủ tốt",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
              {
                label: "Tuân thủ hoàn toàn",
                avatarUrls: [
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                  require("@/assets/avata.png"),
                ],
              },
            ],
          },
        ],
        personalContributionsQuestions: [
          {
            label:
              "Thành tích cá nhân nổi bật nhất của Quân trong thời gian qua là:",
          },
          {
            label:
              "Quân cảm thấy mình đã đóng góp đủ cho sự phát triển của tổ chức không?",
          },
        ],
      },
      selectedValues: [], // Make sure to initialize as needed
      selectedPerson: null,
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
    viewPerson(person) {
      if (this.selectedPerson && this.selectedPerson !== person) {
        this.selectedPerson.isViewing = false;
      }

      // Nếu chọn lại người đang được chọn, bỏ chọn (tắt xem)
      if (this.selectedPerson === person) {
        this.selectedPerson = null;
        person.isViewing = false;
      } else {
        // Chọn người mới và bật trạng thái xem
        this.selectedPerson = person;
        person.isViewing = true;
      }

      console.log(this.selectedPerson);
    },
    processPerson(person) {
      // set localStorage
      localStorage.setItem("teamMate", JSON.stringify(person));
      // redirect to /assess-page reload page to use function headercomponent reload page
      this.$router.push("/assess-page");
      // // set profile in assess-page == profile in team-manage
      // this.$store.commit('setProfile', person);
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
  top: 125%; /* Vị trí tooltip */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-group:hover .tooltiptext {
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
  display: flex; /* Sử dụng Flexbox để sắp xếp các dropdown nằm cùng hàng */
  flex-wrap: nowrap; /* Ngăn không cho các dropdown xuống hàng */
  gap: 20px; /* Khoảng cách giữa các dropdown */
  align-items: center; /* Căn giữa các dropdown theo chiều dọc */
  margin-bottom: 20px; /* Khoảng cách dưới của container */
}

/* Style cho mỗi dropdown */
.form-select {
  width: 150px; /* Đặt chiều rộng cho dropdown */
  height: 40px; /* Thay đổi chiều cao của dropdown */
  padding: 0.375rem 0.75rem; /* Padding cho dropdown */
  font-size: 1rem; /* Kích thước font chữ */
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff; /* Màu nền của dropdown */
  background-clip: padding-box;
  border: 1px solid #ced4da; /* Viền của dropdown */
  border-radius: 0.25rem; /* Bo góc của dropdown */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; /* Hiệu ứng chuyển tiếp */
}

.form-select:focus {
  border-color: #007bff; /* Màu viền khi focus */
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); /* Hiệu ứng bóng đổ khi focus */
}

/* Style cho label của dropdown */
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* Khoảng cách dưới của label */
  font-weight: 600; /* Định dạng font chữ của label */
  color: #333; /* Màu chữ của label */
}
</style>
