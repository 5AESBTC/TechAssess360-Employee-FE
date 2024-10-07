<template>
  <div class="background-container">
    <div class="container">
      <div class="profile" v-if="profile">
        <img :src="profile.avatar" alt="Profile Picture" />
        <i class="fas fa-pencil-alt edit-icon" @click="editProfile" title="Edit Profile"></i>
      </div>
      <div class="info" v-if="profile">
        <div class="name">
          <h1>{{ profile.name }}</h1>
        </div>
        <div class="details">
          <div class="detail">
            <label>Day Of Birth:</label>
            <span>{{ profile.dob }}</span>
          </div>
          <div class="detail">
            <label>Email:</label>
            <span>{{ profile.email }}</span>
          </div>
          <div class="detail">
            <label>Project:</label>
            <span>{{ profile.project }}</span>
          </div>
          <div class="detail">
            <label>Workday:</label>
            <span>{{ calculateWorkTime() }}</span>
          </div>
          <div class="detail">
            <label>Rank:</label>
            <span>{{ profile.rank.position.name }}</span>
          </div>
        </div>
      </div>
      <div class="friends-list">
        <div class="friends-header">
          <div class="search-bar">
            <input type="text" placeholder="Search Friends" v-model="searchTerm" />
          </div>
        </div>
        <div class="friends-row">
          <div
            class="friend-card"
            v-for="(mate, index) in filteredTeamMates"
            :key="index"
          >
            <img :src="mate.avatar || defaultAvatar" alt="Avatar" />
            <h2>{{ mate.name }}</h2>
            <p>{{ mate.position }}</p>
          </div>
        </div>
      </div>

      <!-- Modal Edit Profile -->
      <div v-if="isEditing" class="modal">
        <div class="modal-content">
          <span class="close" @click="isEditing = false">&times;</span>
          <h2>Edit Profile</h2>
          <input type="file" @change="onFileChange" accept="image/*" />
          <button @click="saveProfile">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: 'ProfilePage',
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      userInfo: null,
      profile: null,
      teamMates: [],
      searchTerm: "",
      isEditing: false,
    };
  },
  computed: {
    filteredTeamMates() {
      return this.teamMates.filter((mate) =>
        mate.project === this.userInfo.project &&
        mate.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    editProfile() {
    this.isEditing = true; // Mở modal
  },
  async saveProfile() {
    try {
      // Gửi yêu cầu cập nhật hồ sơ
      await axios.put(`${this.apiUrl}/api/users/${this.userInfo.id}`, this.profile);
      this.isEditing = false; // Đóng modal

      await this.fetchProfileData();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  },

    initializeUserInfo() {
      const storedUserInfo = localStorage.getItem('user');
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
        this.fetchProfileData();
        this.fetchFriendsData();
      } else {
        console.error("No user info found in localStorage");
      }
    },
    async fetchProfileData() {
      try {
        const loggedInUserId = this.userInfo.id; // Lấy ID từ userInfo
        const response = await axios.get(`${this.apiUrl}/api/users/${loggedInUserId}`);
        this.profile = response.data.data; // Lưu dữ liệu profile vào biến profile
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    },
    async fetchFriendsData() {
      try {
        const loggedInUserId = this.userInfo.id;
        const response = await axios.get(`${this.apiUrl}/api/users/${loggedInUserId}/same-project`);
        this.teamMates = response.data.data; // Lưu dữ liệu bạn bè
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
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
  },
  created() {
    this.initializeUserInfo();
  },
};
</script>

<style scoped>

.background-container {
  background-color: #4e7fcf;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px; 
  
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 30px;
  max-width: 1200px; 
  margin: 0 auto;
  background-color: #fff; 
  border-radius: 15px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  margin-top:80px;
  margin-bottom:80px;
}

.profile {
  width: 200px;
}

.profile img {
  width: 100%;
  border-radius: 50%;
}

.info {
  text-align: center;
  width: 100%;
  max-width: 800px;
}

.name {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.name h1 {
  font-size: 28px;
  font-weight: bold;
}

.name .title {
  font-size: 18px;
  color: #888;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.detail {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.detail label {
  font-weight: bold;
}

.friends-list {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom:-20px;
}

.friends-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

h1 {
  font-size: 26px;
}

.badge {
  background-color: #4caf50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
}

.search-bar {
  max-width: 350px;
  width: 100%;
  margin-right:30px;
}

.search-bar input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.friends-row {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

.friend-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
}

.friend-card img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.friend-card h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.friend-card p {
  font-size: 16px;
  color: #666;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); 
  backdrop-filter: blur(5px); 
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); 
  width: 400px; 
  max-width: 90%;
  position: relative;
}

.close {
  color: #f00;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #d00;
}

h2 {
  margin-top: 0;
  color: #333;
}

input[type="file"] {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4e7fcf;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3c6abf;
}

</style>
