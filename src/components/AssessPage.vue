<template>
  <div class="container-fluid d-flex md-2 row justify-content-md-center">
    <div class="col-md-5 left-menu">
      <div class="d-flex flex-column">
        <div class="d-flex profile mb-5 gap-3">
          <div class="avatar">
            <img src="../assets/logo.png" alt="avatar" />
          </div>
          <div class="info text-start">
            <div class="line">Trình Thái Quân</div>
            <div class="line">Intern</div>
          </div>
        </div>
        <div class="team-mate">
          <table class="table">
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Position</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nguyễn Lê Quốc Huy</td>
                <td>Manager</td>
                <td>
                  <button class="btn btn-primary">Đánh giá</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-7 right-menu">
      <div class="d-flex text-start mb-3 gap-2">
        <label>Đánh giá quý 4 năm 2024 cho :</label>
        <label class="fw-bold">Nguyễn Lê Quốc Huy</label>
      </div>
      <form class="d-flex flex-column justify-content-between">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question text-start mb-2"
        >
          <div class="title d-flex justify-content-between">
            <label>{{ question.label }}</label>
            <div class="point">
              <i class="bi bi-star-fill">
                <span>5</span>
              </i>
            </div>
          </div>
          <div class="content">
            <p>{{ question.content }}</p>
          </div>
          <div class="action d-flex flex-column">
            <div class="radio d-flex justify-content-around">
              <div class="form-check" v-for="i in 5" :key="i">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'flexRadioDefault' + index"
                  :id="'flexRadioDefault' + index + i"
                  :value="i"
                  v-model="selectedValues[index]"
                />
                <label
                  class="form-check-label"
                  :for="'flexRadioDefault' + index + i"
                >
                  {{ i }}
                </label>
              </div>
            </div>
            <div class="description">
              <textarea
                v-if="selectedValues[index] >= 3"
                class="form-control"
                rows="3"
                placeholder="Nhận xét thêm"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center gap-5 mt-3">
          <button type="submit" class="btn btn-warning" @click="onSubmit">
            <i class="fa-regular fa-flag"></i>
          </button>
          <button type="submit" class="btn btn-success" @click="onSubmit">
            Xác nhận
          </button>
          <button type="submit" class="btn btn-danger" @click="onSubmit">
            Xóa toàn bộ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssessPage',
  data() {
    return {
      questions: [
        {
          label: "Hiệu suất công việc 1",
          content: "Ví dụ một một một một một...",
        },
        {
          label: "Hiệu suất công việc 2",
          content: "Ví dụ hai hai hai hai hai...",
        },
        {
          label: "Hiệu suất công việc 3",
          content: "Ví dụ ba ba ba ba ba...",
        },
        {
          label: "Hiệu suất các việc 4",
          content: "Ví dụ bài bài bài bài...",
        },
        {
          label: "Hiệu suất các việc 5",
          content: "Ví dụ tài tài tài tài...",
        },
        {
          label: "Hiệu suất các việc 6",
          content: "Ví dụ nhiên nhiên nhiên nhiên...",
        },
        {
          label: "Hiệu suất các việc 7",
          content: "Ví dụ bài bài bài bài...",
        },
        {
          label: "Hiệu suất các việc 8",
          content: "Ví dụ bài bài bài bài...",
        },
        {
          label: "Hiệu suất các việc 9",
          content: "Ví dụ bài bài bài bài...",
        },
        {
          label: "Hiệu suất các việc 10",
          content: "Ví dụ bài bài bài bài...",
        },
        // Bạn có thể thêm nhiều câu hỏi hơn vào đây
      ],
      selectedValues: [], // Mảng để lưu giá trị cho từng câu hỏi
    };
  },
};
</script>

<style scoped>
/* Left menu */
tbody > tr > td {
  vertical-align: middle;
}

.info {
  display: flex; /* Sử dụng flexbox để xếp các dòng theo chiều dọc */
  flex: 1;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
}

.line {
  position: relative; /* Để có thể sử dụng pseudo-element cho đường gạch chân */
  padding-bottom: 2px; /* Khoảng cách giữa nội dung và đường gạch chân */
  border-bottom: 2px solid black; /* Đường gạch chân cho từng dòng */
  margin-bottom: 10px;
}
.line::after {
  position: absolute; /* Đặt pseudo-element ở vị trí tuyệt đối so với phần tử chứa */
  width: 100%; /* Chiếm toàn bộ chiều rộng của phần tử chứa */
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%; /* Để tạo hình tròn cho phần tử chứa */
  background-color: #ccc;
  overflow: hidden; /* Đảm bảo hình ảnh không tràn ra ngoài phần tử chứa */
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Để hình ảnh có hình tròn giống như phần tử chứa */
  object-fit: cover; /* Đảm bảo hình ảnh không bị biến dạng */
}

/* Right menu */

.right-menu {
  height: 80vh; /* Đặt chiều cao của right-menu là chiều cao màn hình */
}

.title {
  background-color: rgb(122, 182, 250);
  font-size: 18px;
  font-weight: bold;
  padding : 10px;
  border-radius: 5px;
}
.point {
  color: red;
}
.content {
  padding-left: 40px;
}

form {
  padding: 20px;
  border-radius: 8px;
  background-color: #f8d3ff;
  flex: 1;
  max-height: 100%;
  overflow-y: auto; /* Tạo thanh cuộn cho form */
}
/* Tạo kiểu cho thanh cuộn */
form::-webkit-scrollbar {
  width: 8px; /* Chiều rộng của thanh cuộn */
}

form::-webkit-scrollbar-thumb {
  background-color: #888; /* Màu của thanh cuộn */
  border-radius: 10px; /* Độ cong của thanh cuộn */
}

form::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Màu của thanh cuộn khi hover */
}
</style>