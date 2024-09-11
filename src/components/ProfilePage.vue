<template>
<div class="background-container">
  <div class="container">
    <div class="profile">
      <img :src="profileImage" alt="Profile Picture" />
    </div>
    <div class="info">
      <div class="name">
        <h1>{{ name }}</h1>
        <span class="title">{{ title }}</span>
      </div>
      <div class="details">
        <div class="detail">
          <label>Day Of Birth:</label>
          <span>{{ DOB }}</span>
        </div>
        <div class="detail">
          <label>Department:</label>
          <span>{{ department }}</span>
        </div>
        <div class="detail">
          <label>Project:</label>
          <span>{{ project }}</span>
        </div>
        <div class="detail">
          <label>Manager:</label>
          <span>{{ manager }}</span>
        </div>
        <div class="detail">
          <label>Workday:</label>
          <span>{{ workday }}</span>
        </div>
        <div class="detail">
          <label>Rank:</label>
          <span>{{ rank }}</span>
        </div>
      </div>
    </div>
    <div class="friends-list">
      <div class="friends-header">
        <h1>Members <span class="badge">{{ friends.length }}</span></h1>
        <div class="search-bar">
            <input type="text" placeholder="Search Friends" v-model="searchTerm" />
        </div>
        </div>
      <div class="friends-row">
        <div
          class="friend-card"
          v-for="friend in filteredFriends"
          :key="friend.name"
        >
          <img :src="friend.avatar" alt="Avatar" />
          <h2>{{ friend.name }}</h2>
          <p>{{ friend.position }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      profileImage: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
      name: "Trịnh Thái Quân",
      title: "DEV",
      DOB: "29-09-2003",
      gender:  "male",
      department: "phát triễn",
      project: "StudyArt",
      manager:"Trịnh Thái Quân",
      workday:"1002",
      rank:" midle II",
      searchTerm: "",
      friends: [
        {
          name: "Trịnh Thái Quân",
          position: "Manager",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
        {
          name: "Trịnh Thái Quân",
          position: "Dev",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
        {
         name: "Trịnh Thái Quân",
          position: "Dev",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
        {
          name: "Trịnh Thái Quân",
          position: "Dev",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
        {
          name: "Trịnh Thái Quân",
          position: "Dev",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
        {
          name: "Trịnh Thái Quân",
          position: "Dev",
          avatar: "https://png.pngtree.com/png-clipart/20231216/original/pngtree-vector-office-worker-staff-avatar-employee-icon-png-image_13863941.png",
        },
      ],
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter((friend) =>
        friend.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>

.background-container {
    margin-top:-50px;
  background-color: #4e7fcf;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; 
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
</style>
