<template>
  <div
    class="container-fluid row justify-content-md-center align-items-center"
    v-if="profile"
  >
    <!-- Left Menu -->
    <div class="col-md-4 left-menu p-3">
      <div
        class="profile mb-3 d-flex align-items-center justify-content-around"
      >
        <div class="avatar">
          <img :src="profile.avatar" alt="avatar" />
        </div>
        <div class="info ms-3 text-start">
          <h3 class="mb-2">{{ profile.name }}</h3>
          <div class="line" v-if="userInfo.position == 'Manager'">
            <strong>Vị trí:</strong> {{ profile.position }}
          </div>
          <div class="line" v-if="userInfo.position == 'Manager'">
            <strong>Bậc hiện tại:</strong> {{ profile.level }}
          </div>
          <div class="line">
            <strong>Dự án hiện tại:</strong> {{ profile.project }}
          </div>
          <div class="line">
            <strong>Thời gian làm việc:</strong> {{ calculateWorkTime() }}
          </div>
        </div>
      </div>
      <div class="team-mate">
        <div class="text-start fw-bold">
          Danh sách thành viên có chung dự án hiện tại:
        </div>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th
                @click="sortBy('name')"
                class="text-start"
                style="cursor: pointer"
              >
                Tên
              </th>
              <th>Vị Trí</th>
              <th>Tác Vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mate, index) in filteredTeamMates" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="text-start">{{ mate.name }}</td>
              <td>{{ mate.position }}</td>
              <td class="d-flex">
                <div class="ms-5">
                  <button
                    v-if="mate.isSubmitted"
                    class="btn btn-sm btn-success btn-custom me-2"
                    :disabled="true"
                  >
                    Đã đánh giá
                  </button>
                  <button
                    v-else-if="mate.isProcessing"
                    class="btn btn-sm btn-warning btn-custom me-2"
                    :disabled="true"
                  >
                    Đang đánh giá
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-primary btn-custom me-2"
                    @click="selectPerson(mate)"
                  >
                    Đánh giá
                  </button>
                </div>
                <div v-if="userInfo.position == 'Manager'">
                  <button
                    v-if="mate.isViewing"
                    class="btn btn-sm btn-warning btn-custom"
                    :disabled="true"
                  >
                    Đang xem
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-info btn-custom"
                    @click="viewPerson(mate)"
                  >
                    Xem chi tiết
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
      <component
        :is="isViewing ? 'TeamAssessDetailsForm' : 'TeamAssessForm'"
        :selectedPerson="selectedPerson"
        :userInfo="userInfo"
        @updateSelectedPerson="handleUpdateSelectedPerson"
      />
    </div>
  </div>
</template>
<script>
import "vue3-toastify/dist/index.css";
import axios from "axios";
import TeamAssessDetailsForm from "./TeamAssessDetailsForm.vue";
import TeamAssessForm from "./TeamAssessForm.vue";

export default {
  name: "TeamMatesAssess",
  components: {
    TeamAssessForm,
    TeamAssessDetailsForm,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_DB_URL,
      userInfo: null,
      profile: null,
      teamMates: [],
      selectedPerson: null,
      sortKey: "name",
      sortOrder: "asc",
      isViewing: false,
      listScore: [],
    };
  },
  mounted() {
    this.isLogin();
    this.fetchTeamMates();
  },

  computed: {
    filteredTeamMates() {
      return this.teamMates.filter(
        (mate) => mate.project === this.userInfo.project
      );
    },
    sortedTeamMates() {
      return [...this.filteredTeamMates].sort((a, b) => {
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
    async fetchTeamMates() {
      try {
        const response = await axios.get(this.apiUrl + "/employees");
        console.log("DANH SÁCH NHÂN VIÊN:: ", response);

        const loggedInUserId = this.userInfo.id;

        this.teamMates = response.data
          .filter((mate) => mate.id !== loggedInUserId)
          .map((mate) => ({
            ...mate,
            isProcessing: mate.id === loggedInUserId,
            isSubmitted: mate.isSubmitted || false,
            isViewing: false,
          }));

        if (this.teamMates.length > 0) {
          this.teamMates[0].isProcessing = true;
          this.selectedPerson = this.teamMates[0];
          this.profile = this.teamMates[0];
        }

        console.log(this.teamMates);
      } catch (error) {
        console.error("Error fetching projetcs:", error);
      }
    },
    viewPerson(person) {

      if (this.selectedPerson && this.selectedPerson.isProcessing) {
        this.selectedPerson.isProcessing = false;
      }

      if (this.selectedPerson !== person) {
        if (this.selectedPerson) {
          this.selectedPerson.isViewing = false;
        }
        this.selectedPerson = person;
        person.isViewing = true;
        person.isProcessing = false;
        this.profile = person;
        console.log(this.isViewing);
      } else {
        person.isViewing = !person.isViewing;
      }
      this.isViewing = true;
    },
    selectPerson(person) {
      if (this.listScore.length > 0) {
        if (window.confirm("Bạn có chắc thay đổi người để đánh giá không ?")) {
          if (window.confirm("Dữ liệu đã nhập sẽ bị xóa!")) {
            this.selectedPerson.isProcessing = false;
            this.clearForm();
          }
        }
      }

      if (this.selectedPerson && this.selectedPerson.isViewing) {
        this.selectedPerson.isViewing = false;
      }

      if (this.selectedPerson !== person) {
        if (this.selectedPerson) {
          this.selectedPerson.isProcessing = false;
        }
        this.selectedPerson = person;
        person.isViewing = false;
        person.isProcessing = true;
        this.profile = person;
      } else {
        // Nếu người được nhấn là cùng một người, chuyển đổi trạng thái
        person.isProcessing = !person.isProcessing;
      }
      this.isViewing = false;
    },
    isLogin() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("THÔNG TIN ĐĂNG NHẬP:: ", userInfo);

      if (!userInfo) {
        this.$router.push("/login");
      } else {
        this.userInfo = userInfo;
        this.profile = userInfo;
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
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
    handleUpdateSelectedPerson(updatedPerson) {
      this.selectedPerson = null;
      //update selectedPerson vào teamMates
      const index = this.teamMates.findIndex(
        (person) => person.id === updatedPerson.id
      );
      if (index !== -1) {
        this.teamMates[index] = updatedPerson;
      }
    },
  },
};
</script>

<style scoped>
/* Left menu */
.btn-custom {
  width: 130px;
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

/* Team Mate Table */

.team-mate .table {
  font-size: 14px;
  margin-top: 20px;
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

.content > p {
  color: black;
}
</style>
