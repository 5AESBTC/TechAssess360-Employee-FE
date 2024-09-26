<template>
    <!-- Evaluation Header -->
    <div class="evaluation-header text-start mb-2">
        <label class="fw-bold fs-4">Đánh giá quý III năm 2024 cho:
            {{ selectedPerson ? selectedPerson.name : "" }}</label>
    </div>

    <form class="evaluation-form" @submit.prevent="submitForm">
        <!-- Performance Evaluation -->
        <div v-for="(criteria, criteriaIndex) in criterias" :key="criteriaIndex" class="section mb-4">
            <div class="d-flex justify-content-between">
                <label class="d-flex gap-2">
                    <h4>{{ criteria.title }}</h4>
                    <span class="text-danger fw-bold">*</span>
                </label>
                <div class="point">
                    ({{ criteria.total ? criteria.total : "?" }} /
                    {{ criteria.point }})
                </div>
            </div>

            <!-- Kiểm tra nếu có questions thì hiển thị -->
            <div v-if="criteria.questions && criteria.questions.length > 0">
                <div v-for="(question, questionIndex) in criteria.questions" :key="questionIndex" class="question mb-3">
                    <div class="d-flex justify-content-between title" v-if="question.label">
                        <label>
                            {{ questionIndex + 1 }}. {{ question.label }}
                            <span class="text-danger"> *</span>
                        </label>
                    </div>
                    <div class="options d-flex justify-content-around my-3">
                        <div v-for="(answer, answerIndex) in question.answer" :key="answerIndex" class="form-check">
                            <input type="radio" :id="'performanceOption' + criteriaIndex + questionIndex + answerIndex"
                                :name="'performance' + criteriaIndex + questionIndex" class="form-check-input"
                                @change="selectPerformanceValue(criteriaIndex, questionIndex, answer.value)"
                                :value="answer.value" />
                            <label :for="'performanceOption' + criteriaIndex + questionIndex + answerIndex"
                                class="form-check-label">{{ answer.label }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Nếu không có questions nhưng có answer thì hiển thị radio cho answer -->
            <div v-else-if="criteria.answer && criteria.answer.length > 0">
                <div class="options d-flex justify-content-around my-3">
                    <div v-for="(answer, answerIndex) in criteria.answer" :key="answerIndex" class="form-check">
                        <input type="radio" :id="'performanceOption' + criteriaIndex + answerIndex"
                            :name="'performance' + criteriaIndex" class="form-check-input"
                            @change="selectPerformanceValue(criteriaIndex, null, answer.value)" :value="answer.value" />
                        <label :for="'performanceOption' + criteriaIndex + answerIndex" class="form-check-label">{{
                            answer.label }}
                        </label>
                    </div>
                </div>
            </div>

            <div v-if="criteria.id == 6">
                <div v-for="(opinion, opinionIndex) in criteria.opinions" :key="opinionIndex" class="question mb-3">
                    <div class="d-flex justify-content-between title">
                        <label>
                            {{ opinionIndex + 1 }}. {{ opinion.label }}
                            <span class="text-danger">*</span>
                        </label>
                    </div>
                    <div class="options my-3">
                        <textarea v-model="opinion.answer" class="form-control" rows="4"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="
            userInfo.position === 'Manager' && this.selectedPerson?.id !== userInfo.id
        " class="section mb-4">
            <h5>
                Đánh giá của quản lý
                <span class="text-danger"> *</span>
            </h5>
            <div class="form-group">
                <textarea class="form-control" rows="5" v-model="perfDetails.commentManager"
                    placeholder="Ghi rõ ý kiến của bạn"></textarea>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" type="submit">Gửi Đánh Giá</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";

export default {
    name: 'TeamAssessForm',
    props: {
        userInfo: Object,
        selectedPerson: Object
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_DB_URL,
            criterias: [],
            perfValues: [],
            perfDetails: {},
            listScore: [],
        }
    },
    mounted() {
        this.fetchCriterias()
    },
    created() {
        this.perfValues = this.criterias.map((criteria) =>
            criteria.questions.map(() => ({
                value: null,
                description: "",
                hasError: false,
            }))
        );
        this.perfDetails = {
            contribution: "",
            nextTarget: "",
            commentManager: "",
        };
    },
    methods: {
        async fetchCriterias() {
            try {
                const response = await axios.get(this.apiUrl + '/criterias')
                this.criterias = response.data
                console.log("FETCH TIÊU CHÍ:: ", this.criterias);
            } catch (error) {
                console.error('Error fetching criterias:', error);
            }
        },

        isShowDescription(criteriaIndex, questionIndex) {
            return this.perfValues[criteriaIndex][questionIndex]?.value >= 3;
        },
        selectPerformanceValue(criteriaIndex, questionIndex, value) {
            if (!this.selectedPerson) {
                toast.error("Vui lòng chọn một người để đánh giá!", {
                    autoClose: 2000,
                });
                document.querySelectorAll("input[type=radio]").forEach((input) => {
                    input.checked = false;
                });
                return;
            }
            if (!this.perfValues[criteriaIndex]) {
                this.perfValues[criteriaIndex] = {};
            }

            if (!this.perfValues[criteriaIndex][questionIndex]) {
                this.perfValues[criteriaIndex][questionIndex] = {
                    value: null,
                    description: "",
                    hasError: false,
                };
            }
            this.perfValues[criteriaIndex][questionIndex].value = value;

            // Cập nhật vào list để hiển thị
            if (!this.listScore[criteriaIndex]) {
                this.listScore[criteriaIndex] = {};
            }
            this.listScore[criteriaIndex][questionIndex] =
                this.calculateScoreSelected(criteriaIndex, questionIndex, value);

            // Kiểm tra xem tất cả câu hỏi cho criteriaIndex này đã được trả lời chưa
            const questionsCount =
                this.criterias[criteriaIndex]?.questions?.length || 0;
            const answeredQuestionsCount = Object.keys(
                this.listScore[criteriaIndex] || {}
            ).length;

            if (answeredQuestionsCount === questionsCount) {
                // Tính tổng điểm cho criteriaIndex này
                const totalScore = this.calculateTotalScore(criteriaIndex);
                const percentage = Math.round(
                    ((totalScore * 20) / 100) *
                    (this.criterias[criteriaIndex]?.point || 1)
                );
                this.criterias[criteriaIndex].total = percentage;
            }
        },
        calculateScoreSelected(criteriaIndex, questionIndex, value) {
            // Tính điểm cho giá trị đã chọn
            const question =
                this.criterias[criteriaIndex]?.questions[questionIndex];
            const pointCriteriaIndex =
                parseFloat(this.criterias[criteriaIndex]?.point) || 1;
            const questionScore = parseFloat(question?.score) || 0;
            const selectedValue = parseFloat(value) || 0;

            // Tính toán điểm cho câu hỏi này
            const score = (questionScore / pointCriteriaIndex) * selectedValue;
            return Math.round(score * 100) / 100;
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
        submitForm() {
            if (!this.selectedPerson) {
                toast.error("Vui lòng chọn một người để đánh giá!", {
                    autoClose: 2000,
                });
                document.querySelectorAll("input[type=radio]").forEach((input) => {
                    input.checked = false;
                });
                document.querySelectorAll("textarea").forEach((input) => {
                    input.value = "";
                });
                return; // Dừng lại nếu chưa chọn selectedPerson
            }
            let allDescriptionsFilled = true;
            let allValuesSelected = true;
            let firstErrorRef = null;

            this.perfValues.forEach((selectedCriteria, index) => {
                selectedCriteria.forEach((question, qIndex) => {
                    if (question.value === undefined || question.value === null) {
                        allValuesSelected = false;
                    }

                    if (question.value >= 3) {
                        if (!question.description || question.description.trim() === "") {
                            allDescriptionsFilled = false;
                            question.hasError = true;
                            // Kiểm tra ref có tồn tại trước khi truy cập
                            if (!firstErrorRef) {
                                const refKey = `description_${index}_${qIndex}`;
                                firstErrorRef = this.$refs[refKey][0]; // Lưu ref ô lỗi đầu tiên
                            }
                        } else {
                            question.hasError = false;
                        }
                    } else {
                        question.hasError = false;
                    }
                });
            });

            // Kiểm tra và thông báo lỗi
            if (!allValuesSelected) {
                toast.error("Vui lòng chọn cho tất cả các câu hỏi!", {
                    autoClose: 2000,
                });
                return; // Dừng lại nếu có lỗi
            }

            if (!allDescriptionsFilled) {
                toast.error("Vui lòng nhập đầy đủ nhận xét cho các câu hỏi!", {
                    autoClose: 2000,
                });
                if (firstErrorRef) {
                    firstErrorRef.scrollIntoView({ behavior: "smooth", block: "center" }); // Cuộn tới ô lỗi đầu tiên
                }
                return; // Dừng lại nếu có lỗi
            }

            // Validate perfDetails
            const shouldCheckCommentManager = this.selectedPerson === this.profile;

            for (const key in this.perfDetails) {
                if (key === "commentManager") {
                    if (shouldCheckCommentManager && this.userInfo.position === "Manager") {
                        continue;
                    }
                } else if (!this.perfDetails[key]?.trim()) {
                    toast.error("Vui lòng không để trống phần đánh giá chi tiết", {
                        autoClose: 2000,
                    });
                    return;
                }
            }

            // Lưu dữ liệu và thông báo thành công
            localStorage.setItem(
                this.profile.id + "assessTo" + this.selectedPerson.id,
                JSON.stringify(this.perfValues)
            );

            localStorage.setItem(
                this.profile.id + "assessDetailsTo" + this.selectedPerson.id,
                JSON.stringify(this.perfDetails)
            );

            toast.success("Gửi đánh giá thành công!", { autoClose: 2000 });
            //this.selectedPerson.isSubmitted = true;
            this.clearForm();
        },
        clearForm() {
            this.perfValues = this.criterias.map((criteria) =>
                criteria.questions.map(() => ({
                    value: null, // Giá trị ban đầu là null (chưa chọn)
                    description: "", // Mô tả ban đầu là chuỗi rỗng
                    hasError: false,
                }))
            );
            this.perfDetails = {
                contribution: "",
                nextTarget: "",
                commentManager: "",
            };
            this.listScore = [];
            // clear input radio
            document.querySelectorAll("input[type=radio]").forEach((input) => {
                input.checked = false;
            });

            // clear textarea
            document.querySelectorAll("textarea").forEach((input) => {
                input.value = "";
            });
            this.criterias.forEach((criteria) => {
                criteria.total = 0;
            });
            //this.selectedPerson = null;
        },
    }
}
</script>

<style scoped>
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