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
        <div class="evaluation-header mb-2" style="display: flex; justify-content: space-between; align-items: center;">
  <label class="fw-bold fs-4">
    Chi tiết đánh giá quý III năm 2024 của:
    {{ selectedPerson ? selectedPerson.name : "" }}
  </label>
  <span style="color: red; font-size: 24px;">Tổng điểm: {{ calculateGrandTotalScore() }}</span>
</div>

      
<form v-if="selectedPerson" class="evaluation-form">
  <div v-for="(section, sectionIndex) in evaluationSections" :key="sectionIndex" class="section mb-4">
    <div class="section-header" >
  <h5 >{{ sectionIndex + 1 }}. {{ section.title }}</h5>
  <span v-if="section.questions" class="score-display" style="color: red; text-align: right;">
    (<strong>{{ calculateTotalScore(selectedPerson.evaluation[section.key]) }}</strong> / <strong>{{ maxScore[section.key] }}</strong>)
  </span>
</div>

    <div>
      <div v-if="section.questions">
        <div v-for="(question, index) in selectedPerson?.evaluation[section.key] ?? []" :key="index" class="question mb-3">
          <div v-if="question.label" class="d-flex justify-content-between title">
  <label>{{ index + 1 }}. {{ question.label }}<span class="text-danger"> *</span></label>
</div>
          <div class="options d-flex justify-content-around my-3">
            <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check d-flex flex-column align-items-center">
              <span class="answer-label me-2">{{ option.label }}</span>
              <div class="avatar-group mt-2">
                <img v-for="(avatar, avatarIndex) in option.avatarUrls" :key="avatarIndex" :src="avatar" alt="Avatar" class="avatar-img" />
                <span class="tooltiptext">{{ option.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="question mb-3">
          <label class="d-flex title">{{ selectedPerson.evaluation[section.key]?.label }}<span class="text-danger"> *</span></label>
          <div class="form-control text-start">{{ selectedPerson.evaluation[section.key]?.answer }}</div>
        </div>
      </div>
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
    maxScore: {
      performance: 30,
      skills: 25,
      attitude: 20,
      contributions: 10,
      regulations: 10,
    },
    teamMates: [
      {
        name: "Nguyễn Văn B",
        position: "Middle",
        project: "StudyArt",
        level: "3",
        isViewing: false,
        evaluation: {
          performance: [
            {
              label: "Mức độ chính xác của công việc bạn thực hiện là?",
              score: 15,
              options: [
                { label: "50%", value: 1, avatarUrls: [ require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [] },
                { label: "150%", value: 4, avatarUrls: [] },
                { label: "200%", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
              score: 10,
              options: [
                { label: "Hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [] },
                { label: "Đôi khi", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Thường xuyên", value: 4, avatarUrls: [] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn đã hoàn thành tất cả các mục tiêu công việc được giao trong thời gian qua?",
              score: 5,
              options: [
                { label: "50%", value: 1, avatarUrls: [] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")],description:'hahaha' },
                { label: "150%", value: 4, avatarUrls: [] },
                { label: "200%", value: 5, avatarUrls: [] },
              ],
            },
          ],
          skills: [
            {
              label: "Bạn đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
              score: 5,
              options: [
                { label: "Không cải thiện", value: 1, avatarUrls: [] },
                { label: "Cải thiện ít", value: 2, avatarUrls: [] },
                { label: "Cải thiện vừa phải", value: 3, avatarUrls: [] },
                { label: "Cải thiện đáng kể", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Cải thiện vượt bậc", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Hoàn toàn không", value: 1, avatarUrls: [] },
                { label: "Ít hiệu quả", value: 2, avatarUrls: [] },
                { label: "Hiệu quả trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Khá hiệu quả", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Rất hiệu quả", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Quản lý thời gian", value: 1, avatarUrls: [] },
                { label: "Giao tiếp và hợp tác", value: 2, avatarUrls: [] },
                { label: "Chuyên môn kỹ thuật", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Giải quyết vấn đề và ra quyết định", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Lãnh đạo và quản lý đội nhóm", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
          ],
          attitude: [
            {
              label: "Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
              score: 10,
              options: [
                { label: "Rất hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [] },
                { label: "Đôi khi", value: 3, avatarUrls: [] },
                { label: "Thường xuyên", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Thái độ làm việc của Bạn trong công việc là",
              score: 5,
              options: [
                { label: "Thiếu động lực", value: 1, avatarUrls: [] },
                { label: "Hơi thụ động", value: 2, avatarUrls: [] },
                { label: "Cần cải thiện", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tích cực", value: 4, avatarUrls: [] },
                { label: "Rất chủ động", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Khi gặp tình huống khó khăn, bạn xử lý như thế nào?",
              score: 5,
              options: [
                {
                  label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên",
                  value: "1",
                },
                {
                  label:
                    "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn",
                  value: "2",avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")]
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
          contributions: [
            {
              score: 10,
            options: [
            { label: "Hầu như không",value:1, avatarUrls: [] },
                    { label: "Có ít đóng góp",value:2, avatarUrls: [] },
                    { label: "Đóng góp mức trung bình",value:3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                    { label: "Có nhiều đóng góp",value:4, avatarUrls: [] },
                    { label: "Có rất nhiều đóng góp",value:5, avatarUrls: [] },
                 
            ],
            },
          ],
          regulations: [
            {
              score: 10,
              options: [
                { label: "Hầu như không tuân thủ", value: 1, avatarUrls: [] },
                { label: "Tuân thủ ít", value: 2, avatarUrls: [] },
                { label: "Tuân thủ mức trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Tuân thủ tốt", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tuân thủ hoàn toàn", value: 5, avatarUrls: [] },
              ],
            },
          ],
          person: {
      label: "Thành tích cá nhân nổi bật nhất của Bạn trong thời gian qua là",
      answer: "Có được chứng chỉ SM, Hoàn thành task xuất sắc"
    },
    goals: {
      label: "Mục tiêu của bạn trong quý IV là",
      answer: "Được tăng lương, Hoàn thành task nhanh hơn, Có được chứng chỉ N2"
    }
        },
      },
      {
        name: "Nguyễn Văn c",
        position: "Middle",
        project: "StudyArt",
        level: "1",
        isViewing: false,
        evaluation: {
          performance: [
            {
              label: "Mức độ chính xác của công việc bạn thực hiện là?",
              score: 15,
              options: [
                { label: "50%", value: 1, avatarUrls: [] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "150%", value: 4, avatarUrls: [] },
                { label: "200%", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
              score: 10,
              options: [
                { label: "Hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [] },
                { label: "Đôi khi", value: 3, avatarUrls: [] },
                { label: "Thường xuyên", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn đã hoàn thành tất cả các mục tiêu công việc được giao trong thời gian qua?",
              score: 5,
              options: [
                { label: "50%", value: 1, avatarUrls: [] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [] },
                { label: "150%", value: 4, avatarUrls: [] },
                { label: "200%", value: 5, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
              ],
            },
          ],
          skills: [
            {
              label: "Bạn đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
              score: 5,
              options: [
                { label: "Không cải thiện", value: 1, avatarUrls: [] },
                { label: "Cải thiện ít", value: 2, avatarUrls: [] },
                { label: "Cải thiện vừa phải", value: 3, avatarUrls: [] },
                { label: "Cải thiện đáng kể", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Cải thiện vượt bậc", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Hoàn toàn không", value: 1, avatarUrls: [] },
                { label: "Ít hiệu quả", value: 2, avatarUrls: [] },
                { label: "Hiệu quả trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Khá hiệu quả", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Rất hiệu quả", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Quản lý thời gian", value: 1, avatarUrls: [] },
                { label: "Giao tiếp và hợp tác", value: 2, avatarUrls: [] },
                { label: "Chuyên môn kỹ thuật", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Giải quyết vấn đề và ra quyết định", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Lãnh đạo và quản lý đội nhóm", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
          ],
          attitude: [
            {
              label: "Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
              score: 10,
              options: [
                { label: "Rất hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [] },
                { label: "Đôi khi", value: 3, avatarUrls: [] },
                { label: "Thường xuyên", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Thái độ làm việc của Bạn trong công việc là",
              score: 5,
              options: [
                { label: "Thiếu động lực", value: 1, avatarUrls: [] },
                { label: "Hơi thụ động", value: 2, avatarUrls: [] },
                { label: "Cần cải thiện", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tích cực", value: 4, avatarUrls: [] },
                { label: "Rất chủ động", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Khi gặp tình huống khó khăn, bạn xử lý như thế nào?",
              score: 5,
              options: [
                {
                  label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên",
                  value: "1",
                },
                {
                  label:
                    "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn",
                  value: "2",avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")]
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
          contributions: [
            {
              score: 10,
            options: [
            { label: "Hầu như không",value:1, avatarUrls: [] },
                    { label: "Có ít đóng góp",value:2, avatarUrls: [] },
                    { label: "Đóng góp mức trung bình",value:3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                    { label: "Có nhiều đóng góp",value:4, avatarUrls: [] },
                    { label: "Có rất nhiều đóng góp",value:5, avatarUrls: [] },
                 
            ],
            },
          ],
          regulations: [
            {
              score: 10,
              options: [
                { label: "Hầu như không tuân thủ", value: 1, avatarUrls: [] },
                { label: "Tuân thủ ít", value: 2, avatarUrls: [] },
                { label: "Tuân thủ mức trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Tuân thủ tốt", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tuân thủ hoàn toàn", value: 5, avatarUrls: [] },
              ],
            },
          ],
          person: {
      label: "Thành tích cá nhân nổi bật nhất của Bạn trong thời gian qua là",
      answer: "Có được chứng chỉ SM, Hoàn thành task xuất sắc"
    },
    goals: {
      label: "Mục tiêu của bạn trong quý IV là",
      answer: "Được tăng lương, Hoàn thành task nhanh hơn, Có được chứng chỉ N2"
    }
        },
      },
      {
        name: "Nguyễn Văn D",
        position: "Middle",
        project: "StudyArt",
        level: "2",
        isViewing: false,
        evaluation: {
          performance: [
            {
              label: "Mức độ chính xác của công việc bạn thực hiện là?",
              score: 15,
              options: [
                { label: "50%", value: 1, avatarUrls: [ ] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [] },
                { label: "150%", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "200%", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có thường xuyên hoàn thành công việc đúng hạn không?",
              score: 10,
              options: [
                { label: "Hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Đôi khi", value: 3, avatarUrls: [] },
                { label: "Thường xuyên", value: 4, avatarUrls: [] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn đã hoàn thành tất cả các mục tiêu công việc được giao trong thời gian qua?",
              score: 5,
              options: [
                { label: "50%", value: 1, avatarUrls: [] },
                { label: "75%", value: 2, avatarUrls: [] },
                { label: "100%", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "150%", value: 4, avatarUrls: [] },
                { label: "200%", value: 5, avatarUrls: [] },
              ],
            },
          ],
          skills: [
            {
              label: "Bạn đã nâng cao kỹ năng chuyên môn của mình trong năm qua như thế nào?",
              score: 5,
              options: [
                { label: "Không cải thiện", value: 1, avatarUrls: [] },
                { label: "Cải thiện ít", value: 2, avatarUrls: [] },
                { label: "Cải thiện vừa phải", value: 3, avatarUrls: [] },
                { label: "Cải thiện đáng kể", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Cải thiện vượt bậc", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Hoàn toàn không", value: 1, avatarUrls: [] },
                { label: "Ít hiệu quả", value: 2, avatarUrls: [] },
                { label: "Hiệu quả trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Khá hiệu quả", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Rất hiệu quả", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
            {
              label: "Bạn có cảm thấy mình áp dụng kiến thức mới vào công việc hiệu quả không?",
              score: 10,
              options: [
                { label: "Quản lý thời gian", value: 1, avatarUrls: [] },
                { label: "Giao tiếp và hợp tác", value: 2, avatarUrls: [] },
                { label: "Chuyên môn kỹ thuật", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Giải quyết vấn đề và ra quyết định", value: 4, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Lãnh đạo và quản lý đội nhóm", value: 5, avatarUrls: [require("@/assets/avata.png")] },
              ],
            },
          ],
          attitude: [
            {
              label: "Bạn có thường xuyên hỗ trợ đồng nghiệp trong công việc không?",
              score: 10,
              options: [
                { label: "Rất hiếm khi", value: 1, avatarUrls: [] },
                { label: "Thỉnh thoảng", value: 2, avatarUrls: [] },
                { label: "Đôi khi", value: 3, avatarUrls: [] },
                { label: "Thường xuyên", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Luôn luôn", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Thái độ làm việc của Bạn trong công việc là",
              score: 5,
              options: [
                { label: "Thiếu động lực", value: 1, avatarUrls: [] },
                { label: "Hơi thụ động", value: 2, avatarUrls: [] },
                { label: "Cần cải thiện", value: 3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tích cực", value: 4, avatarUrls: [] },
                { label: "Rất chủ động", value: 5, avatarUrls: [] },
              ],
            },
            {
              label: "Khi gặp tình huống khó khăn, bạn xử lý như thế nào?",
              score: 5,
              options: [
                {
                  label: "Tìm kiếm sự trợ giúp từ đồng nghiệp hoặc cấp trên",
                  value: "1",
                },
                {
                  label:
                    "Cố gắng tự giải quyết với sự hỗ trợ từ tài liệu hoặc hướng dẫn",
                  value: "2",avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")]
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
          contributions: [
            {
              score: 10,
            options: [
            { label: "Hầu như không",value:1, avatarUrls: [] },
                    { label: "Có ít đóng góp",value:2, avatarUrls: [] },
                    { label: "Đóng góp mức trung bình",value:3, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png"), require("@/assets/avata.png")] },
                    { label: "Có nhiều đóng góp",value:4, avatarUrls: [] },
                    { label: "Có rất nhiều đóng góp",value:5, avatarUrls: [] },
                 
            ],
            },
          ],
          regulations: [
            {
              score: 10,
              options: [
                { label: "Hầu như không tuân thủ", value: 1, avatarUrls: [] },
                { label: "Tuân thủ ít", value: 2, avatarUrls: [] },
                { label: "Tuân thủ mức trung bình", value: 3, avatarUrls: [require("@/assets/avata.png")] },
                { label: "Tuân thủ tốt", value: 4, avatarUrls: [require("@/assets/avata.png"), require("@/assets/avata.png")] },
                { label: "Tuân thủ hoàn toàn", value: 5, avatarUrls: [] },
              ],
            },
          ],
          person: {
      label: "Thành tích cá nhân nổi bật nhất của Bạn trong thời gian qua là",
      answer: "Có được chứng chỉ SM, Hoàn thành task xuất sắc"
    },
    goals: {
      label: "Mục tiêu của bạn trong quý IV là",
      answer: "Được tăng lương, Hoàn thành task nhanh hơn, Có được chứng chỉ N2"
    }
        },
      },
    ],
    selectedPerson: null,
    selectedValues: null,
    evaluationSections: [
  { title: "Hiệu suất công việc", key: "performance", questions: true, mutil: 30 },
  { title: "Kỹ năng", key: "skills", questions: true, mutil: 25 },
  { title: "Thái độ", key: "attitude", questions: true, mutil: 20 },
  { title: "Đóng góp cá nhân", key: "contributions", questions: true, mutil: 20 },
  { title: "Tuân thủ quy định", key: "regulations", questions: true, mutil: 10 },
  { title: "Đóng góp Cá nhân và Kết quả", key: "person", questions: false },
  { title: "Mục tiêu quý IV", key: "goals", questions: false }
],
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
    getMaxScore() {
      return (category) => {
        return this.maxScore[category] || 0; // Giá trị mặc định nếu không tìm thấy
      };
    }
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

    return parseFloat(((totalScore*20)/100).toFixed(0));
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
}
,
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

    if (this.selectedPerson === person) {
      this.selectedPerson = null;
      person.isViewing = false;
    } else {
      this.selectedPerson = person;
      person.isViewing = true;
    }

    // Assuming you have a computed property or a method to display the evaluation
    console.log(this.selectedPerson.evaluation);
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
  display: block;
  width: 100%;
  overflow-x: auto; /* Cho phép cuộn ngang */
  -webkit-overflow-scrolling: touch
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
    height: auto; /* Chiều cao tự động để tránh bị cắt xén */
  }

  .profile {
    max-width: 100%;
    margin: 0 auto;
  }

  .evaluation-form {
    padding: 10px;
  }

  .form-select {
    width: 100%; /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
  }

  .form-buttons {
    flex-direction: column; /* Các nút nằm theo chiều dọc */
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
    width: 100%; /* Đặt chiều rộng toàn bộ */
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
